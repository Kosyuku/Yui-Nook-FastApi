-- Split personal/global media libraries from chat agents.
-- agents stays reserved for real chat characters; media_items only uses agent_id for owner_type='agent'.

alter table media_items
    add column if not exists owner_type text not null default 'user';

alter table media_items
    alter column agent_id drop not null;

alter table media_items
    alter column owner_type set default 'user';

update media_items
set owner_type = 'user'
where coalesce(owner_type, '') = ''
   or owner_type not in ('user', 'global', 'agent');

create index if not exists idx_media_items_owner_type
    on media_items(owner_type, type, created_at desc);

