create extension if not exists vector;

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
    role text not null,
    content text not null,
    model text default '',
    created_at text not null
);

create index if not exists idx_messages_session
    on messages(session_id, created_at);

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
update memories set visibility = 'public' where visibility = 'global';
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

create or replace function match_memories(
    query_embedding vector(1536),
    match_count int default 10,
    filter_category text default null
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
    order by memories.embedding <=> query_embedding,
             memories.temperature desc,
             memories.importance desc
    limit match_count;
$$;

create table if not exists context_summaries (
    id text primary key,
    session_id text not null references sessions(id) on delete cascade,
    summary text not null,
    msg_range_start text,
    msg_range_end text,
    created_at text not null
);

create index if not exists idx_context_summaries_session
    on context_summaries(session_id, created_at);

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
    action text not null,
    detail text default '',
    created_at text not null
);

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
    proactive_cooldown_until timestamptz,
    impression text,
    relationship_progress text,
    likes_summary text,
    summary_updated_at timestamptz,
    updated_at timestamptz not null default now()
);

alter table companion_state add column if not exists agent_id text not null default 'default';
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
update diary set visibility = 'public' where visibility = 'global';
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
    visibility text not null default 'private' check (visibility in ('private', 'shared', 'public')),
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

create table if not exists diary_entries (
    id text primary key,
    notebook_id text not null references diary_notebooks(id) on delete cascade,
    title text not null default '',
    content text not null,
    tags text default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_diary_entries_notebook_updated
    on diary_entries(notebook_id, updated_at desc);

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
