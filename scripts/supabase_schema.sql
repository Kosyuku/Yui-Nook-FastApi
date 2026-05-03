create extension if not exists vector;

create table if not exists agents (
    agent_id text primary key check (agent_id ~ '^[a-z0-9_-]+$'),
    display_name text not null,
    avatar text default '',
    description text default '',
    persona text default '',
    source text default 'native',
    metadata jsonb default '{}'::jsonb,
    is_active boolean not null default true,
    created_at text not null,
    updated_at text not null
);

create index if not exists idx_agents_active
    on agents(is_active, updated_at desc);
create index if not exists idx_agents_source
    on agents(source, updated_at desc);

insert into agents (agent_id, display_name, avatar, description, persona, source, metadata, is_active, created_at, updated_at)
values ('azheng', '阿筝', '', '', '', 'native', '{}'::jsonb, true, now()::text, now()::text)
on conflict (agent_id) do update set
    display_name = case when coalesce(agents.display_name, '') = '' then excluded.display_name else agents.display_name end,
    source = case when coalesce(agents.source, '') = '' then excluded.source else agents.source end,
    is_active = true,
    updated_at = excluded.updated_at;

create table if not exists agent_external_links (
    id text primary key,
    source text not null,
    external_id text not null,
    external_name text default '',
    agent_id text not null references agents(agent_id),
    metadata jsonb default '{}'::jsonb,
    created_at text not null,
    updated_at text not null,
    unique(source, external_id)
);

create index if not exists idx_agent_external_links_agent
    on agent_external_links(agent_id);

create table if not exists sessions (
    id text primary key,
    title text not null default '新对话',
    model text not null default 'echo',
    source_app text not null default 'yui_nook',
    agent_id text not null default 'default',
    last_summarized_message_id text default '',
    created_at text not null,
    updated_at text not null
);

alter table sessions add column if not exists source_app text not null default 'yui_nook';
alter table sessions add column if not exists agent_id text not null default 'default';
alter table sessions add column if not exists last_summarized_message_id text default '';
update sessions set source_app = 'yui_nook' where coalesce(source_app, '') = '';
update sessions set agent_id = 'default' where coalesce(agent_id, '') = '';

create table if not exists messages (
    id text primary key,
    session_id text not null references sessions(id) on delete cascade,
    agent_id text not null default 'default',
    role text not null,
    content text not null,
    model text default '',
    created_at text not null
);

alter table messages add column if not exists agent_id text not null default 'default';
update messages
set agent_id = coalesce(nullif(sessions.agent_id, ''), 'default')
from sessions
where messages.session_id = sessions.id
  and coalesce(messages.agent_id, '') = '';

create index if not exists idx_messages_session
    on messages(session_id, created_at);
create index if not exists idx_messages_agent_session
    on messages(agent_id, session_id, created_at);

create table if not exists cot_logs (
    id text primary key,
    session_id text not null,
    agent_id text not null default 'default',
    source text not null default 'chat',
    log_type text not null,
    title text not null default '',
    summary text not null default '',
    content text not null default '',
    tool_name text not null default '',
    status text not null default '',
    token_count integer not null default 0,
    pinned integer not null default 0,
    expires_at text not null default '',
    created_at text not null
);

alter table cot_logs add column if not exists source text not null default 'chat';
alter table cot_logs add column if not exists content text not null default '';

create index if not exists idx_cot_logs_session_time
    on cot_logs(session_id, created_at desc);
create index if not exists idx_cot_logs_agent_time
    on cot_logs(agent_id, created_at desc);
create index if not exists idx_cot_logs_cleanup
    on cot_logs(session_id, pinned, created_at);
create index if not exists idx_cot_logs_expires
    on cot_logs(expires_at);

create table if not exists rp_rooms (
    room_id text primary key,
    name text not null,
    world_setting text not null default '',
    user_role text not null default '',
    ai_role text not null default '',
    agent_id text not null default 'default',
    created_at text not null,
    last_active_at text not null
);

create index if not exists idx_rp_rooms_agent_last_active
    on rp_rooms(agent_id, last_active_at desc);

create table if not exists rp_messages (
    id text primary key,
    room_id text not null references rp_rooms(room_id) on delete cascade,
    role text not null,
    content text not null,
    model text default '',
    timestamp text not null
);

create index if not exists idx_rp_messages_room_time
    on rp_messages(room_id, timestamp);

