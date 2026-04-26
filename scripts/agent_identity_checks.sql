-- Agent identity audit. Read-only checks first; run backfills manually only after review.

-- suspicious rows
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

-- backfill legacy default agent rows to azheng
update sessions set agent_id = 'azheng' where agent_id = 'default';
update memories set agent_id = 'azheng' where agent_id = 'default';
update memories set source_agent_id = 'azheng' where source_agent_id = 'default';
update diary set agent_id = 'azheng' where agent_id = 'default';
update diary set source_agent_id = 'azheng' where source_agent_id = 'default';
update companion_state set agent_id = 'azheng' where agent_id = 'default';
update rp_rooms set agent_id = 'azheng' where agent_id = 'default';
-- update oauth_clients set default_agent_id = 'azheng' where coalesce(default_agent_id, '') in ('', 'default');
