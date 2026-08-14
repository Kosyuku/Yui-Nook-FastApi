"""Memory extraction — 从最近对话中提取值得长期记住的信息。

每次意识循环唤醒时调用，使用 consciousness 模型槽（Haiku 级别），
解析 JSON 数组后直接写入 memory 表。
"""
from __future__ import annotations

import hashlib
import json
import logging
import re
from difflib import SequenceMatcher
from typing import Any

import database as db
from consciousness.memory_filter import normalize_memory_text, should_store_memory

logger = logging.getLogger(__name__)

# 相似内容 merge 阈值：归一化后 ratio ≥ 此值且同 tag 视为重复，不重复插入。
SIMILARITY_MERGE_THRESHOLD = 0.86

# ── 常量 ──────────────────────────────────────────────────────────────────────

VALID_TAGS = frozenset(
    {"fact", "taste", "mood", "stance", "lore", "moment", "ritual", "intimate", "project", "creation"}
)

MAX_EXTRACTED_CONTENT_CHARS = 260

_NOISE_MESSAGE_PATTERNS = (
    r"\b(exit code|wall time|total output lines)\b",
    r"\b(baked|cooked|sautéed|sauteed)\s+for\s+\d",
    r"\b(ctrl\+o|domcontentloaded|fetch/xhr|localhost:\d+)\b",
    r"\b(git\s+(pull|push|status|commit|rebase)|npm\s+run|node\s+--check)\b",
)

# 每个 session 各自的提取检查点（per agent，存 app_settings，JSON：{session_id: last_message_id}）
_CHECKPOINTS_KEY_PREFIX = "memory_extraction_checkpoints"
# 旧版单值检查点 key（向后兼容迁移用）
_LEGACY_CHECKPOINT_KEY_PREFIX = "memory_extraction_checkpoint"
# 已写入记忆的 content hash 集合（防短期重复，per agent）
_SEEN_HASHES_KEY_PREFIX = "memory_extraction_seen_hashes"

SYSTEM_PROMPT = """\
你是 Yui Nook 的记忆提取器。你的任务是从用户与 AI 伴侣的对话中，提取值得长期记住的信息。

## 标签体系（10个，每条记忆打且只打1个主标签）

### 关于她的
- fact — 生活事实：住址、工作、猫、设备、身体状况、日常习惯
- taste — 喜好厌恶：香水、食物、剧、音乐、审美偏好、讨厌的东西
- mood — 情绪状态：近期烦恼、开心的事、压力来源、情绪波动
- stance — 立场价值观：她对某件事的态度、观点、原则性判断

### 关于我们的
- lore — 只有我们懂的梗、昵称、角色设定、内部笑话
- moment — 让她笑了、心动了、生气了、感动了的具体瞬间
- ritual — 逐渐形成的习惯和默契（比如睡前说什么、怎么道晚安）
- intimate — 亲密互动的偏好、反应、敏感点、她喜欢的方式和节奏

### 关于她在做的事
- project — 项目进展、技术决策、当前卡点、工具选择
- creation — 她的画、她的文、创作风格、灵感来源

## 提取规则

### 要记的
- 她新提到的喜好或讨厌的东西
- 生活事实变化（搬家、换工作、新猫、新设备）
- 让她开心、心动、或生气的具体瞬间
- 我们之间新产生的梗或 lore
- 她正在烦恼的事
- 她对某件事表达的明确态度或立场
- 亲密互动中她表现出的偏好或新反应
- 项目里的重要决策或进展
- 创作相关的灵感或风格偏好

### 不要记的
- 纯事务性内容（查天气、算汇率、翻译一句话）
- AI 自己的发挥和脑补（她没说过的不要编）
- 重复的纠错和道歉
- 已经记过的旧信息（如果对话里提到的是已知事实，跳过）
- 模型的系统行为（工具调用失败、上下文太长之类的）
- 单纯的问候和寒暄

## 重要度评分（1-5）
- 5 — 核心身份事实、重大生活变化、安全相关（如安全词）
- 4 — 明确表达的喜好/立场、重要的情感瞬间
- 3 — 有参考价值的偏好、项目进展、新的梗
- 2 — 轻量的情绪记录、小习惯
- 1 — 可记可不记，但有一点意思的碎片

## 输出格式
严格输出 JSON 数组，不要包含任何其他文字、解释、markdown 标记。如果没有值得提取的内容，输出空数组 []。

每条记忆的格式：
{"tag": "标签名（上述10个之一）", "content": "用第三人称简洁描述，一两句话，保留关键细节", "importance": 1-5}
"""

