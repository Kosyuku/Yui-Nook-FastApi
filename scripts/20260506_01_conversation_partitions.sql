create table if not exists conversation_partitions (
    id text primary key,
    agent_id text not null,
    session_id text not null default '',
    rp_room_id text not null default '',
    mode text not null default 'chat',
    summary_text text not null default '',
    summary_revision text not null default '',
    history_a jsonb not null default '[]'::jsonb,
    history_b jsonb not null default '[]'::jsonb,
    history_a_cycle_id text not null default 'a0',
    history_b_cycle_id text not null default 'b0',
    turn_count int not null default 0,
    rotate_every int not null default 15,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique(agent_id, session_id, rp_room_id, mode)
);

create index if not exists idx_conversation_partitions_lookup
on conversation_partitions(agent_id, session_id, rp_room_id, mode);
