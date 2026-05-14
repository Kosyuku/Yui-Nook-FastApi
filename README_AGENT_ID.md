# Yui Nook Agent Identity

`agent_id` is the stable account name for an AI role.

- Store `agent_id` without `@`: `azheng`, `yui`, `ayan`.
- Display it with `@`: `@azheng`, `@yui`, `@ayan`.
- Allowed characters: lowercase letters, digits, `_`, `-`.
- Do not rename `agent_id` after creation. Edit `display_name`, `avatar`, `description`, or `persona` instead.
- `agents` is the source of truth.
- `agent_external_links` binds external roles to internal `agent_id`.
- Claude MCP defaults to `azheng`.
- Writes must not silently create or write to `default`.

## Resolve Priority

`resolve_agent_context` resolves ownership in this order:

1. Explicit `agent_id`, verified in `agents`.
2. `session_id`, using `sessions.agent_id`.
3. `room_id`, using `rp_rooms.agent_id`.
4. `source + external_id`, using `agent_external_links`; unbound roles return `needs_binding`.
5. `oauth_client_id`, using `oauth_clients.default_agent_id`.
6. `DEFAULT_AGENT_ID`, only when no context was supplied and the default agent exists.
7. Otherwise fail.

## API

- `GET /api/agents`
- `POST /api/agents`
- `GET /api/agents/{agent_id}`
- `PATCH /api/agents/{agent_id}`
- `DELETE /api/agents/{agent_id}` soft-deactivates the agent
- `POST /api/agents/resolve`
- `GET /api/agent-external-links`
- `POST /api/agent-external-links`
- `PATCH /api/agent-external-links/{id}`
- `DELETE /api/agent-external-links/{id}`

## Frontend Flow

Create a native role:

```http
POST /api/agents
{
  "agent_id": "azheng",
  "display_name": "阿筝",
  "source": "native"
}
```

Bind an old frontend role:

```http
POST /api/agent-external-links
{
  "source": "old_frontend",
  "external_id": "char_123",
  "external_name": "阿筝",
  "agent_id": "azheng"
}
```

Create a session:

```http
POST /api/sessions
{
  "title": "新对话",
  "agent_id": "azheng"
}
```

Or from an external role:

```http
POST /api/sessions
{
  "source": "old_frontend",
  "external_id": "char_123",
  "external_name": "阿筝"
}
```

## Old Data Checks

Run these manually. They only report suspicious rows.

```sql
select * from sessions where agent_id = 'default';
select s.* from sessions s left join agents a on a.agent_id = s.agent_id where a.agent_id is null;

select m.* from memories m left join agents a on a.agent_id = m.agent_id where a.agent_id is null;
select m.* from memories m left join agents a on a.agent_id = m.source_agent_id where a.agent_id is null;

select d.* from diary d left join agents a on a.agent_id = d.agent_id where a.agent_id is null;
select d.* from diary d left join agents a on a.agent_id = d.source_agent_id where a.agent_id is null;

select n.* from diary_notebooks n left join agents a on a.agent_id = n.author_id where n.author_type = 'agent' and a.agent_id is null;

select c.* from companion_state c left join agents a on a.agent_id = c.agent_id where a.agent_id is null;
select r.* from rp_rooms r left join agents a on a.agent_id = r.agent_id where a.agent_id is null;
select o.* from oauth_clients o left join agents a on a.agent_id = o.default_agent_id where a.agent_id is null;
```

Suggested backfill, after you decide which legacy records belong to which role:

```sql
update sessions set agent_id = 'azheng' where agent_id = 'default';
update memories set agent_id = 'azheng' where agent_id = 'default';
update memories set source_agent_id = 'azheng' where source_agent_id = 'default';
update diary set agent_id = 'azheng' where agent_id = 'default';
update diary set source_agent_id = 'azheng' where source_agent_id = 'default';
update companion_state set agent_id = 'azheng' where agent_id = 'default';
update rp_rooms set agent_id = 'azheng' where agent_id = 'default';
update oauth_clients set default_agent_id = 'azheng' where coalesce(default_agent_id, '') in ('', 'default');
```

## Supabase

Run `backend/scripts/supabase_schema.sql` in Supabase SQL editor. It creates:

- `agents`
- `agent_external_links`
- `oauth_clients.default_agent_id` mirror

The runtime OAuth token store still uses SQLite, but the Supabase schema contains the same default-agent column for checks and consistency.
