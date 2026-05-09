# Prompt Cache Plan and Structure

> Last updated: 2026-05-04
> Scope: backend prompt assembly, cache-friendly prompt block layout, context isolation.

## 1. Goal

Build prompt assembly around cache hits.

The core rule is simple:

- Stable content stays at the front.
- Dynamic content stays at the end.
- Frontend sends intent and ids only.
- Backend owns all prompt construction through `prompt_builder`.
- Memory, diary, companion state, current time, tool results, and latest user input never enter the fixed cache block.

This keeps prompt cache useful instead of letting every message poison the prefix. Obvious thing, still worth writing down before someone gets clever.

## 2. Target Prompt Layout

The request prompt should be assembled in this order:

```text
[Fixed Block]
system, persona, fixed rules, tool schemas, MCP tool descriptions

[Summary Block]
compressed conversation summary, low-frequency updates

[History A Block]
previous cycle raw chat history

[History B Block]
current cycle raw chat history

[Dynamic Block]
current time, memory, diary, companion_state, latest user message, tool results
```

Turn boundary:

- The current turn's `latest_user_text` enters Dynamic Block only.
- It does not enter History B before generation.
- After the assistant reply completes and both user + assistant messages are stored, that completed turn becomes eligible for History B.
- Dynamic Block is for "now"; History B is for committed conversation history. 别混，混了缓存就废。

### Fixed Block

Purpose:

- Maximize provider-side prompt cache hits.
- Keep the prefix stable across turns.

Allowed content:

- Base system instruction.
- Agent persona text, when stable for that agent.
- Fixed behavior rules.
- Tool schemas selected by `tool_profile`.
- MCP tool descriptions selected by `tool_profile`.
- Static model-facing format rules.

Forbidden content:

- Current time.
- Weather and location.
- Memory retrieval output.
- Diary content.
- `companion_state`.
- Session history.
- Latest user message.
- Tool results.

Cache isolation:

- `agent_id`
- optional `provider/model`
- fixed prompt version
- tool schema version
- MCP registry version
- `tool_profile`

Tool profile rules:

- `chat`: use the chat-safe tool subset.
- `rp`: tools disabled by default.
- `summary`: use no tools unless a summarizer explicitly needs a narrow read-only subset.
- `proactive`: use only the small subset needed for proactive checks.

Do not inject the full MCP/tool registry into every mode.

### Summary Block

Purpose:

- Compress older context.
- Update rarely enough to keep cache wins meaningful.

Content:

- `context_summaries.summary`
- Optional summary metadata, only if stable enough to matter.

Update policy:

- Continue using low-frequency summary triggers.
- Do not regenerate on every message.
- Tie summary to `session_id` and `agent_id`.

Cache isolation:

- `session_id`
- `agent_id`
- summary revision / updated_at

### History A Block

Purpose:

- Preserve the previous raw-history window while allowing rotation.

Content:

- Previous cycle raw chat records.
- No memory, diary, or state injection.

Rotation:

- When History B grows past the configured recent-message budget, B becomes A.
- Older A is summarized into Summary Block or dropped after summary confirmation.
- Rotation must be deterministic and backed by stable ids.

Cache isolation:

- `session_id`
- `agent_id`
- history cycle id

Persistence requirement:

- History A/B must not rely only on slicing the latest `messages` window at runtime.
- Add stable cycle tracking before implementation.
- Acceptable options:
  - Add a `conversation_partitions` table.
  - Or add `partition` / `cycle_id` markers to `messages`.
- The chosen design must make History A/B rotation reproducible across retries, restarts, and provider failures.

### History B Block

Purpose:

- Hold the current raw conversation cycle.

Content:

- Current-cycle user and assistant messages.
- Tool-call transcript only when needed for continuity.
- Only committed messages from previous completed turns.

Rules:

- Keep it behind Summary and History A.
- Do not let frontend pre-compose it.
- Keep RP history separate from normal chat history.
- Do not include the current request's `latest_user_text` until the assistant response has completed and the turn is stored.

Cache isolation:

- `session_id`
- `agent_id`
- `rp_room_id` when RP mode is active

### Dynamic Block

Purpose:

- Carry fast-changing context at the tail.
- Protect every block before it from needless invalidation.

Content:

- Current time.
- Environment cache such as weather/location.
- Retrieved memories.
- Diary snippets.
- `companion_state`.
- Latest user message.
- Tool results.
- Runtime-only hints.

Rules:

- Always last.
- Never promoted into Fixed Block.
- Clip aggressively.
- Scope by agent and session.

Cache isolation:

