-- Curio 奇匣：AI artifacts 收藏表

create table if not exists artifact_items (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text default '',
    type text not null default 'page' check (type in ('html', 'game', 'page', 'widget')),
    content text default '',
    storage_mode text not null default 'inline' check (storage_mode in ('inline', 'r2')),
    cover_url text default '',
    tags text[] default '{}',
    agent_id text default '',
    session_id text default '',
    is_pinned boolean not null default false,
    is_surprise boolean not null default false,
    metadata jsonb not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_artifact_items_agent_id
    on artifact_items(agent_id);
create index if not exists idx_artifact_items_type
    on artifact_items(type);
create index if not exists idx_artifact_items_is_pinned
    on artifact_items(is_pinned);
create index if not exists idx_artifact_items_created_at
    on artifact_items(created_at desc);
