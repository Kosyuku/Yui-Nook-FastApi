import { api } from '../utils/api.js';

export class HomePage {
    constructor(container, onNavigate) {
        this.container = container;
        this.onNavigate = onNavigate;
        this.pollTimer = null;
        this.latestProactive = [];
    }

    async init() {
        this.renderLayout();
        await this.loadProactive();
        this.startPolling();
        this.bindEvents();
    }

    destroy() {
        if (this.pollTimer) {
            clearInterval(this.pollTimer);
            this.pollTimer = null;
        }
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="home-page">
                <section class="home-hero-card">
                    <div class="home-avatar"></div>
                    <div class="home-hero-text">
                        <h2>Pyro 桌面</h2>
                        <p>今天也在这里，接住你的日常。</p>
                    </div>
                </section>

                <section class="home-widget-grid">
                    <button class="home-widget large" data-path="chat">
                        <i data-feather="message-circle"></i>
                        <span>聊天</span>
                    </button>
                    <button class="home-widget" data-path="diary">
                        <i data-feather="book-open"></i>
                        <span>日记</span>
                    </button>
                    <button class="home-widget" data-path="album">
                        <i data-feather="image"></i>
                        <span>照片库</span>
                    </button>
                    <button class="home-widget" data-path="timeline">
                        <i data-feather="calendar"></i>
                        <span>日历/大事记</span>
                    </button>
                    <button class="home-widget" data-path="memory">
                        <i data-feather="cpu"></i>
                        <span>记忆库</span>
                    </button>
                    <button class="home-widget" data-path="moments">
                        <i data-feather="star"></i>
                        <span>朋友圈</span>
                    </button>
                </section>

                <section class="home-note-card">
                    <div class="home-note-title">NOTE</div>
                    <p>把今天最重要的一句话写进日记，明天会感谢今天的自己。</p>
                </section>

                <section class="proactive-strip" id="proactive-strip">
                    <div class="proactive-title">消息通知</div>
                    <div class="proactive-list" id="proactive-list">
                        <div class="proactive-empty">暂无主动消息</div>
                    </div>
                </section>
            </div>
        `;
        if (window.feather) feather.replace();
    }

    async loadProactive() {
        const listEl = this.container.querySelector('#proactive-list');
        if (!listEl) return;
        try {
            const res = await api.getProactive(3);
            this.latestProactive = (res.messages || []).slice(0, 3);
            if (this.latestProactive.length === 0) {
                listEl.innerHTML = '<div class="proactive-empty">暂无主动消息</div>';
                return;
            }
            listEl.innerHTML = this.latestProactive.map((msg) => `
                <button class="proactive-item" data-id="${msg.id}">
                    <span>${this.escapeHtml(msg.content || '你有一条新消息')}</span>
                </button>
            `).join('');
        } catch (e) {
            listEl.innerHTML = '<div class="proactive-empty">消息读取失败</div>';
        }
    }

    startPolling() {
        if (this.pollTimer) clearInterval(this.pollTimer);
        this.pollTimer = setInterval(() => this.loadProactive(), 25000);
    }

    bindEvents() {
        this.container.addEventListener('click', async (e) => {
            const widget = e.target.closest('.home-widget');
            if (widget && this.onNavigate) {
                this.onNavigate(widget.dataset.path);
                return;
            }
            const item = e.target.closest('.proactive-item');
            if (item) {
                const id = item.dataset.id;
                try {
                    await api.markProactiveRead(id);
                } catch (err) {
                    // 标记失败不阻塞跳转
                }
                if (this.onNavigate) this.onNavigate('chat');
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
