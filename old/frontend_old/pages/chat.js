import { api } from '../utils/api.js';

const QUICK_CAPSULES = ['今天怎么样？', '随便聊聊', '帮我想个故事', '你在做什么'];

export class ChatPage {
    constructor(container) {
        this.container = container;
        this.currentSessionId = null;
        this.currentView = 'list'; // 'list' | 'detail'
        this.sessions = [];
        this.models = [];
        this.isGenerating = false;

        marked.setOptions({
            breaks: true,
            highlight: (code, lang) => {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            }
        });
    }

    // ─────────────────────────────────────────────
    //  LIST VIEW
    // ─────────────────────────────────────────────
    async init() {
        this.currentView = 'list';
        this._showBottomNav(true);
        this.container.innerHTML = `
            <div class="chat-list-page">
                <header class="chat-list-header">
                    <h1 class="chat-list-title">消息</h1>
                    <button class="icon-btn" id="new-chat-fab" title="新建对话">
                        <i data-feather="edit-2"></i>
                    </button>
                </header>
                <div class="chat-list-body" id="chat-list-body">
                    <div class="chat-list-loading">加载中…</div>
                </div>
            </div>
        `;
        if (window.feather) feather.replace();
        await this._loadSessions();
        this._bindListEvents();
    }

    async _loadSessions() {
        try {
            const data = await api.getSessions();
            this.sessions = data.sessions || [];
            this._renderContactList();
        } catch {
            const body = this.container.querySelector('#chat-list-body');
            if (body) body.innerHTML = '<div class="chat-empty-hint">无法连接后端，请检查配置</div>';
        }
    }

    _renderContactList() {
        const body = this.container.querySelector('#chat-list-body');
        if (!body) return;

        if (this.sessions.length === 0) {
            body.innerHTML = `
                <div class="chat-empty-hint">
                    还没有对话<br>
                    <span style="font-size:0.82rem">点右上角新建一个吧 ✏️</span>
                </div>
            `;
            return;
        }

        body.innerHTML = this.sessions.map(s => `
            <div class="chat-contact-item" data-id="${s.id}">
                <div class="contact-avatar">
                    <img src="assets/icons/apple-touch-icon.svg" alt="AI 头像" draggable="false">
                </div>
                <div class="contact-info">
                    <div class="contact-name-row">
                        <span class="contact-name">${this._esc(s.title || '新对话')}</span>
                        <span class="contact-time">${this._fmtTime(s.updated_at || s.created_at)}</span>
                    </div>
                    <div class="contact-preview">轻触继续对话</div>
                </div>
            </div>
        `).join('');
        if (window.feather) feather.replace();
    }

    _bindListEvents() {
        const body = this.container.querySelector('#chat-list-body');
        body?.addEventListener('click', e => {
            const item = e.target.closest('.chat-contact-item');
            if (item) this.loadSession(item.dataset.id);
        });

        const newBtn = this.container.querySelector('#new-chat-fab');
        newBtn?.addEventListener('click', async () => {
            try {
                const res = await api.createSession('新对话', 'echo');
                this.sessions.unshift(res.session);
                this.loadSession(res.session.id);
            } catch (err) {
                console.error('新建会话失败', err);
            }
        });
    }

    // ─────────────────────────────────────────────
    //  DETAIL VIEW
    // ─────────────────────────────────────────────
    async loadSession(sessionId) {
        this.currentSessionId = sessionId;
        this.currentView = 'detail';
        this._showBottomNav(false);
        await this._renderDetail();
        await Promise.all([this._loadModels(), this._loadMessages()]);
        this._bindDetailEvents();
    }

