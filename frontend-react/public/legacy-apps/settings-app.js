(() => {
  const params = new URLSearchParams(window.location.search);
  const initialTab = params.get('tab') || 'pages';
  const initialSubpage = params.get('subpage') || '';

  const builtinApps = [
    { id: 'chat', icon: '聊', label: '聊天', type: '应用' },
    { id: 'diary', icon: '梦', label: 'Daydream', type: '应用' },
    { id: 'album', icon: '珠', label: 'Perle', type: '应用' },
    { id: 'calendar', icon: '历', label: '日历', type: '应用' },
    { id: 'settings', icon: '设', label: '设置', type: '应用' },
    { id: 'wallpaper', icon: '壁', label: '壁纸', type: '应用' },
    { id: 'folio', icon: '书', label: 'Folio', type: '应用' },
  ];

  const iconPresets = [
    { id: 'chat', label: '聊天', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>' },
    { id: 'book', label: '书本', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.2v12.6m0-12.6C10.84 5.45 9.25 5 7.5 5 5.75 5 4.16 5.45 3 6.2v12.6C4.16 18.05 5.75 17.6 7.5 17.6c1.75 0 3.34.45 4.5 1.2m0-12.6C13.16 5.45 14.75 5 16.5 5c1.75 0 3.34.45 4.5 1.2v12.6c-1.16-.75-2.75-1.2-4.5-1.2-1.75 0-3.34.45-4.5 1.2"/></svg>' },
    { id: 'photo', label: '相册', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.6-4.6a2 2 0 0 1 2.82 0L16 16m-2-2 1.58-1.58a2 2 0 0 1 2.83 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/></svg>' },
    { id: 'calendar', label: '日历', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/></svg>' },
    { id: 'settings', label: '设置', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v3m0 12v3m-6.4-2.2 2.1-2.1m8.6-8.6 2.1-2.1M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1"/><circle cx="12" cy="12" r="3.2"/></svg>' },
    { id: 'mall', label: '商城', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12l-1 11H7L6 7Zm2-2a4 4 0 0 1 8 0"/></svg>' },
    { id: 'memo', label: '备忘录', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h8M8 11h8M8 15h5"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/></svg>' },
    { id: 'spark', label: '装饰', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Zm6 11 1 2.7L22 18l-3 1.3L18 22l-1-2.7L14 18l3-1.3L18 14ZM5 13l.8 2.2L8 16l-2.2.8L5 19l-.8-2.2L2 16l2.2-.8L5 13Z"/></svg>' },
  ];

  const widgetPresets = {
    heartbeat: { label: '心跳线', chip: 'Heartbeat', caption: '我们的小主屏', ornament: 'heartbeat', layout: 'balanced' },
    wings: { label: '羽翼', chip: 'Wings', caption: '在你身边慢慢发光', ornament: 'wings', layout: 'asymmetric' },
    bubbles: { label: '气泡框', chip: 'Bubbles', caption: '今天也有想对你说的话', ornament: 'bubbles', layout: 'balanced' },
  };

  const wallpapers = {
    '雾紫韵': 'linear-gradient(180deg, rgba(248,240,252,0.18), rgba(239,233,246,0.32)), radial-gradient(circle at 30% 20%, rgba(255,255,255,0.82), rgba(255,255,255,0.2) 34%), linear-gradient(135deg, #f3d9ef 0%, #e6e1fb 46%, #dff0ff 100%)',
    '樱花云层': 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.26)), radial-gradient(circle at 70% 18%, rgba(255,255,255,0.92), rgba(255,255,255,0.18) 34%), linear-gradient(135deg, #ffdce8 0%, #ffeef4 40%, #f1e6ff 100%)',
    '奶霜海面': 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.26)), radial-gradient(circle at 35% 22%, rgba(255,255,255,0.88), rgba(255,255,255,0.12) 35%), linear-gradient(135deg, #e7f6ff 0%, #f6fbff 42%, #efe9ff 100%)',
  };
  const mainPages = ['第 1 页', '第 2 页', '第 3 页'];
  const layouts = ['恋爱组件 + 4 App', '恋爱组件 + 6 App', '恋爱组件 + Dock'];
  const colorPresets = ['#a78ec7', '#ea97af', '#78bdd4', '#77b494', '#e5af73', '#9fa8c8', '#d4839a'];
  const tabs = [
    { id: 'pages', label: '主页面' },
    { id: 'apps', label: 'App' },
    { id: 'theme', label: '主题色' },
    { id: 'widget', label: '恋爱组件' },
  ];

  const state = {
    tab: tabs.some(tab => tab.id === initialTab) ? initialTab : 'pages',
    modalOpen: false,
    iconPicker: null,
    subpage: initialSubpage,
    bodyScrollTop: 0,
    previewPage: 0,
    mainPage: '第 1 页',
    layoutStyle: '恋爱组件 + 6 App',
    wallpaper: '雾紫韵',
    customWallpaper: '',
    colorMode: 'follow',
    appFont: 'Zen Maru Gothic',
    fontScale: 100,
    codeFont: '系统默认',
    accent: '#a78ec7',
    hue: 269,
    saturation: 33,
    lightness: 67,
    widgetPreset: 'heartbeat',
    desktopApps: [
      { id: 'chat', icon: '聊', label: '聊天', type: '应用' },
      { id: 'diary', icon: '梦', label: 'Daydream', type: '应用' },
      { id: 'album', icon: '珠', label: 'Perle', type: '应用' },
      { id: 'calendar', icon: '历', label: '日历', type: '应用' },
      { id: 'settings', icon: '设', label: '设置', type: '应用' },
      { id: 'wallpaper', icon: '壁', label: '壁纸', type: '应用' },
      { id: 'folio', icon: '书', label: 'Folio', type: '应用' },
    ],
    dockApps: [
      { id: 'chat', icon: '聊', label: '聊天', type: '应用' },
      { id: 'diary', icon: '梦', label: 'Daydream', type: '应用' },
      { id: 'album', icon: '珠', label: 'Perle', type: '应用' },
      { id: 'settings', icon: '设', label: '设置', type: '应用' },
    ],
    loveWidget: {
      size: '4x2',
      startDate: '2026-03-01',
      leftAvatar: 'https://picsum.photos/seed/me_avatar/200/200',
      rightAvatar: 'https://picsum.photos/seed/partner_gu/200/200',
      leftName: '小酒',
      rightName: '夏彦',
      caption: '私たちの永远の幸福',
      opacity: 84,
    },
    avatarTarget: 'left',
    openPicker: '',
  };

  const root = document.getElementById('settings-app-root');
  if (!root) return;

  function presetById(id) {
    return iconPresets.find(item => item.id === id) || iconPresets[0];
  }

  function defaultIconPreset(appId) {
    return ({
      chat: 'chat',
      diary: 'book',
      album: 'photo',
      calendar: 'calendar',
      settings: 'settings',
      wallpaper: 'photo',
      folio: 'book',
    })[appId] || 'spark';
  }

  function normalizeAppIcon(app) {
    const preset = presetById(app.iconPreset || defaultIconPreset(app.id));
    return {
      ...app,
      iconPreset: preset.id,
      iconSvg: preset.svg,
      iconImage: app.iconImage || '',
      icon: app.icon || app.label?.slice(0, 1) || '•',
    };
  }

  state.desktopApps = state.desktopApps.map(normalizeAppIcon);
  state.dockApps = state.dockApps.map(normalizeAppIcon);

  function renderIconGlyph(app) {
    if (app?.iconImage) return `<span class="icon-image" aria-hidden="true"><img src="${escapeHtml(app.iconImage)}" alt="" /></span>`;
    if (app?.iconSvg) return `<span class="icon-glyph" aria-hidden="true">${app.iconSvg}</span>`;
    return `<span class="icon-letter">${escapeHtml(app?.icon || '•')}</span>`;
  }

  function iconEditSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Zm6 11 1 2.7L22 18l-3 1.3L18 22l-1-2.7L14 18l3-1.3L18 14Z"/></svg>`;
  }

  function renderIconPickerModal() {
    if (!state.iconPicker) return '';
    return `<div class="modal refined-card icon-picker-modal"><p class="section-label">换图标</p><div class="control-bar icon-picker-upload-row"><button class="primary-btn embossed-btn" type="button" data-upload-app-icon>上传本地图片</button></div><div class="modal-grid icon-picker-grid">${iconPresets.map(preset => `<button class="modal-item icon-choice ${state.iconPicker.preset === preset.id && !state.iconPicker.image ? 'active' : ''}" type="button" data-icon-preset="${preset.id}"><span class="modal-badge modal-badge-svg">${preset.svg}</span><span>${escapeHtml(preset.label)}</span></button>`).join('')}</div></div>`;
  }

  function escapeHtml(v) {
    return String(v)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function currentPreset() {
    return widgetPresets[state.widgetPreset] || widgetPresets.heartbeat;
  }

  function widgetClass() {
    return `widget-${state.widgetPreset} widget-layout-${currentPreset().layout}`;
  }

  function daysTogether() {
    const start = new Date(state.loveWidget.startDate);
    if (Number.isNaN(start.getTime())) return 0;
    return Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000));
  }

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function hexToHsl(hex) {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!match) return { h: 269, s: 33, l: 67 };
    const r = parseInt(match[1], 16) / 255;
    const g = parseInt(match[2], 16) / 255;
    const b = parseInt(match[3], 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function syncSlidersFromAccent() {
    const hsl = hexToHsl(state.accent);
    state.hue = hsl.h;
    state.saturation = hsl.s;
    state.lightness = hsl.l;
  }

  function syncAccentFromSliders() {
    state.accent = hslToHex(state.hue, state.saturation, state.lightness);
    document.documentElement.style.setProperty('--accent', state.accent);
    root.style.setProperty('--font-scale-ratio', String(state.fontScale / 100));
    root.querySelector('#accent-hex')?.replaceChildren(document.createTextNode(state.accent.toUpperCase()));
    root.querySelector('#hue-value')?.replaceChildren(document.createTextNode(String(state.hue)));
    root.querySelector('#saturation-value')?.replaceChildren(document.createTextNode(String(state.saturation)));
    root.querySelector('#lightness-value')?.replaceChildren(document.createTextNode(String(state.lightness)));
    root.querySelectorAll('[data-preset]').forEach(btn => btn.classList.toggle('active', btn.dataset.preset.toLowerCase() === state.accent.toLowerCase()));
    root.querySelectorAll('.scene-love-copy strong, .widget-card-copy strong').forEach(node => {
      node.style.color = state.accent;
    });
  }

  function currentWallpaperValue() {
    if (state.wallpaper === '自定义图片' && state.customWallpaper) return `url(${state.customWallpaper}) center / cover no-repeat`;
    return wallpapers[state.wallpaper] || wallpapers['雾紫韵'];
  }

  function widgetSizeClass() {
    return `widget-size-${state.loveWidget.size.replace('x', '-')}`;
  }

  function previewPages() {
    const chunkSize = state.layoutStyle.includes('4 App') ? 4 : 6;
    const items = [...state.desktopApps];
    const pages = [];
    while (items.length) pages.push(items.splice(0, chunkSize));
    if (!pages.length) pages.push([]);
    if (pages.length < 2) pages.push([]);
    else if (pages.length < 3 && pages[pages.length - 1].length) pages.push([]);
    return pages.slice(0, 3);
  }

  function normalizePreviewState(pages) {
    const safePages = pages.length || 1;
    state.previewPage = Math.min(Math.max(0, state.previewPage), safePages - 1);
    const match = /\d+/.exec(state.mainPage || '');
    const wanted = match ? Number(match[0]) - 1 : 0;
    const clamped = Math.min(Math.max(0, wanted), safePages - 1);
    state.mainPage = `第 ${clamped + 1} 页`;
    return clamped;
  }



  function selected(current, value) {
    return String(current) === String(value) ? 'selected' : '';
  }

  function ornamentMarkup() {
    const ornament = currentPreset().ornament;
    if (ornament === 'heartbeat') return '<span class="widget-ornament widget-ornament-heartbeat"></span>';
    if (ornament === 'wings') return '<span class="widget-ornament widget-ornament-wings"></span>';
    return '<span class="widget-ornament widget-ornament-bubbles"></span>';
  }

  function loveCard(extraClass) {
    const preset = currentPreset();
    return `
      <div class="scene-love ${extraClass} ${widgetClass()} ${widgetSizeClass()}" style="background:rgba(255,255,255,${(state.loveWidget.opacity / 100).toFixed(2)})">
        <div class="scene-avatar scene-avatar-left"><img src="${escapeHtml(state.loveWidget.leftAvatar)}" alt="${escapeHtml(state.loveWidget.leftName)}" /></div>
        <div class="scene-love-copy">
          <em class="widget-chip">${escapeHtml(preset.chip)}</em>
          <strong>${daysTogether()}</strong>
          <span>Days Together</span>
          ${ornamentMarkup()}
          <small>${escapeHtml(state.loveWidget.caption || preset.caption)}</small>
        </div>
        <div class="scene-avatar scene-avatar-right"><img src="${escapeHtml(state.loveWidget.rightAvatar)}" alt="${escapeHtml(state.loveWidget.rightName)}" /></div>
      </div>
    `;
  }

  function renderPageScene(page, apps, totalPages, mainIndex) {
    const wallpaper = currentWallpaperValue();
    const isMain = page === mainIndex;
    const showLoveTop = isMain && state.layoutStyle !== '恋爱组件 + Dock';
    const showLoveBottom = isMain && state.layoutStyle === '恋爱组件 + Dock';
    const emptyState = !apps.length ? `
      <button class="scene-page-plus" type="button" data-open-modal>
        <span class="scene-page-plus-badge">+</span>
        <strong>添加这一页</strong>
        <span>把内置 App 放到第 ${page + 1} 页</span>
      </button>
    ` : '';
    return `
      <div class="preview-page" data-page-index="${page}">
        <div class="phone-scene">
          <div class="scene-wallpaper" style="background:${wallpaper}"></div>
          <div class="scene-overlay"></div>
          <div class="scene-status"><span>22:28</span><span>${page + 1}/${totalPages}</span></div>
          <div class="scene-content">
            ${showLoveTop ? loveCard('') : ''}
            <div class="scene-grid ${apps.length ? '' : 'scene-grid-empty'}">
              ${apps.map(app => `
                <div class="scene-app">
                  <div class="scene-app-badge">${app.icon}</div>
                  <span>${escapeHtml(app.label)}</span>
                </div>
              `).join('')}
              ${emptyState}
            </div>
            ${showLoveBottom ? loveCard('scene-love--wide') : ''}
            <div class="scene-dock">
              <div class="scene-dock-grid">
                ${state.dockApps.map(app => `
                  <div class="scene-app">
                    <div class="scene-app-badge">${app.icon}</div>
                    <span>${escapeHtml(app.label)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMainRows() {
    return `
      <div class="card compact-list refined-card">
        ${listButton('排', '页面布局', '控制恋爱组件和图标区的排布', state.layoutStyle, '')}
        ${listButton('景', '背景样式', '预设背景或上传自己的图片', state.wallpaper, 'wallpaper')}
        ${listButton('显', '界面与显示', '日夜模式、字体和缩放', modeLabel(), 'display')}
      </div>
      <div class="card card-pad refined-card">
        <p class="section-label">Layout</p>
        <div class="select-like embossed-group">
          ${layouts.map(layout => optionBtn('layout-style', layout, state.layoutStyle === layout)).join('')}
        </div>
      </div>
      <div class="card card-pad refined-card">
        <p class="section-label">Display</p>
        <div class="select-like embossed-group">${modeBtn('day', '日间模式')}${modeBtn('night', '夜间模式')}${modeBtn('follow', '跟随系统')}</div>
        <div class="two-col compact-display-grid">
          ${pickerField('应用字体', 'appFont', ['Zen Maru Gothic', 'Noto Sans SC', '系统默认'])}
          ${pickerField('代码字体', 'codeFont', ['系统默认', 'JetBrains Mono', 'Fira Code'])}
        </div>
        ${fontScaleSlider()}
      </div>
    `;
  }

  function listButton(icon, title, desc, value, subpage) {
    const arrow = subpage ? '<span class="row-arrow">›</span>' : '<span></span>';
    const action = subpage ? `data-open-subpage="${subpage}"` : '';
    return `
      <button class="compact-row list-button" type="button" ${action}>
        <span class="row-icon">${icon}</span>
        <span class="row-copy"><strong>${title}</strong><span>${desc}</span></span>
        <span class="row-value">${value}</span>
        ${arrow}
      </button>
    `;
  }

  function renderSubpage() {
    if (!state.subpage) return '';
    let title = '';
    let content = '';
    if (state.subpage === 'wallpaper') {
      title = '背景样式';
      content = `
        <div class="subpage-list refined-card">
          <div class="compact-row"><span class="row-icon">景</span><span class="row-copy"><strong>预设背景</strong><span>轻量预设氛围</span></span><span class="row-value">${state.wallpaper}</span><span></span></div>
          <div class="card-pad" style="padding-top:0">
            <div class="select-like embossed-group">${Object.keys(wallpapers).map(name => optionBtn('wallpaper', name, state.wallpaper === name)).join('')}</div>
            <div class="upload-row"><span class="row-copy"><strong style="font-size:11px">自定义图片</strong><span>${state.customWallpaper ? '已上传' : '使用自己的壁纸'}</span></span><button class="inline-upload embossed-btn" type="button" data-upload-wallpaper>上传图片</button></div>
          </div>
        </div>`;
    }
    if (state.subpage === 'display') {
      title = '界面与显示';
      content = `
        <div class="subpage-list refined-card">
          <div class="compact-row"><span class="row-icon">日</span><span class="row-copy"><strong>显示模式</strong><span>日间 / 夜间 / 跟随系统</span></span><span class="row-value row-value-soft">${modeLabel()}</span><span></span></div>
          <div class="card-pad" style="padding-top:0"><div class="select-like embossed-group">${modeBtn('day', '日间模式')}${modeBtn('night', '夜间模式')}${modeBtn('follow', '跟随系统')}</div></div>
          <div class="compact-row"><span class="row-icon">字</span><span class="row-copy"><strong>应用字体</strong><span>全局界面字体</span></span><span class="row-value row-value-soft">${state.appFont}</span><span></span></div>
          <div class="card-pad" style="padding-top:0">${pickerField('应用字体', 'appFont', ['Zen Maru Gothic', 'Noto Sans SC', '系统默认'])}</div>
          <div class="compact-row"><span class="row-icon">A</span><span class="row-copy"><strong>字体缩放</strong><span>控制主要文字密度</span></span><span class="row-value row-value-soft">${state.fontScale}%</span><span></span></div>
          <div class="card-pad" style="padding-top:0">${fontScaleSlider()}${pickerField('代码字体', 'codeFont', ['系统默认', 'JetBrains Mono', 'Fira Code'])}</div>
        </div>`;
    }
    return `
      <div class="subpage-mask ${state.subpage ? 'show' : ''}"></div>
      <section class="subpage-panel ${state.subpage ? 'show' : ''}">
        <header class="subpage-head"><button class="subpage-back" type="button" data-close-subpage>返回</button><div class="subpage-title">${title}</div><span></span></header>
        <div class="subpage-body">${content}</div>
      </section>`;
  }

  function modeLabel() {
    return state.colorMode === 'day' ? '日间模式' : state.colorMode === 'night' ? '夜间模式' : '跟随系统';
  }

  function renderSegmented() {
    const activeIndex = Math.max(0, tabs.findIndex(tab => tab.id === state.tab));
    return `<section class="segmented liquid-tabs" style="--active-index:${activeIndex};"><span class="segmented-indicator"></span>${tabs.map(tab => tabBtn(tab.id, tab.label)).join('')}</section>`;
  }

  function renderWidgetPresetCard(key) {
    const preset = widgetPresets[key];
    const active = state.widgetPreset === key ? 'active' : '';
    return `<button class="widget-preset-card ${active}" type="button" data-widget-preset="${key}"><div class="widget-preset-preview ${key}"><span class="widget-preview-avatar left"></span><span class="widget-preview-center ${preset.ornament}"></span><span class="widget-preview-avatar right"></span><span class="widget-preview-line first"></span><span class="widget-preview-line second"></span></div><strong>${preset.label}</strong><span>${preset.caption}</span></button>`;
  }

  function renderWidgetShowcase() {
    return `
      <div class="card card-pad refined-card widget-preview-shell">
        <p class="section-label">Preset</p>
        <div class="widget-showcase-frame ${widgetSizeClass()}">
          <div class="widget-floating-shell">
          <div class="widget-card-main widget-showcase-sticky ${widgetClass()} ${widgetSizeClass()}">
            <div class="widget-card-bg"></div>
            <div class="widget-card-bubble left"></div>
            <div class="widget-card-bubble right"></div>
            <div class="widget-card-face left"><img src="${escapeHtml(state.loveWidget.leftAvatar)}" alt="${escapeHtml(state.loveWidget.leftName)}" /></div>
            <div class="widget-card-face right"><img src="${escapeHtml(state.loveWidget.rightAvatar)}" alt="${escapeHtml(state.loveWidget.rightName)}" /></div>
            <div class="widget-card-copy"><em>${currentPreset().chip}</em><strong>${daysTogether()}</strong><span>${escapeHtml(state.loveWidget.caption || currentPreset().caption)}</span>${ornamentMarkup()}</div>
            <div class="widget-card-line long"></div><div class="widget-card-line short"></div>
          </div>
          </div>
        </div>
        <div class="widget-preset-grid">${Object.keys(widgetPresets).map(renderWidgetPresetCard).join('')}</div>
      </div>`;
  }

  function render() {
    const currentBody = root.querySelector('.body');
    if (currentBody) state.bodyScrollTop = currentBody.scrollTop;
    const pages = previewPages();
    const mainIndex = normalizePreviewState(pages);
    root.innerHTML = `
      <div class="preview-shell"><div class="preview-phone"><header class="topbar"><button class="top-btn" type="button" aria-label="返回"></button><div class="top-title">设置</div><span></span></header>
      <div class="body"><div class="sticky-group">${renderSegmented()}</div>
      <section class="page ${state.tab === 'pages' ? 'active' : ''}"><section class="card preview-stage refined-card"><div class="preview-stage-frame"><div class="preview-stage-inner preview-stage--sticky"><div class="preview-viewport" id="preview-viewport">${pages.map((apps, index) => renderPageScene(index, apps, pages.length, mainIndex)).join('')}</div></div></div><div class="preview-footer"><div class="preview-dots">${pages.map((_, index) => `<span class="preview-dot ${state.previewPage === index ? 'active' : ''}" data-dot="${index}"></span>`).join('')}</div><div class="preview-main-meta ${state.previewPage === mainIndex ? '' : 'hidden'}"><span class="preview-main-label">主页面</span><strong>第 ${state.previewPage + 1} 页</strong></div><button class="preview-main-btn embossed-btn" type="button" data-set-main data-main-page="${mainIndex}">设为主页</button></div><div class="preview-hint">左右滑动预览屏幕</div></section>${renderMainRows()}</section>
      <section class="page ${state.tab === 'apps' ? 'active' : ''}"><div class="card card-pad refined-card"><p class="section-label">Home Apps</p><div class="control-bar" style="margin-bottom:8px"><button class="primary-btn embossed-btn" type="button" data-open-modal>添加内置 App</button></div><div class="stack">${state.desktopApps.map((app, index) => itemRow(app, index, 'desktop')).join('')}</div></div><div class="card card-pad refined-card"><p class="section-label">Dock</p><div class="stack">${state.dockApps.map((app, index) => itemRow(app, index, 'dock')).join('')}</div></div></section>
      <section class="page ${state.tab === 'theme' ? 'active' : ''}"><div class="card compact-list refined-card">${listButton('色', '主题预设', '快速切换主色', state.accent.toUpperCase(), '')}</div><div class="card card-pad refined-card"><p class="section-label">Preset</p><div class="swatches">${colorPresets.map(color => `<button class="swatch ${color.toLowerCase() === state.accent.toLowerCase() ? 'active' : ''}" type="button" data-preset="${color}" style="background:${color}"></button>`).join('')}</div></div><div class="card card-pad refined-card"><p class="section-label">Custom</p>${slider('色相', 'hue', state.hue, 0, 360, 'color')}${slider('饱和度', 'saturation', state.saturation, 0, 100, 'color')}${slider('明度', 'lightness', state.lightness, 0, 100, 'color')}<div class="color-apply"><span class="color-dot"></span><span class="color-code" id="accent-hex">${state.accent.toUpperCase()}</span><button class="chip-btn active embossed-btn" type="button" data-apply-accent>应用</button></div></div></section>
      <section class="page ${state.tab === 'widget' ? 'active' : ''}">${renderWidgetShowcase()}<div class="card card-pad refined-card"><p class="section-label">Size</p><div class="select-like four embossed-group">${['1x1','2x1','3x1','4x1','2x2','3x2','4x2','4x4'].map(size => `<button class="${state.loveWidget.size === size ? 'active' : ''}" type="button" data-size="${size}">${size}</button>`).join('')}</div></div><div class="card card-pad refined-card"><p class="section-label">Info</p><div class="form-grid">${field('起始日期', `<input type="date" data-field="startDate" value="${state.loveWidget.startDate}" />`)}<div class="two-col">${field('左边名字', `<input type="text" data-field="leftName" value="${escapeHtml(state.loveWidget.leftName)}" />`)}${field('右边名字', `<input type="text" data-field="rightName" value="${escapeHtml(state.loveWidget.rightName)}" />`)}</div>${field('小字标题', `<input type="text" data-field="caption" value="${escapeHtml(state.loveWidget.caption)}" />`)}</div></div><div class="card card-pad refined-card"><p class="section-label">Avatar</p><div class="avatar-pair">${avatarTile('left', '左头像', state.loveWidget.leftAvatar)}${avatarTile('right', '右头像', state.loveWidget.rightAvatar)}</div><div style="margin-top:10px">${slider('卡片透明度', 'opacity', state.loveWidget.opacity, 20, 100, 'widget')}</div></div></section>
      </div>${renderSubpage()}</div></div>
      <div class="modal-backdrop ${(state.modalOpen || state.iconPicker) ? 'show' : ''}" id="modal-backdrop">${state.iconPicker ? renderIconPickerModal() : `<div class="modal refined-card"><p class="section-label">Add App</p><div class="modal-grid">${builtinApps.map(app => `<button class="modal-item" type="button" data-add="${app.id}"><span class="modal-badge">${renderIconGlyph(normalizeAppIcon(app))}</span><span>${escapeHtml(app.label)}</span></button>`).join('')}</div></div>`}</div>
      <input class="hidden-file" id="avatar-file-input" type="file" accept="image/*" />
      <input class="hidden-file" id="wallpaper-file-input" type="file" accept="image/*" />
      <input class="hidden-file" id="app-icon-file-input" type="file" accept="image/*" />`;
    bind();
    afterRender();
  }

  function tabBtn(id, label) { return `<button class="${state.tab === id ? 'active' : ''}" type="button" data-tab="${id}">${label}</button>`; }
  function optionBtn(group, value, active) { return `<button class="${active ? 'active' : ''}" type="button" data-option-group="${group}" data-option-value="${escapeHtml(value)}">${value}</button>`; }
  function modeBtn(value, label) { return `<button class="${state.colorMode === value ? 'active' : ''}" type="button" data-mode="${value}">${label}</button>`; }
  function itemRow(app, index, scope) { return `<div class="item-row embossed-soft refined-card-inner"><span class="item-badge">${renderIconGlyph(app)}</span><span class="item-meta"><strong>${escapeHtml(app.label)}</strong><span>${app.type}</span></span><span class="item-actions"><button class="icon-btn icon-btn-svg embossed-btn" type="button" data-edit-icon="1" data-scope="${scope}" data-index="${index}" aria-label="换图标">${iconEditSvg()}</button><button class="icon-btn embossed-btn" type="button" data-move="up" data-scope="${scope}" data-index="${index}">↑</button><button class="icon-btn embossed-btn" type="button" data-move="down" data-scope="${scope}" data-index="${index}">↓</button><button class="icon-btn embossed-btn" type="button" data-remove="${scope}" data-index="${index}">×</button></span></div>`; }
  function avatarTile(side, label, avatar) { return `<button class="avatar-tile embossed-soft" type="button" data-avatar="${side}"><span class="avatar-thumb"><img src="${escapeHtml(avatar)}" alt="${escapeHtml(label)}" /></span><span class="avatar-meta"><strong>${label}</strong><span>点击替换</span></span></button>`; }
  function field(label, control) { return `<div class="field"><label>${label}</label>${control}</div>`; }
  function pickerField(label, key, options) {
    return `<div class="field"><label>${label}</label><div class="beauty-select${key === 'codeFont' ? ' beauty-select-up' : ''} ${state.openPicker === key ? 'open' : ''}"><button class="beauty-select-trigger embossed-btn" type="button" data-picker-toggle="${key}"><span>${escapeHtml(state[key])}</span><span class="beauty-select-arrow">⌄</span></button><div class="beauty-select-menu">${options.map(option => `<button class="${state[key] === option ? 'active' : ''}" type="button" data-picker="${key}" data-picker-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('')}</div></div></div>`;
  }
  function fontScaleSlider() { return `<div class="slider-block slider-block-compact"><div class="slider-head"><span>字体缩放</span><span id="font-scale-value">${state.fontScale}%</span></div><input type="range" class="linear-slider" min="80" max="120" step="5" value="${state.fontScale}" data-font-scale-slider="fontScale" /></div>`; }
  function slider(label, key, value, min, max, scope) { const attr = scope === 'widget' ? 'data-widget-slider' : 'data-color-slider'; const cls = scope === 'color' ? 'linear-slider color-slider' : 'linear-slider widget-slider'; return `<div class="slider-block"><div class="slider-head"><span>${label}</span><span id="${key}-value">${value}</span></div><input type="range" class="${cls}" min="${min}" max="${max}" value="${value}" ${attr}="${key}" /></div>`; }

  function afterRender() {
    document.documentElement.style.setProperty('--accent', state.accent);
    root.querySelector('.preview-phone')?.style.setProperty('--font-scale-ratio', String(state.fontScale / 100));
    root.querySelectorAll('.scene-love-copy strong, .widget-card-copy strong').forEach(node => { node.style.color = state.accent; });
    const viewport = root.querySelector('#preview-viewport');
    if (viewport) viewport.scrollLeft = viewport.clientWidth * state.previewPage;
    const body = root.querySelector('.body');
    if (body) {
      body.scrollTop = state.bodyScrollTop || 0;
      body.classList.toggle('preview-condensed', body.scrollTop > 36 && (state.tab === 'pages' || state.tab === 'widget'));
    }
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'settings-app-sync',
        payload: {
          mainPage: state.mainPage,
          layoutStyle: state.layoutStyle,
          wallpaper: state.wallpaper,
          customWallpaper: state.customWallpaper,
          accent: state.accent,
          desktopApps: state.desktopApps,
          dockApps: state.dockApps,
          loveWidget: state.loveWidget,
          widgetPreset: state.widgetPreset,
        }
      }, '*');
    }
  }

  function bind() {
    root.querySelector('.top-btn')?.addEventListener('click', () => {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'settings-app-close' }, '*');
        return;
      }
      history.back();
    });
    root.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => { state.tab = btn.dataset.tab; state.subpage = ''; state.openPicker = ''; render(); }));
    root.querySelector('.body')?.addEventListener('scroll', e => { const body = e.currentTarget; body.classList.toggle('preview-condensed', body.scrollTop > 36 && (state.tab === 'pages' || state.tab === 'widget')); }, { passive: true });
    root.querySelectorAll('[data-open-subpage]').forEach(btn => btn.addEventListener('click', () => { if (!btn.dataset.openSubpage) return; state.subpage = btn.dataset.openSubpage; render(); }));
    root.querySelector('[data-close-subpage]')?.addEventListener('click', () => { state.subpage = ''; render(); });
    root.querySelectorAll('[data-option-group]').forEach(btn => btn.addEventListener('click', () => { const value = btn.dataset.optionValue; if (btn.dataset.optionGroup === 'layout-style') state.layoutStyle = value; if (btn.dataset.optionGroup === 'wallpaper') state.wallpaper = value; render(); }));
    root.querySelectorAll('[data-mode]').forEach(btn => btn.addEventListener('click', () => { state.colorMode = btn.dataset.mode; render(); }));
    root.querySelectorAll('[data-widget-preset]').forEach(btn => btn.addEventListener('click', () => { state.widgetPreset = btn.dataset.widgetPreset; const captions = Object.values(widgetPresets).map(item => item.caption); if (!state.loveWidget.caption || captions.includes(state.loveWidget.caption)) state.loveWidget.caption = widgetPresets[state.widgetPreset].caption; render(); }));
    root.querySelector('[data-set-main]')?.addEventListener('click', () => { state.mainPage = `第 ${state.previewPage + 1} 页`; render(); });
    root.querySelectorAll('[data-select]').forEach(select => select.addEventListener('change', () => { state[select.dataset.select] = select.value; }));
    root.querySelectorAll('[data-picker-toggle]').forEach(btn => btn.addEventListener('click', () => { state.openPicker = state.openPicker === btn.dataset.pickerToggle ? '' : btn.dataset.pickerToggle; render(); }));
    root.querySelectorAll('[data-picker]').forEach(btn => btn.addEventListener('click', () => { state[btn.dataset.picker] = btn.dataset.pickerValue; state.openPicker = ''; render(); }));
    root.querySelectorAll('[data-font-scale-slider]').forEach(input => {
      const update = () => {
        state.fontScale = Number(input.value);
        root.querySelector('.preview-phone')?.style.setProperty('--font-scale-ratio', String(Number(input.value) / 100));
        root.querySelector('#font-scale-value')?.replaceChildren(document.createTextNode(`${input.value}%`));
        root.querySelectorAll('.row-value-soft').forEach(el => { if (el.textContent.includes('%')) el.replaceChildren(document.createTextNode(`${input.value}%`)); });
      };
      input.addEventListener('input', update);
      input.addEventListener('change', update);
    });

    const viewport = root.querySelector('#preview-viewport');
    if (viewport) {
      let ticking = false;
      viewport.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const page = Math.round(viewport.scrollLeft / (viewport.clientWidth || 1));
          if (page !== state.previewPage) {
            state.previewPage = page;
            root.querySelectorAll('[data-dot]').forEach(dot => dot.classList.toggle('active', Number(dot.dataset.dot) === page));
            const mainMeta = root.querySelector('.preview-main-meta');
            const mainPageIndex = Number(root.querySelector('[data-set-main]')?.dataset.mainPage ?? -1);
            mainMeta?.classList.toggle('hidden', mainPageIndex !== page);
            root.querySelector('.preview-main-meta strong')?.replaceChildren(document.createTextNode(`第 ${page + 1} 页`));
          }
          ticking = false;
        });
      }, { passive: true });
    }

    root.querySelectorAll('[data-open-modal]').forEach(btn => btn.addEventListener('click', () => { state.modalOpen = true; state.iconPicker = null; render(); }));
    root.querySelector('#modal-backdrop')?.addEventListener('click', e => { if (e.target.id === 'modal-backdrop') { state.modalOpen = false; state.iconPicker = null; render(); } });
    root.querySelector('.body')?.addEventListener('click', e => { if (!e.target.closest('.beauty-select') && state.openPicker) { state.openPicker = ''; render(); } });
    root.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => { const app = builtinApps.find(item => item.id === btn.dataset.add); if (!app) return; state.desktopApps.push(normalizeAppIcon({ ...app })); state.modalOpen = false; render(); }));
    root.querySelectorAll('[data-edit-icon]').forEach(btn => btn.addEventListener('click', () => {
      const scope = btn.dataset.scope === 'dock' ? 'dock' : 'desktop';
      const list = scope === 'dock' ? state.dockApps : state.desktopApps;
      const index = Number(btn.dataset.index);
      const app = list[index];
      if (!app) return;
      state.iconPicker = { scope, index, preset: app.iconPreset || defaultIconPreset(app.id) };
      state.modalOpen = false;
      render();
    }));
    root.querySelectorAll('[data-icon-preset]').forEach(btn => btn.addEventListener('click', () => {
      if (!state.iconPicker) return;
      const list = state.iconPicker.scope === 'dock' ? state.dockApps : state.desktopApps;
      const app = list[state.iconPicker.index];
      if (!app) return;
      const preset = presetById(btn.dataset.iconPreset);
      app.iconPreset = preset.id;
      app.iconSvg = preset.svg;
      app.iconImage = '';
      state.iconPicker = null;
      render();
    }));
    const appIconFileInput = root.querySelector('#app-icon-file-input');
    root.querySelector('[data-upload-app-icon]')?.addEventListener('click', () => appIconFileInput?.click());
    appIconFileInput?.addEventListener('change', () => {
      const file = appIconFileInput.files?.[0];
      if (!file || !state.iconPicker) return;
      const list = state.iconPicker.scope === 'dock' ? state.dockApps : state.desktopApps;
      const app = list[state.iconPicker.index];
      if (!app) return;
      const reader = new FileReader();
      reader.onload = event => {
        app.iconImage = String(event.target?.result || '');
        state.iconPicker = null;
        render();
      };
      reader.readAsDataURL(file);
      appIconFileInput.value = '';
    });
    root.querySelectorAll('[data-move]').forEach(btn => btn.addEventListener('click', () => { const list = btn.dataset.scope === 'dock' ? state.dockApps : state.desktopApps; const index = Number(btn.dataset.index); const next = btn.dataset.move === 'up' ? index - 1 : index + 1; if (next < 0 || next >= list.length) return; const [item] = list.splice(index, 1); list.splice(next, 0, item); render(); }));
    root.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => { const list = btn.dataset.remove === 'dock' ? state.dockApps : state.desktopApps; list.splice(Number(btn.dataset.index), 1); render(); }));
    root.querySelectorAll('[data-preset]').forEach(btn => btn.addEventListener('click', () => { state.accent = btn.dataset.preset; syncSlidersFromAccent(); render(); }));
    root.querySelectorAll('[data-color-slider]').forEach(input => { const update = () => { state[input.dataset.colorSlider] = Number(input.value); syncAccentFromSliders(); }; input.addEventListener('input', update); input.addEventListener('change', update); });
    root.querySelector('[data-apply-accent]')?.addEventListener('click', () => render());
    root.querySelectorAll('[data-size]').forEach(btn => btn.addEventListener('click', () => { state.loveWidget.size = btn.dataset.size; render(); }));
    root.querySelectorAll('[data-field]').forEach(input => { input.addEventListener('input', () => { state.loveWidget[input.dataset.field] = input.value; if (input.dataset.field === 'caption') root.querySelectorAll('.scene-love-copy small, .widget-card-copy span').forEach(el => el.replaceChildren(document.createTextNode(input.value))); }); input.addEventListener('change', () => render()); });
    root.querySelectorAll('[data-widget-slider]').forEach(input => { const update = () => { state.loveWidget[input.dataset.widgetSlider] = Number(input.value); root.querySelector(`#${input.dataset.widgetSlider}-value`)?.replaceChildren(document.createTextNode(String(input.value))); root.querySelectorAll('.scene-love, .widget-card-main').forEach(card => { card.style.setProperty('background', `rgba(255,255,255,${(Number(input.value) / 100).toFixed(2)})`); }); }; input.addEventListener('input', update); input.addEventListener('change', update); });

    const avatarFileInput = root.querySelector('#avatar-file-input');
    root.querySelectorAll('[data-avatar]').forEach(btn => btn.addEventListener('click', () => { state.avatarTarget = btn.dataset.avatar; avatarFileInput?.click(); }));
    avatarFileInput?.addEventListener('change', () => { const file = avatarFileInput.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = event => { const result = String(event.target?.result || ''); if (state.avatarTarget === 'left') state.loveWidget.leftAvatar = result; else state.loveWidget.rightAvatar = result; render(); }; reader.readAsDataURL(file); avatarFileInput.value = ''; });

    const wallpaperFileInput = root.querySelector('#wallpaper-file-input');
    root.querySelector('[data-upload-wallpaper]')?.addEventListener('click', () => wallpaperFileInput?.click());
    wallpaperFileInput?.addEventListener('change', () => { const file = wallpaperFileInput.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = event => { state.customWallpaper = String(event.target?.result || ''); state.wallpaper = '自定义图片'; render(); }; reader.readAsDataURL(file); wallpaperFileInput.value = ''; });
  }

  syncSlidersFromAccent();
  render();
})();
