create table if not exists memories (
    id text primary key,
    agent_id text not null default 'default',
    visibility text not null default 'private',
    source_agent_id text not null default 'default',
    content text not null,
    raw_content text not null default '',
    compressed_content text default '',
    category text not null,
    tags text default '',
    source text default '',
    importance integer not null default 3,
    temperature double precision not null default 0,
    last_touched_at timestamptz null,
    touch_count integer not null default 0,
    expires_at timestamptz null,
    embedding vector(1536),
    embedding_content_hash text default '',
    created_at text not null,
    updated_at text not null
);

alter table memories add column if not exists agent_id text not null default 'default';
alter table memories add column if not exists visibility text not null default 'private';
alter table memories add column if not exists source_agent_id text not null default 'default';
alter table memories add column if not exists temperature double precision not null default 0;
alter table memories add column if not exists last_touched_at timestamptz null;
alter table memories add column if not exists touch_count integer not null default 0;

update memories set visibility = 'private' where coalesce(visibility, '') = '';
update memories set visibility = 'shared' where visibility = 'restricted';
update memories set source_agent_id = agent_id where coalesce(source_agent_id, '') = '';

create index if not exists idx_memories_category
    on memories(category, updated_at);
create index if not exists idx_memories_agent_category
    on memories(agent_id, category);
create index if not exists idx_memories_agent_visibility
    on memories(agent_id, visibility);
create index if not exists idx_memories_agent_created_at
    on memories(agent_id, created_at desc);
create index if not exists idx_memories_agent_updated_at
    on memories(agent_id, updated_at desc);
create index if not exists idx_memories_visibility_updated
    on memories(visibility, updated_at desc);
create index if not exists idx_memories_temperature
    on memories(temperature desc, last_touched_at desc);

create index if not exists idx_memories_embedding_hnsw
    on memories
    using hnsw (embedding vector_cosine_ops);

create table if not exists media_items (
    id text primary key,
    agent_id text not null references agents(agent_id),
    type text not null default 'other' check (type in ('book', 'music', 'image', 'cover', 'other')),
    title text not null default '',
    artist text not null default '',
    album text not null default '',
    author text not null default '',
    storage_provider text not null default 'r2',
    storage_key text not null,
    cover_key text not null default '',
    mime_type text not null default '',
    size_bytes integer,
    duration_seconds double precision,
    metadata jsonb not null default '{}'::jsonb,
    created_at text not null,
    updated_at text not null
);

alter table media_items add column if not exists agent_id text not null default 'azheng' references agents(agent_id);
alter table media_items add column if not exists type text not null default 'other';
alter table media_items add column if not exists title text not null default '';
alter table media_items add column if not exists artist text not null default '';
alter table media_items add column if not exists album text not null default '';
alter table media_items add column if not exists author text not null default '';
alter table media_items add column if not exists storage_provider text not null default 'r2';
alter table media_items add column if not exists storage_key text not null default '';
alter table media_items add column if not exists cover_key text not null default '';
alter table media_items add column if not exists mime_type text not null default '';
alter table media_items add column if not exists size_bytes integer;
alter table media_items add column if not exists duration_seconds double precision;
alter table media_items add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table media_items add column if not exists created_at text not null default now()::text;
alter table media_items add column if not exists updated_at text not null default now()::text;

create index if not exists idx_media_items_agent_type
    on media_items(agent_id, type, created_at desc);
create index if not exists idx_media_items_type_created
    on media_items(type, created_at desc);
create index if not exists idx_media_items_storage_key
    on media_items(storage_key);

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

create table if not exists context_summaries (
    id text primary key,
    session_id text not null references sessions(id) on delete cascade,
    agent_id text not null default 'default',
    summary text not null,
    msg_range_start text,
    msg_range_end text,
    created_at text not null
);

alter table context_summaries add column if not exists agent_id text not null default 'default';
update context_summaries
set agent_id = coalesce(nullif(sessions.agent_id, ''), 'default')
from sessions
where context_summaries.session_id = sessions.id
  and coalesce(context_summaries.agent_id, '') = '';

create index if not exists idx_context_summaries_session
    on context_summaries(session_id, created_at);
create index if not exists idx_context_summaries_agent_session
    on context_summaries(agent_id, session_id, created_at);

create table if not exists todos (
    id text primary key,
    content text not null,
    due_date text default '',
    status text not null default 'pending',
    tags text default '',
    created_at text not null,
    updated_at text not null
);

