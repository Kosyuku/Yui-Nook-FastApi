import { api } from '../utils/api.js';

export class MemoryPage {
    constructor(container) {
        this.container = container;
        this.currentCategory = null;
        this.memories = [];
    }

    async init() {
        this.renderLayout();
        await this.loadMemories();
        this.bindEvents();
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="memory-page">
                <header class="chat-header">
                    <button class="mobile-menu-btn" id="mobile-menu-btn">☰</button>
                    <div class="chat-title">🧠 记忆管理</div>
                </header>

                <div class="memory-controls">
                    <div class="filter-tabs">
                        <button class="filter-btn active" data-category="">全部</button>
                        <button class="filter-btn" data-category="deep">深层</button>
                        <button class="filter-btn" data-category="daily">日常</button>
                        <button class="filter-btn" data-category="diary">日记</button>
                        <button class="filter-btn" data-category="writing">写文</button>
                    </div>
                </div>

                <div class="memory-list" id="memory-list">
                    <!-- 记忆卡片 -->
                    <div class="loading-state">同步意识中...</div>
                </div>
            </div>
        `;
    }

    async loadMemories() {
        const listContainer = this.container.querySelector('#memory-list');
        try {
            const res = await api.getMemories(this.currentCategory);
            this.memories = res.memories;
            this.renderMemories();
        } catch (err) {
            listContainer.innerHTML = '<div class="error-state">加载失败</div>';
        }
    }

    renderMemories() {
        const listContainer = this.container.querySelector('#memory-list');
        if (this.memories.length === 0) {
            listContainer.innerHTML = '<div class="empty-state">尚无记忆沉淀</div>';
            return;
        }

        listContainer.innerHTML = '';
        this.memories.forEach(mem => {
            const card = document.createElement('div');
            card.className = `memory-card cat-${mem.category}`;
            
            const timeStr = new Date(mem.updated_at).toLocaleString();
            
            card.innerHTML = `
                <div class="card-header">
                    <span class="category-tag">${this.translateCategory(mem.category)}</span>
                    <span class="time-tag">${timeStr}</span>
                </div>
                <div class="card-content">${this.escapeHtml(mem.content)}</div>
                ${mem.tags ? `<div class="card-tags">${mem.tags.split(',').map(t => `<span>#${t.trim()}</span>`).join('')}</div>` : ''}
                <div class="card-actions">
                    <button class="delete-mem-btn" data-id="${mem.id}">删除</button>
                </div>
            `;
            listContainer.appendChild(card);
        });
    }

    translateCategory(cat) {
        const map = {
            'deep': '深层人设',
            'daily': '日常杂记',
            'diary': '情感日记',
            'writing': '灵感创作'
        };
        return map[cat] || cat;
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    bindEvents() {
        // 分类切换
        const filterBtns = this.container.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category || null;
                await this.loadMemories();
            });
        });

        // 删除按钮
        this.container.addEventListener('click', async (e) => {
            if (e.target.classList.contains('delete-mem-btn')) {
                const id = e.target.dataset.id;
                if (confirm('确定要抹除这段记忆吗？')) {
                    try {
                        await api.deleteMemory(id);
                        await this.loadMemories();
                    } catch (err) {
                        alert('删除失败');
                    }
                }
            }
        });

        // 手机端汉堡菜单
        const mobileBtn = this.container.querySelector('#mobile-menu-btn');
        const sidebar = document.getElementById('sidebar-container');
        if (mobileBtn && sidebar) {
            mobileBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
        }
    }
}