    _renderDetail() {
        const session = this.sessions.find(s => s.id === this.currentSessionId);
        const title = this._esc(session?.title || '对话');

        this.container.innerHTML = `
            <div class="chat-page chat-detail-page" id="chat-detail-page">
                <header class="chat-header chat-detail-header">
                    <button class="icon-btn back-btn" id="chat-back-btn">
                        <i data-feather="chevron-left"></i>
                    </button>
                    <div class="chat-header-center">
                        <div class="contact-avatar contact-avatar-sm">
                            <img src="assets/icons/apple-touch-icon.svg" alt="AI">
                        </div>
                        <span class="chat-title" id="chat-title-display">${title}</span>
                    </div>
                    <div class="header-actions">
                        <button class="icon-btn" id="chat-settings-btn" title="联系人设置">
                            <i data-feather="sliders"></i>
                        </button>
                    </div>
                </header>

                <div class="messages-container" id="messages-container">
                    <div class="chat-loading-hint">加载中…</div>
                </div>

                <div class="input-area">
                    <div class="quick-capsules" id="quick-capsules">
                        ${QUICK_CAPSULES.map(c => `<button class="quick-capsule">${c}</button>`).join('')}
                    </div>
                    <div class="input-toolbar">
                        <div class="model-selector-pill">
                            <i data-feather="cpu"></i>
                            <select id="model-select" title="选择模型">
                                <option value="echo">Echo</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <button class="icon-btn action-btn" title="附件">
                            <i data-feather="plus-circle"></i>
                        </button>
                        <textarea id="chat-input" placeholder="说点什么…" rows="1"></textarea>
                        <button class="icon-btn action-btn" id="voice-btn" title="语音">
                            <i data-feather="mic"></i>
                        </button>
                        <button id="send-btn" title="发送">
                            <i data-feather="arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        if (window.feather) feather.replace();
    }

    async _loadModels() {
        try {
            const res = await api.getModels();
            this.models = res.providers.filter(p => p.purpose === 'chat' && p.enabled === 'True');
            const select = this.container.querySelector('#model-select');
            if (!select) return;
            let html = '<option value="echo">Echo (内置测试)</option>';
            this.models.forEach(m => {
                if (m.provider !== 'echo') {
                    html += `<option value="${m.provider}">${m.provider} (${m.model})</option>`;
                }
            });
            select.innerHTML = html;
        } catch {
            // echo is still available
        }
    }

    async _loadMessages() {
        const msgContainer = this.container.querySelector('#messages-container');
        const titleDisplay = this.container.querySelector('#chat-title-display');
        try {
            const data = await api.getSessionData(this.currentSessionId);
            if (titleDisplay) titleDisplay.textContent = data.session.title;

            // sync title into local sessions list
            const ls = this.sessions.find(s => s.id === this.currentSessionId);
            if (ls) ls.title = data.session.title;

            const select = this.container.querySelector('#model-select');
            if (select && data.session.model) {
                if (select.querySelector(`option[value="${data.session.model}"]`)) {
                    select.value = data.session.model;
                }
            }

            if (!msgContainer) return;
            msgContainer.innerHTML = '';

            if (data.messages.length === 0) {
                msgContainer.innerHTML = '<div class="chat-empty-hint" style="padding-top:40px">打个招呼吧 👋</div>';
            } else {
                data.messages.forEach(msg => this.appendMessage(msg.role, msg.content, false));
            }
            this._scrollToBottom();
            setTimeout(() => this.container.querySelector('#chat-input')?.focus(), 100);
        } catch {
            if (msgContainer) msgContainer.innerHTML = '<div class="chat-empty-hint" style="color:#ef4444">加载失败，请重试</div>';
        }
    }

    _bindDetailEvents() {
        // back
        this.container.querySelector('#chat-back-btn')?.addEventListener('click', () => this.init());

        // settings sheet
        this.container.querySelector('#chat-settings-btn')?.addEventListener('click', () => {
            this._openSettingsSheet();
        });

        // model change
        this.container.querySelector('#model-select')?.addEventListener('change', async e => {
            if (this.currentSessionId) {
                await api.updateSession(this.currentSessionId, { model: e.target.value });
            }
        });

        // textarea auto-height
        const input = this.container.querySelector('#chat-input');
        input?.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 200) + 'px';
        });
        input?.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
        });

        // send
        this.container.querySelector('#send-btn')?.addEventListener('click', () => this.sendMessage());

        // quick capsules
        this.container.querySelector('#quick-capsules')?.addEventListener('click', e => {
            const btn = e.target.closest('.quick-capsule');
            if (btn) {
                const inp = this.container.querySelector('#chat-input');
                if (inp) {
                    inp.value = btn.textContent;
                    inp.focus();
                }
            }
        });
    }

    _openSettingsSheet() {
        // Build a slide-up settings sheet
        let sheet = document.getElementById('chat-settings-sheet');
        if (sheet) { sheet.remove(); return; }

        sheet = document.createElement('div');
        sheet.id = 'chat-settings-sheet';
        sheet.className = 'settings-sheet-overlay';
        const session = this.sessions.find(s => s.id === this.currentSessionId);
        sheet.innerHTML = `
            <div class="settings-sheet-mask"></div>
            <div class="settings-sheet">
                <div class="settings-sheet-handle"></div>
                <div class="settings-sheet-header">
                    <span class="settings-sheet-title">联系人设置</span>
                    <button class="icon-btn" id="close-settings-sheet"><i data-feather="x"></i></button>
                </div>
                <div class="settings-sheet-body">
                    <div class="sheet-section-label">对话标题</div>
                    <input class="sheet-input" id="sheet-session-title" value="${this._esc(session?.title || '')}">
                    <div class="sheet-section-label" style="margin-top:1rem">模型（下次生效）</div>
                    <div class="sheet-model-hint">在聊天框顶部的下拉选择器中切换</div>
                    <button class="sheet-danger-btn" id="sheet-delete-session">删除此对话</button>
                </div>
            </div>
        `;
        document.body.appendChild(sheet);
        if (window.feather) feather.replace();

        requestAnimationFrame(() => sheet.classList.add('open'));

        const close = () => {
            sheet.classList.remove('open');
            setTimeout(() => sheet.remove(), 280);
        };

        sheet.querySelector('.settings-sheet-mask')?.addEventListener('click', close);
        sheet.querySelector('#close-settings-sheet')?.addEventListener('click', close);

        // Save title on blur
        const titleInput = sheet.querySelector('#sheet-session-title');
        titleInput?.addEventListener('change', async () => {
            const newTitle = titleInput.value.trim();
            if (newTitle && this.currentSessionId) {
                await api.updateSession(this.currentSessionId, { title: newTitle });
                const ls = this.sessions.find(s => s.id === this.currentSessionId);
                if (ls) ls.title = newTitle;
                const display = this.container.querySelector('#chat-title-display');
                if (display) display.textContent = newTitle;
            }
        });

        // Delete session
        sheet.querySelector('#sheet-delete-session')?.addEventListener('click', async () => {
            if (!confirm('确认删除此对话？')) return;
            try {
                await api.deleteSession(this.currentSessionId);
                this.sessions = this.sessions.filter(s => s.id !== this.currentSessionId);
                close();
                await this.init();
            } catch {
                alert('删除失败');
            }
        });
    }

    // ─────────────────────────────────────────────
    //  MESSAGE RENDERING
    // ─────────────────────────────────────────────
    appendMessage(role, content, animate = true) {
        const msgContainer = this.container.querySelector('#messages-container');
        if (!msgContainer) return null;

        // remove placeholder
        msgContainer.querySelector('.chat-empty-hint')?.remove();
        msgContainer.querySelector('.chat-loading-hint')?.remove();

        const div = document.createElement('div');
        div.className = `message ${role === 'user' ? 'user' : 'ai'}`;
        if (!animate) div.style.animation = 'none';

        const bubbleContainer = document.createElement('div');
        if (role === 'ai') {
            const { cotHtml, mainHtml } = this._parseCoT(content);
            bubbleContainer.innerHTML = cotHtml + `<div class="message-content">${mainHtml}</div>`;
            this._bindCoTEvents(bubbleContainer);
        } else {
            const bubble = document.createElement('div');
            bubble.className = 'message-content';
            bubble.innerHTML = marked.parse(content);
            bubbleContainer.appendChild(bubble);
        }

        div.appendChild(bubbleContainer);
        msgContainer.appendChild(div);
        return bubbleContainer;
    }

    _parseCoT(text) {
        const thinkStartMatch = /<think>/.exec(text);
        if (!thinkStartMatch) {
            return { cotHtml: '', mainHtml: marked.parse(text.trim() || '...') };
        }

        const thinkStart = thinkStartMatch.index;
        const thinkEndMatch = /<\/think>/.exec(text);
        let thinkContent = '';
        let mainText = text;

        if (thinkEndMatch) {
            thinkContent = text.substring(thinkStart + 7, thinkEndMatch.index).trim();
            mainText = text.substring(0, thinkStart) + text.substring(thinkEndMatch.index + 8);
        } else {
            thinkContent = text.substring(thinkStart + 7).trim();
            mainText = text.substring(0, thinkStart);
        }

        const isOpen = !thinkEndMatch ? 'open' : '';
        const cotHtml = `
            <div class="cot-block ${isOpen}">
                <div class="cot-header">
                    <span class="cot-title"><i data-feather="cpu" style="width:13px;height:13px;margin-right:4px;vertical-align:-2px;"></i>思考过程</span>
                    <span class="icon"><i data-feather="chevron-right" style="width:15px;height:15px;"></i></span>
                </div>
                <div class="cot-body">${marked.parse(thinkContent || '正在思考…')}</div>
            </div>
        `;
        return { cotHtml, mainHtml: marked.parse(mainText.trim() || (isOpen ? '' : '...')) };
    }

    _bindCoTEvents(container) {
        container.querySelectorAll('.cot-header').forEach(h => {
            h.addEventListener('click', () => {
                const block = h.closest('.cot-block');
                block.classList.toggle('open');
                const icon = h.querySelector('.icon i');
                if (icon) {
                    icon.setAttribute('data-feather', block.classList.contains('open') ? 'chevron-down' : 'chevron-right');
                    if (window.feather) feather.replace();
                }
            });
        });
        if (window.feather) feather.replace();
    }

    _scrollToBottom() {
        const c = this.container.querySelector('#messages-container');
        if (c) c.scrollTop = c.scrollHeight;
    }

    // ─────────────────────────────────────────────
    //  SEND
    // ─────────────────────────────────────────────
    async sendMessage() {
        if (!this.currentSessionId || this.isGenerating) return;

        const input = this.container.querySelector('#chat-input');
        const text = input?.value.trim();
        if (!text) return;

        const model = this.container.querySelector('#model-select')?.value || 'echo';
        input.value = '';
        input.style.height = 'auto';

        this.appendMessage('user', text);
        this._scrollToBottom();

        const aiBubble = this.appendMessage('ai', '…');
        this._scrollToBottom();

        this.isGenerating = true;
        const select = this.container.querySelector('#model-select');
        if (select) select.disabled = true;

        const localConfig = localStorage.getItem('pyro_gemini_config');
        const overrides = localConfig ? JSON.parse(localConfig) : {};
        const finalModel = model !== 'echo' ? model : (overrides.model || model);

        let fullText = '';
        await api.chatStream(
            this.currentSessionId,
            text,
            finalModel,
            { api_key: overrides.api_key, base_url: overrides.base_url },
            chunk => {
                fullText += chunk;
                const { cotHtml, mainHtml } = this._parseCoT(fullText);
                if (aiBubble) {
                    aiBubble.innerHTML = cotHtml + `<div class="message-content">${mainHtml}</div>`;
                    this._bindCoTEvents(aiBubble);
                }
                this._scrollToBottom();
            },
            err => {
                aiBubble?.insertAdjacentHTML('beforeend',
                    `<div class="message-content" style="color:#ef4444">[错误] ${err.message}</div>`);
                this.isGenerating = false;
                if (select) select.disabled = false;
            },
            () => {
                this.isGenerating = false;
                if (select) select.disabled = false;
                if (aiBubble) Prism.highlightAllUnder(aiBubble);
                // collapse cot after done
                aiBubble?.querySelectorAll('.cot-block.open').forEach(b => b.classList.remove('open'));
            }
        );
    }

    // ─────────────────────────────────────────────
    //  HELPERS
    // ─────────────────────────────────────────────
    _showBottomNav(visible) {
        const nav = document.querySelector('.bottom-nav');
        if (nav) nav.style.display = visible ? '' : 'none';
    }

    _fmtTime(isoStr) {
        if (!isoStr) return '';
        const d = new Date(isoStr);
        const diff = Date.now() - d;
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
        if (diff < 86400000) return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        return d.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
    }

    _esc(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    destroy() {
        this._showBottomNav(true);
        document.getElementById('chat-settings-sheet')?.remove();
    }
}