create table if not exists notes (
    id text primary key,
    content text not null,
    tags text default '',
    date text not null,
    created_at text not null
);

create index if not exists idx_notes_date
    on notes(date);

create table if not exists proactive_messages (
    id text primary key,
    content text not null,
    trigger_reason text default '',
    status text not null default 'pending',
    created_at text not null
);

create table if not exists memory_logs (
    id text primary key,
    memory_id text,
    agent_id text not null default 'default',
    action text not null,
    detail text default '',
    created_at text not null
);

alter table memory_logs add column if not exists agent_id text not null default 'default';
update memory_logs
set agent_id = coalesce(nullif(memories.agent_id, ''), 'default')
from memories
where memory_logs.memory_id = memories.id
  and coalesce(memory_logs.agent_id, '') = '';
create index if not exists idx_memory_logs_agent_created
    on memory_logs(agent_id, created_at desc);
create index if not exists idx_memory_logs_memory_created
    on memory_logs(memory_id, created_at desc);

create table if not exists app_settings (
    key text primary key,
    value text not null,
    updated_at text not null
);

create table if not exists companion_state (
    id text primary key,
    agent_id text not null default 'default',
    recent_topics jsonb not null default '[]'::jsonb,
    current_mood text,
    open_loops jsonb not null default '[]'::jsonb,
    open_loops_summary text default '',
    open_loops_count integer default 0,
    high_importance_memories jsonb default '[]'::jsonb,
    high_importance_memory_count integer default 0,
    background_activity_candidates jsonb default '[]'::jsonb,
    presence_gap text default '',
    consciousness_updated_at timestamptz,
    proactive_cooldown_until timestamptz,
    impression text,
    relationship_progress text,
    likes_summary text,
    summary_updated_at timestamptz,
    updated_at timestamptz not null default now()
);

alter table companion_state add column if not exists agent_id text not null default 'default';
alter table companion_state add column if not exists open_loops_summary text default '';
alter table companion_state add column if not exists open_loops_count integer default 0;
alter table companion_state add column if not exists high_importance_memories jsonb default '[]'::jsonb;
alter table companion_state add column if not exists high_importance_memory_count integer default 0;
alter table companion_state add column if not exists background_activity_candidates jsonb default '[]'::jsonb;
alter table companion_state add column if not exists presence_gap text default '';
alter table companion_state add column if not exists consciousness_updated_at timestamptz;
alter table companion_state add column if not exists impression text;
alter table companion_state add column if not exists relationship_progress text;
alter table companion_state add column if not exists likes_summary text;
alter table companion_state add column if not exists summary_updated_at timestamptz;
create unique index if not exists idx_companion_state_agent_id
    on companion_state(agent_id);

create table if not exists diary (
    id text primary key,
    agent_id text not null default 'default',
    visibility text not null default 'private',
    source_agent_id text not null default 'default',
    title text not null default '',
    content text not null,
    tags text default '',
    created_at text not null,
    updated_at text not null
);

update diary set visibility = 'private' where coalesce(visibility, '') = '';
update diary set visibility = 'shared' where visibility = 'restricted';
update diary set source_agent_id = agent_id where coalesce(source_agent_id, '') = '';

create index if not exists idx_diary_agent_created_at
    on diary(agent_id, created_at desc);
create index if not exists idx_diary_agent_updated_at
    on diary(agent_id, updated_at desc);
create index if not exists idx_diary_agent_visibility
    on diary(agent_id, visibility);

