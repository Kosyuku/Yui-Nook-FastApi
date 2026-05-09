(() => {
  const API_BASE = 'http://localhost:8000';
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
    // Memory state
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
      stats: { words: content.length, likes: 0, comments: 0 },
      comments: [],
      scribbles: [],
    };
  }

  async function loadAgentDiary(agentId = state.currentPersonId) {
    const normalizedAgentId = String(agentId || '').trim();
    if (!normalizedAgentId) return;
    try {
      const resp = await fetch(`${API_BASE}/api/diary?agent_id=${encodeURIComponent(normalizedAgentId)}`);
      if (!resp.ok) return;
      const data = await resp.json().catch(() => ({}));
      const entries = Array.isArray(data?.entries) ? data.entries.map(mapDiaryEntry) : [];
      const person = state.people.find((item) => item.id === normalizedAgentId);
      if (!person || !entries.length) return;
      person.diaries = entries;
      if (state.currentPersonId === normalizedAgentId) {
        state.currentDiaryId = person.diaries[0]?.id || state.currentDiaryId;
      }
      render();
    } catch (error) {
      console.warn('[diary] load failed', error);
    }
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
  //     const res = await fetch('/api/character-memories'); // Your real Pyro/Claude backend
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
    loadAgentDiary(state.currentPersonId);
  }

  // ─── Render ───────────────────────────────────────────────────
  function render() {
    const mount = root();
    if (!mount) return;
    mount.innerHTML = `
      <div class="diary-app ${state.activeTab === 'memory' ? 'memory-mode' : ''}">
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
  function renderBottomTabs() {
    return `
      <nav class="diary-bottom-tabs">
        <div class="dbt-side dbt-side-left">
          <button class="dbt-btn ${state.activeTab === 'diary' ? 'is-active' : ''}" data-action="tab-diary">
            <span class="dbt-icon">✒</span>
            <span class="dbt-label">日记</span>
          </button>
        </div>
        <div class="dbt-side dbt-side-right">
          <button class="dbt-btn ${state.activeTab === 'memory' ? 'is-active' : ''}" data-action="tab-memory">
            <span class="dbt-icon">◈</span>
            <span class="dbt-label">记忆</span>
          </button>
        </div>
      </nav>
    `;
  }

  // ─── Header ───────────────────────────────────────────────────
  function renderHeader() {
    if (state.activeTab === 'memory') return renderMemoryHeader();

    const person = currentPerson();
    const title = state.view === 'board' ? 'Daydream' : state.view === 'list' ? `${person.name}的日记本` : '完整日记';
    const subtitle = state.view === 'board' ? '白昼梦' : state.view === 'list' ? '预览' : '翻页';
    const action = state.view === 'board' ? 'close-diary' : state.view === 'list' ? 'go-board' : 'go-list';
    return `
      <header class="diary-header">
        <button class="diary-back-btn" data-action="${action}" aria-label="返回">‹</button>
        <div class="diary-header-copy">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="diary-header-side">
          <span class="diary-header-ghost"></span>
        </div>
      </header>
    `;
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

  function renderBoardView() {
    return `
      <section class="diary-board">
        ${state.people
          .map(
            (person, index) => `
              <button
                class="diary-book-card accent-${person.accent}"
                style="--tilt:${index % 2 === 0 ? '-2.2deg' : '1.8deg'}"
                data-action="open-person"
                data-person-id="${person.id}"
              >
                <span class="diary-book-spine"></span>
                <div class="diary-book-inner">
                  <p class="diary-book-owner">${person.coverTitle}</p>
                  <div class="diary-book-mark">${person.avatar}</div>
                  <p class="diary-book-sub">${person.coverSub}</p>
                  <div class="diary-book-meta">
                    <span>${person.diaries.length} 篇</span>
                  </div>
                </div>
              </button>
            `,
          )
          .join('')}
      </section>
    `;
  }

  function renderListView() {
    const person = currentPerson();
    return `
      <section class="diary-list-view">
        <div class="diary-list-stage accent-${person.accent}">
          <div class="diary-list-fog-card">
            <div class="diary-list-minihead">
              <span class="diary-list-dot"></span>
              <span class="diary-list-pill">${person.name}</span>
            </div>
            <div class="diary-list-fog-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="diary-list-fog-meta">${person.name}的日记本 · ${person.diaries.length}篇</div>
          </div>

          <div class="diary-entry-list">
            ${person.diaries
              .map(
                (diary) => `
                  <article class="diary-entry-row">
                    <div class="diary-entry-axis">
                      <div class="diary-entry-axis-head">
                        <span class="diary-entry-node">✦</span>
                        <span class="diary-entry-time">${timelineDateLabel(diary.date)}</span>
                      </div>
                      <span class="diary-entry-stick"></span>
                    </div>
                    <button
                      class="diary-entry-card ${diary.id === state.currentDiaryId ? 'is-active' : ''}"
                      data-action="open-diary"
                      data-person-id="${person.id}"
                      data-diary-id="${diary.id}"
                    >
                      <h3>${diary.title}</h3>
                      <p class="diary-entry-song">${diary.song}（${diary.mood}）</p>
                      <p class="diary-entry-link">https://c6.y.qq.com/base/fcgi-bin/u?...=${diary.id}</p>
                    </button>
                  </article>
                `,
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderDetailView() {
    const person = currentPerson();
    const diary = currentDiary();
    return `
      <section class="diary-detail-view">
        <article class="diary-paper accent-${person.accent}">
          <div class="diary-paper-head">
            <div>
              <p class="diary-paper-date">${diary.date} · ${diary.clock}</p>
              <h2>${diary.title}</h2>
            </div>
            <div class="diary-paper-badges">
              <span>${diary.weather}</span>
              <span>${diary.mood}</span>
            </div>
          </div>

          <div class="diary-paper-song">${diary.song}</div>

          <div class="diary-paper-body">
            <div class="diary-prose">
              ${diary.lines
                .map(
                  (line) => `
                    <div class="diary-line">
                      <span class="diary-line-copy">${lineMarkup(line, diary.scribbles)}</span>
                    </div>
                  `,
                )
                .join('')}
            </div>
          </div>

          <div class="diary-paper-foot">
            <span>${diary.stats.words} 字</span>
            <span>${diary.stats.likes} 喜欢</span>
            <span>${diary.stats.comments} 评论</span>
          </div>
        </article>

        <aside class="diary-side-notes">
          <section class="diary-note-panel">
            <h3>日记评论</h3>
            <div class="diary-note-list">
              ${
                diary.comments?.length
                  ? diary.comments
                      .map(
                        (comment) => `
                          <article class="diary-note note-comment">
                            <div class="amber-item-meta" style="margin-bottom: 4px; justify-content: flex-start;">
                              <div class="amber-publisher-box" style="padding: 2px 6px; background: rgba(255, 255, 255, 0.3);">
                                <span class="amber-publisher-name">@${comment.author}</span>
                              </div>
                            </div>
                            <p class="diary-note-text">${comment.text}</p>
                          </article>
                        `,
                      )
                      .join('')
                  : '<p class="diary-note-empty">这篇日记还没有评论。</p>'
              }
            </div>
          </section>
        </aside>
      </section>
    `;
  }

  // ─── Memory Content (Amber) ───────────────────────────────────
  function renderMemoryContent() {
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
            <!-- empty for now or close button -->
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
      state.memoryView = 'timeline';
      applyDefaultMemorySortForCurrentFilter();
      render();
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
      state.currentDiaryId = currentPerson().diaries[0].id;
      state.view = 'list';
      render();
      loadAgentDiary(state.currentPersonId);
      return;
    }
    if (action === 'open-diary') {
      state.currentPersonId = data.personId;
      state.currentDiaryId = data.diaryId;
      state.view = 'detail';
      state.activeScribbleId = null;
      render();
      loadAgentDiary(state.currentPersonId);
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

