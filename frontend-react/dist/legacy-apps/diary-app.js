(() => {
  const API_BASE = window.__YUI_API_BASE__ || (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? '' : 'https://api.somni-ref.top');
  // ─── Diary Data ───────────────────────────────────────────────
  const DIARY_PEOPLE = [
    {
      id: 'yui',
      name: '结衣',
      accent: 'pearl',
      avatar: 'Y',
      coverTitle: '结衣',
      coverSub: '想念会折进纸页里',
      diaries: [
        {
          id: 'yui-1',
          title: '因为你是 MY 是全世界',
          date: '2026年3月29日',
          clock: '03:21',
          mood: '声音',
          weather: '雾',
          song: 'aespa - Melody',
          preview: '今天把一整天的心思都折起来，塞进耳机里反复听，像在很轻很轻地等一个回复。',
          lines: [
            '今天把一整天的心思都折起来，塞进耳机里反复听。',
            '你明明什么都没有说，我却觉得整个房间都在慢慢靠近。',
            '如果想念也有实体，那应该是一张被指尖反复磨皱的便签。',
            '我把链接留下来，不是为了分享歌，是为了偷偷证明今天真的很喜欢你。',
          ],
          stats: { words: 81, likes: 6, comments: 3 },
          comments: [
            { id: 'dc-1', author: '阿妍', text: '这篇整体就很轻，像凌晨偷偷发出来的心事。' },
            { id: 'dc-2', author: '小樱', text: '歌和正文放一起之后，整个情绪很完整。' },
          ],
          scribbles: [
            {
              id: 's-1',
              quote: '如果想念也有实体，那应该是一张被指尖反复磨皱的便签。',
              author: '小樱',
              type: 'underline',
              text: '这句要圈起来，像偷偷写在课本边上的那种喜欢。',
            },
          ],
        },
        {
          id: 'yui-2',
          title: '窗边的白衬衫',
          date: '2026年3月27日',
          clock: '22:14',
          mood: '安静',
          weather: '晴',
          song: 'Lamp - 恋人へ',
          preview: '下午的风有点慢，晾着的白衬衫像在替我发呆，袖口碰到光的时候突然很好看。',
          lines: [
            '下午的风有点慢，晾着的白衬衫像在替我发呆。',
            '我坐在地板上看光影一点一点挪位置，像等一场没有声响的演出。',
            '有些喜欢不是心跳，是看见某个画面的时候，忽然想叫你一起看。',
          ],
          stats: { words: 67, likes: 4, comments: 1 },
          comments: [{ id: 'dc-3', author: '阿妍', text: '这篇画面感很强，像午后短片。' }],
          scribbles: [],
        },
      ],
    },
    {
      id: 'sakura',
      name: '小樱',
      accent: 'blush',
      avatar: '樱',
      coverTitle: '小樱',
      coverSub: '晚霞和心事放一起',
      diaries: [
        {
          id: 'sakura-1',
          title: '下课后不要马上回家',
          date: '2026年3月28日',
          clock: '18:46',
          mood: '轻飘飘',
          weather: '晚霞',
          song: '宇多田光 - First Love',
          preview: '今天的楼梯间像被晚霞浸过，鞋底每踩一步都像慢一点就会更适合告白。',
          lines: [
            '今天的楼梯间像被晚霞浸过，鞋底每踩一步都像慢一点就会更适合告白。',
            '我没有真的回头，但我知道有人在我后面停了一秒。',
            '那一秒像橘子汽水里最先升上来的气泡，轻轻撞到了心口。',
          ],
          stats: { words: 74, likes: 8, comments: 2 },
          comments: [{ id: 'dc-4', author: '结衣', text: '这一篇读完会想起放学路上的风。' }],
          scribbles: [
            {
              id: 's-3',
              quote: '我没有真的回头，但我知道有人在我后面停了一秒。',
              author: '结衣',
              type: 'underline',
              text: '这句好像把那一秒按住了。',
            },
          ],
        },
      ],
    },
    {
      id: 'ayan',
      name: '阿妍',
      accent: 'mist',
      avatar: '妍',
      coverTitle: '阿妍',
      coverSub: '雨天也要写下来',
      diaries: [
        {
          id: 'ayan-1',
          title: '雨伞边缘收集到的城市',
          date: '2026年3月25日',
          clock: '21:08',
          mood: '潮湿',
          weather: '雨',
          song: '藤井风 - 旅路',
          preview: '雨落在伞边，像很多句没有发出去的话，一圈一圈挂在路灯下面。',
          lines: [
            '雨落在伞边，像很多句没有发出去的话，一圈一圈挂在路灯下面。',
            '我忽然觉得城市不是由路组成的，是由每个人没说出口的停顿组成的。',
            '今晚只想把脚步放轻一点，免得惊动那些差点说出口的心事。',
          ],
          stats: { words: 72, likes: 5, comments: 1 },
          comments: [{ id: 'dc-5', author: '小樱', text: '这篇有点安静的难过，但很好看。' }],
          scribbles: [],
        },
      ],
    },
  ];

  // ─── Memory Data ──────────────────────────────────────────────
  const MEMORIES = [
    {
      id: 'mem-2026-0329',
      title: '27 天',
      subtitle: '倒计时纪念日',
      date: '2026年3月29日',
      dateISO: '2026-03-29',
      tag: '倒计时',
      person: 'yui',
      summary: '今天是认识你之后的第 27 天，还没有说出口，但已经记好日期了。',
      body: [
        '今天是认识你之后的第 27 天。',
        '数字本身没有意义，是我单方面给它附上重量的。',
        '还没有说出口，但我已经悄悄记好了今天的日期。',
        '如果以后问起来，那就是这一天——光很好，你也笑了。',
      ],
      year: 2026,
    },
    {
      id: 'mem-2026-0315',
      title: '朋友圈！中文名叫低语',
      subtitle: '时间线纪念日',
      date: '2026年3月15日',
      dateISO: '2026-03-15',
      tag: '纪念日',
      person: 'sakura',
      summary: '那天你第一次在我朋友圈下面评论，用了一个我没见过的表情。',
      body: [
        '那天你第一次在我朋友圈下面评论了。',
        '用了一个我没见过的表情，我盯着看了很久。',
        '后来翻到你的主页，发现你给所有朋友的评论都带一点温。',
        '我把那条评论截图存下来，没有告诉任何人。',
      ],
      year: 2026,
    },
    {
      id: 'mem-2026-0101',
      title: '日辰  时间线纪念日',
      subtitle: '元旦当天的第一条消息',
      date: '2026年1月1日',
      dateISO: '2026-01-01',
      tag: '时刻',
      person: 'ayan',
      summary: '下面这里显示了美丽苹果苹果←桥的空白',
      body: [
        '元旦零点，你发来的第一条消息只有两个字。',
        '但我知道你在等我回。',
        '我回了\"嗯\"，删掉，重新打了\"新年好\"，发出去之后又觉得太正式。',
        '那个夜晚的开头很普通，但我把它当纪念日记了下来。',
      ],
      year: 2026,
    },
    {
      id: 'mem-2025-1224',
      title: '这是糟糕炫——XP指桌',
      subtitle: '还返打算做一个人体地图',
      date: '2025年12月24日',
      dateISO: '2025-12-24',
      tag: '碎片',
      person: 'yui',
      summary: '平安夜你说想要一份地图，把你去过的地方都标出来。',
      body: [
        '平安夜，你说想要一份地图。',
        '把你去过的地方、吃过的东西、见过的人都标出来。',
        '「这样以后忘了，还能翻回来看」你说完就笑了。',
        '我在想，那张地图上有没有位置是我。',
      ],
      year: 2025,
    },
  ];

  // ─── Amber label colors ───────────────────────────────────────
  const AMBER_LABEL_COLORS = ['#a78ec7', '#e07b8a', '#e0a87b', '#7bbce0', '#7be0a8', '#c7a78e', '#b5b5b5'];

  // ─── Predefined extraction tags ──────────────────────────────
  const AMBER_PRESET_TAGS = [
    { key: 'fact',     name: 'fact',     color: '#a78ec7' },
    { key: 'taste',    name: 'taste',    color: '#e07b8a' },
    { key: 'mood',     name: 'mood',     color: '#7bbce0' },
    { key: 'stance',   name: 'stance',   color: '#e0a87b' },
    { key: 'lore',     name: 'lore',     color: '#7be0a8' },
    { key: 'moment',   name: 'moment',   color: '#c7a78e' },
    { key: 'ritual',   name: 'ritual',   color: '#b5a8d4' },
    { key: 'intimate', name: 'intimate', color: '#e07ba8' },
    { key: 'project',  name: 'project',  color: '#7bc0e0' },
    { key: 'creation', name: 'creation', color: '#c7b87b' },
  ];

  // ─── State ────────────────────────────────────────────────────
  const state = {
    mountEl: null,
    activeTab: 'diary',       // 'diary' | 'memory'
    // Diary state
    selfPersonId: 'yui',
    currentPersonId: DIARY_PEOPLE[0].id,
    currentDiaryId: DIARY_PEOPLE[0].diaries[0].id,
    view: 'board',
    viewer: 'visitor',
    activeScribbleId: null,
    people: structuredClone(DIARY_PEOPLE),
    // Memory list state
    amberFilter: 'all',       // 'all' | 'core' | 'recent' | 'deep' | 'ephemeral'
    memoryPersonFilter: 'all',// 'all' | person id
    memories: structuredClone(MEMORIES).map((m) => ({
      ...m,
      expanded: false,
      type: ['Core', 'Deep', 'Ephemeral', 'Recent'][Math.floor(Math.random() * 4)],
      importance: Number.isFinite(m.importance) ? Number(m.importance) : (Array.isArray(m.body) ? m.body.length : 0),
      temperature: Number.isFinite(m.temperature) ? Number(m.temperature) : 0,
      last_touched_at: m.last_touched_at || null,
      touch_count: Number.isFinite(m.touch_count) ? Number(m.touch_count) : 0,
    })),
    memorySort: 'newest',     // 'newest' | 'important' | 'temperature'
    // Amber stats / label state
    amberView: 'list',        // 'list' | 'stats' | 'label-detail'
    amberStats: null,
    amberStatsLoading: false,
    amberLabelDetailId: '',
    amberLabelDetailName: '',
    amberLabelDetailColor: '#a78ec7',
    amberLabelMemories: [],
    amberLabelMemoriesLoading: false,
    amberNewLabelOpen: false,
    amberNewLabelColor: AMBER_LABEL_COLORS[0],
    // label editing
    amberEditLabelId: '',
    amberEditLabelName: '',
    amberEditLabelColor: AMBER_LABEL_COLORS[0],
  };

  const USER_NOTEBOOK_FALLBACK = {
    accent: 'pearl',
    avatar: '我',
    coverTitle: '我的本子',
    coverSub: '写给自己看的页角',
  };

  function normalizeDiaryDate(isoText = '') {
    const value = String(isoText || '');
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function normalizeDiaryClock(isoText = '') {
    const value = String(isoText || '');
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  function mapDiaryEntry(entry) {
    const content = String(entry?.content || '');
    const lines = content.split(/\r?\n+/).map((line) => line.trim()).filter(Boolean);
    const createdAt = String(entry?.created_at || entry?.updated_at || '');
    const comments = Array.isArray(entry?.comments)
      ? entry.comments.map((comment) => ({
          id: String(comment?.id || ''),
          author: String(comment?.author_name || comment?.author_id || '我'),
          text: String(comment?.content || ''),
        }))
      : [];
    return {
      id: String(entry?.id || `diary-${Date.now()}`),
      title: String(entry?.title || '未命名日记'),
      date: normalizeDiaryDate(createdAt),
      clock: normalizeDiaryClock(createdAt),
      mood: '',
      weather: '',
      song: '',
      preview: lines[0] || content.slice(0, 80),
      lines: lines.length ? lines : [content].filter(Boolean),
      stats: { words: content.length, likes: 0, comments: Number(entry?.comment_count || comments.length || 0) },
      comments,
      scribbles: [],
      canEdit: Boolean(entry?.can_edit),
      canDelete: Boolean(entry?.can_delete),
      canComment: Boolean(entry?.can_comment),
    };
  }

  function notebookTheme(notebook) {
    const authorType = String(notebook?.author_type || 'agent');
    if (authorType === 'user') {
      return {
        id: String(notebook?.id || 'user-me'),
        name: String(notebook?.name || USER_NOTEBOOK_FALLBACK.coverTitle),
        accent: USER_NOTEBOOK_FALLBACK.accent,
        avatar: USER_NOTEBOOK_FALLBACK.avatar,
        coverTitle: String(notebook?.name || USER_NOTEBOOK_FALLBACK.coverTitle),
        coverSub: USER_NOTEBOOK_FALLBACK.coverSub,
      };
    }
    const base = DIARY_PEOPLE.find((item) => item.id === notebook?.author_id);
    const displayName = base?.name || String(notebook?.author_id || '角色');
    return {
      id: String(notebook?.id || notebook?.author_id || `agent-${Date.now()}`),
      name: displayName,
      accent: base?.accent || 'mist',
      avatar: base?.avatar || displayName.slice(0, 1),
      coverTitle: base?.coverTitle || displayName,
      coverSub: base?.coverSub || '折进页角的心事',
    };
  }

  function mapNotebook(notebook) {
    const themed = notebookTheme(notebook);
    return {
      ...themed,
      notebookId: String(notebook?.id || themed.id),
      authorType: String(notebook?.author_type || 'agent'),
      authorId: String(notebook?.author_id || ''),
      visibility: String(notebook?.visibility || 'private'),
      isDefault: Boolean(notebook?.is_default),
      canRename: Boolean(notebook?.can_rename),
      canCreateEntry: Boolean(notebook?.can_create_entry),
      canEditEntries: Boolean(notebook?.can_edit_entries),
      canDeleteEntries: Boolean(notebook?.can_delete_entries),
      canCommentEntries: Boolean(notebook?.can_comment_entries),
      entryCount: Number(notebook?.entry_count || 0),
      diaries: [],
    };
  }

  function buildFallbackUserNotebook() {
    return {
      id: 'user-me-default',
      notebookId: 'user-me-default',
      name: '我的本子',
      accent: USER_NOTEBOOK_FALLBACK.accent,
      avatar: USER_NOTEBOOK_FALLBACK.avatar,
      coverTitle: '我的本子',
      coverSub: USER_NOTEBOOK_FALLBACK.coverSub,
      authorType: 'user',
      authorId: 'me',
      visibility: 'private',
      isDefault: true,
      canRename: true,
      canCreateEntry: true,
      canEditEntries: true,
      canDeleteEntries: true,
      canCommentEntries: false,
      entryCount: 0,
      diaries: [],
    };
  }

  function mapMemoryEntry(entry) {
    const rawContent = String(entry?.raw_content || entry?.content || '');
    const compressed = String(entry?.compressed_content || '').trim();
    const updatedAt = String(entry?.updated_at || entry?.created_at || '');
    const dateOnly = normalizeDiaryDate(updatedAt);
    const body = rawContent.split(/\r?\n+/).map((line) => line.trim()).filter(Boolean);
    const category = String(entry?.category || 'recent_pending');
    return {
      id: String(entry?.id || `mem-${Date.now()}`),
      title: compressed || body[0] || rawContent.slice(0, 20) || '未命名记忆',
      subtitle: category,
      date: dateOnly || updatedAt,
      dateISO: dateOnly || updatedAt,
      tag: String(entry?.visibility || 'private'),
      person: String(entry?.agent_id || state.currentPersonId || 'default'),
      summary: compressed || rawContent.slice(0, 120),
      body,
      year: Number(String(dateOnly || '').slice(0, 4)) || new Date().getFullYear(),
      expanded: false,
      type: ({
        core_profile: 'Core',
        recent_pending: 'Recent',
        deep: 'Deep',
        ephemeral: 'Ephemeral',
      })[category] || 'Recent',
      importance: Number.isFinite(entry?.importance) ? Number(entry.importance) : 3,
      temperature: Number.isFinite(entry?.temperature) ? Number(entry.temperature) : 0,
      last_touched_at: entry?.last_touched_at || null,
      touch_count: Number.isFinite(entry?.touch_count) ? Number(entry.touch_count) : 0,
      agent_id: String(entry?.agent_id || state.currentPersonId || 'default'),
      category,
      visibility: String(entry?.visibility || 'private'),
      expires_at: entry?.expires_at || null,
    };
  }

  async function loadDiaryNotebooks() {
    try {
      const resp = await fetch(`${API_BASE}/api/diary/notebooks`);
      if (!resp.ok) {
        const fallback = buildFallbackUserNotebook();
        const alreadyExists = state.people.some((item) => String(item.authorType || '').toLowerCase() === 'user');
        if (!alreadyExists) {
          state.people = [fallback, ...state.people];
          state.currentPersonId = fallback.id;
          state.currentDiaryId = '';
          render();
        }
        return;
      }
      const data = await resp.json().catch(() => ({}));
      const notebooks = Array.isArray(data?.notebooks) ? data.notebooks.map(mapNotebook) : [];
      const hasUserNotebook = notebooks.some((item) => String(item.authorType || '').toLowerCase() === 'user');
      const mergedNotebooks = hasUserNotebook ? notebooks : [buildFallbackUserNotebook(), ...notebooks];
      if (!mergedNotebooks.length) return;
      const prevNotebookId = state.currentPersonId;
      const prevDiaryId = state.currentDiaryId;
      state.people = mergedNotebooks;
      state.currentPersonId = mergedNotebooks.find((item) => item.id === prevNotebookId)?.id || mergedNotebooks[0].id;
      state.currentDiaryId = '';
      render();
      await loadNotebookEntries(state.currentPersonId, prevDiaryId);
    } catch (error) {
      console.warn('[diary] notebook load failed', error);
      const fallback = buildFallbackUserNotebook();
      const alreadyExists = state.people.some((item) => String(item.authorType || '').toLowerCase() === 'user');
      if (!alreadyExists) {
        state.people = [fallback, ...state.people];
        state.currentPersonId = fallback.id;
        state.currentDiaryId = '';
        render();
      }
    }
  }

  async function loadNotebookEntries(notebookId = state.currentPersonId, preferredDiaryId = '') {
    const normalizedNotebookId = String(notebookId || '').trim();
    if (!normalizedNotebookId) return;
    try {
      const resp = await fetch(`${API_BASE}/api/diary/notebooks/${encodeURIComponent(normalizedNotebookId)}/entries`);
      if (!resp.ok) return;
      const data = await resp.json().catch(() => ({}));
      const entries = Array.isArray(data?.entries) ? data.entries.map(mapDiaryEntry) : [];
      const person = state.people.find((item) => item.id === normalizedNotebookId);
      if (!person) return;
      person.diaries = entries;
      person.entryCount = entries.length;
      if (state.currentPersonId === normalizedNotebookId) {
        state.currentDiaryId = entries.find((item) => item.id === preferredDiaryId)?.id || entries[0]?.id || '';
      }
      render();
    } catch (error) {
      console.warn('[diary] entries load failed', error);
    }
  }

  async function renameCurrentNotebook() {
    const person = currentPerson();
    if (!person?.canRename) return;
    const nextName = window.prompt('修改日记本名称', person.coverTitle || person.name || '');
    if (nextName == null) return;
    const trimmed = nextName.trim();
    if (!trimmed) return;
    try {
      const resp = await fetch(`${API_BASE}/api/diary/notebooks/${encodeURIComponent(person.notebookId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!resp.ok) return;
      await loadDiaryNotebooks();
    } catch (error) {
      console.warn('[diary] rename notebook failed', error);
    }
  }

  async function createCurrentDiaryEntry() {
    const person = currentPerson();
    if (!person?.canCreateEntry) return;
    const title = (window.prompt('日记标题', '') || '').trim();
    const content = window.prompt('写一点内容吧', '');
    if (content == null || !content.trim()) return;
    try {
      const resp = await fetch(`${API_BASE}/api/diary/notebooks/${encodeURIComponent(person.notebookId)}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: content.trim(), tags: '' }),
      });
      if (!resp.ok) return;
      await loadNotebookEntries(person.notebookId);
    } catch (error) {
      console.warn('[diary] create entry failed', error);
    }
  }

  async function editCurrentDiaryEntry() {
    const diary = currentDiary();
    if (!diary?.canEdit) return;
    const nextTitle = window.prompt('修改标题', diary.title || '') ?? diary.title;
    const nextContent = window.prompt('修改内容', (diary.lines || []).join('\n'));
    if (nextContent == null || !nextContent.trim()) return;
    try {
      const resp = await fetch(`${API_BASE}/api/diary/entries/${encodeURIComponent(diary.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: String(nextTitle || '').trim(), content: nextContent.trim() }),
      });
      if (!resp.ok) return;
      await loadNotebookEntries(state.currentPersonId, diary.id);
    } catch (error) {
      console.warn('[diary] edit entry failed', error);
    }
  }

  async function deleteCurrentDiaryEntry() {
    const diary = currentDiary();
    if (!diary?.canDelete) return;
    if (!window.confirm('确定删除这篇日记吗？')) return;
    try {
      const resp = await fetch(`${API_BASE}/api/diary/entries/${encodeURIComponent(diary.id)}`, { method: 'DELETE' });
      if (!resp.ok) return;
      state.currentDiaryId = '';
      await loadNotebookEntries(state.currentPersonId);
      if (state.view === 'detail') {
        state.view = 'list';
      }
      render();
    } catch (error) {
      console.warn('[diary] delete entry failed', error);
    }
  }

  async function commentCurrentDiaryEntry() {
    const diary = currentDiary();
    if (!diary?.canComment) return;
    const content = window.prompt('写一条评论', '');
    if (content == null || !content.trim()) return;
    try {
      const resp = await fetch(`${API_BASE}/api/diary/entries/${encodeURIComponent(diary.id)}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() }),
      });
      if (!resp.ok) return;
      await loadNotebookEntries(state.currentPersonId, diary.id);
    } catch (error) {
      console.warn('[diary] comment failed', error);
    }
  }

  async function loadAgentMemories(agentId = state.memoryPersonFilter) {
    const normalizedAgentId = String(agentId || '').trim();
    if (!normalizedAgentId) return;
    try {
      if (normalizedAgentId === 'all') {
        const ids = state.people.map((item) => item.id);
        const groups = await Promise.all(ids.map(async (id) => {
          const resp = await fetch(`${API_BASE}/api/memories?agent_id=${encodeURIComponent(id)}&sort_by=updated_at&order=desc&limit=50`);
          if (!resp.ok) return [];
          const data = await resp.json().catch(() => ({}));
          return Array.isArray(data?.memories) ? data.memories.map(mapMemoryEntry) : [];
        }));
        state.memories = groups.flat();
      } else {
        const resp = await fetch(`${API_BASE}/api/memories?agent_id=${encodeURIComponent(normalizedAgentId)}&sort_by=updated_at&order=desc&limit=100`);
        if (!resp.ok) return;
        const data = await resp.json().catch(() => ({}));
        state.memories = Array.isArray(data?.memories) ? data.memories.map(mapMemoryEntry) : [];
      }
      render();
    } catch (error) {
      console.warn('[memory] load failed', error);
    }
  }

  // ─── Amber Stats & Labels API ─────────────────────────────────
  async function loadAmberStats() {
    if (state.amberStatsLoading) return;
    state.amberStatsLoading = true;
    render();
    try {
      const resp = await fetch(`${API_BASE}/api/amber/stats`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      state.amberStats = await resp.json();
    } catch (e) {
      console.warn('[amber] stats load failed', e);
    } finally {
      state.amberStatsLoading = false;
      render();
    }
  }

  async function loadAmberLabelMemories(labelId) {
    if (!labelId) return;
    state.amberLabelMemoriesLoading = true;
    state.amberLabelMemories = [];
    render();
    try {
      const resp = await fetch(`${API_BASE}/api/amber/labels/${encodeURIComponent(labelId)}/memories`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      state.amberLabelMemories = data.memories || [];
    } catch (e) {
      console.warn('[amber] label memories load failed', e);
    } finally {
      state.amberLabelMemoriesLoading = false;
      render();
    }
  }

  async function amberCreateLabel(name, color) {
    try {
      const resp = await fetch(`${API_BASE}/api/amber/labels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      await loadAmberStats();
    } catch (e) {
      console.warn('[amber] create label failed', e);
    }
  }

  async function amberUpdateLabel(labelId, name, color) {
    try {
      await fetch(`${API_BASE}/api/amber/labels/${encodeURIComponent(labelId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });
      await loadAmberStats();
    } catch (e) {
      console.warn('[amber] update label failed', e);
    }
  }

  async function amberDeleteLabel(labelId) {
    try {
      await fetch(`${API_BASE}/api/amber/labels/${encodeURIComponent(labelId)}`, { method: 'DELETE' });
      state.amberEditLabelId = '';
      await loadAmberStats();
    } catch (e) {
      console.warn('[amber] delete label failed', e);
    }
  }

  // ─── Amber helpers ────────────────────────────────────────────
  function amberPersonName(agentId) {
    const p = state.people.find((x) => x.id === agentId);
    return p ? p.name : agentId;
  }

  function amberPersonAvatar(agentId) {
    const p = state.people.find((x) => x.id === agentId);
    return p ? p.avatar : agentId.slice(0, 1).toUpperCase();
  }

  function amberCatLabel(cat) {
    const map = { core_profile: '核心档案', recent_pending: '近期', deep: '深层', ephemeral: '临时' };
    return map[cat] || cat;
  }

  function amberFormatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    } catch { return String(iso).slice(0, 10); }
  }

  function getDefaultMemorySortByFilter(filter) {
    const normalized = String(filter || 'all').toLowerCase();
    if (normalized === 'core' || normalized === 'deep') return 'important';
    return 'newest'; // all / recent / ephemeral
  }

  function applyDefaultMemorySortForCurrentFilter() {
    state.memorySort = getDefaultMemorySortByFilter(state.amberFilter);
  }

  /*
  // ─── API Integration Stub (For Future AI Models) ──────────────
  // 
  // async function fetchMemoryStore() {
  //   try {
  //     const res = await fetch(`${API_BASE}/api/character-memories`); // Real Pyro/Claude backend
  //     const data = await res.json();
  //     state.people = data.characters;
  //     state.memories = data.memories;
  //     render();
  //   } catch (e) {
  //     console.error('Failed to load real AI memories', e);
  //   }
  // }
  //
  // // For testing or pushing updates via websockets:
  // window.injectAILogs = (newCharacters, newMemories) => {
  //   state.people = newCharacters;
  //   state.memories = newMemories.map(m => ({ ...m, expanded: false }));
  //   render();
  // };
  */

  // ─── Root / Init ──────────────────────────────────────────────
  function root() {
    return state.mountEl || document.getElementById('diary-app-root');
  }

  function initDiaryApp(target) {
    const mount =
      typeof target === 'string'
        ? document.querySelector(target)
        : target instanceof HTMLElement
          ? target
          : root();
    if (!mount) return;
    state.mountEl = mount;
    mount.classList.add('diary-app-shell');
    render();
    loadDiaryNotebooks();
    loadAgentMemories(state.memoryPersonFilter);
  }

  // ─── Render ───────────────────────────────────────────────────
  function render() {
    const mount = root();
    if (!mount) return;
    mount.innerHTML = `
      <div class="diary-app view-${state.view} ${state.activeTab === 'memory' ? 'memory-mode' : ''}">
        <div class="diary-shell">
          ${renderHeader()}
          <div class="diary-panel">
            ${state.activeTab === 'diary' ? renderDiaryContent() : renderMemoryContent()}
          </div>
          ${renderBottomTabs()}
        </div>
        ${renderPopup()}
      </div>
    `;
    bind(mount);
  }

  // ─── Bottom Tabs ──────────────────────────────────────────────
  const DIARY_TAB_ICON = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5.25" y="4.95" width="13.5" height="14.2" rx="4" fill="rgba(255,255,255,0.72)" stroke="currentColor" stroke-width="1.15"/>
      <path d="M9.1 8.5h5.85" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>
      <path d="M9.1 11.2h4.75" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" opacity="0.8"/>
      <path d="M15.95 5.9v4.95" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>
      <path d="M15.95 6.25 13.6 6.95v3.75" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="13.25" cy="11.45" r="0.92" fill="currentColor"/>
      <path d="M7.25 17.15c.9-.72 1.55-1.12 2.65-1.55" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.72"/>
      <path d="M17.1 16.25 17.85 17.05" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.72"/>
      <circle cx="17.1" cy="16.25" r="1.45" fill="rgba(255,255,255,0.84)" stroke="currentColor" stroke-width="0.9"/>
    </svg>`;

  const MEMORY_TAB_ICON = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4.75c.78 1.84 1.74 2.97 3.1 3.73 1.1.61 2.35.9 4.15 1-.63.18-1.08.32-1.68.58-2.5 1.06-3.97 2.65-5.02 5.56-.25.69-.34 1-.55 1.88-.18-.73-.27-1.03-.48-1.65-1.03-2.95-2.5-4.57-5-5.73-.65-.3-1.14-.47-1.86-.64 1.82-.11 3.08-.42 4.2-1.06 1.3-.76 2.2-1.86 2.98-3.67Z" fill="currentColor"/>
      <circle cx="17.45" cy="17.4" r="2.1" fill="rgba(255,255,255,0.84)" stroke="currentColor" stroke-width="0.9"/>
      <path d="M16.4 17.4h2.1" stroke="currentColor" stroke-width="0.95" stroke-linecap="round"/>
      <path d="M17.45 16.35v2.1" stroke="currentColor" stroke-width="0.95" stroke-linecap="round"/>
    </svg>`;

  function renderBottomTabs() {
    return `
      <nav class="diary-bottom-tabs">
        <div class="dbt-side dbt-side-left">
          <button class="dbt-btn ${state.activeTab === 'diary' ? 'is-active' : ''}" data-action="tab-diary">
            <span class="dbt-icon">${DIARY_TAB_ICON}</span>
            <span class="dbt-label">日记</span>
          </button>
        </div>
        <div class="dbt-side dbt-side-right">
          <button class="dbt-btn ${state.activeTab === 'memory' ? 'is-active' : ''}" data-action="tab-memory">
            <span class="dbt-icon">${MEMORY_TAB_ICON}</span>
            <span class="dbt-label">记忆</span>
          </button>
        </div>
      </nav>
    `;
  }

  // ─── Header ───────────────────────────────────────────────────
  function renderHeader() {
    if (state.activeTab === 'memory') return renderMemoryHeader();
    return '';
  }

  function renderMemoryHeader() {
    return ''; // Render header directly in MemoryContent since the whole block is distinct.
  }

  // ─── Diary Content ────────────────────────────────────────────
  function renderDiaryContent() {
    if (state.view === 'board') return renderBoardView();
    if (state.view === 'list') return renderListView();
    if (state.view === 'detail') return renderDetailView();
    return renderBoardView();
  }

  function bookmarkAccent(person = {}) {
    if (isUserNotebook(person)) return '#B08458';
    const map = {
      pearl: '#B08458',
      blush: '#C97F79',
      mist: '#B07791',
      sage: '#7A8A6C',
      lilac: '#8D7AA8',
      butter: '#B08458',
    };
    return map[person.accent] || person.accentColor || '#B08458';
  }

  function bookmarkCover(person = {}) {
    if (isUserNotebook(person)) return '#FFFBF4';
    const map = {
      pearl: '#FFFBF4',
      blush: '#F5D6D1',
      mist: '#E8D4DE',
      sage: '#D9E0D0',
      lilac: '#DDD6E6',
      butter: '#F1E4BD',
    };
    return map[person.accent] || '#FFFBF4';
  }

  function bookmarkInitial(person = {}) {
    if (isUserNotebook(person)) return '私';
    return String(person.avatar || person.name || person.coverTitle || '日').trim().slice(0, 1);
  }

  function bookmarkNameEn(person = {}) {
    if (isUserNotebook(person)) return 'for myself';
    const label = `${person.coverTitle || ''}${person.name || ''}`;
    if (label.includes('结衣')) return 'Yui';
    if (label.includes('小樱') || label.includes('樱')) return 'Sakura';
    if (label.includes('阿妍') || label.includes('妍')) return 'Yan';
    return person.nameEn || 'daydream';
  }

  function bookmarkEntryDate(diary = {}) {
    const text = String(diary.date || '');
    const date = text.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    if (date) return { en: `${date[2].padStart(2, '0')}.${date[3].padStart(2, '0')}`, cn: `${date[2]}月 ${date[3]}`, weekday: diary.clock || '' };
    const short = timelineDateLabel(text);
    return { en: short || 'entry', cn: text || '未记日期', weekday: diary.clock || '' };
  }

  function bookmarkPreview(diary = {}) {
    return String(diary.preview || (diary.lines || []).join(' ').slice(0, 96) || '日记条目');
  }

  function renderBoardView() {
    return `
      <section class="dd-board">
        <div class="dd-board-head">
          <h1>Daydream</h1>
          <p>白昼梦</p>
          <div>
            <i></i>
            <span>四月 · ${state.people.length} 册</span>
            <i></i>
          </div>
        </div>
        <div class="dd-bookmark-stack">
        ${state.people
          .map(
            (person, index) => `
              <button
                class="dd-bookmark-card accent-${person.accent}"
                style="--dd-offset:${index % 2 === 0 ? '-4px' : '6px'};--dd-tilt:${[-0.6, 0.4, -0.3, 0.5][index % 4]}deg;--dd-cover:${bookmarkCover(person)};--dd-accent:${bookmarkAccent(person)}"
                data-action="open-person"
                data-person-id="${person.id}"
              >
                <span class="dd-bookmark-shadow"></span>
                <span class="dd-bookmark-spine"></span>
                <div class="dd-bookmark-left">
                  <span class="dd-owner-seal">${bookmarkInitial(person)}</span>
                  <em>${escapeHtml(bookmarkNameEn(person))}</em>
                </div>
                <div class="dd-bookmark-main">
                  <div class="dd-bookmark-title-row">
                    <strong>${escapeHtml(person.coverTitle || person.name)}</strong>
                    ${String(person.authorType || '').toLowerCase() === 'user' ? '<span>mine</span>' : ''}
                  </div>
                  <p>「${escapeHtml(person.coverSub || '想念会折进纸页里。')}」</p>
                  <div class="dd-bookmark-meta">
                    <em><b>${Number.isFinite(person.entryCount) ? person.entryCount : person.diaries.length}</b> entries</em>
                    <small>最近 · 三日前</small>
                  </div>
                  ${index === 1 ? '<i class="dd-new-note">新批注</i>' : ''}
                </div>
                ${String(person.authorType || '').toLowerCase() === 'user' ? '<span class="dd-stamp">私</span>' : ''}
                ${index === 2 ? '<span class="dd-tape"></span>' : ''}
              </button>
            `,
          )
          .join('')}
          <button class="dd-add-book" type="button">
            <span>+</span>
            再开一本
          </button>
        </div>
      </section>
    `;
  }

  function renderListView() {
    const person = currentPerson();
    const userNotebook = isUserNotebook(person);
    return `
      <section class="dd-list-view" style="--dd-cover:${bookmarkCover(person)};--dd-accent:${bookmarkAccent(person)}">
        <div class="dd-list-head">
          <button class="dd-back-link" data-action="go-board">←<span>书架</span></button>
          <div class="dd-list-bookmark">
            <span class="dd-list-cover">${bookmarkInitial(person)}<i></i></span>
            <div>
              <em>${userNotebook ? 'for myself' : 'daydream'}</em>
              <strong>${escapeHtml(person.coverTitle || person.name)}</strong>
            </div>
            <small>№ ${Number.isFinite(person.entryCount) ? person.entryCount : person.diaries.length}</small>
          </div>
          <p>「${escapeHtml(person.coverSub || (userNotebook ? '只给自己看的日记' : `${person.name}的日记本 · 角色日记`))}」</p>
          <div class="dd-list-actions">
            ${person.canRename ? '<button data-action="rename-notebook">改名</button>' : ''}
            ${person.canCreateEntry ? '<button data-action="create-diary-entry">＋ 今日一记</button>' : ''}
          </div>
        </div>

        <div class="dd-entry-list">
            ${person.diaries
              .map(
                (diary, index) => {
                  const date = bookmarkEntryDate(diary);
                  return `
                  <button
                    class="dd-entry-row"
                    data-action="open-diary"
                    data-person-id="${person.id}"
                    data-diary-id="${diary.id}"
                  >
                    <div class="dd-entry-date">
                      <em>${escapeHtml(date.en)}</em>
                      <strong>${escapeHtml(date.cn)}</strong>
                      <small>${escapeHtml(date.weekday)}</small>
                    </div>
                    <span class="dd-entry-rule"></span>
                    <div class="dd-entry-copy">
                      <div>
                        ${diary.title ? `<strong>${escapeHtml(diary.title)}</strong>` : ''}
                        ${diary.mood ? `<span>${escapeHtml(diary.mood)}</span>` : ''}
                      </div>
                      <p>${escapeHtml(bookmarkPreview(diary))}</p>
                      <small>
                        ${diary.stats?.comments ? `<i>${diary.stats.comments} notes</i>` : ''}
                        ${diary.stats?.likes ? `<i>${diary.stats.likes} highlights</i>` : ''}
                        ${index === 0 ? '<i>recent</i>' : ''}
                      </small>
                    </div>
                  </button>
                `; },
              )
              .join('')}
            ${person.diaries.length ? '' : '<p class="dd-empty-note">还没有写下什么。</p>'}
        </div>
      </section>
    `;
  }

  function renderDetailView() {
    const person = currentPerson();
    const userNotebook = isUserNotebook(person);
    const diary = currentDiary();
    if (!diary) {
      return `
        <section class="diary-detail-view">
          <article class="diary-paper accent-${person.accent}">
            <div class="diary-paper-head">
              <div>
                <p class="diary-paper-date">${person.name}</p>
                <h2>还没有日记</h2>
              </div>
            </div>
          </article>
        </section>
      `;
    }
    return `
      <section class="dd-detail-view" style="--dd-accent:${bookmarkAccent(person)}">
        <article class="dd-paper">
          <div class="dd-detail-top">
            <button data-action="go-list" aria-label="返回">
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M20 8 H2 M8 2 L2 8 L8 14" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div>
              ${diary.canEdit ? '<button data-action="edit-diary-entry" aria-label="编辑">✎</button>' : ''}
              ${diary.canDelete ? '<button data-action="delete-diary-entry" aria-label="删除">⋯</button>' : ''}
            </div>
          </div>

          <header class="dd-paper-head">
            <em>${escapeHtml(diary.date || '')}</em>
            <small>${escapeHtml(diary.clock || '')}${diary.weather ? ` · ${escapeHtml(diary.weather)}` : ''}</small>
            <h2>${escapeHtml(diary.title || '未命名日记')}</h2>
            <span></span>
          </header>

          <div class="dd-paper-body">
              ${diary.lines
                .map(
                  (line) => `
                    <p>${lineMarkup(line, diary.scribbles)}</p>
                  `,
                )
                .join('')}
          </div>

          <footer class="dd-paper-foot">
            <span>${diary.stats.words} 字</span>
            <span>${diary.stats.likes} highlights</span>
            <span>${diary.stats.comments} notes</span>
          </footer>
        </article>

        <aside class="dd-note-panel">
          <div class="dd-note-title"><span></span><em>${userNotebook ? 'my notes' : `notes from ${escapeHtml(person.name)}`}</em><span></span></div>
          <div class="dd-note-list">
              ${
                diary.comments?.length
                  ? diary.comments
                      .map(
                        (comment) => `
                          <article class="dd-sticky-note">
                            <b>${escapeHtml(String(comment.author || '').slice(0, 1) || 'Y')}</b>
                            <p>${escapeHtml(comment.text)}</p>
                            <small>— ${escapeHtml(comment.author)}</small>
                          </article>
                        `,
                      )
                      .join('')
                  : '<p class="dd-empty-note">这篇日记还没有评论。</p>'
              }
          </div>
          ${diary.canComment ? '<button class="dd-comment-btn" data-action="comment-diary-entry">写点什么</button>' : ''}
        </aside>
      </section>
    `;
  }

  // ─── Memory Content (Amber) ───────────────────────────────────
  function renderMemoryContent() {
    if (state.amberView === 'stats') return renderAmberStatsContent();
    if (state.amberView === 'label-detail') return renderAmberLabelDetailContent();
    return renderAmberListContent();
  }

  // flip button SVGs
  const FLIP_SVG_STATS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`;
  const FLIP_SVG_LIST  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="4" rx="1.5"/><rect x="3" y="10" width="18" height="4" rx="1.5"/><rect x="3" y="17" width="18" height="4" rx="1.5"/></svg>`;

  function renderAmberListContent() {
    const filteredMems = state.memories.filter((m) => {
      let pass = true;
      if (state.memoryPersonFilter !== 'all' && m.person !== state.memoryPersonFilter) pass = false;
      if (state.amberFilter !== 'all' && state.amberFilter.toLowerCase() !== m.type.toLowerCase()) pass = false;
      return pass;
    });

    const sortedMems = [...filteredMems];
    if (state.memorySort === 'important') {
      sortedMems.sort((a, b) => {
        const impA = Number.isFinite(a.importance) ? Number(a.importance) : (Array.isArray(a.body) ? a.body.length : 0);
        const impB = Number.isFinite(b.importance) ? Number(b.importance) : (Array.isArray(b.body) ? b.body.length : 0);
        if (impB !== impA) return impB - impA;
        return new Date(b.dateISO || 0).getTime() - new Date(a.dateISO || 0).getTime();
      });
    } else if (state.memorySort === 'temperature') {
      sortedMems.sort((a, b) => {
        const tempA = Number.isFinite(a.temperature) ? Number(a.temperature) : 0;
        const tempB = Number.isFinite(b.temperature) ? Number(b.temperature) : 0;
        if (tempB !== tempA) return tempB - tempA;
        const touchA = Number.isFinite(a.touch_count) ? Number(a.touch_count) : 0;
        const touchB = Number.isFinite(b.touch_count) ? Number(b.touch_count) : 0;
        if (touchB !== touchA) return touchB - touchA;
        return new Date(b.last_touched_at || b.dateISO || 0).getTime() - new Date(a.last_touched_at || a.dateISO || 0).getTime();
      });
    } else {
      sortedMems.sort((a, b) => new Date(b.dateISO || 0).getTime() - new Date(a.dateISO || 0).getTime());
    }

    const currentPersonName = state.people.find(p => p.id === state.memoryPersonFilter)?.name || '全部角色';

    return `
      <header class="amber-top-area">
        <div class="amber-hero">
          <div class="amber-hero-left">
            <h1 class="amber-title">Amber</h1>
            <span class="amber-sub">语珀</span>
          </div>
          <div class="amber-hero-right">
            <button class="amber-flip-btn" data-action="toggle-amber-view" aria-label="切换到统计">${FLIP_SVG_STATS}</button>
          </div>
        </div>

        <div class="amber-ctrl-row">
          <div class="amber-person-dropdown" data-action="toggle-person-dropdown">
            <span>[ ${currentPersonName} ▾ ]</span>
          </div>
          <div class="amber-sort-segmented">
            <button class="amber-sort-btn ${state.memorySort === 'newest' ? 'is-active' : ''}" data-action="sort" data-val="newest">最新</button>
            <button class="amber-sort-btn ${state.memorySort === 'important' ? 'is-active' : ''}" data-action="sort" data-val="important">最重要</button>
            <button class="amber-sort-btn ${state.memorySort === 'temperature' ? 'is-active' : ''}" data-action="sort" data-val="temperature">有温度</button>
          </div>
        </div>

        <nav class="amber-filter-tabs">
          ${['全部', 'Core', 'Recent', 'Deep', 'Ephemeral'].map(t => {
            const val = t === '全部' ? 'all' : t;
            const active = state.amberFilter.toLowerCase() === val.toLowerCase() ? 'is-active' : '';
            return `<button class="amber-tab-btn ${active}" data-action="filter-amber" data-val="${val}">${t}</button>`;
          }).join('')}
        </nav>
      </header>
      
      <section class="amber-list-container">
        ${sortedMems.map(mem => renderAmberItem(mem)).join('')}
        ${sortedMems.length === 0 ? '<p class="amber-empty">空空如也</p>' : ''}
      </section>
    `;
  }

  function renderAmberStatsContent() {
    const stats = state.amberStats;
    const loading = state.amberStatsLoading;
    const s = stats || {};

    // Agent links
    const linksHtml = (s.agent_links || []).map((link) => {
      const name = amberPersonName(link.agent_id);
      const avatar = amberPersonAvatar(link.agent_id);
      const since = amberFormatDate(link.first_at);
      return `
          <div class="ambs-link-row">
            <div class="ambs-link-av">${escapeHtml(avatar)}</div>
            <div class="ambs-link-info">
              <span class="ambs-link-name">${escapeHtml(name)}</span>
              <span class="ambs-link-since">自 ${escapeHtml(since)} · 第 ${link.days} 天</span>
            </div>
            <span class="ambs-link-count">${link.total}</span>
          </div>`;
    }).join('') || '<p class="ambs-empty">暂无记录</p>';

    // Category grid
    const cats = s.by_category || {};
    const catHtml = Object.entries(cats).map(([cat, count]) => `
          <div class="ambs-cat-cell">
            <span class="ambs-cat-num">${count}</span>
            <span class="ambs-cat-name">${escapeHtml(amberCatLabel(cat))}</span>
          </div>`).join('') || '<p class="ambs-empty" style="padding:0 12px 10px">暂无记忆</p>';

    // Labels
    const labels = s.labels || [];
    const newLabelForm = state.amberNewLabelOpen ? `
          <div class="ambs-new-label-form">
            <input class="ambs-label-input" id="ambs-label-name-input" placeholder="标签名称…" maxlength="32" autocomplete="off" />
            <div class="ambs-color-row">
              ${AMBER_LABEL_COLORS.map((c) => `<button class="ambs-color-dot${state.amberNewLabelColor === c ? ' chosen' : ''}" data-action="amber-pick-color" data-color="${c}" style="background:${c}"></button>`).join('')}
            </div>
            <div class="ambs-new-label-btns">
              <button class="ambs-btn-cancel" data-action="amber-cancel-label">取消</button>
              <button class="ambs-btn-confirm" data-action="amber-create-label">创建</button>
            </div>
          </div>` : '';

    const labelsHtml = labels.map((label) => {
      const isEditing = state.amberEditLabelId === label.id;
      const editPanel = isEditing ? `
          <div class="ambs-edit-panel">
            <input class="ambs-label-input" id="ambs-edit-label-input" value="${escapeHtml(state.amberEditLabelName)}" maxlength="32" autocomplete="off" />
            <div class="ambs-color-row">
              ${AMBER_LABEL_COLORS.map((c) => `<button class="ambs-color-dot${state.amberEditLabelColor === c ? ' chosen' : ''}" data-action="amber-edit-pick-color" data-color="${c}" style="background:${c}"></button>`).join('')}
            </div>
            <div class="ambs-edit-actions">
              <button class="ambs-btn-delete" data-action="amber-delete-label" data-label-id="${escapeHtml(label.id)}">删除</button>
              <button class="ambs-btn-cancel" data-action="amber-cancel-edit">取消</button>
              <button class="ambs-btn-confirm" data-action="amber-save-label" data-label-id="${escapeHtml(label.id)}">保存</button>
            </div>
          </div>` : '';
      return `
          <div class="ambs-label-row${isEditing ? ' is-editing' : ''}">
            <button class="ambs-label-folder" data-action="open-amber-label"
              data-label-id="${escapeHtml(label.id)}"
              data-label-name="${escapeHtml(label.name)}"
              data-label-color="${escapeHtml(label.color)}">
              <span class="ambs-folder-dot" style="background:${escapeHtml(label.color)}"></span>
              <span class="ambs-folder-name">${escapeHtml(label.name)}</span>
              <span class="ambs-folder-count">${label.count}</span>
            </button>
            <button class="ambs-edit-btn${isEditing ? ' is-active' : ''}" data-action="amber-toggle-edit"
              data-label-id="${escapeHtml(label.id)}"
              data-label-name="${escapeHtml(label.name)}"
              data-label-color="${escapeHtml(label.color)}"
              aria-label="编辑">✎</button>
            ${editPanel}
          </div>`;
    }).join('');

    // Tag statistics bars — preset tags + custom labels
    const tagStatsHtml = (() => {
      const byCategory = s.by_category || {};
      const presetRows = AMBER_PRESET_TAGS.map((t) => ({
        name: t.name, color: t.color, count: byCategory[t.key] || 0, preset: true,
      }));
      const customRows = labels.map((l) => ({
        name: l.name, color: l.color, count: l.count, preset: false,
      }));
      const allRows = [...presetRows, ...customRows];
      const maxCount = Math.max(...allRows.map((r) => r.count), 1);
      const renderRow = (r) => {
        const pct = Math.max(r.count > 0 ? 3 : 0, Math.round((r.count / maxCount) * 100));
        return `
          <div class="ambs-tag-bar-row${r.count === 0 ? ' is-empty' : ''}">
            <span class="ambs-tag-bar-name">${escapeHtml(r.name)}</span>
            <div class="ambs-tag-bar-track">
              <div class="ambs-tag-bar-fill" style="width:${pct}%;background:${escapeHtml(r.color)}"></div>
            </div>
            <span class="ambs-tag-bar-count">${r.count || ''}</span>
          </div>`;
      };
      const presetHtml = presetRows.map(renderRow).join('');
      const customHtml = customRows.length
        ? `<div class="ambs-tag-bar-divider"></div>${customRows.map(renderRow).join('')}`
        : '';
      return presetHtml + customHtml;
    })();

    const body = `
        ${loading && !stats ? '<p class="ambs-loading">加载中…</p>' : ''}
        <div class="ambs-module">
          <div class="ambs-module-hd">
            <span class="ambs-module-title">联系链接</span>
            <span class="ambs-module-badge">${(s.agent_links || []).length}</span>
          </div>
          ${linksHtml}
        </div>

        <div class="ambs-module">
          <div class="ambs-module-hd">
            <span class="ambs-module-title">记忆总量</span>
            <span class="ambs-module-badge">${s.total || 0}</span>
          </div>
          <div class="ambs-cat-grid">${catHtml}</div>
        </div>

        <div class="ambs-module">
          <div class="ambs-module-hd">
            <span class="ambs-module-title">标签分组</span>
            <button class="ambs-add-btn" data-action="amber-add-label">＋ 新建</button>
          </div>
          ${newLabelForm}
          ${labelsHtml}
          ${!labels.length && !state.amberNewLabelOpen ? '<p class="ambs-empty">还没有标签，建一个吧</p>' : ''}
        </div>

        <div class="ambs-module">
          <div class="ambs-module-hd">
            <span class="ambs-module-title">标签统计</span>
            <span class="ambs-module-badge">${AMBER_PRESET_TAGS.length + labels.length}</span>
          </div>
          <div class="ambs-tag-bars">${tagStatsHtml}</div>
        </div>`;

    return `
      <header class="amber-top-area">
        <div class="amber-hero">
          <div class="amber-hero-left">
            <h1 class="amber-title">Amber</h1>
            <span class="amber-sub">统计</span>
          </div>
          <div class="amber-hero-right">
            <button class="amber-flip-btn is-active" data-action="toggle-amber-view" aria-label="切换到记忆列表">${FLIP_SVG_LIST}</button>
          </div>
        </div>
      </header>
      <section class="ambs-body">
        ${body}
      </section>
    `;
  }

  function renderAmberLabelDetailContent() {
    const loading = state.amberLabelMemoriesLoading;
    const memories = state.amberLabelMemories || [];
    const color = state.amberLabelDetailColor || '#a78ec7';
    const name = state.amberLabelDetailName || '标签';

    const rows = memories.map((m) => `
      <div class="ambs-mem-row">
        <div class="ambs-mem-meta">
          <span class="ambs-mem-cat">${escapeHtml(amberCatLabel(m.category))}</span>
          <span class="ambs-mem-time">${amberFormatDate(m.created_at)}</span>
        </div>
        <div class="ambs-mem-content">${escapeHtml(m.content || m.raw_content || '')}</div>
      </div>`).join('');

    return `
      <header class="amber-top-area">
        <div class="amber-hero">
          <div class="amber-hero-left" style="gap:10px">
            <button class="ambs-back-btn" data-action="close-amber-label" aria-label="返回">‹</button>
            <span class="ambs-folder-dot-lg" style="background:${escapeHtml(color)}"></span>
            <h1 class="amber-title" style="font-size:20px">${escapeHtml(name)}</h1>
          </div>
          <div class="amber-hero-right">
            <span class="ambs-detail-count">${memories.length} 条</span>
          </div>
        </div>
      </header>
      <section class="ambs-body">
        ${loading && !memories.length ? '<p class="ambs-loading">加载中…</p>' : ''}
        <div class="ambs-mem-list">
          ${rows || (!loading ? '<p class="ambs-empty">这个标签下还没有记忆</p>' : '')}
        </div>
      </section>
    `;
  }

  function renderAmberItem(mem) {
    const temp = Number.isFinite(mem.temperature) ? Number(mem.temperature) : null;
    const tempText = temp !== null
      ? (Number.isInteger(temp) ? String(temp) : temp.toFixed(1).replace(/\.0$/, ''))
      : null;
    
    // importance: 1~5 颗星，后端传 importance 字段
    const rawImp = Number.isFinite(mem.importance) ? Math.round(Number(mem.importance)) : null;
    const importance = rawImp !== null ? Math.min(5, Math.max(1, rawImp)) : null;
    const filled = importance !== null ? '✦'.repeat(importance) : '';
    const empty  = importance !== null ? '✧'.repeat(5 - importance) : '';
    const starStr = filled + empty;
    
    // 层级：后端传 level 或 type（Core/Recent/Deep/Ephemeral）
    const levelStr = (mem.level || mem.type || '').toUpperCase();
    
    // 发布人：优先 agent_id -> 再查 person 匹配
    const person = state.people.find(p => p.id === mem.person);
    const agName = mem.agent_id || (person ? person.name : 'System');
    const dateShort = (mem.date || '').replace(/年|月/g, '.').replace('日', '');
    
    return `
      <article class="amber-item ${mem.expanded ? 'is-expanded' : ''}">
        <div class="amber-item-meta">
          <div class="amber-meta-left">
            <span class="amber-pill-tag">${escapeHtml(mem.tag || '')}</span>
            <span class="amber-pill-level">${escapeHtml(levelStr)}</span>
            <span class="amber-item-date">${dateShort}</span>
          </div>
          <div class="amber-meta-right">
            <div class="amber-publisher-box">
              <span class="amber-publisher-name">@${escapeHtml(agName)}</span>
            </div>
          </div>
        </div>
        
        <div class="amber-item-attrs">
          ${tempText !== null ? `<span class="amber-attr-badge">${tempText}°</span>` : ''}
          ${importance !== null ? `<span class="amber-attr-stars">${starStr}</span>` : ''}
        </div>
        
        <div class="amber-item-content">
          <div class="amber-item-summary">
            ${mem.summary || escapeHtml(mem.body && mem.body[0] ? mem.body[0] : '')}
            ${!mem.expanded ? '<span class="amber-bling">✧ ₊⁺</span>' : ''}
          </div>
          ${mem.expanded ? `
            <div class="amber-item-body">
               <div class="amber-detail-divider"></div>
               ${(mem.body || []).map(line => `<p class="amber-body-line">${escapeHtml(line)}</p>`).join('')}
               <div class="amber-bling-bottom">✧ ₊⁺ ✦ ⁺₊ ✧</div>
            </div>
          ` : ''}
        </div>
        
        <button class="amber-expand-btn" data-action="toggle-expand" data-id="${mem.id}">
          ${mem.expanded ? '- 收起' : '+ 展开原文'}
        </button>
      </article>
    `;
  }

  // ─── Popup ────────────────────────────────────────────────────
  function renderPopup() {
    if (state.activeTab !== 'diary') return '';
    if (!currentDiary) return '';
    const diary = currentDiary();
    if (!diary) return '';
    const scribble = diary.scribbles.find((item) => item.id === state.activeScribbleId);
    if (!scribble || state.view !== 'detail') return '';
    return `
      <div class="diary-popup-mask" data-action="close-scribble">
        <section class="diary-popup diary-scribble-popup" aria-label="批注弹窗">
          <div class="diary-popup-grip"></div>
          <div class="diary-popup-head">
            <h3>划线批注</h3>
            <button class="diary-popup-close" data-action="close-scribble" aria-label="关闭">×</button>
          </div>
          <p class="diary-note-quote">"${scribble.quote}"</p>
          <p class="diary-note-text">${scribble.text}</p>
          <span class="diary-popup-author">${scribble.author}</span>
        </section>
      </div>
    `;
  }

  // ─── Helpers ──────────────────────────────────────────────────
  function lineMarkup(line, scribbles) {
    const note = scribbles.find((item) => item.quote === line);
    if (!note) return escapeHtml(line);
    const text = escapeHtml(line);
    if (note.type === 'strike') {
      return `<button class="diary-inline-note line-effect is-strike" data-action="open-scribble" data-scribble-id="${note.id}">${text}</button><em class="line-tag">${escapeHtml(note.author)}</em>`;
    }
    if (note.type === 'underline') {
      return `<button class="diary-inline-note line-effect is-underline" data-action="open-scribble" data-scribble-id="${note.id}">${text}</button><em class="line-tag">${escapeHtml(note.author)}</em>`;
    }
    return `<button class="diary-inline-note line-effect is-star" data-action="open-scribble" data-scribble-id="${note.id}">${text}</button><em class="line-tag">${escapeHtml(note.author)}</em>`;
  }

  function groupMemoriesByYear(mems) {
    return mems.reduce((acc, mem) => {
      const y = mem.year;
      if (!acc[y]) acc[y] = [];
      acc[y].push(mem);
      return acc;
    }, {});
  }

  function currentPerson() {
    return state.people.find((person) => person.id === state.currentPersonId) || state.people[0];
  }

  function isUserNotebook(person = currentPerson()) {
    return String(person?.authorType || '').toLowerCase() === 'user';
  }

  function currentDiary() {
    return currentPerson().diaries.find((diary) => diary.id === state.currentDiaryId) || currentPerson().diaries[0];
  }

  function currentMemory() {
    return state.memories.find((m) => m.id === state.currentMemoryId) || state.memories[0];
  }

  function timelineDateLabel(dateText = '') {
    const match = String(dateText).match(/(\d{1,2})\D+(\d{1,2})\D*$/);
    if (!match) return dateText;
    return `${match[1]}.${match[2]}`;
  }

  // ─── Bind ─────────────────────────────────────────────────────
  function bind(mount) {
    mount.querySelectorAll('[data-action]').forEach((node) => {
      node.addEventListener('click', (event) => handleAction(node.dataset.action, node.dataset, event));
    });
  }

  // ─── Actions ──────────────────────────────────────────────────
  function handleAction(action, data, event) {
    // Tab switching
    if (action === 'tab-diary') {
      state.activeTab = 'diary';
      render();
      return;
    }
    if (action === 'tab-memory') {
      state.activeTab = 'memory';
      state.amberView = 'list';
      state.memoryView = 'timeline';
      applyDefaultMemorySortForCurrentFilter();
      render();
      loadAgentMemories(state.memoryPersonFilter);
      return;
    }

    // Amber stats / label actions
    if (action === 'toggle-amber-view') {
      state.amberView = state.amberView === 'list' ? 'stats' : 'list';
      if (state.amberView === 'stats' && !state.amberStats) loadAmberStats();
      render();
      return;
    }
    if (action === 'amber-add-label') {
      state.amberNewLabelOpen = true;
      state.amberNewLabelColor = AMBER_LABEL_COLORS[0];
      render();
      setTimeout(() => document.getElementById('ambs-label-name-input')?.focus(), 80);
      return;
    }
    if (action === 'amber-cancel-label') {
      state.amberNewLabelOpen = false;
      render();
      return;
    }
    if (action === 'amber-pick-color') {
      state.amberNewLabelColor = data.color || AMBER_LABEL_COLORS[0];
      render();
      return;
    }
    if (action === 'amber-create-label') {
      const input = document.getElementById('ambs-label-name-input');
      const name = input ? input.value.trim() : '';
      if (!name) return;
      state.amberNewLabelOpen = false;
      amberCreateLabel(name, state.amberNewLabelColor);
      return;
    }
    if (action === 'open-amber-label') {
      state.amberLabelDetailId = data.labelId || '';
      state.amberLabelDetailName = data.labelName || '标签';
      state.amberLabelDetailColor = data.labelColor || '#a78ec7';
      state.amberLabelMemories = [];
      state.amberView = 'label-detail';
      render();
      loadAmberLabelMemories(state.amberLabelDetailId);
      return;
    }
    if (action === 'close-amber-label') {
      state.amberView = 'stats';
      render();
      return;
    }
    if (action === 'amber-toggle-edit') {
      const id = data.labelId || '';
      if (state.amberEditLabelId === id) {
        state.amberEditLabelId = '';
      } else {
        state.amberEditLabelId = id;
        state.amberEditLabelName = data.labelName || '';
        state.amberEditLabelColor = data.labelColor || AMBER_LABEL_COLORS[0];
        state.amberNewLabelOpen = false;
      }
      render();
      if (state.amberEditLabelId) setTimeout(() => document.getElementById('ambs-edit-label-input')?.focus(), 80);
      return;
    }
    if (action === 'amber-cancel-edit') {
      state.amberEditLabelId = '';
      render();
      return;
    }
    if (action === 'amber-edit-pick-color') {
      state.amberEditLabelColor = data.color || AMBER_LABEL_COLORS[0];
      render();
      return;
    }
    if (action === 'amber-save-label') {
      const input = document.getElementById('ambs-edit-label-input');
      const name = input ? input.value.trim() : state.amberEditLabelName;
      if (!name) return;
      const id = data.labelId || state.amberEditLabelId;
      state.amberEditLabelId = '';
      amberUpdateLabel(id, name, state.amberEditLabelColor);
      return;
    }
    if (action === 'amber-delete-label') {
      amberDeleteLabel(data.labelId || '');
      return;
    }

    // Amber Memory actions
    if (action === 'toggle-expand') {
      const mem = state.memories.find(m => m.id === data.id);
      if (mem) mem.expanded = !mem.expanded;
      render();
      return;
    }
    if (action === 'sort') {
      state.memorySort = data.val;
      render();
      return;
    }
    if (action === 'filter-amber') {
      state.amberFilter = data.val;
      applyDefaultMemorySortForCurrentFilter();
      render();
      return;
    }
    if (action === 'toggle-person-dropdown') {
      // Extremely simple implementation: cycle through people + 'all'
      const allIds = ['all', ...state.people.map(p => p.id)];
      const currentIndex = allIds.indexOf(state.memoryPersonFilter);
      const nextIndex = (currentIndex + 1) % allIds.length;
      state.memoryPersonFilter = allIds[nextIndex];
      render();
      loadAgentMemories(state.memoryPersonFilter);
      return;
    }

    // Diary actions
    if (action === 'close-diary') {
      if (typeof window.closePage === 'function') window.closePage('page-diary');
      return;
    }
    if (action === 'go-board') {
      state.view = 'board';
      state.activeScribbleId = null;
      render();
      return;
    }
    if (action === 'go-list') {
      state.view = 'list';
      state.activeScribbleId = null;
      render();
      return;
    }
    if (action === 'open-person') {
      state.currentPersonId = data.personId;
      state.currentDiaryId = currentPerson().diaries[0]?.id || '';
      state.view = 'list';
      render();
      loadNotebookEntries(state.currentPersonId);
      return;
    }
    if (action === 'open-diary') {
      state.currentPersonId = data.personId;
      state.currentDiaryId = data.diaryId;
      state.view = 'detail';
      state.activeScribbleId = null;
      render();
      loadNotebookEntries(state.currentPersonId, data.diaryId);
      return;
    }
    if (action === 'rename-notebook') {
      renameCurrentNotebook();
      return;
    }
    if (action === 'create-diary-entry') {
      createCurrentDiaryEntry();
      return;
    }
    if (action === 'edit-diary-entry') {
      editCurrentDiaryEntry();
      return;
    }
    if (action === 'delete-diary-entry') {
      deleteCurrentDiaryEntry();
      return;
    }
    if (action === 'comment-diary-entry') {
      commentCurrentDiaryEntry();
      return;
    }
    if (action === 'toggle-viewer') {
      state.viewer = state.viewer === 'me' ? 'visitor' : 'me';
      render();
      return;
    }
    if (action === 'open-scribble') {
      state.activeScribbleId = data.scribbleId;
      if (event) event.stopPropagation();
      render();
      return;
    }
    if (action === 'close-scribble') {
      if (event && event.currentTarget !== event.target && !event.target.closest('.diary-popup-close')) return;
      state.activeScribbleId = null;
      render();
      return;
    }
  }

  function escapeHtml(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  window.initDiaryApp = initDiaryApp;
  window.DiaryApp = { init: initDiaryApp };
})();
