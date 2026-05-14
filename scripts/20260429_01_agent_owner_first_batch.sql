-- 20260429_01_agent_owner_first_batch.sql
-- First batch agent ownership alignment:
-- messages.agent_id, context_summaries.agent_id, memory_logs.agent_id,
-- and match_memories(filter_agent_id).

alter table messages
    add column if not exists agent_id text not null default 'default';

update messages
set agent_id = coalesce(nullif(sessions.agent_id, ''), 'default')
from sessions
where messages.session_id = sessions.id
  and coalesce(messages.agent_id, '') = '';

create index if not exists idx_messages_agent_session
    on messages(agent_id, session_id, created_at);


alter table context_summaries
    add column if not exists agent_id text not null default 'default';

update context_summaries
set agent_id = coalesce(nullif(sessions.agent_id, ''), 'default')
from sessions
where context_summaries.session_id = sessions.id
  and coalesce(context_summaries.agent_id, '') = '';

create index if not exists idx_context_summaries_agent_session
    on context_summaries(agent_id, session_id, created_at);


alter table memory_logs
    add column if not exists agent_id text not null default 'default';

update memory_logs
set agent_id = coalesce(nullif(memories.agent_id, ''), 'default')
from memories
where memory_logs.memory_id = memories.id
  and coalesce(memory_logs.agent_id, '') = '';

create index if not exists idx_memory_logs_agent_created
    on memory_logs(agent_id, created_at desc);

create index if not exists idx_memory_logs_memory_created
    on memory_logs(memory_id, created_at desc);


create or replace function match_memories(
    query_embedding vector(1536),
    match_count int default 10,
    filter_category text default null,
    filter_agent_id text default null
)
returns table (
    id text,
    agent_id text,
    visibility text,
    source_agent_id text,
    content text,
    raw_content text,
    compressed_content text,
    category text,
    tags text,
    source text,
    importance integer,
    temperature double precision,
    last_touched_at timestamptz,
    touch_count integer,
    expires_at timestamptz,
    created_at text,
    updated_at text,
    similarity float
)
language sql
as $$
    select
        memories.id,
        memories.agent_id,
        memories.visibility,
        memories.source_agent_id,
        memories.content,
        memories.raw_content,
        memories.compressed_content,
        memories.category,
        memories.tags,
        memories.source,
        memories.importance,
        memories.temperature,
        memories.last_touched_at,
        memories.touch_count,
        memories.expires_at,
        memories.created_at,
        memories.updated_at,
        1 - (memories.embedding <=> query_embedding) as similarity
    from memories
    where memories.embedding is not null
      and (memories.expires_at is null or memories.expires_at > now())
      and (filter_category is null or memories.category = filter_category)
      and (filter_agent_id is null or memories.agent_id = filter_agent_id)
    order by memories.embedding <=> query_embedding,
             memories.temperature desc,
             memories.importance desc
    limit match_count;
$$;