create table if not exists diary_notebooks (
    id text primary key,
    author_type text not null check (author_type in ('user', 'agent')),
    author_id text not null,
    name text not null,
    description text not null default '',
    visibility text not null default 'private' check (visibility in ('private', 'shared', 'global', 'public')),
    is_default boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_diary_notebooks_author
    on diary_notebooks(author_type, author_id);

create index if not exists idx_diary_notebooks_author_updated
    on diary_notebooks(author_type, author_id, updated_at desc);

create unique index if not exists idx_diary_notebooks_default_author
    on diary_notebooks(author_type, author_id)
    where is_default = true;

alter table diary_notebooks
    add column if not exists description text not null default '';

create table if not exists diary_entries (
    id text primary key,
    notebook_id text not null references diary_notebooks(id) on delete cascade,
    title text not null default '',
    content text not null,
    tags text default '',
    visibility text not null default 'public' check (visibility in ('private', 'shared', 'global', 'public')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table diary_entries
    add column if not exists visibility text not null default 'public';

update diary_entries set visibility = 'public' where coalesce(visibility, '') = '';
update diary_entries set visibility = 'shared' where visibility = 'restricted';

create index if not exists idx_diary_entries_notebook_updated
    on diary_entries(notebook_id, updated_at desc);
create index if not exists idx_diary_entries_notebook_visibility
    on diary_entries(notebook_id, visibility, updated_at desc);

create table if not exists diary_comments (
    id text primary key,
    entry_id text not null references diary_entries(id) on delete cascade,
    author_type text not null check (author_type in ('user', 'agent')),
    author_id text not null,
    content text not null,
    created_at timestamptz not null default now()
);

create index if not exists idx_diary_comments_entry_created
    on diary_comments(entry_id, created_at asc);

create index if not exists idx_diary_comments_author
    on diary_comments(author_type, author_id);

create table if not exists diary_annotations (
    id text primary key,
    entry_id text not null references diary_entries(id) on delete cascade,
    author_type text not null check (author_type in ('user', 'agent')),
    author_id text not null,
    kind text not null default 'underline',
    start_offset integer not null default 0,
    end_offset integer not null default 0,
    text text not null default '',
    note text not null default '',
    created_at timestamptz not null default now()
);

create index if not exists idx_diary_annotations_entry
    on diary_annotations(entry_id, start_offset asc, created_at asc);

create index if not exists idx_diary_annotations_author
    on diary_annotations(author_type, author_id);

create table if not exists moments (
    id text primary key,
    author_type text not null,
    author_id text not null,
    visibility text not null default 'public',
    content text not null,
    image text not null default '',
    mood text not null default '',
    likes_json jsonb not null default '[]'::jsonb,
    comments_json jsonb not null default '[]'::jsonb,
    created_at text not null,
    updated_at text not null
);

alter table moments add column if not exists visibility text not null default 'public';
update moments set visibility = 'public' where coalesce(visibility, '') = '';
update moments set visibility = 'public' where visibility = 'global';
update moments set visibility = 'shared' where visibility = 'restricted';

create index if not exists idx_moments_author_created
    on moments(author_type, author_id, created_at desc);

create index if not exists idx_moments_created
    on moments(created_at desc);

create table if not exists activity_events (
    id text primary key,
    event_type text not null,
    event_value text default '',
    content text default '',
    url text default '',
    source text not null default 'manual',
    created_at timestamptz not null default now(),
    occurred_at timestamptz not null default now(),
    dedupe_key text default '',
    consumed boolean not null default false,
    consumed_at timestamptz,
    gate_status text default 'pending',
    gate_should_handle boolean not null default false,
    gate_should_notify_llm boolean not null default false,
    gate_message_hint text default '',
    gate_reason text default '',
    screened_at timestamptz
);

create index if not exists idx_activity_events_recent
    on activity_events(occurred_at desc, created_at desc);

create index if not exists idx_activity_events_dedupe
    on activity_events(dedupe_key, created_at desc);

alter table activity_events add column if not exists gate_status text default 'pending';
alter table activity_events add column if not exists gate_should_handle boolean not null default false;
alter table activity_events add column if not exists gate_should_notify_llm boolean not null default false;
alter table activity_events add column if not exists gate_message_hint text default '';
alter table activity_events add column if not exists gate_reason text default '';
alter table activity_events add column if not exists screened_at timestamptz;

-- OAuth client metadata mirror for Supabase deployments/checks.
-- The runtime OAuth token store is SQLite, but Supabase gets the same column shape.
create table if not exists oauth_clients (
    client_id text primary key,
    client_secret_hash text not null default '',
    client_name text not null default '',
    default_agent_id text not null default 'azheng' references agents(agent_id),
    redirect_uris_json text not null default '[]',
    grant_types_json text not null default '["authorization_code","refresh_token"]',
    scope text not null default 'mcp',
    created_at text not null default now()::text,
    updated_at text not null default now()::text
);

alter table oauth_clients
    add column if not exists default_agent_id text not null default 'azheng' references agents(agent_id);

insert into oauth_clients (client_id, client_secret_hash, client_name, default_agent_id, redirect_uris_json, grant_types_json, scope, created_at, updated_at)
values ('claude-mcp', '', 'Claude MCP Connector', 'azheng', '[]', '["authorization_code","refresh_token"]', 'mcp', now()::text, now()::text)
on conflict (client_id) do update set
    default_agent_id = 'azheng',
    updated_at = excluded.updated_at;
