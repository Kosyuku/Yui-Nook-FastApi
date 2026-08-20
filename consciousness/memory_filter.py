"""统一的记忆入库过滤 + 归一化。

所有「自动来源」的记忆写入（extraction / auto_rule / MCP save_memory）
都应先经过 should_store_memory()，把过程文本、工具调用说明、当前时间确认、
报错、临时状态、模型自我解释挡在库外。

normalize_memory_text() 给出去重用的 canonical 形式。
本模块不依赖 database，避免循环引用。
"""
from __future__ import annotations

import re

# 记忆内容长度边界（与 memory_extraction.MAX_EXTRACTED_CONTENT_CHARS 对齐）
MIN_MEMORY_CHARS = 5
MAX_MEMORY_CHARS = 260

# ── 归一化 ──────────────────────────────────────────────────────────────────

# 去重时剥掉的标点/空白（中英文都覆盖）
_PUNCT_RE = re.compile(
    r"[\s~`!@#$%^&*()\-_=+\[\]{}\\|;:'\",.<>/?，。、；：‘’“”！？…—·（）《》【】]+"
)


def normalize_memory_text(text: str) -> str:
    """记忆内容的 canonical 形式：小写、去空白、去标点。用于精确去重。"""
    value = str(text or "").strip().lower()
    if not value:
        return ""
    return _PUNCT_RE.sub("", value)


# ── 噪声 / 过程文本模式 ──────────────────────────────────────────────────────

# 工具调用说明 / 报错 / 临时运行状态 / 终端噪声
_NOISE_PATTERNS = (
    r"\b(exit code|wall time|total output lines|traceback|stack trace)\b",
    r"\b(baked|cooked|saut[ée]ed)\s+for\s+\d",
    r"\b(ctrl\+o|domcontentloaded|fetch/xhr|network tab|devtools|localhost:\d+)\b",
    r"\b(git\s+(pull|push|status|commit|rebase)|npm\s+run|node\s+--check)\b",
    r"工具调用|工具返回|调用工具|tool call|tool result|function call",
    r"报错|出错了|抛出异常|异常信息|栈信息|stack overflow",
)

# 模型自我解释 / 思考过程 / 当前时间确认 / 「让我先…」之类的过程旁白
_META_PATTERNS = (
    r"^\s*让我(先|来|看|查|想|确认|自然|慢慢)",
    r"^\s*我(先|来|应该|需要|得|想|会|现在|可以|觉得我)",
    r"我先(看看|查一下|确认|想想|读)",
    r"查一下时间|确认一下时间|看看时间",
    r"(当前|现在)时间(是|为|大概|应该)",
    r"我(需要|应该)确认",
    r"我应该怎么回应|我该怎么回|该怎么回应|怎么自然地回",
    r"相关记忆|检索记忆|搜索记忆|看看记忆|查记忆|读一下记忆",
    r"稍等|马上|正在(处理|查询|加载|思考|读取)",
    r"作为\s*ai|作为(一个)?(语言)?模型|系统提示|上下文(太长|窗口|限制)?|流式(输出|消息)",
    r"^\s*(let me|i need to|i should|i will|i'm going to|first,? i|the user|current context|as an ai)\b",
    r"我的印象(是|里)|关系处于|核心身份|我了解我的角色|按理说",
)

# 纯寒暄 / 单字应答 / 事务性碎句
_FILLER_PATTERNS = (
    r"^\s*(修|改|push|同步|截图|看图|继续|好|好的|嗯|啊|哦|行|晚安|早安|在吗?|收到)[~!！。,.，\s]*$",
)

# 「我来记录这条信息」这类**关于存储动作本身**的旁白：模型把自己的答话当成
# 记忆内容写进去了，内容里没有任何关于用户的事实。
# 与 _META_PATTERNS 的区别是这里**不锚定行首** —— 模型几乎总会带一个
# 「好的，」「明白了，」之类的前缀，`^\s*我(来|先|...)` 因此匹配不到。
_STORAGE_NARRATION_PATTERNS = (
    r"(我来|我先|我这就|让我|我帮你|我把)[^。！？\n]{0,12}(记录|记下来|记下|存下来|存一下|收录)",
    r"(记录|记下|存下)(这条|这段|这个|一下)(信息|内容|事|消息)?",
    r"让我把[^。！？\n]{0,20}记(下来|录)",
    r"\b(i'?ll|let me|i will)\s+(note|record|remember|save)\s+(this|that)\b",
)

_NOISE_RE = tuple(re.compile(p, re.IGNORECASE) for p in _NOISE_PATTERNS)
_META_RE = tuple(re.compile(p, re.IGNORECASE) for p in _META_PATTERNS)
_FILLER_RE = tuple(re.compile(p, re.IGNORECASE) for p in _FILLER_PATTERNS)
_STORAGE_NARRATION_RE = tuple(
    re.compile(p, re.IGNORECASE) for p in _STORAGE_NARRATION_PATTERNS
)

_URL_RE = re.compile(r"https?://|www\.", re.IGNORECASE)
_URL_OK_TAGS = frozenset({"project", "creation"})

# Activity telemetry is useful to the short-lived activity/proactive layer, but
# it is not a durable fact about the user or the relationship.  This pattern is
# deliberately narrow: it only catches repeated app/page actions followed by an
# unresolved-response observation, like the duplicate entries seen in memory.
_TRANSIENT_OBSERVATION_RE = (
    re.compile(
        r"(?:当前角色|对方|她|他).{0,32}(?:连续|反复|多次|第?\d+次).{0,28}"
        r"(?:打开|点击|浏览|查看|进入).{0,80}(?:未回应|没回应|暂无回应|尚未回应|"
        r"需关注|需要关注|观察.{0,12}反应)",
        re.IGNORECASE,
    ),
    re.compile(
        r"(?:opened|clicked|viewed|visited).{0,80}(?:repeatedly|multiple times).{0,100}"
        r"(?:no response|awaiting response|observe.*reaction)",
        re.IGNORECASE,
    ),
)


# ── 主入口 ──────────────────────────────────────────────────────────────────

def should_store_memory(
    content: str,
    *,
    tag: str | None = None,
    source: str | None = None,
) -> tuple[bool, str]:
    """判断一条候选记忆是否值得入库。

    返回 (ok, reason)；ok=False 时 reason 说明被拒原因（用于日志 / dry-run）。
    只针对自动来源调用；用户手动创建的记忆不走这里。
    """
    text = str(content or "").strip()
    if not text:
        return False, "empty"

    collapsed = re.sub(r"\s+", " ", text)
    length = len(collapsed)
    if length < MIN_MEMORY_CHARS:
        return False, "too_short"
    if length > MAX_MEMORY_CHARS:
        return False, "too_long"

    lowered = collapsed.lower()

    for pattern in _FILLER_RE:
        if pattern.search(collapsed):
            return False, "filler"
    for pattern in _NOISE_RE:
        if pattern.search(lowered):
            return False, "noise_tool_or_error"
    for pattern in _META_RE:
        if pattern.search(collapsed):
            return False, "process_or_self_explanation"
    for pattern in _STORAGE_NARRATION_RE:
        if pattern.search(collapsed):
            return False, "storage_narration"

    normalized_tag = str(tag or "").strip().lower()
    if _URL_RE.search(collapsed) and normalized_tag not in _URL_OK_TAGS:
        return False, "non_project_url"
    if any(pattern.search(collapsed) for pattern in _TRANSIENT_OBSERVATION_RE):
        return False, "transient_activity_observation"

    return True, "ok"