- `agent_id`
- `session_id`
- `rp_room_id`
- optional `provider/model`

## 3. Backend Ownership

Frontend must not build prompts.

Frontend sends:

- `session_id`
- `agent_id`
- `room_id` for RP
- user content
- optional model/provider override fields
- optional persona override only when the UI explicitly edits it

Backend does:

- Resolve agent.
- Resolve session or RP room.
- Load summaries.
- Load history partitions.
- Retrieve memory.
- Retrieve diary context.
- Retrieve companion state.
- Resolve tools and MCP descriptions.
- Build final provider messages.

Primary module:

- `backend/prompt_builder.py`

Call sites to migrate:

- `POST /api/chat`
- `POST /api/rp/chat`
- summary jobs where prompt shape matters
- proactive/consciousness prompts if they later need cache-aware blocks

## 4. Proposed Backend API

Add a structured prompt builder result instead of returning one flat system string.

```python
@dataclass
class PromptBlock:
    name: str
    role: str
    content: str
    cache_scope: str
    cache_key_parts: dict[str, str]

@dataclass
class BuiltPrompt:
    blocks: list[PromptBlock]
    messages: list[dict]
    debug: dict
```

Initial functions:

```python
async def build_chat_prompt(
    *,
    session_id: str,
    agent_id: str,
    latest_user_text: str,
    override_persona: str | None = None,
    provider: str | None = None,
    model: str | None = None,
    tool_profile: str = "chat",
) -> BuiltPrompt:
    ...

async def build_rp_prompt(
    *,
    room_id: str,
    agent_id: str,
    latest_user_text: str,
    override_persona: str | None = None,
    provider: str | None = None,
    model: str | None = None,
    tool_profile: str = "rp",
) -> BuiltPrompt:
    ...
```

Keep `build_system_prompt(...)` temporarily as a compatibility wrapper, then retire it after chat and RP call sites move over.

Debug metadata must include:

- `block_order`
- `block_token_estimates`
- `fixed_block_hash`
- `summary_revision`
- `history_a_cycle_id`
- `history_b_cycle_id`
- `dynamic_sources`
- `provider`
- `model`

## 5. Cache Key Strategy

Provider-side prompt cache usually depends on identical prefix text. The backend should make that prefix deterministic.

Suggested internal cache key parts:

```text
fixed:
  prompt_builder_version
  agent_id
  persona_revision
  fixed_rules_revision
  tool_schema_revision
  mcp_registry_revision
  tool_profile
  provider
  model

summary:
  session_id
  agent_id
  summary_updated_at

history_a:
  session_id
  agent_id
  history_a_cycle_id

history_b:
  session_id
  agent_id
  history_b_cycle_id

dynamic:
  no long-lived cache assumption
```

Important:

- Do not include current time in fixed or summary keys.
- Do not include memory ids in fixed or summary keys.
- Do not mix RP room ids into normal chat sessions.
- Do not share cache material across agents unless explicitly marked global and safe.
- `fixed_block_hash` must be calculated from Fixed Block content only.
- Current time, memory, diary, companion state, latest user message, and tool results must never affect `fixed_block_hash`.

## 6. Provider Adapter Cache Policy

Prompt block assembly should be provider-neutral, but cache behavior belongs in the provider adapter layer.

### OpenAI

- Keep the prefix stable through message ordering and content stability.
- Do not add `cache_control`.
- When usage data is returned, record cached token fields such as `cached_tokens` or provider-equivalent prompt cache details.

### Claude

- When supported, insert cache-control breakpoints at safe block boundaries.
- Preferred breakpoint targets:
  - end of Fixed Block
  - optionally end of Summary Block when stable enough
- If the selected Claude-compatible provider does not support cache-control, degrade to normal messages without failing the chat request.

### OpenRouter

- Initial behavior: send ordinary `messages`.
- Do not invent provider-specific cache fields in the first pass.
- Later, pass through provider parameters only after testing the exact OpenRouter route/model behavior.

## 7. Isolation Rules

Required isolation:

- `agent_id`: mandatory for persona, memory, diary, companion_state, messages.
- `session_id`: mandatory for normal chat summaries and history.
- `rp_room_id`: mandatory for RP room messages and RP setting.
- `provider/model`: optional but recommended when provider behavior or tool schema formatting differs.

Non-negotiable:

- Different roles do not share dynamic context.
- RP prompt does not read normal session history.
- Normal chat prompt does not read RP room history.
- Shared/global memory can appear only through existing visibility rules and must be source-labeled.

## 8. Data Mapping

Current storage already covers most of it:

