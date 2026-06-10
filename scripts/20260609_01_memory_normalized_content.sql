-- Memory dedup: add normalized_content for exact-match deduplication.
-- Run once in the Supabase SQL editor. Safe to re-run (idempotent).

alter table memories add column if not exists normalized_content text not null default '';

-- Backfill canonical form: lowercased, whitespace + ASCII/CJK punctuation stripped.
-- Mirrors consciousness.memory_filter.normalize_memory_text() (CJK punctuation
-- is listed explicitly so backfilled rows match the app-layer normalization even
-- if the DB locale does not classify full-width punctuation as [:punct:]).
update memories
set normalized_content = lower(
        regexp_replace(
            coalesce(nullif(raw_content, ''), content),
            '[[:space:][:punct:]，。、；：“”‘’！？…—·（）《》【】]+',
            '', 'g'
        )
    )
where coalesce(normalized_content, '') = '';

-- Query index for same-agent exact dedup (non-unique; merge is done in app
-- layer so we can bump importance / warm temperature on collision).
create index if not exists idx_memories_agent_normalized
    on memories(agent_id, normalized_content);