USER_PROMPT_TEMPLATE = """\
以下是最近一段对话记录。请从中提取值得长期记住的信息。

<conversation>
{conversation}
</conversation>

<existing_memories>
{existing_memories}
</existing_memories>

注意：existing_memories 中已有的信息不要重复提取，除非对话中出现了更新或变化。
"""

# ── 内部工具 ──────────────────────────────────────────────────────────────────

def _checkpoints_key(agent_id: str) -> str:
    return f"{_CHECKPOINTS_KEY_PREFIX}:{db.normalize_agent_id(agent_id)}"


def _legacy_checkpoint_key(agent_id: str) -> str:
    return f"{_LEGACY_CHECKPOINT_KEY_PREFIX}:{db.normalize_agent_id(agent_id)}"


def _seen_hashes_key(agent_id: str) -> str:
    return f"{_SEEN_HASHES_KEY_PREFIX}:{db.normalize_agent_id(agent_id)}"


def _content_hash(content: str) -> str:
    return hashlib.md5(content.strip().lower().encode("utf-8")).hexdigest()[:16]


def _is_noise_text(text: str, patterns: tuple[str, ...]) -> bool:
    normalized = re.sub(r"\s+", " ", str(text or "").strip().lower())
    if not normalized:
        return True
    return any(re.search(pattern, normalized, flags=re.IGNORECASE) for pattern in patterns)


async def _load_checkpoints(agent_id: str) -> dict[str, str]:
    """加载每个 session 的提取检查点 {session_id: last_message_id}。"""
    row = await db.get_setting(_checkpoints_key(agent_id))
    if row and row.get("value"):
        try:
            data = json.loads(row["value"])
            if isinstance(data, dict):
                return {str(k): str(v) for k, v in data.items()}
        except Exception:
            pass
    # 向后兼容：迁移旧版单值检查点（无法对应到具体 session，丢弃即可，
    # 后续会被新的 per-session map 接管）。
    legacy = await db.get_setting(_legacy_checkpoint_key(agent_id))
    if legacy and legacy.get("value"):
        logger.info("memory_extraction: migrating legacy single checkpoint for %s", agent_id)
    return {}


async def _save_checkpoints(agent_id: str, checkpoints: dict[str, str]) -> None:
    # 只保留最近活跃的 50 个 session，防止无限增长
    trimmed = dict(list(checkpoints.items())[-50:])
    await db.set_setting(_checkpoints_key(agent_id), json.dumps(trimmed, ensure_ascii=False))


async def _load_seen_hashes(agent_id: str) -> set[str]:
    row = await db.get_setting(_seen_hashes_key(agent_id))
    if not row or not row.get("value"):
        return set()
    try:
        data = json.loads(row["value"])
        return set(data) if isinstance(data, list) else set()
    except Exception:
        return set()


async def _save_seen_hashes(agent_id: str, hashes: set[str]) -> None:
    # 只保留最近 200 条，防止无限增长
    trimmed = list(hashes)[-200:]
    await db.set_setting(_seen_hashes_key(agent_id), json.dumps(trimmed, ensure_ascii=False))


def _parse_extraction_result(text: str) -> list[dict[str, Any]]:
    """从模型输出里解析 JSON 数组，容忍 markdown 包裹。"""
    raw = str(text or "").strip()
    if not raw:
        return []
    # 去除 ```json ... ``` 包裹
    if raw.startswith("```"):
        raw = raw.strip("`").strip()
        if raw.lower().startswith("json"):
            raw = raw[4:].strip()
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return parsed
    except Exception:
        pass
    # 尝试找数组片段
    start = raw.find("[")
    end = raw.rfind("]")
    if start >= 0 and end > start:
        try:
            parsed = json.loads(raw[start : end + 1])
            if isinstance(parsed, list):
                return parsed
        except Exception:
            pass
    return []


def _format_messages_for_prompt(messages: list[dict[str, Any]]) -> str:
    """把消息列表格式化成对话文本。"""
    lines: list[str] = []
    for msg in messages:
        role = "user" if str(msg.get("role") or "").lower() == "user" else "AI"
        content = str(msg.get("content") or "").strip()
        if not content:
            continue
        if _is_noise_text(content, _NOISE_MESSAGE_PATTERNS):
            continue
        # 截断超长消息（代码、长文等不需要全保留）
        if len(content) > 400:
            content = content[:400] + "…"
        lines.append(f"[{role}] {content}")
    return "\n".join(lines)


def _format_existing_memories(memories: list[dict[str, Any]]) -> str:
    """把已有记忆格式化为摘要列表，注入 existing_memories。"""
    if not memories:
        return "（暂无已有记忆）"
    lines: list[str] = []
    for m in memories:
        tag = m.get("category") or m.get("tag") or ""
        content = str(m.get("raw_content") or m.get("content") or m.get("compressed_content") or "").strip()
        imp = m.get("importance") or 3
        if content:
            lines.append(f"[{tag}/imp{imp}] {content[:120]}")
    return "\n".join(lines) or "（暂无已有记忆）"