| Block | Data source |
| --- | --- |
| Fixed | settings, agent persona, tool registry, MCP registry |
| Summary | `context_summaries` |
| History A | derived from `messages` partition window |
| History B | recent `messages` |
| RP history | `rp_rooms`, `rp_messages` |
| Memory | `memories`, semantic/keyword retrieval |
| Diary | `diary`, `diary_notebooks`, `diary_entries` |
| State | `companion_state` |
| Tool results | runtime tool-call loop and COT logs |

History persistence addition:

| Structure | Purpose |
| --- | --- |
| `conversation_partitions` or `messages.cycle_id` | stable History A/B cycle tracking |

## 9. Implementation Plan

### Phase 1 - Document and stabilize shape

- Add this plan.
- Define block names and ownership.
- Keep frontend unchanged.

Status: done.

### Phase 2 - Refactor prompt builder

- Add `PromptBlock` and `BuiltPrompt`.
- Split current `build_system_prompt` into fixed and dynamic loaders.
- Move current time, memory, and companion state out of the fixed/system prefix.
- Add debug metadata for block sizes and cache key parts.
- Add `tool_profile` selection and prevent full tool/MCP registry injection.
- Ensure `latest_user_text` goes only into Dynamic Block during generation.

### Phase 3 - Chat route migration

- Update `/api/chat` to call `build_chat_prompt`.
- Stop manually prepending a single giant system prompt.
- Keep SSE behavior unchanged.
- Preserve tool-call loop behavior.
- After the assistant response completes and persistence succeeds, mark the user + assistant pair as part of the current History B cycle.

### Phase 4 - RP route migration

- Update `/api/rp/chat` to call `build_rp_prompt`.
- Put RP room setting after fixed persona but before RP history.
- Keep tools disabled for RP unless explicitly changed later.

### Phase 5 - History rotation

- Add explicit History A / History B selection.
- Use `context_summaries` as the low-frequency compression target.
- Ensure recent-message budget does not shove everything into one unstable block.
- Add `conversation_partitions` or message-level `cycle_id` markers.
- Make rotation deterministic across retries and server restarts.

### Phase 6 - Provider adapter cache support

- Add provider-specific cache handling in adapters, not in prompt-builder core.
- OpenAI: record cached token usage when returned.
- Claude: support cache-control breakpoints when available and degrade cleanly when unavailable.
- OpenRouter: keep ordinary messages first, then add tested provider param pass-through later.

### Phase 7 - Verification

- Add a local debug endpoint or log line showing block order and sizes.
- Test same agent/session repeated turns for stable fixed prefix.
- Test different `agent_id` does not reuse persona/memory/state.
- Test RP room does not leak into normal chat.
- Test model/provider override produces expected isolation.
- Test current-turn `latest_user_text` is absent from History B before generation.
- Test `fixed_block_hash` stability across consecutive turns with the same fixed inputs.

## 10. Acceptance Criteria

- `prompt_builder` is the only place assembling chat/RP prompt blocks.
- Frontend sends no prebuilt prompt string.
- Fixed Block text is identical across ordinary messages for the same agent/provider/model/tool revision.
- Memory, diary, state, current time, and tool results appear only in Dynamic Block.
- Summary updates are low-frequency and tied to `session_id + agent_id`.
- History A/B rotation is deterministic.
- History A/B rotation uses stable persisted cycle ids or partition markers.
- Current-turn `latest_user_text` enters Dynamic Block only, then moves into History B only after the assistant response is completed and stored.
- RP uses `rp_room_id` isolation.
- RP defaults to tools disabled.
- Tool schemas/MCP descriptions are selected by `tool_profile`, not injected wholesale.
- Different agents never share private memory, diary, or companion state.
- Same `agent_id + session_id` across two consecutive turns must produce the same `fixed_block_hash` when persona, fixed rules, tool profile, provider, model, and tool/MCP revisions are unchanged.
- Current time, memory, diary, and companion state must not appear in the Fixed Block content used for `fixed_block_hash`.
- When OpenAI returns usage details, cached token counts must be recorded.

## 11. Current Code Notes

Relevant files:

- `backend/prompt_builder.py`
- `backend/routes/__init__.py`
- `backend/database.py`
- `backend/conversation_summary.py`
- `backend/tools/__init__.py`

Current issue:

- `build_system_prompt(...)` returns one large system prompt.
- It currently mixes stable persona/tool descriptions with dynamic time, memory, and companion state.
- That shape is bad for cache hits because the prefix changes too often.

Target:

- Keep stable instructions first.
- Push dynamic retrieval to the tail.
- Make block boundaries visible in code, not just in comments.
