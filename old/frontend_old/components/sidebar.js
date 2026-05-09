import { api } from '../utils/api.js';

/**
 * 侧边栏组件
 */
export class Sidebar {
    constructor(container, onNavClick, onSessionSelect) {
        this.container = container;
        this.onNavClick = onNavClick;
        this.onSessionSelect = onSessionSelect;
        this.sessions = [];
        this.activeSessionId = null;
        this.currentPath = 'chat';
    }

    async init() {
        this.renderLayout();
        await this.loadSessions();
        this.bindEvents();
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="sidebar-header">
                <span style="font-weight:600; font-size:1.15rem; color: var(--text-main);">Pyro Gemini</span>
            </div>
            
            <ul class="nav-links">
                <li class="nav-item">
                    <a href="#home" class="nav-link active" data-path="home">
                        <span class="icon"><i data-feather="grid" style="width:18px;height:18px;"></i></span> 首页
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#chat" class="nav-link" data-path="chat">
                        <span class="icon"><i data-feather="message-circle" style="width:18px;height:18px;"></i></span> 聊天与陪伴
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#diary" class="nav-link" data-path="diary">
                        <span class="icon"><i data-feather="book-open" style="width:18px;height:18px;"></i></span> 我的日记
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#album" class="nav-link" data-path="album">
                        <span class="icon"><i data-feather="image" style="width:18px;height:18px;"></i></span> 照片库
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#timeline" class="nav-link" data-path="timeline">
                        <span class="icon"><i data-feather="calendar" style="width:18px;height:18px;"></i></span> 日历/大事记
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#moments" class="nav-link" data-path="moments">
                        <span class="icon"><i data-feather="star" style="width:18px;height:18px;"></i></span> 朋友圈
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#memory" class="nav-link" data-path="memory">
                        <span class="icon"><i data-feather="cpu" style="width:18px;height:18px;"></i></span> 记忆管理
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#settings" class="nav-link" data-path="settings">
                        <span class="icon"><i data-feather="settings" style="width:18px;height:18px;"></i></span> 系统配置
                    </a>
                </li>
            </ul>

            <div class="sessions-header">
                最近会话
                <button class="icon-btn new-chat-btn" title="新建会话" style="padding:4px;">
                    <i data-feather="plus" style="width:16px;height:16px;"></i>
                </button>
            </div>
            
            <div class="sessions-wrapper" id="sessions-list">
                <!-- 会话列表 -->
            </div>
        `;
        if (window.feather) feather.replace();
    }

    async loadSessions() {
        try {
            const data = await api.getSessions();
            this.sessions = data.sessions;
            this.renderSessions();
            
            // 自动选中第一个会话（如果存在）
            if (this.sessions.length > 0 && !this.activeSessionId && this.currentPath === 'chat') {
                this.selectSession(this.sessions[0].id);
            }
        } catch (err) {
            console.error("Failed to load sessions:", err);
        }
    }

    renderSessions() {
        const listDiv = this.container.querySelector('#sessions-list');
        listDiv.innerHTML = '';

        this.sessions.forEach(session => {
            const div = document.createElement('div');
            div.className = `session-item ${session.id === this.activeSessionId ? 'active' : ''}`;
            div.textContent = session.title || '新对话';
            div.title = session.title;
            div.dataset.id = session.id;
            
            div.addEventListener('click', () => {
                if (this.currentPath !== 'chat') {
                    window.location.hash = '#chat';
                }
                this.selectSession(session.id);
            });
            
            listDiv.appendChild(div);
        });
    }

    selectSession(id) {
        this.activeSessionId = id;
        this.renderSessions();
        if (this.onSessionSelect) {
            this.onSessionSelect(id);
        }
    }

    setActiveNav(path) {
        this.currentPath = path;
        const links = this.container.querySelectorAll('.nav-link');
        links.forEach(l => {
            if (l.dataset.path === path) {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        });
    }

    bindEvents() {
        // 新建会话
        const newBtn = this.container.querySelector('.new-chat-btn');
        newBtn.addEventListener('click', async () => {
            try {
                const res = await api.createSession('新对话', 'echo');
                this.sessions.unshift(res.session);
                
                if (this.currentPath !== 'chat') {
                    window.location.hash = '#chat';
                }
                this.selectSession(res.session.id);
            } catch (err) {
                alert('新建会话失败');
            }
        });
    }
}
