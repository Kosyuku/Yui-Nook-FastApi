import { api } from '../utils/api.js';

export class TimelinePage {
    constructor(container) {
        this.container = container;
        this.items = [];
    }

    async init() {
        this.renderLayout();
        await this.load();
        this.bindEvents();
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="simple-page">
                <header class="simple-page-header">
                    <h2>日历 / 大事记</h2>
                    <p>按日期查看对话历史，后续会扩展独立事件记录。</p>
                </header>
                <section class="simple-form">
                    <div class="simple-row">
                        <input id="timeline-date" type="date" />
                        <button id="timeline-load-btn" class="save-btn">查询</button>
                    </div>
                </section>
                <section id="timeline-list" class="simple-list"></section>
            </div>
        `;
    }

    async load(date = null) {
        const list = this.container.querySelector('#timeline-list');
        list.innerHTML = '<div class="proactive-empty">加载中...</div>';
        try {
            const res = await api.getHistory(date, 120);
            this.items = res.messages || [];
            if (!this.items.length) {
                list.innerHTML = '<div class="proactive-empty">这一天还没有记录</div>';
                return;
            }
            list.innerHTML = this.items.map((m) => `
                <article class="simple-card">
                    <div class="simple-card-top">
                        <strong>${this.escapeHtml(m.session_title || '未命名会话')}</strong>
                        <small>${this.escapeHtml(m.created_at || '')}</small>
                    </div>
                    <p><b>${m.role === 'user' ? '我' : 'AI'}：</b>${this.escapeHtml(m.content || '')}</p>
                </article>
            `).join('');
        } catch (e) {
            list.innerHTML = '<div class="proactive-empty">历史读取失败</div>';
        }
    }

    bindEvents() {
        const btn = this.container.querySelector('#timeline-load-btn');
        btn.addEventListener('click', async () => {
            const date = this.container.querySelector('#timeline-date').value;
            await this.load(date || null);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
