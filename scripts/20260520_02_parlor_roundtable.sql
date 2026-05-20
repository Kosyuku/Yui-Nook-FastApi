-- Parlor: multi-agent roundtable discussions.
create table if not exists parlor_rounds (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text default '',
    status text not null default 'active' check (status in ('active', 'paused', 'ended')),
    created_by text not null default 'user',
    mode text not null default 'free',
    auto_mode text not null default 'manual',
    max_turns_per_session int not null default 20,
    summary jsonb not null default '{}',
    last_viewed_turn_n int not null default 0,
    left_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists parlor_seats (
    id uuid primary key default gen_random_uuid(),
    round_id uuid not null references parlor_rounds(id) on delete cascade,
    agent_id text not null,
    display_name text default '',
    model text default '',
    provider text default '',
    system_prompt text default '',
    color text default '',
    seat_order int not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists parlor_turns (
    id uuid primary key default gen_random_uuid(),
    round_id uuid not null references parlor_rounds(id) on delete cascade,
    seat_id uuid references parlor_seats(id) on delete set null,
    agent_id text default '',
    content text not null default '',
    turn_number int not null default 0,
    is_user boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists idx_parlor_rounds_status
    on parlor_rounds(status, created_at desc);
create index if not exists idx_parlor_seats_round_id
    on parlor_seats(round_id, seat_order);
create index if not exists idx_parlor_turns_round_id
    on parlor_turns(round_id, turn_number);
