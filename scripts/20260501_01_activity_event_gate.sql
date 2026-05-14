alter table activity_events add column if not exists gate_status text default 'pending';
alter table activity_events add column if not exists gate_should_handle boolean not null default false;
alter table activity_events add column if not exists gate_should_notify_llm boolean not null default false;
alter table activity_events add column if not exists gate_message_hint text default '';
alter table activity_events add column if not exists gate_reason text default '';
alter table activity_events add column if not exists screened_at timestamptz;
