export class BottomNav {
    constructor(container, onNavigate, onOpenMore) {
        this.container = container;
        this.onNavigate = onNavigate;
        this.onOpenMore = onOpenMore;
        this.current = 'home';
    }

    init() {
        this.container.innerHTML = `
            <nav class="bottom-nav">
                <button class="bottom-nav-item active" data-path="home">
                    <i data-feather="grid"></i>
                    <span>首页</span>
                </button>
                <button class="bottom-nav-item" data-path="chat">
                    <i data-feather="message-circle"></i>
                    <span>聊天</span>
                </button>
                <button class="bottom-nav-item" data-path="diary">
                    <i data-feather="book-open"></i>
                    <span>日记</span>
                </button>
                <button class="bottom-nav-item bottom-nav-more" data-path="more">
                    <i data-feather="more-horizontal"></i>
                    <span>更多</span>
                </button>
            </nav>
        `;
        this.bindEvents();
        if (window.feather) feather.replace();
    }

    setActive(path) {
        this.current = path;
        const items = this.container.querySelectorAll('.bottom-nav-item');
        items.forEach((item) => {
            const isMore = item.dataset.path === 'more';
            const active = isMore ? false : item.dataset.path === path;
            item.classList.toggle('active', active);
        });
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const btn = e.target.closest('.bottom-nav-item');
            if (!btn) return;
            const path = btn.dataset.path;
            if (path === 'more') {
                if (this.onOpenMore) this.onOpenMore();
                return;
            }
            if (this.onNavigate) this.onNavigate(path);
        });
    }
}
