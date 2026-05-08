-- 统一收件箱：extracted_items 表
-- 存储从 Murmur 对话中 tool calling 提取的待办/笔记/想法/日程

create table if not exists extracted_items (
    id             text primary key,
    agent_id       text not null default '',
    session_id     text not null default '',
    message_id     text not null default '',
    type           text not null check (type in ('todo', 'note', 'idea', 'event')),
    title          text not null,
    content        text not null default '',
    source_excerpt text not null default '',
    target_module  text not null default 'inbox' check (target_module in ('inbox', 'folio', 'perle', 'drift')),
    status         text not null default 'accepted' check (status in ('accepted', 'done', 'dismissed', 'pending')),
    metadata       jsonb not null default '{}',
    dedupe_key     text unique,
    created_at     timestamptz not null default now(),
    updated_at     timestamptz not null default now(),
    handled_at     timestamptz
);

create index if not exists idx_extracted_items_status
    on extracted_items(status, created_at desc);
create index if not exists idx_extracted_items_type
    on extracted_items(type, created_at desc);
create index if not exists idx_extracted_items_agent
    on extracted_items(agent_id, created_at desc);
create index if not exists idx_extracted_items_module
    on extracted_items(target_module, status, created_at desc);
create index if not exists idx_extracted_items_dedupe
    on extracted_items(dedupe_key) where dedupe_key is not null;
