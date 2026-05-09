const ITEMS = [
    { path: 'album', label: '照片库', icon: 'image' },
    { path: 'timeline', label: '日历/大事记', icon: 'calendar' },
    { path: 'memory', label: '记忆库管理', icon: 'cpu' },
    { path: 'settings', label: '设置', icon: 'settings' },
    { path: 'moments', label: '朋友圈', icon: 'star' },
];

export class MoreDrawer {
    constructor(container, onNavigate) {
        this.container = container;
        this.onNavigate = onNavigate;
        this.opened = false;
    }

    init() {
        const rows = ITEMS.map(
            (item) => `
            <button class="drawer-item" data-path="${item.path}">
                <span class="drawer-item-icon"><i data-feather="${item.icon}"></i></span>
                <span class="drawer-item-label">${item.label}</span>
            </button>`
        ).join('');

        this.container.innerHTML = `
            <div class="drawer-mask" id="drawer-mask"></div>
            <aside class="more-drawer" id="more-drawer-panel">
                <div class="drawer-header">
                    <h3>更多功能</h3>
                    <button class="icon-btn" id="drawer-close-btn"><i data-feather="x"></i></button>
                </div>
                <div class="drawer-grid">${rows}</div>
            </aside>
        `;
        this.bindEvents();
        if (window.feather) feather.replace();
    }

    open() {
        this.opened = true;
        this.container.classList.add('open');
    }

    close() {
        this.opened = false;
        this.container.classList.remove('open');
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const closeBtn = e.target.closest('#drawer-close-btn');
            const mask = e.target.closest('#drawer-mask');
            const item = e.target.closest('.drawer-item');
            if (closeBtn || mask) {
                this.close();
                return;
            }
            if (item) {
                const path = item.dataset.path;
                this.close();
                if (this.onNavigate) this.onNavigate(path);
            }
        });
    }
}
