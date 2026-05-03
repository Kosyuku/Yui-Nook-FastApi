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