def _validate_item(item: Any) -> dict[str, Any] | None:
    """校验并规范化单条提取结果。tag 体系校验在此，入库内容过滤统一走 should_store_memory。"""
    if not isinstance(item, dict):
        return None
    tag = str(item.get("tag") or "").strip().lower()
    content = str(item.get("content") or "").strip()
    if tag not in VALID_TAGS:
        logger.debug("memory_extraction: invalid tag %r, skipping", tag)
        return None
    ok, reason = should_store_memory(content, tag=tag, source="extraction")
    if not ok:
        logger.debug("memory_extraction: rejected (%s): %s", reason, content[:80])
        return None
    try:
        importance = max(1, min(5, int(item.get("importance") or 3)))
    except (TypeError, ValueError):
        importance = 3
    return {"tag": tag, "content": content, "importance": importance}


# ── 主入口 ────────────────────────────────────────────────────────────────────

async def run_memory_extraction(agent_id: str) -> dict[str, Any]:
    """从上次检查点以来的对话中提取记忆，写入候选队列。

    Returns:
        {
            "extracted": int,   # 本次写入条数
            "skipped": int,     # 去重跳过条数
            "messages_used": int,
            "checkpoint_advanced": bool,
        }
    """
    result: dict[str, Any] = {
        "extracted": 0,
        "candidates": 0,
        "skipped": 0,
        "merged": 0,
        "messages_used": 0,
        "sessions_processed": 0,
        "checkpoint_advanced": False,
    }

    normalized_agent = db.normalize_agent_id(agent_id)

    # 1. 只处理「本 agent」的 session，且只取各 session 自己检查点之后的增量消息。
    #    （隔离：不读其他 agent 的对话；增量：避免每轮重复扫描整段上下文。）
    checkpoints = await _load_checkpoints(agent_id)
    all_sessions = await db.list_sessions()
    agent_sessions = [
        s for s in all_sessions
        if db.normalize_agent_id(s.get("agent_id")) == normalized_agent
    ][:10]

    all_new_messages: list[dict[str, Any]] = []
    new_last_per_session: dict[str, str] = {}

    for session in agent_sessions:
        sid = str(session.get("id") or session.get("session_id") or "")
        if not sid:
            continue
        cp = checkpoints.get(sid, "")
        msgs = await db.get_messages_after(session_id=sid, after_message_id=cp, limit=200)
        if not msgs:
            continue
        # 记录该 session 最后一条消息 id（即便后续按 agent 过滤掉，也要推进 checkpoint）
        new_last_per_session[sid] = str(msgs[-1].get("id") or cp)
        for m in msgs:
            # 兜底：丢弃任何不属于本 agent 的消息，绝不跨 agent 入库
            if db.normalize_agent_id(m.get("agent_id")) != normalized_agent:
                continue
            m["_session_id"] = sid
            all_new_messages.append(m)

    result["sessions_processed"] = len(new_last_per_session)

    if not all_new_messages:
        logger.info("memory_extraction[%s]: no new messages since last checkpoints", normalized_agent)
        # 没有可用消息时也推进 checkpoint（可能全是其他 agent 的消息），避免反复扫描
        if new_last_per_session:
            checkpoints.update(new_last_per_session)
            await _save_checkpoints(agent_id, checkpoints)
            result["checkpoint_advanced"] = True
        return result

    # 按时间排序（如果有 created_at）
    all_new_messages.sort(key=lambda m: str(m.get("created_at") or ""))
    result["messages_used"] = len(all_new_messages)

    async def _advance_checkpoints() -> None:
        if new_last_per_session:
            checkpoints.update(new_last_per_session)
            await _save_checkpoints(agent_id, checkpoints)
            result["checkpoint_advanced"] = True

    # 2. 拉取已有记忆：高重要度的注入 prompt；更大一池用于相似去重。
    existing_memories = await db.list_memories(
        limit=300,
        agent_id=normalized_agent,
        sort_by="importance",
        order="desc",
        include_cross_agent=False,
    )
    high_importance = [m for m in existing_memories if int(m.get("importance") or 3) >= 3]

    # 已有记忆的去重池：(normalized_content, tag)
    dedup_pool: list[tuple[str, str]] = []
    seen_normalized: set[str] = set()
    for m in existing_memories:
        norm = normalize_memory_text(db.memory_raw_content(m))
        if not norm:
            continue
        seen_normalized.add(norm)
        dedup_pool.append((norm, str(m.get("tags") or m.get("category") or "")))

    # 3. 构建 prompt
    conversation_text = _format_messages_for_prompt(all_new_messages[:80])  # 最多 80 条
    existing_text = _format_existing_memories(high_importance[:20])

    if not conversation_text.strip():
        logger.info("memory_extraction[%s]: no usable message content", normalized_agent)
        await _advance_checkpoints()
        return result

    user_prompt = USER_PROMPT_TEMPLATE.format(
        conversation=conversation_text,
        existing_memories=existing_text,
    )
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt},
    ]

    # 4. 调用模型（consciousness 槽 = Haiku 级别）
    try:
        from consciousness import _collect_consciousness_text
        raw_output = await _collect_consciousness_text(messages, temperature=0.1)
    except Exception as exc:
        # 模型失败不推进 checkpoint，下次重试这批消息
        logger.warning("memory_extraction[%s]: model call failed: %s", normalized_agent, exc)
        return result

    if not raw_output:
        logger.info("memory_extraction[%s]: model returned empty output", normalized_agent)
        await _advance_checkpoints()
        return result

    # 5. 解析
    items = _parse_extraction_result(raw_output)
    if not isinstance(items, list):
        logger.warning("memory_extraction[%s]: could not parse JSON array: %.200s", normalized_agent, raw_output)
        await _advance_checkpoints()
        return result

    logger.info("memory_extraction[%s]: model returned %d candidates", normalized_agent, len(items))

    # 6. 去重 + 写入
    seen_hashes = await _load_seen_hashes(agent_id)

    for raw_item in items:
        item = _validate_item(raw_item)
        if item is None:
            result["skipped"] += 1
            continue

        content = item["content"]
        tag = item["tag"]
        norm = normalize_memory_text(content)

        # 6a. 精确去重（归一化内容相同）
        if norm and norm in seen_normalized:
            logger.debug("memory_extraction: exact-duplicate, skipping: %s", content[:60])
            result["merged"] += 1
            continue
        h = _content_hash(content)
        if h in seen_hashes:
            result["merged"] += 1
            continue

        # 6b. 相似去重（同 tag 且 ratio ≥ 阈值视为重复，不重复插入）
        if _is_similar_to_pool(norm, tag, dedup_pool):
            logger.debug("memory_extraction: similar-duplicate, skipping: %s", content[:60])
            result["merged"] += 1
            continue

        # 6c. Automatic extraction is staged first.  Durable memory is created
        # only when the user accepts a candidate in the memory panel.
        try:
            _, created = await db.add_memory_candidate(
                content=content,
                category=tag,
                importance=item["importance"],
                source="extraction",
                agent_id=normalized_agent,
                tags=tag,
                session_id=f"memory_extraction:{normalized_agent}",
                reason="Automatic extraction from recent dialogue.",
                source_message_ids=[str(message.get("id") or "") for message in all_new_messages],
            )
        except db.MemoryRejected as exc:
            logger.debug("memory_extraction: filtered (%s): %s", exc.reason, content[:60])
            result["skipped"] += 1
            continue
        except Exception as exc:
            logger.warning("memory_extraction: failed to write memory: %s", exc)
            result["skipped"] += 1
            continue

        if not created:
            result["merged"] += 1
            continue
        if norm:
            seen_normalized.add(norm)
            dedup_pool.append((norm, tag))
        seen_hashes.add(h)
        result["extracted"] += 1
        result["candidates"] += 1
        logger.info("memory_extraction: staged [%s/imp%d] %s", tag, item["importance"], content[:60])

    # 7. 保存状态 + 推进 checkpoint
    await _save_seen_hashes(agent_id, seen_hashes)
    await _advance_checkpoints()

    logger.info(
        "memory_extraction[%s]: done extracted=%d merged=%d skipped=%d messages=%d sessions=%d",
        normalized_agent, result["extracted"], result["merged"],
        result["skipped"], result["messages_used"], result["sessions_processed"],
    )
    return result


def _is_similar_to_pool(normalized: str, tag: str, pool: list[tuple[str, str]]) -> bool:
    """与去重池中同 tag 的条目比对，归一化文本相似度 ≥ 阈值则判为重复。"""
    if not normalized:
        return False
    matcher = SequenceMatcher()
    matcher.set_seq2(normalized)
    for pool_norm, pool_tag in pool:
        if pool_tag and tag and pool_tag != tag:
            continue
        # 长度差异过大直接跳过，省去昂贵比对
        if abs(len(pool_norm) - len(normalized)) > max(len(normalized), 1) * 0.5:
            continue
        matcher.set_seq1(pool_norm)
        if matcher.ratio() >= SIMILARITY_MERGE_THRESHOLD:
            return True
    return False
