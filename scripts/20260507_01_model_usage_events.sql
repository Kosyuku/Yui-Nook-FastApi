create table if not exists model_usage_events (
    id text primary key,
    agent_id text default '',
    session_id text default '',
    rp_room_id text default '',
    mode text not null default 'chat',
    provider text default '',
    model text default '',
    prompt_builder_version text default '',
    fixed_block_hash text default '',
    block_order jsonb default '[]'::jsonb,
    prompt_tokens int default 0,
    completion_tokens int default 0,
    total_tokens int default 0,
    cached_tokens int default 0,
    cache_hit_ratio float default 0,
    raw_usage jsonb default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists idx_model_usage_events_lookup
on model_usage_events(agent_id, session_id, rp_room_id, mode, created_at desc);
