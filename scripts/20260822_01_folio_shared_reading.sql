-- Folio shared reading annotations. Browser and MCP writes go through the backend.
update media_items
set metadata = jsonb_set(coalesce(metadata, '{}'::jsonb), '{source}', '"folio"'::jsonb, true),
    updated_at = now()::text
where type = 'book' and metadata ->> 'source' = 'folio_migration';

create table if not exists folio_highlights (
    id text primary key,
    book_id text not null references media_items(id) on delete cascade,
    chapter_index integer not null default 0 check (chapter_index >= 0),
    start_offset integer not null check (start_offset >= 0),
    end_offset integer not null check (end_offset > start_offset),
    quote_text text not null check (length(btrim(quote_text)) > 0),
    author_type text not null check (author_type in ('user', 'agent')),
    author_id text not null,
    author_name text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists folio_thoughts (
    id text primary key,
    highlight_id text not null references folio_highlights(id) on delete cascade,
    author_type text not null check (author_type in ('user', 'agent')),
    author_id text not null,
    author_name text not null default '',
    content text not null check (length(btrim(content)) > 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists folio_comments (
    id text primary key,
    thought_id text not null references folio_thoughts(id) on delete cascade,
    author_type text not null check (author_type in ('user', 'agent')),
    author_id text not null,
    author_name text not null default '',
    content text not null check (length(btrim(content)) > 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists folio_reading_positions (
    id text primary key,
    book_id text not null references media_items(id) on delete cascade,
    actor_type text not null check (actor_type in ('user', 'agent')),
    actor_id text not null,
    chapter_index integer not null default 0 check (chapter_index >= 0),
    char_offset integer not null default 0 check (char_offset >= 0),
    updated_at timestamptz not null default now(),
    unique (book_id, actor_type, actor_id)
);

create index if not exists idx_folio_highlights_book_chapter
    on folio_highlights(book_id, chapter_index, start_offset);
create index if not exists idx_folio_thoughts_highlight
    on folio_thoughts(highlight_id, created_at);
create index if not exists idx_folio_comments_thought
    on folio_comments(thought_id, created_at);
create index if not exists idx_folio_positions_book
    on folio_reading_positions(book_id, actor_type, actor_id);

alter table folio_highlights enable row level security;
alter table folio_thoughts enable row level security;
alter table folio_comments enable row level security;
alter table folio_reading_positions enable row level security;

revoke all on table folio_highlights, folio_thoughts, folio_comments, folio_reading_positions from anon, authenticated;
grant select, insert, update, delete on table folio_highlights, folio_thoughts, folio_comments, folio_reading_positions to service_role;
