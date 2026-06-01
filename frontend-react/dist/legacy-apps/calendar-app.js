(() => {
  const STORAGE_KEY = 'pyro_calendar_events_v2';
  const LEGACY_STORAGE_KEY = 'pyro_calendar_events_v1';
  const TAGS_STORAGE_KEY = 'pyro_calendar_tags_v1';
  const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const DEFAULT_TAGS = ['纪念日', '约会', '生日', '旅行'];
  const TAG_STYLES = {
    '纪念日': { dot: 'bg-[#e3a3c1]', chip: 'bg-[#fbeef5] text-[#ba7898] border border-[#efcfdf]', nodeBg: '#f7e8f2', nodeText: '#9b6d88', nodeBorder: '#e5c9da', month: '#d8b8ca' },
    '约会': { dot: 'bg-[#bea5de]', chip: 'bg-[#f4effb] text-[#8470a8] border border-[#ddd2f1]', nodeBg: '#efe8fa', nodeText: '#7c68a1', nodeBorder: '#d7cbec', month: '#c7b6e4' },
    '生日': { dot: 'bg-[#f2c58e]', chip: 'bg-[#fdf5e8] text-[#b8874f] border border-[#f2ddbb]', nodeBg: '#fbf1df', nodeText: '#aa7e4a', nodeBorder: '#efd9b6', month: '#e8ca9b' },
    '旅行': { dot: 'bg-[#a7d4d0]', chip: 'bg-[#ebf8f6] text-[#5e9290] border border-[#cfe9e5]', nodeBg: '#e7f4f2', nodeText: '#5c8f8d', nodeBorder: '#c7e3de', month: '#b9ddd8' },
    '日常': { dot: 'bg-[#cfc7db]', chip: 'bg-[#f5f2f8] text-[#7d758b] border border-[#e0dbe8]', nodeBg: '#f1edf5', nodeText: '#776f86', nodeBorder: '#ddd6e7', month: '#d4ccdf' },
  };
  const DEFAULT_EVENTS = {
    '2026-03-10': [
      { id: 'anniversary-2026', title: '恋爱周年纪念', detail: '一起回看刚认识时的聊天记录，还是会偷偷心动。', tag: '纪念日' },
    ],
    '2026-03-22': [
      { id: 'date-2026-03-22', title: '视频约会', detail: '隔着屏幕一起吃小蛋糕，也算认真过节。', tag: '约会' },
    ],
    '2026-03-30': [
      { id: 'birthday-2026', title: '阿延生日', detail: '想把准备好的惊喜和祝福都塞进这一天里。', tag: '生日' },
    ],
  };

  let selectedDateKey = null;
  let selectedTag = '纪念日';
  let editingEventId = null;
  let editingSourceDateKey = null;
  let currentView = 'calendar';
  let customTags = [];
  let bounceState = null;
  let bounceInitialized = false;
  let datePickerYear = 0;
  let datePickerMonth = 0;
  let selectedCoverImage = '';

  function randomId() {
    return `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function makeDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function getCurrentMonthDateKey(day = 1) {
    return makeDateKey(state.calYear, state.calMonth, day);
  }

  function parseDateKey(dateKey) {
    const [year, month, day] = dateKey.split('-').map(Number);
    return { year, month, day };
  }

  function formatDateKey(dateKey) {
    const { year, month, day } = parseDateKey(dateKey);
    return `${year}年${month}月${day}日`;
  }

  function normalizeEvent(item, dateKey, index) {
    if (typeof item === 'string') return { id: `${dateKey}-${index}`, title: item, detail: '', tag: '日常' };
    return {
      id: item.id || `${dateKey}-${index}`,
      title: item.title || item.text || '未命名事件',
      detail: item.detail || item.description || '',
      tag: item.tag || '日常',
      coverImage: item.coverImage || item.image || '',
    };
  }

  function normalizeEventMap(rawMap) {
    const normalized = {};
    Object.entries(rawMap || {}).forEach(([dateKey, items]) => {
      if (!Array.isArray(items) || !items.length) return;
      normalized[dateKey] = items.map((item, index) => normalizeEvent(item, dateKey, index));
    });
    return normalized;
  }

  function loadCalendarEvents() {
    try {
      const nextRaw = localStorage.getItem(STORAGE_KEY);
      if (nextRaw) return { ...normalizeEventMap(DEFAULT_EVENTS), ...normalizeEventMap(JSON.parse(nextRaw)) };
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) return { ...normalizeEventMap(DEFAULT_EVENTS), ...normalizeEventMap(JSON.parse(legacyRaw)) };
    } catch (_) {
      return normalizeEventMap(DEFAULT_EVENTS);
    }
    return normalizeEventMap(DEFAULT_EVENTS);
  }

  function loadCustomTags() {
    try {
      const raw = localStorage.getItem(TAGS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch (_) {
      return [];
    }
  }

  function saveCustomTags() {
    localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(customTags));
  }

  function saveCalendarEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function getAllTags() {
    const eventTags = Object.values(state.calendarEvents || {}).flat().map((item) => item.tag).filter(Boolean);
    return [...new Set([...DEFAULT_TAGS, ...customTags, ...eventTags])];
  }

  function cloneEventMap(events = state.calendarEvents || {}) {
    return Object.fromEntries(Object.entries(events).map(([dateKey, items]) => [dateKey, items.map((item) => ({ ...item }))]));
  }

  function commitEvents(nextEvents) {
    state.calendarEvents = normalizeEventMap(nextEvents);
    saveCalendarEvents(state.calendarEvents);
    renderCalendar();
  }

  function getTagStyle(tag) {
    return TAG_STYLES[tag] || TAG_STYLES['日常'];
  }

  function getEventsForDay(year, month, day) {
    return state.calendarEvents?.[makeDateKey(year, month, day)] || [];
  }

  function getPrimaryTag(events) {
    return Array.isArray(events) && events.length ? normalizeEvent(events[0], 'primary', 0).tag : '纪念日';
  }

  function getMonthEvents(year, month) {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
    return Object.entries(state.calendarEvents || {})
      .filter(([key, items]) => key.startsWith(prefix) && Array.isArray(items) && items.length)
      .sort(([a], [b]) => a.localeCompare(b));
  }

  function getTimelineEvents() {
    const entries = Object.entries(state.calendarEvents || {}).flatMap(([dateKey, items]) => {
      if (!Array.isArray(items)) return [];
      return items.map((item, index) => ({ ...normalizeEvent(item, dateKey, index), dateKey }));
    });
    const filtered = selectedDateKey ? entries.filter((item) => item.dateKey === selectedDateKey) : entries;
    return filtered.sort((a, b) => b.dateKey.localeCompare(a.dateKey) || a.title.localeCompare(b.title));
  }

  function findEventById(eventId) {
    for (const [dateKey, items] of Object.entries(state.calendarEvents || {})) {
      const event = items.find((item) => item.id === eventId);
      if (event) return { dateKey, event };
    }
    return null;
  }

  function renderTagButtons() {
    const group = document.getElementById('event-tag-group');
    if (!group) return;
    group.innerHTML = '';
    getAllTags().forEach((tag) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.tag = tag;
      button.className = 'cal-chip text-[11px] px-3 py-1.5 rounded-full';
      button.textContent = tag;
      if (tag === selectedTag) button.classList.add('active');
      group.appendChild(button);
    });
    const customButton = document.createElement('button');
    customButton.type = 'button';
    customButton.dataset.action = 'custom-tag';
    customButton.className = 'cal-chip sheet-tag-custom text-[11px] px-3 py-1.5 rounded-full';
    customButton.textContent = '自定义';
    group.appendChild(customButton);
  }

  function setActiveTag(tag) {
    selectedTag = tag;
    renderTagButtons();
  }

  function addCustomTag(value) {
    const nextTag = (value || '').trim();
    if (!nextTag) return false;
    if (!customTags.includes(nextTag) && !DEFAULT_TAGS.includes(nextTag)) {
      customTags = [...customTags, nextTag];
      saveCustomTags();
    }
    setActiveTag(nextTag);
    return true;
  }

  function openTagModal() {
    const modal = document.getElementById('tag-modal');
    const input = document.getElementById('tag-modal-input');
    if (!modal) return;
    modal.classList.add('open');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 40);
    }
  }

  function closeTagModal() {
    const modal = document.getElementById('tag-modal');
    const input = document.getElementById('tag-modal-input');
    modal?.classList.remove('open');
    if (input) input.value = '';
  }

  function confirmCustomTag() {
    const input = document.getElementById('tag-modal-input');
    const value = input?.value.trim() || '';
    if (!addCustomTag(value)) {
      input?.focus();
      return;
    }
    closeTagModal();
  }

  function updateSheetActionText() {
    const saveButton = document.querySelector('#event-sheet button[onclick="saveEvent()"]');
    const deleteButton = document.getElementById('event-delete-button');
    if (saveButton) saveButton.textContent = editingEventId ? '更新' : '保存';
    if (deleteButton) deleteButton.classList.toggle('hidden', !editingEventId);
  }

  function setSheetOpen(isOpen) {
    const sheet = document.getElementById('event-sheet');
    const area = document.getElementById('calendar-scroll-area');
    sheet?.classList.toggle('open', isOpen);
    if (area) area.style.overflowY = isOpen ? 'hidden' : 'auto';
  }

  function clearEventInputs() {
    const titleInput = document.getElementById('event-title-input');
    const detailInput = document.getElementById('event-detail-input');
    const dateInput = document.getElementById('event-date-input');
    if (titleInput) titleInput.value = '';
    if (detailInput) detailInput.value = '';
    if (dateInput) dateInput.value = selectedDateKey || '';
    selectedCoverImage = '';
    renderCoverPreview();
    editingEventId = null;
    editingSourceDateKey = null;
    setActiveTag(selectedTag && getAllTags().includes(selectedTag) ? selectedTag : '纪念日');
    updateSheetActionText();
  }

  function fillEventInputs(event, dateKey = selectedDateKey) {
    const titleInput = document.getElementById('event-title-input');
    const detailInput = document.getElementById('event-detail-input');
    const dateInput = document.getElementById('event-date-input');
    if (titleInput) titleInput.value = event.title || '';
    if (detailInput) detailInput.value = event.detail || '';
    if (dateInput) dateInput.value = dateKey || '';
    selectedCoverImage = event.coverImage || event.image || '';
    renderCoverPreview();
    editingEventId = event.id;
    editingSourceDateKey = dateKey;
    if (!getAllTags().includes(event.tag) && !customTags.includes(event.tag)) {
      customTags = [...customTags, event.tag];
      saveCustomTags();
    }
    setActiveTag(event.tag || '纪念日');
    updateSheetActionText();
  }

  function renderCoverPreview() {
    const preview = document.getElementById('event-cover-preview');
    const clearButton = document.getElementById('event-cover-clear');
    if (!preview) return;
    preview.classList.toggle('hidden', !selectedCoverImage);
    if (clearButton) clearButton.classList.toggle('hidden', !selectedCoverImage);
    preview.innerHTML = selectedCoverImage ? `<img src="${selectedCoverImage}" alt="" />` : '';
  }

  function pickEventCover() {
    document.getElementById('event-cover-input')?.click();
  }

  function clearEventCover() {
    selectedCoverImage = '';
    const input = document.getElementById('event-cover-input');
    if (input) input.value = '';
    renderCoverPreview();
  }

  function updateSheetDateInput() {
    const input = document.getElementById('event-date-input');
    if (input && selectedDateKey) input.value = selectedDateKey;
  }

  function syncSelectedDate(dateKey, shouldRender = false) {
    if (!dateKey) return;
    selectedDateKey = dateKey;
    const { year, month, day } = parseDateKey(dateKey);
    state.calYear = year;
    state.calMonth = month - 1;
    updateSheetLabel(year, month - 1, day);
    updateSheetDateInput();
    if (shouldRender) renderCalendar();
  }

  function openSheetDatePicker() {
    const base = selectedDateKey ? parseDateKey(selectedDateKey) : { year: state.calYear, month: state.calMonth + 1, day: 1 };
    datePickerYear = base.year;
    datePickerMonth = base.month - 1;
    renderDatePicker();
    document.getElementById('date-picker-modal')?.classList.add('open');
  }

  function closeDatePicker() {
    document.getElementById('date-picker-modal')?.classList.remove('open');
  }

  function jumpDatePickerToday() {
    const today = new Date();
    datePickerYear = today.getFullYear();
    datePickerMonth = today.getMonth();
    renderDatePicker();
  }

  function changeDatePickerMonth(delta) {
    datePickerMonth += delta;
    if (datePickerMonth > 11) { datePickerMonth = 0; datePickerYear++; }
    if (datePickerMonth < 0) { datePickerMonth = 11; datePickerYear--; }
    renderDatePicker();
  }

  function selectDatePickerDay(year, month, day) {
    syncSelectedDate(makeDateKey(year, month, day), true);
    closeDatePicker();
  }

  function renderDatePicker() {
    const label = document.getElementById('date-picker-label');
    const grid = document.getElementById('date-picker-grid');
    if (!label || !grid) return;
    label.textContent = `${datePickerYear}年${MONTH_NAMES[datePickerMonth]}`;
    const today = new Date();
    const firstDay = new Date(datePickerYear, datePickerMonth, 1).getDay();
    const daysInMonth = new Date(datePickerYear, datePickerMonth + 1, 0).getDate();
    const daysInPrev = new Date(datePickerYear, datePickerMonth, 0).getDate();
    grid.innerHTML = '';

    const appendCell = (day, monthOffset = 0) => {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'date-picker-cell';
      cell.textContent = day;
      const cellDate = new Date(datePickerYear, datePickerMonth + monthOffset, day);
      if (monthOffset !== 0) cell.classList.add('dim');
      if (cellDate.getFullYear() === today.getFullYear() && cellDate.getMonth() === today.getMonth() && cellDate.getDate() === today.getDate()) cell.classList.add('today');
      const cellKey = makeDateKey(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
      if (selectedDateKey === cellKey) cell.classList.add('selected');
      cell.onclick = () => selectDatePickerDay(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
      grid.appendChild(cell);
    };

    for (let i = firstDay - 1; i >= 0; i--) appendCell(daysInPrev - i, -1);
    for (let day = 1; day <= daysInMonth; day++) appendCell(day, 0);
    const total = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let day = 1; day <= total - firstDay - daysInMonth; day++) appendCell(day, 1);
  }

  function setCalendarView(view) {
    currentView = view;
    const calendarTab = document.getElementById('cal-tab-calendar');
    const timelineTab = document.getElementById('cal-tab-timeline');
    const calendarPanel = document.getElementById('cal-panel-calendar');
    const timelinePanel = document.getElementById('cal-panel-timeline');
    calendarTab?.classList.toggle('active', view === 'calendar');
    timelineTab?.classList.toggle('active', view === 'timeline');
    if (calendarPanel) calendarPanel.hidden = view !== 'calendar';
    if (timelinePanel) timelinePanel.hidden = view !== 'timeline';
  }

  function createActionButton(label, onClick, accent = 'text-stone-400/90') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `${accent} text-[11px] font-semibold active:scale-[.88] transition-transform duration-200`;
    button.textContent = label;
    button.onclick = onClick;
    return button;
  }

  function renderMonthEvents() {
    const title = document.getElementById('cal-events-title');
    const list = document.getElementById('cal-events-list');
    if (!list) return;
    const monthEvents = getMonthEvents(state.calYear, state.calMonth);
    if (title) title.textContent = selectedDateKey ? `📅 ${formatDateKey(selectedDateKey)}安排` : `📅 ${MONTH_NAMES[state.calMonth]}安排`;
    list.innerHTML = '';
    const filtered = selectedDateKey ? monthEvents.filter(([dateKey]) => dateKey === selectedDateKey) : monthEvents;
    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.className = 'text-[12px] text-stone-400/85 leading-[1.45]';
      empty.textContent = selectedDateKey ? '这一天还没有安排，点右上角加号就能记一笔。' : '这个月还没有记录，点一下日期就可以加新事件。';
      list.appendChild(empty);
      return;
    }
    filtered.forEach(([dateKey, items]) => {
      const { day } = parseDateKey(dateKey);
      items.forEach((entry) => {
        const style = getTagStyle(entry.tag);
        const row = document.createElement('div');
        row.className = 'flex items-start gap-2';
        const dot = document.createElement('div');
        dot.className = `w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${style.dot}`;
        const copy = document.createElement('div');
        copy.className = 'min-w-0 flex-1';
        const head = document.createElement('div');
        head.className = 'flex items-center gap-2 flex-wrap';
        const label = document.createElement('span');
        label.className = 'text-[12px] text-stone-600/90 font-medium';
        label.textContent = `${day}日 · ${entry.title}`;
        const chip = document.createElement('span');
        chip.className = `px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.chip}`;
        chip.textContent = entry.tag;
        head.append(label, chip);
        copy.appendChild(head);
        if (entry.detail) {
          const detail = document.createElement('p');
          detail.className = 'mt-1 text-[11px] leading-[1.42] text-stone-400/95';
          detail.textContent = entry.detail;
          copy.appendChild(detail);
        }
        const actions = document.createElement('div');
        actions.className = 'mt-1 flex items-center gap-3';
        actions.append(createActionButton('编辑', () => editEvent(entry.id)), createActionButton('删除', () => deleteEvent(entry.id), 'text-[#c27aa0]'));
        copy.appendChild(actions);
        row.append(dot, copy);
        list.appendChild(row);
      });
    });
  }

  function focusTimelineDate(dateKey) {
    syncSelectedDate(dateKey, true);
  }

  function renderTimeline() {
    const list = document.getElementById('timeline-list');
    const subtitle = document.getElementById('timeline-subtitle');
    const countChip = document.getElementById('timeline-count-chip');
    const filterButton = document.getElementById('cal-clear-filter');
    if (!list) return;
    const items = getTimelineEvents();
    if (subtitle) subtitle.textContent = selectedDateKey ? `${formatDateKey(selectedDateKey)}的大事记，点查看全部可以返回。` : '按时间倒序收好你们的重要时刻。';
    if (countChip) countChip.textContent = `${items.length} 条记录`;
    if (filterButton) filterButton.classList.toggle('hidden', !selectedDateKey);
    list.innerHTML = '';
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'text-[12px] text-stone-400/85 leading-[1.45]';
      empty.textContent = selectedDateKey ? '这一天暂时还没有大事记。' : '第一条大事记还在等你们写下。';
      list.appendChild(empty);
      return;
    }
    const createMonthLabel = (value, variant) => {
      const label = document.createElement('span');
      label.className = `timeline-month ${variant}`;
      label.innerHTML = `<span class="timeline-month-digit">${value}</span><span class="timeline-month-unit">月</span>`;
      return label;
    };

    items.forEach((entry, index) => {
      const style = getTagStyle(entry.tag);
      const { month } = parseDateKey(entry.dateKey);
      const prevEntry = index > 0 ? items[index - 1] : null;
      const prevMonth = prevEntry ? parseDateKey(prevEntry.dateKey).month : null;
      const showMonthBreak = index === 0 || prevMonth !== month;
      const card = document.createElement('article');
      card.className = 'relative pl-10' + (showMonthBreak ? ' timeline-month-start' : '');
      if (index !== items.length - 1) {
        const line = document.createElement('span');
        line.className = 'timeline-line';
        card.appendChild(line);
      }
      if (showMonthBreak) card.appendChild(createMonthLabel(month, index === 0 ? 'top' : 'break'));
      const node = document.createElement('span');
      node.className = 'timeline-node';
      node.style.background = style.nodeBg;
      node.style.color = style.nodeText;
      node.style.borderColor = style.nodeBorder;
      node.textContent = String(parseDateKey(entry.dateKey).day).padStart(2, '0');
      const panel = document.createElement('button');
      panel.type = 'button';
      panel.className = 'timeline-card w-full text-left px-3.5 py-3 active:scale-[.94] transition-transform duration-200';
      panel.onclick = () => focusTimelineDate(entry.dateKey);
      const meta = document.createElement('div');
      meta.className = 'flex items-center gap-2 flex-wrap';
      const date = document.createElement('span');
      date.className = 'text-[11px] font-semibold text-stone-500/90';
      date.textContent = formatDateKey(entry.dateKey);
      const chip = document.createElement('span');
      chip.className = `px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.chip}`;
      chip.textContent = entry.tag;
      const title = document.createElement('p');
      title.className = 'mt-1 text-[13px] font-semibold text-stone-700/95';
      title.textContent = entry.title;
      const detail = document.createElement('p');
      detail.className = 'mt-1 text-[12px] leading-[1.48] text-stone-500/88';
      detail.textContent = entry.detail || '这一天被温柔地记住了。';
      const actions = document.createElement('div');
      actions.className = 'mt-2 flex items-center gap-3';
      actions.append(
        createActionButton('编辑', (e) => { e.stopPropagation(); editEvent(entry.id); }),
        createActionButton('删除', (e) => { e.stopPropagation(); deleteEvent(entry.id); }, 'text-[#c27aa0]')
      );
      meta.append(date, chip);
      panel.append(meta, title, detail, actions);
      card.append(node, panel);
      list.appendChild(card);
    });
  }

  function addCalCell(grid, num, dim, isToday, events) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'cal-day' + (dim ? ' dim' : '') + (isToday ? ' today' : '');
    const number = document.createElement('span');
    number.className = 'cal-day-number';
    number.textContent = num;
    el.appendChild(number);
    if (Array.isArray(events) && events.length && !dim) {
      const primary = normalizeEvent(events[0], 'primary', 0);
      const sticker = document.createElement('span');
      sticker.className = 'cal-day-sticker';
      if (primary.coverImage) {
        const image = document.createElement('img');
        image.src = primary.coverImage;
        image.alt = '';
        sticker.appendChild(image);
      } else {
        sticker.classList.add('no-cover');
        sticker.textContent = primary.title.slice(0, 1);
      }
      el.appendChild(sticker);
      const dots = document.createElement('span');
      dots.className = 'cal-day-dots';
      events.slice(0, 3).forEach((event) => {
        const dot = document.createElement('i');
        dot.className = getTagStyle(normalizeEvent(event, 'dot', 0).tag).dot;
        dots.appendChild(dot);
      });
      el.appendChild(dots);
      if (events.length > 1) {
        const count = document.createElement('em');
        count.className = 'cal-day-count';
        count.textContent = `×${events.length}`;
        el.appendChild(count);
      }
    }
    grid.appendChild(el);
    return el;
  }

  function updateSheetLabel(year, month, day) {
    const lbl = document.getElementById('sheet-date-label');
    if (!lbl) return;
    const count = getEventsForDay(year, month, day).length;
    lbl.textContent = `${month + 1}月${day}日 · ${editingEventId ? '编辑大事记' : (count ? `已有 ${count} 条大事记` : '新建大事记')}`;
  }

  function onDateClick(year, month, day, el) {
    document.querySelectorAll('.cal-day.selected').forEach((cell) => cell.classList.remove('selected'));
    el.classList.add('selected');
    selectedDateKey = makeDateKey(year, month, day);
    editingEventId = null;
    updateSheetLabel(year, month, day);
    renderMonthEvents();
  }

  function renderCalendarGrid() {
    const grid = document.getElementById('cal-grid');
    const label = document.getElementById('cal-month-label');
    if (!grid) return;
    const year = state.calYear;
    const month = state.calMonth;
    const today = new Date();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    if (label) label.textContent = `${year}年 ${MONTH_NAMES[month]}`;
    grid.innerHTML = '';
    for (let i = firstDay - 1; i >= 0; i--) addCalCell(grid, daysInPrev - i, true, false, null);
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      const events = getEventsForDay(year, month, day);
      const el = addCalCell(grid, day, false, isToday, events);
      el.onclick = () => onDateClick(year, month, day, el);
      if (selectedDateKey === makeDateKey(year, month, day)) el.classList.add('selected');
    }
    const total = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let day = 1; day <= total - firstDay - daysInMonth; day++) addCalCell(grid, day, true, false, null);
  }

  function renderCalendar() {
    renderCalendarGrid();
    renderMonthEvents();
    renderTimeline();
    setCalendarView(currentView);
  }

  function initBounceEffect() {
    if (bounceInitialized) return;
    const area = document.getElementById('calendar-scroll-area');
    const content = document.getElementById('calendar-scroll-content');
    if (!area || !content) return;
    bounceInitialized = true;

    const release = () => {
      content.style.transition = 'transform .62s cubic-bezier(.18,1.34,.24,1)';
      content.style.transform = 'translateY(0px)';
      bounceState = null;
    };

    area.addEventListener('touchstart', (e) => {
      bounceState = { startY: e.touches[0].clientY, lastOffset: 0 };
      content.style.transition = 'transform .16s ease-out';
    }, { passive: true });

    area.addEventListener('touchmove', (e) => {
      if (!bounceState) return;
      const currentY = e.touches[0].clientY;
      const delta = currentY - bounceState.startY;
      const maxTop = Math.max(0, area.scrollHeight - area.clientHeight);
      const isAtTop = area.scrollTop <= 0;
      const isAtBottom = area.scrollTop >= maxTop - 1;
      if ((isAtTop && delta > 0) || (isAtBottom && delta < 0)) {
        e.preventDefault();
        const direction = delta > 0 ? 1 : -1;
        const magnitude = Math.min(64, Math.pow(Math.abs(delta), 0.9) * 0.42);
        bounceState.lastOffset = magnitude * direction;
        content.style.transform = `translateY(${bounceState.lastOffset}px)`;
      }
    }, { passive: false });

    area.addEventListener('touchend', release);
    area.addEventListener('touchcancel', release);
  }

  function initCalendar() {
    state.calendarEvents = loadCalendarEvents();
    customTags = loadCustomTags();
    selectedDateKey = null;
    editingEventId = null;
    editingSourceDateKey = null;
    currentView = 'calendar';
    renderTagButtons();
    setActiveTag(DEFAULT_TAGS[0]);
    updateSheetActionText();
    initBounceEffect();
    renderCalendar();
  }

  function changeMonth(delta) {
    state.calMonth += delta;
    if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
    if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
    if (selectedDateKey) {
      const { year, month } = parseDateKey(selectedDateKey);
      if (year !== state.calYear || month !== state.calMonth + 1) {
        selectedDateKey = null;
        editingEventId = null;
      }
    }
    renderCalendar();
  }

  function closeEventSheet() {
    setSheetOpen(false);
    editingEventId = null;
    updateSheetActionText();
  }

  function openSelectedDateEditor() {
    if (!selectedDateKey) {
      const today = new Date();
      const sameMonth = today.getFullYear() === state.calYear && today.getMonth() === state.calMonth;
      const day = sameMonth ? today.getDate() : 1;
      syncSelectedDate(getCurrentMonthDateKey(day), true);
    }
    clearEventInputs();
    syncSelectedDate(selectedDateKey);
    setSheetOpen(true);
    document.getElementById('event-title-input')?.focus();
  }

  function editEvent(eventId) {
    const found = findEventById(eventId);
    if (!found) return;
    currentView = 'timeline';
    syncSelectedDate(found.dateKey, true);
    fillEventInputs(found.event, found.dateKey);
    setSheetOpen(true);
    document.getElementById('event-title-input')?.focus();
  }

  function deleteEvent(eventId) {
    const found = findEventById(eventId);
    if (!found) return;
    const nextEvents = cloneEventMap();
    nextEvents[found.dateKey] = nextEvents[found.dateKey].filter((item) => item.id !== eventId);
    if (!nextEvents[found.dateKey].length) delete nextEvents[found.dateKey];
    if (editingEventId === eventId) {
      clearEventInputs();
      closeEventSheet();
    }
    if (selectedDateKey === found.dateKey && !nextEvents[found.dateKey]) editingEventId = null;
    commitEvents(nextEvents);
  }

  function deleteEditingEvent() {
    if (!editingEventId) return;
    deleteEvent(editingEventId);
  }

  function clearTimelineFilter() {
    selectedDateKey = null;
    editingEventId = null;
    renderCalendar();
  }

  function saveEvent() {
    const titleInput = document.getElementById('event-title-input');
    const detailInput = document.getElementById('event-detail-input');
    const title = titleInput?.value.trim();
    const detail = detailInput?.value.trim() || '';
    if (!selectedDateKey) { closeEventSheet(); return; }
    if (!title) { titleInput?.focus(); return; }
    const nextEvents = cloneEventMap();
    const targetDateKey = selectedDateKey;
    if (editingEventId) {
      const found = findEventById(editingEventId);
      const sourceDateKey = editingSourceDateKey || found?.dateKey || targetDateKey;
      if (nextEvents[sourceDateKey]) {
        nextEvents[sourceDateKey] = nextEvents[sourceDateKey].filter((item) => item.id !== editingEventId);
        if (!nextEvents[sourceDateKey].length) delete nextEvents[sourceDateKey];
      }
      const nextItem = { ...(found?.event || {}), id: editingEventId, title, detail, tag: selectedTag || '纪念日', coverImage: selectedCoverImage };
      nextEvents[targetDateKey] = [...(nextEvents[targetDateKey] || []), nextItem];
    } else {
      nextEvents[targetDateKey] = [...(nextEvents[targetDateKey] || []), { id: randomId(), title, detail, tag: selectedTag || '纪念日', coverImage: selectedCoverImage }];
    }
    clearEventInputs();
    closeEventSheet();
    commitEvents(nextEvents);
  }

  document.getElementById('event-sheet')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('event-sheet')) closeEventSheet();
  });

  document.getElementById('event-tag-group')?.addEventListener('click', (e) => {
    const customButton = e.target.closest('[data-action="custom-tag"]');
    if (customButton) {
      openTagModal();
      return;
    }
    const button = e.target.closest('[data-tag]');
    if (!button) return;
    setActiveTag(button.dataset.tag);
  });

  document.getElementById('event-date-input')?.addEventListener('change', (e) => {
    if (!e.target.value) return;
    syncSelectedDate(e.target.value, true);
  });

  document.getElementById('event-cover-input')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      selectedCoverImage = String(reader.result || '');
      renderCoverPreview();
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('tag-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('tag-modal')) closeTagModal();
  });

  document.getElementById('date-picker-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('date-picker-modal')) closeDatePicker();
  });

  document.getElementById('tag-modal-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmCustomTag();
    }
  });

  window.initCalendar = initCalendar;
  window.changeMonth = changeMonth;
  window.renderCalendar = renderCalendar;
  window.closeEventSheet = closeEventSheet;
  window.saveEvent = saveEvent;
  window.clearTimelineFilter = clearTimelineFilter;
  window.openSelectedDateEditor = openSelectedDateEditor;
  window.focusTimelineDate = focusTimelineDate;
  window.deleteEditingEvent = deleteEditingEvent;
  window.setCalendarView = setCalendarView;
  window.addCustomTag = addCustomTag;
  window.openSheetDatePicker = openSheetDatePicker;
  window.closeDatePicker = closeDatePicker;
  window.changeDatePickerMonth = changeDatePickerMonth;
  window.jumpDatePickerToday = jumpDatePickerToday;
  window.openTagModal = openTagModal;
  window.closeTagModal = closeTagModal;
  window.confirmCustomTag = confirmCustomTag;
  window.pickEventCover = pickEventCover;
  window.clearEventCover = clearEventCover;
})();









