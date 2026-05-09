import { api } from '../utils/api.js';

export class DiaryPage {
    constructor(container) {
        this.container = container;
        this.notes = [];
    }

    async init() {
        this.renderLayout();
        await this.loadNotes();
        this.bindEvents();
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="simple-page">
                <header class="simple-page-header">
                    <h2>日记</h2>
                    <p>写下今天的感受，系统会沉淀为可检索记忆。</p>
                </header>
                <section class="simple-form">
                    <textarea id="diary-content" rows="4" placeholder="写点今天发生的事..."></textarea>
                    <div class="simple-row">
                        <input id="diary-tags" type="text" placeholder="标签（可选，逗号分隔）">
                        <button id="diary-add-btn" class="save-btn">保存日记</button>
                    </div>
                </section>
                <section id="diary-list" class="simple-list"></section>
            </div>
        `;
    }

    async loadNotes() {
        const list = this.container.querySelector('#diary-list');
        list.innerHTML = '<div class="proactive-empty">加载中...</div>';
        try {
            const res = await api.getNotes(null, null, 30);
            this.notes = res.notes || [];
            if (!this.notes.length) {
                list.innerHTML = '<div class="proactive-empty">还没有日记内容</div>';
                return;
            }
            list.innerHTML = this.notes.map((n) => `
                <article class="simple-card">
                    <div class="simple-card-top">
                        <strong>${this.escapeHtml(n.date || '')}</strong>
                        <button class="delete-mem-btn" data-id="${n.id}">删除</button>
                    </div>
                    <p>${this.escapeHtml(n.content || '')}</p>
                    ${n.tags ? `<small>${this.escapeHtml(n.tags)}</small>` : ''}
                </article>
            `).join('');
        } catch (e) {
            list.innerHTML = '<div class="proactive-empty">日记加载失败</div>';
        }
    }

    bindEvents() {
        this.container.addEventListener('click', async (e) => {
            if (e.target.id === 'diary-add-btn') {
                const content = this.container.querySelector('#diary-content').value.trim();
                const tags = this.container.querySelector('#diary-tags').value.trim();
                if (!content) return;
                await api.createNote({ content, tags });
                this.container.querySelector('#diary-content').value = '';
                await this.loadNotes();
            }
            if (e.target.classList.contains('delete-mem-btn')) {
                await api.deleteNote(e.target.dataset.id);
                await this.loadNotes();
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
