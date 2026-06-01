(() => {
    const CONTACTS = [
        {
            id: 'ayan',
            name: '\u963f\u5ef6',
            handle: '@ayan',
            bio: '\u5c0f\u9152\uff0c\u4eca\u5929\u4e5f\u8981\u5f00\u5f00\u5fc3\u5fc3\u54e6\uff5e',
            status: '\u5728\u7ebf',
            roleTag: '\u7279\u522b\u5173\u6ce8',
            lastMessage: '\u5148\u804a\u5929\u8be6\u60c5\u9875\u3002\u5934\u90e8\u3001\u6c14\u6ce1\u3001\u8f93\u5165\u533a\u4e00\u8d77\u6536\u6389\uff0c\u5176\u4ed6\u9875\u81ea\u7136\u987a\u3002',
            lastTime: '\u521a\u521a',
            unread: 2,
            pinned: true,
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
            theme: 'rose',
            settings: {
                model: 'gpt-5.4',
                modelProviderId: 'openai',
                temperature: 0.72,
                topP: 0.9,
                contextCount: 64,
                thinkBudget: 48,
                streamOutput: true,
                reasoning_visibility: false,
                proactiveEnabled: true,
                proactiveFrequency: 60,
                memoryEnabled: true,
            },
            roomBackground: '点阵',
            chatTheme: 'default',
            bubbleTheme: '默认主题',
            topics: [
                { id: 't1', title: '\u6700\u8fd1\u72b6\u6001', updatedAt: '\u4eca\u5929 21:40', count: 24 },
                { id: 't2', title: '\u7761\u7720\u8bb0\u5f55', updatedAt: '\u6628\u5929', count: 18 },
                { id: 't3', title: '\u7f51\u9875 UI', updatedAt: '3\u5929\u524d', count: 41 },
            ],
            messages: [
                { id: 'm1', role: 'ai', text: '\u4eca\u5929\u628a\u4f60\u4e22\u7ed9\u6211\u7684\u6587\u4ef6\u90fd\u7ffb\u4e86\u4e00\u904d\u3002\u9875\u9762\u53ef\u4ee5\u66f4\u53ef\u7231\uff0c\u771f\u6b63\u5939\u68d2\u7684\u662f\u91cc\u9762\u7684\u7a7a\u58f3\u3002', time: '21:48' },
                { id: 'm2', role: 'user', text: '\u6240\u4ee5\u8be5\u5148\u6539\u54ea\u91cc\uff1f', time: '21:49' },
                { id: 'm3', role: 'ai', text: '\u5148\u804a\u5929\u8be6\u60c5\u9875\u3002\u5934\u90e8\u3001\u6c14\u6ce1\u3001\u8f93\u5165\u533a\u4e00\u8d77\u6536\u6389\uff0c\u5176\u4ed6\u9875\u81ea\u7136\u987a\u3002', time: '21:49', thinking: '\u5979\u5df2\u7ecf\u7ed9\u4e86\u660e\u786e\u8d77\u70b9\uff0c\u5148\u6539\u6838\u5fc3\u8def\u5f84\u80fd\u66f4\u5feb\u51fa\u6548\u679c\u3002' },
            ],
        },
        {
            id: 'azheng',
            name: '\u963f\u4e89',
            handle: '@azheng',
            bio: '\u6211\u628a\u8349\u7a3f\u6574\u7406\u597d\u4e86\uff0c\u8981\u7ee7\u7eed\u5417\uff1f',
            status: '\u5fd9\u788c',
            roleTag: '\u540c\u4e8b',
            lastMessage: '\u6211\u628a\u8349\u7a3f\u6574\u7406\u597d\u4e86\uff0c\u8981\u7ee7\u7eed\u5417\uff1f',
            lastTime: '12\u5206\u949f\u524d',
            unread: 0,
            pinned: false,
            avatar: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80',
            theme: 'mist',
            settings: {
                model: 'gpt-5.4',
                modelProviderId: 'openai',
                temperature: 0.45,
                topP: 0.8,
                contextCount: 48,
                thinkBudget: 36,
                streamOutput: true,
                reasoning_visibility: false,
                proactiveEnabled: false,
                proactiveFrequency: 30,
                memoryEnabled: true,
            },
            roomBackground: '点阵',
            chatTheme: 'default',
            bubbleTheme: '默认主题',
            topics: [
                { id: 't4', title: '\u7248\u672c\u68b3\u7406', updatedAt: '\u4eca\u5929 23:18', count: 12 },
                { id: 't5', title: '\u8bf4\u660e\u6587\u6863', updatedAt: '\u6628\u5929', count: 8 },
            ],
            messages: [
                { id: 'm4', role: 'ai', text: '\u6211\u628a\u8349\u7a3f\u6574\u7406\u597d\u4e86\uff0c\u8981\u7ee7\u7eed\u5417\uff1f', time: '23:18' },
            ],
        },
        {
            id: 'xiaoying',
            name: '\u5c0f\u6a31',
            handle: '@sakura',
            bio: '\u5468\u672b\u53bb\u770b\u5c55\u5417\uff1f',
            status: '\u5728\u7ebf',
            roleTag: '\u670b\u53cb',
            lastMessage: '\u5468\u672b\u53bb\u770b\u5c55\u5417\uff1f',
            lastTime: '1\u5c0f\u65f6\u524d',
            unread: 1,
            pinned: false,
            avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80',
            theme: 'cream',
            settings: {
                model: 'gpt-5.4',
                modelProviderId: 'openai',
                temperature: 0.66,
                topP: 0.95,
                contextCount: 32,
                thinkBudget: 24,
                streamOutput: true,
                reasoning_visibility: false,
                proactiveEnabled: true,
                proactiveFrequency: 20,
                memoryEnabled: false,
            },
            roomBackground: '点阵',
            chatTheme: 'default',
            bubbleTheme: '默认主题',
            topics: [
                { id: 't6', title: '\u5468\u672b\u8ba1\u5212', updatedAt: '\u4eca\u5929', count: 6 },
            ],
            messages: [
                { id: 'm5', role: 'ai', text: '\u5468\u672b\u53bb\u770b\u5c55\u5417\uff1f\u6211\u77e5\u9053\u6709\u4e2a\u65b0\u7684\u5c55\u3002', time: '20:22' },
            ],
        },
    ];
    const LEGACY_DEFAULT_MOMENTS = [
        {
            id: 'p0',
            contactId: 'me',
            time: '23:36',
            mood: '\u5f00\u5fc3',
            content: '\u4eca\u5929\u7684\u5929\u7a7a\u5f88\u6e29\u67d4\u3002',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80',
            likes: ['\u6211'],
            comments: [],
        },
        {
            id: 'p1',
            contactId: 'ayan',
            time: '21:20',
            mood: '\u4e3b\u52a8',
            content: '\u4f60\u9189\u4e86\u5148\u770b\u8fd9\u4e2a\u3002',
            image: '',
            likes: ['\u6211', '\u963f\u5ef6'],
            comments: [{ author: '\u6211', text: '\u6211\u6536\u5230\u4e86' }],
        },
        {
            id: 'p2',
            contactId: 'xiaoying',
            time: '19:08',
            mood: '\u7ecf\u5e38',
            content: '\u665a\u4e0a\u8dd1\u4e86\u4e09\u516c\u91cc\u3002',
            image: '',
            likes: [],
            comments: [],
        },
    ];
    const MOMENTS = [];
    const ACTIONS = [
        { id: 'health', label: 'Health', icon: 'health' },
        { id: 'schedule', label: '日程', icon: 'calendar' },
        { id: 'weather', label: '天气', icon: 'weather' },
        { id: 'files', label: '文件', icon: 'file' },
        { id: 'quote', label: '引用', icon: 'quote' },
        { id: 'more', label: '更多', icon: 'more' },
    ];

    function defaultMcpLibrary() {
        return {
            tools: ACTIONS.map((item) => ({
                id: item.id,
                label: item.label,
                icon: item.icon,
                prompt: '',
                enabled: true,
            })),
        };
    }

    const state = {
        currentTab: 'chats',
        currentView: 'list', // list | room | rpLobby | rpRoom | moments | settings | contactSettings | profile
        currentContactId: '',
        currentSettingsTab: 'basic',
        cotLogMode: 'long',
        activityLogEntries: [],
        activityLogLoading: false,
        activityLogLoadedAt: '',
        quoteMomentId: null,
        quoteMessageId: null,
        momentComposerOpen: false,
        momentComposerText: '',
        momentComposerImage: '',
        momentComposerImageName: '',
        momentComposerEditingId: '',
        momentsActorType: 'user',
        commentSheetMomentId: null,
        activeMenuMomentId: null,
        activeBubbleToolsId: null,
        suppressBubbleToggle: false,
        toast: '',
        topicConfirmOpen: false,
        rpRooms: [],
        currentRpRoomId: '',
        currentRpMessages: [],
        conversations: {},
        rpMessages: {},
        rpRoomDialogOpen: false,
        rpRoomDialogMode: 'create',
        rpRoomForm: {
            name: '',
            world_setting: '',
            user_role: '',
            ai_role: '',
        },
        rpBackView: 'list',
        contacts: [],
        moments: structuredClone(MOMENTS),
        actions: structuredClone(ACTIONS),
        globalSettings: {
            theme: '奶油粉',
            notifications: true,
            momentsNotify: true,
            autoScroll: true,
            defaultModel: 'gpt-5.4',
            provider: 'OpenAI',
            searchService: '默认搜索',
            voiceService: '未连接',
            mcpEnabled: true,
            exportFormat: 'json',
        },
        accountProfile: {
            avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80',
            nickname: '\u5c0f\u9152',
            signature: '\u7ba1\u7406\u4e2a\u4eba\u8d44\u6599\u4e0e\u57fa\u7840\u504f\u597d',
        },
        newContactAvatar: '',
        newContactDraft: {
            name: '',
            agentId: '',
            bio: '',
            avatar: '',
        },
        avatarCropper: null,
        showAttach: false,
        contactQuickActionEditorId: '',
        contactQuickMcpMenuOpen: false,
        quickActionSwipeOpenId: '',
        quickActionDragId: '',
        quickActionSuppressClickUntil: 0,
        quickActionDropHintId: '',
        quickActionReorderPulseId: '',
        quickActionDropDirection: '',
        contactPersonaExpanded: false,
        contactModelAdvancedOpen: false,
        chatAttachments: [],
        chatPasteError: '',
        companionState: {
            recent_topics: [],
            current_mood: '',
            open_loops: [],
            proactive_cooldown_until: null,
            impression: null,
            relationship_progress: null,
            likes_summary: null,
            summary_updated_at: null,
            updated_at: '',
        },
        openThinkingIds: {},
        streamingAbortController: null,
        animatedMsgIds: {},
        assistantPlayback: {
            token: '',
            timer: null,
        },
        historyLoadingContactIds: {},
        historyLoadedContactIds: {},
        rpCurtainRunning: false,
    };
    const agentPersonaSaveTimers = new Map();

    const root = () => document.getElementById('chat-app-root');
    const byId = (id) => state.contacts.find((item) => item.id === id);
    const getMoment = (id) => state.moments.find((item) => item.id === id);

    const escapeHtml = (str = '') => String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

    const CHAT_UI_THEMES = [
        { key: 'default', name: '默认主题', desc: '干净柔和的默认聊天界面', roomTheme: 'rose', aliases: ['默认玫瑰', '默认'] },
        { key: 'pink', name: '蜜桃粉', desc: '更甜一点的粉色聊天氛围', roomTheme: 'rose', aliases: ['奶茶'] },
        { key: 'dark', name: '夜色', desc: '低亮度深色聊天界面', roomTheme: 'rose', aliases: [] },
        { key: 'glass', name: '玻璃雾', desc: '通透轻雾感的玻璃界面', roomTheme: 'mist', aliases: ['晴空'] },
    ];
    // Full-UI themes live in global settings (themeSettings), not per-contact
    const FULL_UI_THEMES = ['windowsill', 'tape'];

    function normalizeChatThemeKey(value) {
        const raw = String(value || '').trim();
        if (!raw) return 'default';
        const matched = CHAT_UI_THEMES.find((item) => (
            item.key === raw || item.name === raw || item.aliases.includes(raw)
        ));
        return matched?.key || 'default';
    }

    function chatThemeByKey(value) {
        const key = normalizeChatThemeKey(value);
        return CHAT_UI_THEMES.find((item) => item.key === key) || CHAT_UI_THEMES[0];
    }

    function getContactChatThemeKey(contact) {
        return normalizeChatThemeKey(contact?.chatTheme || contact?.bubbleTheme);
    }

    function getChatThemeLabel(value) {
        return chatThemeByKey(value).name;
    }

    // Thinking box: display cap (DOM) and accumulation cap (state string)
    const THINKING_MAX_DISPLAY    = 1500;  // chars shown in the box at any time
    const THINKING_MAX_ACCUMULATE = 8000;  // stop growing fullThinking beyond this

    /** Strip tool_call XML blocks and other non-prose noise before displaying */
    function cleanThinkingText(text) {
        if (!text) return '';
        return text
            // Remove complete <tool_call>鈥?/tool_call> blocks (including nested JSON)
            .replace(/<tool_call>[\s\S]*?<\/tool_call>/g, '')
            // Remove any still-open (streaming) tool_call block trailing at end
            .replace(/<tool_call>[\s\S]*$/, '')
            // 娓呯悊宸ュ叿娴侀噷甯歌鐨?HTML/XML 鏍囩纰庣墖
            .replace(/<\/?(thead|tbody|tr|td|th|table|tool|function|call)[^>]*>/gi, '')
            .replace(/<[^>\n]{1,80}>/g, '')
            // Collapse runs of 3+ newlines
            .replace(/\n{3,}/g, '\n\n')
            // 鍗曡閲屽彧鏈?JSON 鏍囩偣/纰庣墖鐨勮锛堝噺杞诲伓鍙戜贡鐮佽锛?            .replace(/^\s*[\][}{"',\d.\s]+\s*$/gm, '')
            .trim();
    }

    function coerceSseText(v) {
        if (v == null) return '';
        if (typeof v === 'string') return v;
        if (typeof v === 'number' || typeof v === 'boolean') return String(v);
        return '';
    }

    function normalizeThinkingChunk(chunk, currentText = '', existingThinking = '') {
        const cleaned = cleanThinkingText(coerceSseText(chunk));
        if (!cleaned) return '';

        const normalizedChunk = cleaned.replace(/\s+/g, ' ').trim();
        const normalizedText = coerceSseText(currentText).replace(/\s+/g, ' ').trim();
        const normalizedExisting = coerceSseText(existingThinking).replace(/\s+/g, ' ').trim();

        if (!normalizedChunk) return '';
        if (normalizedText) {
            if (normalizedChunk === normalizedText) return '';
            if (normalizedText.includes(normalizedChunk) && normalizedChunk.length >= 8) return '';
        }
        if (normalizedExisting) {
            if (normalizedExisting.includes(normalizedChunk)) return '';
            const tail = normalizedExisting.slice(Math.max(0, normalizedExisting.length - normalizedChunk.length - 12));
            if (tail.includes(normalizedChunk)) return '';
        }
        return cleaned;
    }

    function appendThinkingChunk(existingThinking = '', chunk = '') {
        const prev = coerceSseText(existingThinking);
        const next = coerceSseText(chunk);
        if (!next) return prev;
        if (!prev) return next;
        if (/[\s\n]$/.test(prev) || /^[\s\n，。！？、；：,.!?;:）】》]/.test(next)) return prev + next;
        if (/[\x00-\x7F]$/.test(prev) || /^[\x00-\x7F]/.test(next)) return `${prev} ${next}`;
        return prev + next;
    }

    function nextFrame() {
        return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    /** 娴佸紡鏃舵鏂囩敤 textContent 琛ヤ竵锛屽繀椤绘妸鎬濊€冨尯涓€璧峰埛鏂帮紝鍚﹀垯浼氬崱鍦ㄨ妭娴佸墠鐨勬棫鐗囨 */
    function patchStreamingMessageDom(msgId, fullText, fullThinking) {
        const row = root()?.querySelector(`.message-row[data-msg-id="${msgId}"]`);
        if (!row) return;
        const msgEl = row.querySelector('.message-text');
        if (msgEl) msgEl.textContent = fullText;
        if (fullThinking) {
            // New v2 thinking-line DOM
            patchThinkingLineDom(msgId, fullThinking, false);
            // Legacy cot-wrapper fallback (reroll path etc.)
            const thinkEl = row.querySelector(`#thinking-${msgId}`);
            if (thinkEl && thinkEl.closest('.cot-wrapper')) {
                thinkEl.textContent = truncateThinkingDisplay(fullThinking);
                thinkEl.classList.add('open', 'thinking-active');
                thinkEl.setAttribute('aria-hidden', 'false');
                const wEl = row.querySelector(`#cot-wrapper-${msgId}`);
                if (wEl) wEl.removeAttribute('data-slow');
            }
            state.openThinkingIds[msgId] = true;
        }
    }

    function truncateThinkingDisplay(text) {
        const cleaned = cleanThinkingText(text);
        if (!cleaned) return '';
        if (cleaned.length <= THINKING_MAX_DISPLAY) return cleaned;
        return `\uff08\u5df2\u622a\u65ad\uff0c\u5171 ${cleaned.length} \u5b57\uff09\n${cleaned.slice(-THINKING_MAX_DISPLAY)}`;
    }


    // SVG icons for tool lines
    const TOOL_SVG_WRENCH = '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>';
    const TOOL_SVG_CLOCK  = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
    const TOOL_SVG_EYE    = '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    const THINKING_SVG_HEART = '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const EXPAND_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';

    function getToolSvg(name) {
        const n = String(name || '').toLowerCase();
        if (/time|clock|date/.test(n)) return TOOL_SVG_CLOCK;
        if (/view|read|file|diary|memory|search/.test(n)) return TOOL_SVG_EYE;
        return TOOL_SVG_WRENCH;
    }

    /** 渲染单行思考链（v2 风格） */
    function renderThinkingLine(msg) {
        const isStreaming = !!msg.streaming;
        const tlState = isStreaming ? 'tl-active' : 'tl-done';
        const displayText = isStreaming
            ? truncateThinkingDisplay(msg.thinking)
            : (msg.thinking || '');
        // Extract a one-line summary: first non-empty line up to 36 chars
        const cleanText = (displayText || '').replace(/\s+/g, ' ').trim();
        const summary = cleanText || '思考中…';
        const summaryShort = summary.length > 36 ? summary.slice(0, 36) + '…' : summary;
        return `
        <div class="thinking-line ${tlState}" id="tl-line-${msg.id}" data-action="toggle-thinking-line" data-id="${msg.id}">
          <div class="thinking-dot"></div>
          <div class="thinking-text-wrap">
            <span class="thinking-text" id="tl-text-${msg.id}">${escapeHtml(summaryShort)}</span>
            <div class="thinking-heart">${THINKING_SVG_HEART}</div>
            <div class="thinking-fade"></div>
          </div>
          <div class="thinking-expand">${EXPAND_SVG}</div>
        </div>
        <div class="thinking-full" id="tl-full-${msg.id}">
          <div class="thinking-full-inner" id="thinking-${msg.id}">${escapeHtml(displayText)}</div>
        </div>`;
    }

    /** 渲染工具调用行列表 */
    function renderToolLines(toolCalls = []) {
        if (!toolCalls.length) return '';
        const lines = toolCalls.map(tc => {
            const tlState = tc.status === 'running' ? 'tl-active' : 'tl-done';
            const label = `${tc.name} → ${tc.status === 'running' ? '调用中…' : '完成'}`;
            return `
          <div class="tool-line ${tlState}">
            <div class="tool-dot"></div>
            <div class="tool-icon">${getToolSvg(tc.name)}</div>
            <span class="tool-text">${escapeHtml(label)}</span>
          </div>`;
        }).join('');
        return `<div class="tool-lines-wrap">${lines}</div>`;
    }

    /** DOM 直接更新思考行（流式阶段快速刷新，避免整页 re-render） */
    function patchThinkingLineDom(msgId, fullThinking, isDone) {
        const textEl = root()?.querySelector(`#tl-text-${msgId}`);
        const fullEl = root()?.querySelector(`#thinking-${msgId}`);
        const lineEl = root()?.querySelector(`#tl-line-${msgId}`);
        const cleanText = (fullThinking || '').replace(/\s+/g, ' ').trim();
        const summary = cleanText || '思考中…';
        const summaryShort = summary.length > 36 ? summary.slice(0, 36) + '…' : summary;
        if (textEl) textEl.textContent = summaryShort;
        if (fullEl)  fullEl.textContent = truncateThinkingDisplay(fullThinking);
        if (lineEl) {
            if (isDone) {
                lineEl.classList.remove('tl-active');
                lineEl.classList.add('tl-done');
            } else {
                lineEl.classList.add('tl-active');
                lineEl.classList.remove('tl-done');
            }
        }
    }

    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

    function splitAssistantReply(text) {
        const raw = String(text || '').replace(/\r\n/g, '\n').trim();
        if (!raw) return [];
        const normalized = raw
            .replace(/[ \t]+\n/g, '\n')
            .replace(/\n{3,}/g, '\n\n');
        const paragraphs = normalized
            .split(/\n{2,}/)
            .map((part) => String(part || '').trim())
            .filter(Boolean);
        const chunks = [];
        const pushChunk = (part) => {
            const cleaned = String(part || '').trim();
            if (!cleaned) return;
            if (chunks.length && cleaned.length <= 4) {
                chunks[chunks.length - 1] += cleaned;
                return;
            }
            chunks.push(cleaned);
        };
        const splitLongParagraph = (part) => {
            const sentences = String(part || '')
                .split(/(?<=[。！？!?…])\s*/u)
                .map((item) => item.trim())
                .filter(Boolean);
            if (sentences.length <= 1) {
                pushChunk(part);
                return;
            }
            let bucket = '';
            sentences.forEach((sentence) => {
                const next = bucket ? `${bucket}${sentence}` : sentence;
                if (bucket && next.length > 90) {
                    pushChunk(bucket);
                    bucket = sentence;
                } else {
                    bucket = next;
                }
            });
            pushChunk(bucket);
        };
        paragraphs.forEach((part) => {
            const canSplit = /[。！？!?…]\s*/u.test(part);
            if (part.length <= 64 || !canSplit) {
                pushChunk(part);
            } else {
                splitLongParagraph(part);
            }
        });
        return chunks.filter(Boolean);
    }

    function normalizeBubbleText(text) {
        const raw = String(text || '').replace(/\r\n/g, '\n').trim();
        if (!raw || !raw.includes('\n')) return raw;
        return raw
            .split(/\n{2,}/)
            .map((block) => {
                const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
                if (lines.length <= 1) return block.trim();
                const compact = lines.join('');
                if (compact.length <= 32 || lines.every((line) => line.length <= 8)) return compact;
                return lines.join('\n');
            })
            .join('\n\n');
    }

    function assistantChunkDelay(text) {
        const len = String(text || '').trim().length;
        if (len <= 10) return 300 + Math.floor(Math.random() * 201);
        if (len <= 24) return 600 + Math.floor(Math.random() * 301);
        return 900 + Math.floor(Math.random() * 301);
    }

    function cancelAssistantPlayback() {
        state.assistantPlayback.token = '';
        if (state.assistantPlayback.timer) {
            window.clearTimeout(state.assistantPlayback.timer);
            state.assistantPlayback.timer = null;
        }
    }

    async function playAssistantChunks(contact, chunks, options = {}) {
        const list = Array.isArray(chunks) ? chunks.filter((item) => String(item || '').trim()) : [];
        if (!contact || !list.length) return;
        cancelAssistantPlayback();
        const token = `reply_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        state.assistantPlayback.token = token;
        const startIndex = Number.isInteger(options.startIndex) ? options.startIndex : contact.messages.length;
        for (let i = 0; i < list.length; i += 1) {
            if (state.assistantPlayback.token !== token) return;
            const msg = {
                id: `ai_chunk_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 6)}`,
                role: 'ai',
                text: list[i],
                content: list[i],
                time: nowTimeStr(),
                created_at: new Date().toISOString(),
            };
            if (i === 0) {
                if (options.thinking) msg.thinking = options.thinking;
                if (options.toolCalls) msg.toolCalls = options.toolCalls;
            }
            if (i === 0 && options.replaceId) {
                const idx = contact.messages.findIndex((item) => item.id === options.replaceId);
                if (idx !== -1) {
                    contact.messages[idx] = msg;
                } else {
                    contact.messages.splice(Math.min(startIndex, contact.messages.length), 0, msg);
                }
            } else {
                const insertAt = Math.min(startIndex + i, contact.messages.length);
                contact.messages.splice(insertAt, 0, msg);
            }
            contact.lastMessage = msg.text;
            contact.lastTime = msg.time;
            render();
            scrollToBottom();
            if (i >= list.length - 1) break;
            await new Promise((resolve) => {
                state.assistantPlayback.timer = window.setTimeout(resolve, assistantChunkDelay(list[i]));
            });
            state.assistantPlayback.timer = null;
        }
        if (state.assistantPlayback.token === token) {
            state.assistantPlayback.token = '';
            state.assistantPlayback.timer = null;
        }
        queueLocalSyncIfChanged(120);
    }

    function normalizeCompanionState(raw) {
        const input = raw && typeof raw === 'object' ? raw : {};
        const asList = (value) => Array.isArray(value)
            ? value.map((item) => String(item || '').trim()).filter(Boolean)
            : [];
        const asText = (v) => (v != null && String(v).trim()) ? String(v).trim() : null;
        return {
            recent_topics: asList(input.recent_topics),
            current_mood: String(input.current_mood || '').trim(),
            open_loops: asList(input.open_loops),
            proactive_cooldown_until: input.proactive_cooldown_until ? String(input.proactive_cooldown_until) : null,
            impression: asText(input.impression),
            relationshipProgress: asText(input.relationship_progress ?? input.relationshipProgress),
            likesSummary: asText(input.likes_summary ?? input.likesSummary),
            summaryUpdatedAt: asText(input.summary_updated_at ?? input.summaryUpdatedAt),
            updated_at: String(input.updated_at || '').trim(),
        };
    }

    function currentMomentsActor() {
        if (state.momentsActorType === 'agent') {
            const contact = getCurrentContact();
            return {
                author_type: 'agent',
                author_id: contact?.id || state.currentContactId || 'default',
                author_name: contact?.name || '褰撳墠瑙掕壊',
                avatar: contact?.avatar || '',
            };
        }
        return {
            author_type: 'user',
            author_id: 'me',
            author_name: state.accountProfile?.nickname || '我',
            avatar: state.accountProfile?.avatar || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80',
        };
    }

    function normalizeMoment(raw = {}) {
        const likes = Array.isArray(raw.likes) ? raw.likes : [];
        const comments = Array.isArray(raw.comments) ? raw.comments : [];
        const authorType = String(raw.author_type || (raw.contactId === 'me' ? 'user' : 'agent') || 'user');
        const authorId = String(raw.author_id || (authorType === 'user' ? 'me' : (raw.contactId || 'default')) || 'me');
        return {
            id: String(raw.id || `p${Date.now()}`),
            author_type: authorType,
            author_id: authorId,
            visibility: String(raw.visibility || 'public'),
            content: String(raw.content || ''),
            image: String(raw.image || ''),
            mood: String(raw.mood || ''),
            time: String(raw.time || ''),
            created_at: String(raw.created_at || ''),
            updated_at: String(raw.updated_at || ''),
            likes: likes.map((item) => typeof item === 'string'
                ? { author_type: 'user', author_id: item === '我' ? 'me' : item, author_name: item }
                : {
                    author_type: String(item?.author_type || 'user'),
                    author_id: String(item?.author_id || 'me'),
                    author_name: String(item?.author_name || ''),
                }),
            comments: comments.map((item) => ({
                author_type: String(item?.author_type || 'user'),
                author_id: String(item?.author_id || 'me'),
                author_name: String(item?.author_name || item?.author || ''),
                text: String(item?.text || ''),
            })),
        };
    }

    function resolveMomentAuthor(post) {
        const moment = normalizeMoment(post);
        if (moment.author_type === 'agent') {
            const contact = byId(moment.author_id);
            return {
                name: contact?.name || moment.author_id || '瑙掕壊',
                avatar: contact?.avatar || '',
            };
        }
        return {
            name: state.accountProfile?.nickname || '我',
            avatar: state.accountProfile?.avatar || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80',
        };
    }

    function canManageMoment(post) {
        const moment = normalizeMoment(post);
        return (moment.author_type === 'user' && moment.author_id === 'me')
            || moment.author_type === 'agent';
    }

    function formatMomentActorNames(likes = []) {
        return likes.map((item) => item.author_name || (item.author_type === 'user' ? '我' : (byId(item.author_id)?.name || item.author_id))).join('、');
    }

    function companionStateSummary() {
        const cs = normalizeCompanionState(state.companionState);
        if (cs.current_mood) return `情绪：${cs.current_mood}`;
        if (cs.open_loops[0]) return `进行中：${cs.open_loops[0]}`;
        if (cs.recent_topics[0]) return `最近话题：${cs.recent_topics[0]}`;
        return '暂无状态';
    }

    function currentMomentsActor() {
        if (state.momentsActorType === 'agent') {
            const contact = getCurrentContact();
            return {
                author_type: 'agent',
                author_id: contact?.id || state.currentContactId || 'default',
                author_name: contact?.name || '当前角色',
                avatar: contact?.avatar || '',
            };
        }
        return {
            author_type: 'user',
            author_id: 'me',
            author_name: state.accountProfile?.nickname || '我',
            avatar: state.accountProfile?.avatar || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80',
        };
    }

    function normalizeMoment(raw = {}) {
        const likes = Array.isArray(raw.likes) ? raw.likes : [];
        const comments = Array.isArray(raw.comments) ? raw.comments : [];
        const authorType = String(raw.author_type || (raw.contactId === 'me' ? 'user' : 'agent') || 'user');
        const authorId = String(raw.author_id || (authorType === 'user' ? 'me' : (raw.contactId || 'default')) || 'me');
        return {
            id: String(raw.id || `p${Date.now()}`),
            author_type: authorType,
            author_id: authorId,
            content: String(raw.content || ''),
            image: String(raw.image || ''),
            mood: String(raw.mood || ''),
            time: String(raw.time || ''),
            created_at: String(raw.created_at || ''),
            updated_at: String(raw.updated_at || ''),
            likes: likes.map((item) => typeof item === 'string'
                ? { author_type: 'user', author_id: item === '我' ? 'me' : item, author_name: item }
                : {
                    author_type: String(item?.author_type || 'user'),
                    author_id: String(item?.author_id || 'me'),
                    author_name: String(item?.author_name || ''),
                }),
            comments: comments.map((item) => ({
                author_type: String(item?.author_type || 'user'),
                author_id: String(item?.author_id || 'me'),
                author_name: String(item?.author_name || item?.author || ''),
                text: String(item?.text || ''),
            })),
        };
    }

    function resolveMomentAuthor(post) {
        const moment = normalizeMoment(post);
        if (moment.author_type === 'agent') {
            const contact = byId(moment.author_id);
            return {
                name: contact?.name || moment.author_id || '角色',
                avatar: contact?.avatar || '',
            };
        }
        return {
            name: state.accountProfile?.nickname || '我',
            avatar: state.accountProfile?.avatar || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80',
        };
    }

    function canManageMoment(post) {
        const moment = normalizeMoment(post);
        if (moment.author_type === 'user') {
            return moment.author_id === 'me';
        }
        return moment.author_id === (state.currentContactId || getCurrentContact()?.id || 'default');
    }

    function formatMomentActorNames(likes = []) {
        return likes
            .map((item) => item.author_name || (item.author_type === 'user' ? '我' : (byId(item.author_id)?.name || item.author_id)))
            .join('、');
    }

    function updateContactField(key, value, successText) {
        const c = byId(state.currentContactId);
        if (!c) return;
        c[key] = value;
        state.toast = successText;
        render();
        queueLocalSyncIfChanged(120);
        window.setTimeout(() => { state.toast = ''; render(); }, 1200);
    }

    function normalizeToolIcon(raw) {
        const iconName = String(raw || '').toLowerCase();
        if (['health', 'heart'].includes(iconName)) return 'health';
        if (['calendar', 'schedule', 'date'].includes(iconName)) return 'calendar';
        if (['weather', 'cloud'].includes(iconName)) return 'weather';
        if (['file', 'files', 'doc', 'document'].includes(iconName)) return 'file';
        if (['quote', 'reply'].includes(iconName)) return 'quote';
        if (['more', 'tool', 'tools'].includes(iconName)) return 'more';
        return 'more';
    }

    const MCP_TOOL_NAME_MAP = {
        get_current_time: '\u65f6\u95f4',
        get_weather: '\u5929\u6c14',
        get_health_summary: '\u5065\u5eb7',
        web_search: '\u641c\u7d22',
        fetch_url: '\u7f51\u9875',
        add_todo: '\u5f85\u529e',
        list_todos: '\u5f85\u529e\u5217\u8868',
        complete_todo: '\u5b8c\u6210\u5f85\u529e',
        add_note: '\u4fbf\u7b7e',
        list_notes: '\u4fbf\u7b7e\u5217\u8868',
    };

    const MCP_QUICK_TOOL_ALLOW = new Set([
        'get_current_time',
        'get_weather',
        'get_health_summary',
        'web_search',
        'fetch_url',
        'add_todo',
        'list_todos',
        'complete_todo',
        'add_note',
        'list_notes',
    ]);

    function shouldExposeMcpTool(toolId) {
        return MCP_QUICK_TOOL_ALLOW.has(String(toolId || '').trim());
    }

    function normalizeMcpTool(item, idx) {
        if (typeof item === 'string') {
            const strId = String(item || `mcp_${idx}`);
            return {
                id: strId,
                label: MCP_TOOL_NAME_MAP[strId] || item || `\u5de5\u5177${idx + 1}`,
                icon: 'more',
                prompt: '',
                mcpToolId: shouldExposeMcpTool(strId) ? strId : '',
                enabled: true,
            };
        }
        const id = item?.id || item?.toolId || item?.name || `mcp_${idx}`;
        const idStr = String(id);
        const label = MCP_TOOL_NAME_MAP[idStr] || item?.label || item?.name || item?.title || `\u5de5\u5177${idx + 1}`;
        return {
            id: idStr,
            label: String(label),
            icon: normalizeToolIcon(item?.icon || item?.type || item?.category || 'more'),
            prompt: String(item?.prompt || item?.message || ''),
            mcpToolId: String(item?.mcpToolId || item?.toolId || (shouldExposeMcpTool(idStr) ? idStr : '')),
            enabled: item?.enabled !== false,
        };
    }

    function getMcpQuickActions() {
        const ai = ensureAiSettings();
        const list = ai?.mcpLibrary?.tools;
        if (!Array.isArray(list) || !list.length) return ACTIONS;
        const normalized = list
            .map(normalizeMcpTool)
            .filter((item) => shouldExposeMcpTool(item.id))
            .filter((item) => item.enabled !== false);
        return normalized.length ? normalized : ACTIONS;
    }

    function getCurrentContact() {
        return byId(state.currentContactId) || state.contacts[0];
    }

    function ensureContactQuickActions(contact) {
        if (!contact?.settings) return [];
        if (!Array.isArray(contact.settings.quickActions) || !contact.settings.quickActions.length) {
            contact.settings.quickActions = getMcpQuickActions().map((item, idx) => ({
                ...normalizeMcpTool(item, idx),
            }));
        } else {
            contact.settings.quickActions = contact.settings.quickActions.map((item, idx) => normalizeMcpTool(item, idx));
        }
        return contact.settings.quickActions;
    }

    function getContactQuickActions(contact = getCurrentContact()) {
        const list = ensureContactQuickActions(contact)
            .filter((item) => item.enabled !== false);
        return list.length ? list : getMcpQuickActions();
    }

    function icon(name) {
        const common = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
        const map = {
            back: `<svg ${common}><path d="M15 18l-6-6 6-6"/></svg>`,
            plus: `<svg ${common}><path d="M12 5v14M5 12h14"/></svg>`,
            search: `<svg ${common}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,
            history: `<svg ${common}><path d="M3 12a9 9 0 101.9-5.6"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>`,
            settings: `<svg ${common}><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.3"/></svg>`,
            more: `<svg ${common}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,
            heart: `<svg ${common}><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,
            heartFilled: `<svg viewBox="0 0 24 24" fill="#B595C9" stroke="none" stroke-width="0"><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,
            comment: `<svg ${common}><path d="M7 18l-3 2 1-3.8A7.8 7.8 0 014.2 13 7.8 7.8 0 1112 20a8 8 0 01-5-2z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>`,
            chatArrow: `<svg ${common}><path d="M4.8 18.2l.9-3.3A7.5 7.5 0 014.5 11 7.5 7.5 0 1112 18.5a7.4 7.4 0 01-3.6-.9z"/><path d="M10 9l4 3-4 3"/><path d="M14 12H8"/></svg>`,
            send: `<svg ${common}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>`,
            close: `<svg ${common}><path d="M18 6L6 18M6 6l12 12"/></svg>`,
            camera: `<svg ${common}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
            attach: `<svg ${common}><path d="M21 11.5l-8.7 8.7a5 5 0 01-7.1-7.1l9.2-9.2a3.5 3.5 0 015 5L9 19.3a2 2 0 01-2.8-2.8l8.5-8.5"/></svg>`,
            quote: `<svg ${common}><path d="M9 7H5v5h4v5H4v-5c0-2.8 1.8-5 5-5zM20 7h-4v5h4v5h-5v-5c0-2.8 1.8-5 5-5z"/></svg>`,
            reroll: `<svg ${common}><path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 4v7h-7"/></svg>`,
            cot: `<svg ${common}><path d="M12 4v16M4 12h16"/><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" opacity="0.18"/></svg>`,
            bubbleHeart: `<svg ${common}><path d="M12 19.3s-5.8-3.5-5.8-8a3.7 3.7 0 016.1-2.8 3.7 3.7 0 015.9 2.8c0 4.5-5.6 8-5.6 8z"/></svg>`,
            weather: `<svg ${common}><path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.4-1.8A4 4 0 1118 16H6z"/></svg>`,
            calendar: `<svg ${common}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,
            file: `<svg ${common}><path d="M8 3h6l5 5v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M14 3v5h5"/></svg>`,
            health: `<svg ${common}><path d="M12 20s-6.5-4-6.5-9.2A4.3 4.3 0 0112 7a4.3 4.3 0 016.5 3.8C18.5 16 12 20 12 20z"/><path d="M9.2 12h1.8l1-2.1 1.2 4 1-1.9h1.6"/></svg>`,
            toggleOff: `<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="rgba(255,255,255,.7)" stroke="rgba(150,122,133,.14)"/><circle cx="16" cy="16" r="11" fill="#fff"/></svg>`,
            toggleOn: `<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="#e9d7ff" stroke="rgba(120,90,150,.14)"/><circle cx="36" cy="16" r="11" fill="#fff"/></svg>`,
            chevron: `<svg ${common}><path d="M9 6l6 6-6 6"/></svg>`,
            tabChat: `<svg ${common}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2 22l4.8-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10z"></path></svg>`,
            tabMoments: `<svg ${common}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
            tabSettings: `<svg ${common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
            actionDots: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>`,
            pencil: `<svg ${common}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
            trash: `<svg ${common}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
            stop: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>`
        };
        return map[name] || map.more;
    }

    function openChatAppDefault() {
        render();
    }

    function restoreBodyScroll(scrollTop) {
        const apply = () => {
            const body = root()?.querySelector('.chat-app-body');
            if (body) body.scrollTop = scrollTop;
        };
        requestAnimationFrame(() => {
            apply();
            requestAnimationFrame(apply);
            window.setTimeout(apply, 0);
        });
    }

    function renderWithScrollLock() {
        const body = root()?.querySelector('.chat-app-body');
        const savedScroll = body ? body.scrollTop : 0;
        const savedPageScroll = window.scrollY || window.pageYOffset || 0;
        render();
        restoreBodyScroll(savedScroll);
        requestAnimationFrame(() => {
            window.scrollTo(0, savedPageScroll);
            requestAnimationFrame(() => window.scrollTo(0, savedPageScroll));
        });
    }

    function renderMomentsStable() {
        if (state.currentView === 'moments') {
            renderWithScrollLock();
            return;
        }
        render();
    }

    function applyLocalMomentLike(momentId, actor) {
        state.moments = state.moments.map((item) => {
            const moment = normalizeMoment(item);
            if (moment.id !== momentId) return item;
            const exists = moment.likes.some((like) => like.author_type === actor.author_type && like.author_id === actor.author_id);
            const nextLikes = exists
                ? moment.likes.filter((like) => !(like.author_type === actor.author_type && like.author_id === actor.author_id))
                : [{ author_type: actor.author_type, author_id: actor.author_id, author_name: actor.author_name }, ...moment.likes];
            return { ...moment, likes: nextLikes };
        });
    }

    function applyLocalMomentComment(momentId, actor, text) {
        state.moments = state.moments.map((item) => {
            const moment = normalizeMoment(item);
            if (moment.id !== momentId) return item;
            return {
                ...moment,
                comments: [
                    {
                        author_type: actor.author_type,
                        author_id: actor.author_id,
                        author_name: actor.author_name,
                        text,
                    },
                    ...moment.comments,
                ],
            };
        });
    }

    function paintSwitch(button, enabled) {
        if (!button) return;
        button.classList.toggle('on', !!enabled);
        button.classList.toggle('off', !enabled);
        button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        button.innerHTML = renderSwitchInner(enabled);
        button.classList.remove('switch-animating');
        void button.offsetWidth;
        button.classList.add('switch-animating');
        clearTimeout(button.__switchAnimTimer);
        button.__switchAnimTimer = setTimeout(() => button.classList.remove('switch-animating'), 260);
    }

    function render() {
        const mount = root();
        if (!mount) return;
        ensureRpTheatreStyles();
        if (!['room', 'rpRoom'].includes(state.currentView)) state.showAttach = false;
        if (state.currentView !== 'moments') state.momentComposerOpen = false;
        // Preserve scroll position of the moments/list body before re-render
        const body = mount.querySelector('.chat-app-body');
        const savedScroll = body ? body.scrollTop : 0;
        const activeContact = byId(state.currentContactId) || state.contacts[0];
        const chatThemeKey = getContactChatThemeKey(activeContact);
        const _globalTheme = state.globalSettings?.theme || '';
        const effectiveTheme = FULL_UI_THEMES.includes(_globalTheme) ? _globalTheme : chatThemeKey;
        mount.dataset.theme = effectiveTheme;
        mount.removeAttribute('data-bound');
        mount.innerHTML = `
      <div class="chat-shell ${state.currentView === 'rpRoom' ? 'mode-rp rp-theatre-shell' : 'mode-normal'}" data-theme="${effectiveTheme}">
        ${renderHeader()}
        <div class="chat-app-body ${['room', 'rpRoom'].includes(state.currentView) ? 'room-layout' : ''} ${showBottomNav() ? 'has-bottom-nav' : ''}">
          ${renderBody()}
        </div>
        ${showBottomNav() ? renderBottomNav() : ''}
        ${state.toast ? renderToast() : ''}
        ${state.showAttach ? renderAttachPanel() : ''}
        ${state.momentComposerOpen ? renderMomentComposerSheet() : ''}
        ${state.topicConfirmOpen ? renderTopicConfirmDialog() : ''}
        ${state.rpRoomDialogOpen ? renderRpRoomDialog() : ''}
        ${state.avatarCropper ? renderAvatarCropperDialog() : ''}
      </div>
    `;
        bind();
        scrollToBottom();
        ensureRoomHistoryLoaded(activeContact);
        if (!['room', 'rpRoom'].includes(state.currentView)) {
            restoreBodyScroll(savedScroll);
        }
        queueLocalSyncIfChanged();
        // Animate newly added message rows (each row animates only once)
        requestAnimationFrame(() => {
            root()?.querySelectorAll('.message-row[data-msg-id]').forEach(row => {
                const id = row.dataset.msgId;
                if (id && !state.animatedMsgIds[id]) {
                    state.animatedMsgIds[id] = true;
                    row.classList.add('msg-fadein');
                }
            });
        });
    }

    function ensureRpTheatreStyles() {
        if (document.getElementById('rp-theatre-style')) return;
        const style = document.createElement('style');
        style.id = 'rp-theatre-style';
        style.textContent = `
          .chat-shell.mode-rp {
            background:#0e0a12;
            color:rgba(220,210,225,.92);
            position:relative;
            overflow:hidden;
          }
          .chat-shell.mode-rp::before {
            content:'';
            position:absolute;
            inset:0;
            z-index:0;
            background:
              radial-gradient(ellipse at 20% 0%, rgba(88,28,72,.18) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 100%, rgba(38,18,68,.22) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(20,12,28,.95) 0%, #0e0a12 100%);
            pointer-events:none;
          }
          .chat-shell.mode-rp::after {
            content:'';
            position:absolute;
            inset:0;
            z-index:0;
            background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
            opacity:.5;
            pointer-events:none;
          }
          .chat-shell.mode-rp > * { position:relative; z-index:1; }
          .rp-header {
            padding:52px 18px 14px;
            display:flex;
            align-items:center;
            gap:12px;
            flex-shrink:0;
            background:rgba(18,12,24,.72);
            border-bottom:1px solid rgba(160,100,180,.12);
            backdrop-filter:blur(28px) saturate(1.1);
          }
          .rp-header .header-back,
          .rp-header .header-action-btn {
            width:36px;
            height:36px;
            border-radius:50%;
            border:none;
            cursor:pointer;
            display:flex;
            align-items:center;
            justify-content:center;
            background:rgba(160,100,180,.1);
            color:rgba(180,150,200,.7);
          }
          .rp-header .header-action-btn {
            width:34px;
            height:34px;
            background:rgba(160,100,180,.08);
            color:rgba(160,130,190,.5);
          }
          .rp-header .header-info { flex:1; min-width:0; }
          .rp-header .header-title {
            color:rgba(210,180,230,.9);
            font-family:'Cormorant Garamond','Zen Maru Gothic','Noto Sans SC',serif;
            font-size:17px;
            font-weight:500;
            letter-spacing:.03em;
          }
          .rp-header .header-subtitle {
            font-size:11px;
            margin-top:1px;
            color:rgba(160,120,180,.45);
            font-style:italic;
          }
          .scene-title-enter {
            animation:sceneFadeIn .6s ease-out both;
          }
          @keyframes sceneFadeIn {
            from { opacity:0; transform:translateY(-8px); }
            to { opacity:1; transform:translateY(0); }
          }
          .rp-room-stage {
            height:100%;
            display:flex;
            flex-direction:column;
            min-height:0;
            background:transparent;
          }
          .world-hint {
            margin:12px 14px 4px;
            padding:10px 14px;
            border-radius:14px;
            font-size:12px;
            display:flex;
            align-items:center;
            gap:8px;
            flex-shrink:0;
            background:rgba(80,40,100,.12);
            border:1px solid rgba(140,80,170,.1);
            backdrop-filter:blur(16px);
            color:rgba(180,150,210,.55);
            font-style:italic;
          }
          .world-hint-icon { font-size:14px; opacity:.6; }
          .messages-area {
            flex:1;
            overflow-y:auto;
            padding:10px 14px 14px;
            display:flex;
            flex-direction:column;
            gap:12px;
            min-height:0;
          }
          .msg-row {
            display:flex;
            gap:8px;
            align-items:flex-start;
          }
          .msg-row.from-user { flex-direction:row-reverse; }
          .msg-avatar {
            width:34px;
            height:34px;
            border-radius:50%;
            object-fit:cover;
            flex-shrink:0;
            border:1px solid rgba(140,80,170,.2);
            box-shadow:0 0 12px rgba(120,60,160,.15);
          }
          .msg-bubble {
            max-width:78%;
            padding:10px 14px;
            border-radius:18px;
            font-size:14px;
            line-height:1.65;
            position:relative;
            transition:all .5s ease;
          }
          .mode-rp .msg-bubble.ai {
            background:rgba(28,18,38,.65);
            border:1px solid rgba(140,80,180,.15);
            border-radius:18px 18px 18px 4px;
            color:rgba(220,210,235,.9);
            box-shadow:0 2px 16px rgba(100,40,140,.08), inset 0 1px 0 rgba(180,140,220,.06);
          }
          .mode-rp .msg-bubble.user {
            background:rgba(60,30,80,.25);
            border:1px solid rgba(160,100,200,.12);
            border-radius:18px 18px 4px 18px;
            color:rgba(210,195,225,.88);
            box-shadow:0 2px 12px rgba(80,30,120,.06);
          }
          .rp-action {
            color:rgba(180,140,210,.6);
            font-style:italic;
            display:block;
            margin:4px 0;
            line-height:1.7;
          }
          .rp-dialogue {
            display:block;
            margin:2px 0;
            color:rgba(230,220,245,.95);
          }
          .rp-composer {
            padding:10px 14px 28px;
            flex-shrink:0;
          }
          .rp-composer .composer-card {
            display:flex;
            align-items:center;
            gap:8px;
            padding:8px 10px 8px 16px;
            border-radius:24px;
            background:rgba(22,14,32,.6);
            border:1px solid rgba(140,80,180,.12);
            backdrop-filter:blur(24px);
            box-shadow:0 4px 20px rgba(80,30,120,.1);
          }
          .rp-composer .chat-input {
            color:rgba(210,200,225,.88);
            font-size:14px;
            padding:6px 0;
          }
          .rp-composer .chat-input::placeholder { color:rgba(140,110,170,.35); }
          .rp-composer .send-round {
            width:38px;
            height:38px;
            background:linear-gradient(135deg, rgba(120,50,160,.35), rgba(80,30,120,.4));
            color:rgba(200,170,230,.8);
            box-shadow:0 0 16px rgba(120,50,160,.15);
          }
          .mode-rp .msg-row { animation:rpMsgIn .35s ease-out both; }
          @keyframes rpMsgIn {
            from { opacity:0; transform:translateY(6px); }
            to { opacity:1; transform:translateY(0); }
          }
          .curtain-transition {
            position:fixed;
            inset:0;
            z-index:9999;
            pointer-events:none;
          }
          .curtain-transition .curtain-left,
          .curtain-transition .curtain-right {
            position:absolute;
            top:0;
            bottom:0;
            width:50%;
            background:linear-gradient(180deg,#1a0e24,#0e0a12);
          }
          .curtain-transition .curtain-left { left:0; transform:translateX(-100%); }
          .curtain-transition .curtain-right { right:0; transform:translateX(100%); }
          .curtain-transition.closing .curtain-left { animation:curtainCloseLeft .4s ease-in-out forwards; }
          .curtain-transition.closing .curtain-right { animation:curtainCloseRight .4s ease-in-out forwards; }
          .curtain-transition.opening .curtain-left { animation:curtainOpenLeft .4s ease-in-out forwards; }
          .curtain-transition.opening .curtain-right { animation:curtainOpenRight .4s ease-in-out forwards; }
          @keyframes curtainCloseLeft { from { transform:translateX(-100%); } to { transform:translateX(0); } }
          @keyframes curtainCloseRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
          @keyframes curtainOpenLeft { from { transform:translateX(0); } to { transform:translateX(-100%); } }
          @keyframes curtainOpenRight { from { transform:translateX(0); } to { transform:translateX(100%); } }
          .chat-shell.mode-normal .message-bubble.from-ai {
            background:rgba(255,248,252,.96);
            border:1px solid rgba(236,195,212,.5);
            border-radius:18px 18px 18px 4px;
            color:rgba(72,56,64,.88);
          }
          .chat-shell.mode-normal .message-bubble.from-user {
            background:linear-gradient(135deg, rgba(200,160,190,.25), rgba(180,140,200,.2));
            border:1px solid rgba(200,160,190,.3);
            border-radius:18px 18px 4px 18px;
            color:rgba(72,56,64,.88);
          }
        `;
        document.head.appendChild(style);
    }

    function playRpCurtainTransition(work) {
        ensureRpTheatreStyles();
        if (state.rpCurtainRunning) return Promise.resolve(work?.());
        state.rpCurtainRunning = true;
        const curtain = document.createElement('div');
        curtain.className = 'curtain-transition closing';
        curtain.innerHTML = '<div class="curtain-left"></div><div class="curtain-right"></div>';
        document.body.appendChild(curtain);
        return new Promise((resolve) => {
            window.setTimeout(async () => {
                try {
                    await work?.();
                } finally {
                    curtain.className = 'curtain-transition opening';
                    window.setTimeout(() => {
                        curtain.remove();
                        state.rpCurtainRunning = false;
                        resolve();
                    }, 450);
                }
            }, 420);
        });
    }

    function showBottomNav() {
        return ['list', 'moments', 'settings'].includes(state.currentView);
    }

    function renderHeader() {
        if (state.currentView === 'room') return renderRoomHeader();
        if (state.currentView === 'rpRoom') return renderRpRoomHeader();
        if (state.currentView === 'contactSettings') return renderSimpleHeader('\u8054\u7cfb\u4eba\u8bbe\u7f6e', 'back-room', true);
        if (state.currentView === 'cotLog') return renderSimpleHeader('COT \u65e5\u5fd7', 'back-contact-settings', true);
        if (state.currentView === 'rpLobby') {
            return `
        <header class="chat-page-header simple-header">
          <button class="icon-btn text-btn" data-action="back-rp-source" aria-label="\u8fd4\u56de">${icon('back')}</button>
          <div class="chat-page-title">Mirage 夢幻楼</div>
          <button class="icon-btn ghost-circle" data-action="open-rp-room-create" aria-label="\u65b0\u5efa\u623f\u95f4">${icon('plus')}</button>
        </header>
      `;
        }
        if (state.currentView === 'companionStateDetail') return renderSimpleHeader('\u5f53\u524d\u72b6\u6001', 'back-contact-settings', true);
        if (state.currentView === 'contactImpressionDetail') return renderSimpleHeader('\u5173\u4e8e\u4f60\u7684\u5370\u8c61', 'back-contact-settings', true);
        if (state.currentView === 'contactRelationshipDetail') return renderSimpleHeader('\u5173\u7cfb\u8fdb\u5c55', 'back-contact-settings', true);
        if (state.currentView === 'contactLikesDetail') return renderSimpleHeader('\u4f60\u559c\u6b22\u7684\u4e1c\u897f', 'back-contact-settings', true);
        if (state.currentView === 'contactRoomBackgroundPicker') return renderSimpleHeader('\u804a\u5929\u80cc\u666f', 'back-contact-settings', true);
        if (state.currentView === 'contactBubbleThemePicker') return renderSimpleHeader('\u6c14\u6ce1\u4e3b\u9898', 'back-contact-settings', true);
        if (state.currentView === 'profile') return renderSimpleHeader('\u8054\u7cfb\u4eba\u8d44\u6599', 'back-room', true);
        if (state.currentView === 'newContact') return renderSimpleHeader('\u6dfb\u52a0\u8054\u7cfb\u4eba', 'back-home', true);

        let title = 'Murmur';
        if (state.currentView === 'moments') title = 'Echo';
        if (state.currentView === 'settings') title = 'Veil';

        const showCreateContact = state.currentTab === 'chats' && state.currentView === 'list';

        return `
      <header class="chat-page-header">
        <div class="header-left"></div>
        <div class="chat-page-title" style="font-weight: 800; letter-spacing: 0.02em;">${title}</div>
        ${showCreateContact
                ? `<button class="icon-btn ghost-circle" data-action="new-contact" aria-label="\u6dfb\u52a0\u8054\u7cfb\u4eba">${icon('plus')}</button>`
                : '<span class="header-spacer"></span>'}
      </header>
    `;
    }

    function renderSimpleHeader(title, backAction, withSpacer = false) {
        return `
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="${backAction}" aria-label="\u8fd4\u56de">${icon('back')}</button>
        <div class="chat-page-title">${escapeHtml(title)}</div>
        ${withSpacer ? '<span class="header-spacer"></span>' : ''}
      </header>
    `;
    }

    function renderRoomHeader() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const displayModel = c.settings?.model || state.globalSettings.defaultModel || 'gpt-5.4';
        const codexAllowed = canToggleCodexForContact(c);
        const ccAllowed = canToggleCCForContact(c);
        const codexActive = isCodexEnabledForContact(c);
        const ccActive = isCCEnabledForContact(c);
        const takeoverButton = codexAllowed
            ? `<button class="takeover-toggle ${codexActive ? 'active' : ''}" data-action="toggle-codex-mode" data-contact-id="${escapeHtml(c.id)}" type="button" aria-pressed="${codexActive}" aria-label="${codexActive ? '关闭 Codex 接管' : '启用 Codex 接管'}">Codex</button>`
            : ccAllowed
                ? `<button class="takeover-toggle cc ${ccActive ? 'active' : ''}" data-action="toggle-cc-mode" data-contact-id="${escapeHtml(c.id)}" type="button" aria-pressed="${ccActive}" aria-label="${ccActive ? '关闭 Claude Code 接管' : '启用 Claude Code 接管'}">CC</button>`
                : '';
        return `
      <header class="room-hero room-theme-${c.theme}">
        <div class="room-hero-inner">
          <button class="icon-btn icon-circle room-left-btn" data-action="back-list" aria-label="\u8fd4\u56de\u5217\u8868">${icon('back')}</button>
          <div class="room-profile-card" data-action="open-profile">
            <img class="room-profile-avatar" src="${c.avatar}" alt="${escapeHtml(c.name)}" />
            <div class="room-profile-meta">
              <div class="room-profile-title-line">
                <strong class="room-profile-name">${escapeHtml(c.name)}</strong>
                <span class="room-profile-model">${escapeHtml(displayModel)}</span>
              </div>
              <div class="room-profile-sub"><span class="online-dot"></span> \u5728\u7ebf</div>
            </div>
          </div>
          <div class="room-actions">
            ${takeoverButton}
            <button class="icon-btn icon-circle" data-action="open-contact-settings" aria-label="\u8054\u7cfb\u4eba\u8bbe\u7f6e">${icon('settings')}</button>
          </div>
        </div>
      </header>
    `;
    }

    function renderRpRoomHeader() {
        const room = getCurrentRpRoom();
        return `
      <header class="rp-header">
        <button class="header-back" data-action="back-rp-lobby" aria-label="\u8fd4\u56de">${icon('back')}</button>
        <div class="header-info">
          <div class="header-title scene-title-enter">${escapeHtml(room?.name || 'Mirage\u00b7\u5e7b\u697c')}</div>
          <div class="header-subtitle">${escapeHtml(room?.ai_role || '\u5e55\u95f4\u8fdb\u884c\u4e2d')}</div>
        </div>
        <div class="header-actions">
          <button class="header-action-btn" data-action="rename-rp-room" data-room-id="${escapeHtml(room?.room_id || '')}" aria-label="\u7f16\u8f91">${icon('more')}</button>
        </div>
      </header>
    `;
    }

    function renderBody() {
        if (state.currentView === 'room') return renderChatRoom();
        if (state.currentView === 'rpLobby') return renderRpLobbyPageV3();
        if (state.currentView === 'rpRoom') return renderRpRoomPage();
        if (state.currentView === 'moments') return renderMoments();
        if (state.currentView === 'settings') return renderGlobalSettings();
        if (state.currentView === 'contactSettings') return renderContactSettingsV2();
        if (state.currentView === 'cotLog') return renderCotLogPage();
        if (state.currentView === 'companionStateDetail') return renderCompanionStateDetail();
        if (state.currentView === 'contactImpressionDetail') return renderContactInsightDetail('\u5173\u4e8e\u4f60\u7684\u5370\u8c61', 'impression', state.companionState.impression);
        if (state.currentView === 'contactRelationshipDetail') return renderContactInsightDetail('\u5173\u7cfb\u8fdb\u5c55', 'relationshipProgress', state.companionState.relationshipProgress);
        if (state.currentView === 'contactLikesDetail') return renderContactInsightDetail('\u4f60\u559c\u6b22\u7684\u4e1c\u897f', 'likesSummary', state.companionState.likesSummary);
        if (state.currentView === 'contactRoomBackgroundPicker') return renderRoomBackgroundPicker();
        if (state.currentView === 'contactBubbleThemePicker') return renderBubbleThemePicker();
        if (state.currentView === 'profile') return renderProfile();
        if (state.currentView === 'newContact') return renderNewContact();
        return renderChatList();
    }

    function renderBottomNav() {
        return `
      <nav class="bottom-tabbar">
        ${bottomTab('chats', 'tabChat', '\u7e41\u8bed')}
        ${bottomTab('moments', 'tabMoments', '\u4f59\u54cd')}
        ${bottomTab('settings', 'tabSettings', '\u5e37\u5e55')}
      </nav>
    `;
    }

    function bottomTab(tab, iconName, label) {
        const active = state.currentTab === tab;
        return `
      <button class="nav-tab-btn ${active ? 'active' : ''}" data-action="switch-tab" data-tab="${tab}">
        <div class="nav-tab-icon">${icon(iconName)}</div>
        <span class="nav-tab-label">${escapeHtml(label)}</span>
      </button>
    `;
    }

    function renderChatList() {
        const contacts = [...state.contacts].sort((a, b) => (b.pinned - a.pinned) || 0);
        return `
      <section class="list-page page-block transparent-canvas">
        <div class="message-panel-card">
        <div class="chat-list-card">
          <div class="search-wrap">
            <div class="search-pill">
              <span class="search-icon">${icon('search')}</span>
              <input type="text" placeholder="\u641c\u7d22\u804a\u5929\u8bb0\u5f55" class="search-input" />
            </div>
          </div>
          <div class="contact-list-wrap">
            <button type="button" class="chat-list-item" data-action="open-rp-lobby" style="min-height:44px;padding:8px 14px;">
              <div class="chat-list-content" style="min-width:0;">
                <div class="chat-list-head">
                  <strong class="chat-list-name" style="font-size:14px;color:rgba(92,76,84,.72);font-weight:700;">Mirage 夢幻楼</strong>
                </div>
              </div>
            </button>
            ${contacts.map(renderContactRow).join('')}
          </div>
        </div>
      </section>
        </div>
    `;
    }

    function renderContactRow(c) {
        const handle = String(c.handle || (c.id ? `@${c.id}` : '')).trim();
        return `
      <button type="button" class="chat-list-item" data-action="open-contact" data-contact-id="${c.id}">
        <div class="chat-list-avatar-wrap">
          <img src="${c.avatar}" alt="${escapeHtml(c.name)}" class="chat-list-avatar" />
          ${c.unread ? `<span class="chat-list-badge">${c.unread}</span>` : ''}
        </div>
        <div class="chat-list-content">
          <div class="chat-list-head">
            <span class="chat-list-title">
              <strong class="chat-list-name">${escapeHtml(c.name)}</strong>
              ${handle ? `<span class="chat-list-handle">${escapeHtml(handle)}</span>` : ''}
            </span>
            <time class="chat-list-time">${escapeHtml(c.lastTime)}</time>
          </div>
          <div class="chat-list-snippet">${escapeHtml(c.lastMessage)}</div>
        </div>
      </button>
    `;
    }

    async function validateContactSessionOnOpen(contact) {
        const existingId = String(contact?.sessionId || '').trim();
        if (!existingId) return;
        try {
            const resp = await fetch(`${API_BASE}/api/sessions/${encodeURIComponent(existingId)}`);
            if (resp.ok) return;
            contact.sessionId = '';
            queueLocalSyncIfChanged(120);
        } catch (error) {
            console.warn('[session] open-contact validation failed', error);
        }
    }

    function resetCompanionStateCache() {
        state.companionState = normalizeCompanionState({});
    }

    function cleanupDeletedContactState(contactId) {
        const normalizedId = String(contactId || '').trim();
        if (!normalizedId) return;

        cancelAssistantPlayback?.('contact-deleted');
        if (state.streamingAbortController && state.currentContactId === normalizedId) {
            state.streamingAbortController.abort();
            state.streamingAbortController = null;
        }
        if (agentPersonaSaveTimers.has(normalizedId)) {
            clearTimeout(agentPersonaSaveTimers.get(normalizedId));
            agentPersonaSaveTimers.delete(normalizedId);
        }

        state.contacts = state.contacts.filter((item) => item.id !== normalizedId);
        state.activeBubbleToolsId = null;
        state.quoteMomentId = null;
        state.quoteMessageId = null;
        state.contactQuickActionEditorId = '';
        state.quickActionSwipeOpenId = '';
        state.quickActionDragId = '';
        state.quickActionDropHintId = '';
        state.quickActionDropDirection = '';
        state.quickActionReorderPulseId = '';
        state.currentTopicTitle = '';
        state.rpRooms = [];
        state.currentRpRoomId = '';
        state.currentRpMessages = [];

        const nextContact = state.contacts[0] || null;
        if (state.currentContactId === normalizedId || !byId(state.currentContactId)) {
            state.currentContactId = nextContact?.id || '';
            resetCompanionStateCache();
            state.currentView = 'list';
            state.currentTab = 'chats';
            state.currentSettingsTab = 'basic';
        }

        const chatInput = root()?.querySelector('.chat-input');
        if (chatInput) chatInput.value = '';
    }

    async function deleteContactSafe(contactId) {
        const normalizedId = String(contactId || '').trim();
        if (!normalizedId) return false;
        const resp = await fetch(`${API_BASE}/api/agents/${encodeURIComponent(normalizedId)}/safe-delete`, {
            method: 'DELETE',
        });
        if (!resp.ok) {
            let detail = `HTTP ${resp.status}`;
            try {
                const data = await resp.json();
                detail = data?.detail || detail;
            } catch { }
            throw new Error(detail);
        }
        return true;
    }

    function getCurrentRpAgentId() {
        return state.currentContactId || state.contacts[0]?.id || 'default';
    }

    function getCurrentRpRoom() {
        return state.rpRooms.find((item) => item.room_id === state.currentRpRoomId) || null;
    }

    function createNewContactDraft() {
        return { name: '', agentId: '', bio: '', avatar: '' };
    }

    function normalizeNewContactAgentId(value) {
        return String(value || '').trim().replace(/^@+/, '').toLowerCase();
    }

    const CODEX_TOGGLE_CONTACT_IDS = new Set(['zhansi']);
    const CC_TOGGLE_CONTACT_IDS = new Set(['azheng']);

    function canToggleCodexForContact(contact = {}) {
        const ids = [
            contact?.id,
            contact?.agent_id,
            contact?.handle,
        ].map(normalizeNewContactAgentId).filter(Boolean);
        return ids.some((id) => CODEX_TOGGLE_CONTACT_IDS.has(id));
    }

    function isCodexEnabledForContact(contact = {}) {
        return canToggleCodexForContact(contact) && !!contact?.settings?.codexEnabled;
    }

    function canToggleCCForContact(contact = {}) {
        const ids = [
            contact?.id,
            contact?.agent_id,
            contact?.handle,
        ].map(normalizeNewContactAgentId).filter(Boolean);
        return ids.some((id) => CC_TOGGLE_CONTACT_IDS.has(id));
    }

    function isCCEnabledForContact(contact = {}) {
        return canToggleCCForContact(contact) && !!contact?.settings?.ccEnabled;
    }

    function contactDefaults(contact = {}) {
        const id = String(contact.id || '').trim() || `c${Date.now()}`;
        const chatTheme = getContactChatThemeKey(contact);
        return {
            id,
            agent_id: String(contact.agent_id || contact.id || id),
            name: String(contact.name || id),
            display_name: String(contact.display_name || contact.name || id),
            bio: String(contact.bio || '\u8fd9\u662f\u65b0\u6765\u7684\u8054\u7cfb\u4eba'),
            status: String(contact.status || '\u5728\u7ebf'),
            handle: String(contact.handle || `@${id}`),
            roleTag: String(contact.roleTag || ''),
            theme: bubbleThemeToRoomTheme(chatTheme),
            chatTheme,
            bubbleTheme: getChatThemeLabel(chatTheme),
            unread: Number(contact.unread || 0),
            pinned: !!contact.pinned,
            lastMessage: String(contact.lastMessage || ''),
            lastTime: String(contact.lastTime || ''),
            avatar: String(contact.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80'),
            topics: Array.isArray(contact.topics) ? contact.topics : [],
            messages: Array.isArray(contact.messages) ? contact.messages : [],
            settings: {
                model: 'gpt-5.4',
                modelProviderId: getSlot('chat')?.providerId || 'openai',
                temperature: 0.7,
                topP: 0.9,
                contextCount: 32,
                thinkBudget: 24,
                streamOutput: true,
                reasoning_visibility: false,
                proactiveEnabled: false,
                proactiveFrequency: 30,
                memoryEnabled: true,
                codexEnabled: false,
                ccEnabled: false,
                ...(contact.settings || {}),
            },
        };
    }

    function mergeContact(contact) {
        const normalized = contactDefaults(contact);
        const idx = state.contacts.findIndex((item) => String(item.id || '').toLowerCase() === normalized.id.toLowerCase());
        if (idx >= 0) {
            state.contacts[idx] = { ...state.contacts[idx], ...normalized };
        } else {
            state.contacts.unshift(normalized);
        }
        return normalized;
    }

    async function registerAgentForContact(contact) {
        try {
            const resp = await fetch(`${API_BASE}/api/agents`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    agent_id: contact.id,
                    display_name: contact.name,
                    avatar: contact.avatar || '',
                    description: contact.bio || '',
                    source: 'murmur',
                    metadata: { from: 'murmur_contact' },
                }),
            });
            if (resp.ok) return true;
            let detail = '';
            try {
                const data = await resp.json();
                detail = typeof data?.detail === 'string' ? data.detail : JSON.stringify(data?.detail || data);
            } catch { }
            const alreadyExists = resp.status === 409 || /already exists|duplicate|23505/i.test(detail);
            if (alreadyExists) {
                fetch(`${API_BASE}/api/agents/${encodeURIComponent(contact.id)}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        display_name: contact.name,
                        avatar: contact.avatar || '',
                        description: contact.bio || '',
                        source: 'murmur',
                        is_active: true,
                    }),
                }).catch(() => {});
                return true;
            }
            return false;
        } catch (error) {
            console.warn('[agents] register contact failed', error);
            return false;
        }
    }

    function formatRpTime(value) {
        return formatDisplayTime(value, { fallback: '' });
    }

    function formatDisplayTime(value, { fallback = '', includeYear = false } = {}) {
        if (!value) return fallback;
        const raw = String(value || '').trim();
        if (!raw) return fallback;
        const dt = new Date(raw);
        if (Number.isNaN(dt.getTime())) return raw;
        const now = new Date();
        const sameYear = dt.getFullYear() === now.getFullYear();
        const sameDay = dt.toDateString() === now.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const time = dt.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
        if (sameDay) return `今天 ${time}`;
        if (dt.toDateString() === yesterday.toDateString()) return `昨天 ${time}`;
        const opts = includeYear || !sameYear
            ? { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }
            : { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        return dt.toLocaleString('zh-CN', opts).replace(/\//g, '-');
    }

    async function loadRpRooms(agentId = getCurrentRpAgentId(), { silent = true } = {}) {
        try {
            const resp = await fetch(`${API_BASE}/api/rp/rooms?agent_id=${encodeURIComponent(agentId)}`);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json();
            state.rpRooms = Array.isArray(data.rooms) ? data.rooms : [];
            if (!silent) render();
            return state.rpRooms;
        } catch (error) {
            console.warn('[rp] load rooms failed', error);
            if (!silent) {
                state.toast = 'RP 鎴块棿鍔犺浇澶辫触';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            }
            return [];
        }
    }

    async function loadRpRoomMessages(roomId, { silent = true } = {}) {
        if (!roomId) return [];
        try {
            const resp = await fetch(`${API_BASE}/api/rp/rooms/${encodeURIComponent(roomId)}/messages`);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json();
            const room = data.room || state.rpRooms.find((item) => item.room_id === roomId);
            if (room) {
                const idx = state.rpRooms.findIndex((item) => item.room_id === roomId);
                if (idx >= 0) state.rpRooms[idx] = room;
            }
            const remoteMessages = (Array.isArray(data.messages) ? data.messages : []).map((item) => ({
                id: item.id,
                role: item.role === 'assistant' ? 'ai' : item.role,
                text: item.content || '',
                content: item.content || '',
                time: formatRpTime(item.timestamp),
                timestamp: item.timestamp || '',
                created_at: item.timestamp || '',
            }));
            state.currentRpMessages = mergeMessageLists(state.rpMessages?.[roomId] || [], remoteMessages).map(contactMessageFromStored);
            state.rpMessages = { ...(state.rpMessages || {}), [roomId]: state.currentRpMessages.map(normalizeStoredMessage) };
            queueLocalSyncIfChanged(120);
            if (!silent) render();
            return state.currentRpMessages;
        } catch (error) {
            console.warn('[rp] load messages failed', error);
            state.currentRpMessages = (state.rpMessages?.[roomId] || []).map(contactMessageFromStored);
            if (!silent) {
                state.toast = 'RP 娑堟伅鍔犺浇澶辫触';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            }
            return [];
        }
    }

    async function openRpLobby(backView = (state.currentView === 'room' ? 'room' : 'list'), agentId = getCurrentRpAgentId()) {
        state.rpBackView = backView;
        state.currentView = 'rpLobby';
        state.currentTab = 'chats';
        render();
        await loadRpRooms(agentId, { silent: false });
    }

    async function saveRpRoomForm() {
        const name = root()?.querySelector('#rp-room-name')?.value?.trim() || '';
        const world_setting = root()?.querySelector('#rp-room-world')?.value?.trim() || '';
        const user_role = root()?.querySelector('#rp-room-user-role')?.value?.trim() || '';
        const ai_role = root()?.querySelector('#rp-room-ai-role')?.value?.trim() || '';
        const payload = {
            agent_id: getCurrentRpAgentId(),
            name: name || '新房间',
            world_setting,
            user_role,
            ai_role,
        };
        const editingRoomId = state.rpRoomDialogMode === 'edit' ? state.currentRpRoomId : '';
        const url = editingRoomId
            ? `${API_BASE}/api/rp/rooms/${encodeURIComponent(editingRoomId)}`
            : `${API_BASE}/api/rp/rooms`;
        const method = editingRoomId ? 'PATCH' : 'POST';
        const resp = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        const room = data.room;
        state.rpRoomDialogOpen = false;
        await loadRpRooms(getCurrentRpAgentId(), { silent: true });
        if (room?.room_id) {
            state.currentRpRoomId = room.room_id;
            if (!editingRoomId) {
                await openRpRoom(room.room_id);
                return room;
            }
        }
        render();
        return room;
    }

    async function openRpRoom(roomId) {
        if (!roomId) return;
        await playRpCurtainTransition(async () => {
            state.currentRpRoomId = roomId;
            state.currentView = 'rpRoom';
            state.currentTab = 'chats';
            state.showAttach = false;
            render();
            await loadRpRoomMessages(roomId, { silent: false });
        });
    }

    async function deleteRpRoom(roomId) {
        if (!roomId) return;
        const ok = window.confirm('删除这个 RP 房间？');
        if (!ok) return;
        const resp = await fetch(`${API_BASE}/api/rp/rooms/${encodeURIComponent(roomId)}`, { method: 'DELETE' });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        state.rpRooms = state.rpRooms.filter((item) => item.room_id !== roomId);
        if (state.currentRpRoomId === roomId) {
            state.currentRpRoomId = '';
            state.currentRpMessages = [];
            state.currentView = 'rpLobby';
        }
        render();
    }

    function openContact(contactId) {
        const c = state.contacts.find((item) => item.id === contactId);
        if (c) c.unread = 0;
        state.currentContactId = contactId;
        state.currentTab = 'chats';
        state.currentView = 'room';
        state.activeBubbleToolsId = null;
        render();
        if (c) validateContactSessionOnOpen(c);
        if (c) loadMurmurHistoryForContact(contactId);
        loadCompanionState(contactId);
        loadAgentPersona(contactId);
    }

    function scheduleCurrentRoomHistoryHydration(delay = 80) {
        window.setTimeout(() => {
            const contact = byId(state.currentContactId) || state.contacts[0];
            if (!contact?.id) return;
            void loadMurmurHistoryForContact(contact.id, { silent: false });
        }, delay);
    }


    function contactMessageKeys(contact = {}) {
        const rawKeys = [
            contact?.id,
            contact?.agent_id,
            contact?.agentId,
            contact?.handle,
            String(contact?.handle || '').replace(/^@+/, ''),
        ];
        const keys = [];
        rawKeys.forEach((key) => {
            const raw = String(key || '').trim();
            if (!raw) return;
            keys.push(raw);
            keys.push(normalizeNewContactAgentId(raw));
        });
        return [...new Set(keys.filter(Boolean))];
    }

    function conversationMessagesForContact(contact = {}) {
        const conversations = state.conversations || {};
        const buckets = contactMessageKeys(contact).flatMap((key) => conversations[key] || []);
        return mergeMessageLists(buckets, Array.isArray(contact.messages) ? contact.messages : []);
    }

    function ensureRoomHistoryLoaded(contact = {}) {
        if (state.currentView !== 'room' || !contact?.id) return;
        if (conversationMessagesForContact(contact).length) return;
        if (state.historyLoadingContactIds[contact.id] || state.historyLoadedContactIds[contact.id]) return;
        state.historyLoadingContactIds[contact.id] = true;
        loadMurmurHistoryForContact(contact.id)
            .then((count) => {
                if (count) state.historyLoadedContactIds[contact.id] = true;
            })
            .finally(() => {
                delete state.historyLoadingContactIds[contact.id];
            });
    }

    function renderActionChip(action) {
        const label = escapeHtml(action?.label || '');
        const iconName = action?.icon || 'more';
        return `
      <button type="button" class="action-chip glass-frost" data-action="quick-action" data-id="${escapeHtml(action?.id || '')}">
        <span class="action-chip-icon">${icon(iconName)}</span>
        <span class="action-chip-label">${label}</span>
      </button>
    `;
    }

    function renderChatRoom() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const quoteMoment = state.quoteMomentId ? getMoment(state.quoteMomentId) : null;
        const quoteMessage = state.quoteMessageId ? c.messages.find((item) => item.id === state.quoteMessageId) : null;
        const messages = visibleChatMessages(conversationMessagesForContact(c));
        const attachments = (state.chatAttachments || []).map(serializeChatAttachment).filter(Boolean);
        return `
      <section class="room-page room-theme-${c.theme}">
        <div class="messages-panel">
          ${messages.map((m, index) => renderMessage(m, c, messageRenderMeta(messages, index))).join('')}
        </div>
        <div class="composer-zone">
          ${quoteMessage ? renderMessageQuoteBar(quoteMessage, c) : quoteMoment ? renderQuoteBar(quoteMoment) : ''}
          ${renderChatAttachmentTray(attachments)}
          <input id="chat-image-input" class="moment-image-input" type="file" accept="image/*" multiple />
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="\u8f93\u5165\u6d88\u606f..." value="" />
            </div>
            <button class="icon-btn icon-circle soft-mini" data-action="expand-actions" aria-label="\u9644\u4ef6">${icon('attach')}</button>
            ${state.streamingAbortController
                ? `<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="\u505c\u6b62">${icon('stop')}</button>`
                : `<button class="icon-btn send-round" data-action="fake-send" aria-label="\u53d1\u9001">${icon('send')}</button>`
            }
          </div>
        </div>
      </section>
    `;
    }

    function visibleChatMessages(messages = []) {
        return mergeMessageLists([], messages).map(contactMessageFromStored).filter(isRenderableMessage);
    }

    function messageRenderMeta(messages = [], index = 0) {
        const message = messages[index] || {};
        const prev = messages[index - 1] || null;
        const gap = prev
            ? Math.abs(comparableTime(message.created_at || message.timestamp) - comparableTime(prev.created_at || prev.timestamp))
            : 0;
        const showTime = !prev || !sameMessageMinute(prev, message) || gap > 5 * 60 * 1000;
        return { showTime };
    }

    function renderMessage(message, contact, meta = {}) {
        if (!isRenderableMessage(message)) return '';
        const roleClass = message.role === 'user' ? 'from-user' : 'from-ai';
        const msgSource = String(message.source || message.provider || '').toLowerCase();
        const isCodexSource = msgSource === 'codex';
        const isCCSource = msgSource === 'claude-code';
        const allowReasoning = !!contact?.settings?.reasoning_visibility;
        const avatar = message.role === 'ai'
            ? `<img class="bubble-avatar" src="${contact.avatar}" alt="${escapeHtml(contact.name)}" />`
            : '';
        const sourceBadge = message.role === 'ai' && (isCodexSource || isCCSource)
            ? `<span class="message-source-badge ${isCodexSource ? 'codex' : 'claude-code'}">${isCodexSource ? 'Codex' : 'Claude'}</span>`
            : '';
        const cotButton = message.role === 'ai' && allowReasoning && message.thinking && !message.typing
            ? `<button class="bubble-cot-btn" data-action="toggle-thinking" data-id="${message.id}" aria-label="\u5c55\u5f00\u72ec\u767d">${icon('bubbleHeart')}</button>`
            : '';
        const bottomTools = message.role === 'ai' && !message.typing && !message.streaming
            ? `
        <div class="bubble-bottom-tools ${state.activeBubbleToolsId === message.id ? 'open' : ''}">
          <button class="bubble-mini-btn" data-action="reroll-msg" data-id="${message.id}" aria-label="\u91cd\u8bd5">${icon('reroll')}</button>
          <button class="bubble-mini-btn" data-action="quote-msg" data-id="${message.id}" aria-label="\u5f15\u7528">${icon('quote')}</button>
        </div>
      `
            : '';
        const awaitingBody = message.role === 'ai' && message.streaming && !message.text;
        const bubbleClassExtra = `${awaitingBody ? ' message-awaiting-text' : ''}${cotButton ? ' has-cot' : ''}`;
        const thinkingBlock = allowReasoning && message.thinking
            ? renderThinkingLine(message)
            : '';
        const toolLinesBlock = (message.toolCalls && message.toolCalls.length)
            ? renderToolLines(message.toolCalls)
            : '';
        const text = normalizeBubbleText(messageTextValue(message));
        const attachments = messageAttachments(message);
        const attachmentBlock = renderMessageAttachments(attachments);
        const showInlineTime = meta.showTime && message.time && !message.typing;
        const inlineTimeClass = attachments.length || text.length > 18 || text.includes('\n') ? 'block-time' : 'tail-time';
        const inlineTime = showInlineTime ? `<time class="bubble-time ${inlineTimeClass}">${escapeHtml(message.time)}</time>` : '';
        const showSourceMeta = message.role === 'ai' && sourceBadge;
        const bubbleWrap = `
          <div class="message-bubble-wrap">
            ${showSourceMeta ? `<div class="bubble-meta-row">
              ${sourceBadge}
            </div>` : ''}
            <div class="message-bubble ${roleClass}${bubbleClassExtra}" ${message.role === 'ai' ? `data-msg-id="${message.id}" data-action="toggle-message-tools" data-id="${message.id}"` : ''}>
              ${cotButton}
              ${(message.typing || (message.streaming && !message.text))
                  ? `<div class="typing-dots"><span></span><span></span><span></span></div>`
                  : `${attachmentBlock}${text ? `<div class="message-text">${escapeHtml(text)}${inlineTimeClass === 'tail-time' ? inlineTime : ''}</div>` : ''}${inlineTimeClass === 'block-time' ? inlineTime : ''}`}
            </div>
            ${bottomTools}
          </div>`;
        const colInner = message.role === 'ai' && (thinkingBlock || toolLinesBlock)
            ? `${thinkingBlock}${toolLinesBlock}${bubbleWrap}`
            : `${bubbleWrap}${thinkingBlock}${toolLinesBlock}`;
        return `
      <div class="message-row ${roleClass}" data-msg-id="${message.id}">
        ${avatar}
        <div class="message-bubble-col">
          ${colInner}
        </div>
      </div>
    `;
    }

    function renderQuoteBar(moment) {
        const c = byId(moment.contactId);
        return `
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${icon('quote')}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">\u5f15\u7528\u81ea ${escapeHtml(c?.name || '\u52a8\u6001')}</div>
          <div class="quote-text">${escapeHtml(moment.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="\u6e05\u9664\u5f15\u7528">${icon('more')}</button>
      </div>
    `;
    }

    function renderMoments() {
        const moments = Array.isArray(state.moments) ? state.moments : [];
        const currentAgent = byId(state.currentContactId) || state.contacts[0];
        return `
      <section class="moments-page white-canvas">
        <div class="moments-cover-area">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" class="moments-cover-img" />
          <div class="moments-cover-gradient"></div>
          <div class="moments-me-info">
            <span class="moments-me-name">\u6211</span>
            <img src="${escapeHtml(state.accountProfile?.avatar || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80')}" class="moments-me-avatar" />
          </div>
          <div class="ai-chip-row" style="position:absolute;left:18px;bottom:14px;z-index:2;">
            <button class="ai-chip ${state.momentsActorType === 'user' ? 'active' : ''}" data-action="set-moments-actor" data-actor-type="user">浠ユ垜</button>
            <button class="ai-chip ${state.momentsActorType === 'agent' ? 'active' : ''}" data-action="set-moments-actor" data-actor-type="agent">浠?{escapeHtml(currentAgent?.name || '褰撳墠瑙掕壊')}</button>
          </div>
          <button type="button" class="icon-btn cover-camera-btn" data-action="new-moment" aria-label="\u53d1\u670b\u53cb\u5708"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.6c.86 2.2 1.95 3.49 3.52 4.34 1.27.68 2.62 1 4.55 1.11-.68.18-1.14.32-1.76.58-2.68 1.14-4.23 2.84-5.34 5.96-.25.72-.35 1.04-.55 1.93-.18-.76-.28-1.08-.49-1.73-1.09-3.16-2.65-4.89-5.33-6.11-.71-.32-1.22-.49-2-.67 1.99-.12 3.38-.46 4.65-1.17 1.49-.84 2.53-2.1 3.41-4.24Z" fill="currentColor"/></svg></button>
        </div>
        <div class="moments-feed-wrap">
          ${moments.map(renderMomentCard).join('')}
        </div>
      </section>
    `;
    }

    function renderMomentComposerSheet() {
        return `
      <div class="moment-composer-overlay" data-action="close-moment-composer"></div>
      <section class="moment-composer-sheet glass-frost">
        <div class="moment-composer-handle"></div>
        <div class="moment-composer-head">
          <strong>${state.momentComposerEditingId ? '编辑朋友圈' : '发朋友圈'}</strong>
          <button type="button" class="icon-btn ghost-circle moment-composer-close" data-action="close-moment-composer" aria-label="\u5173\u95ed">${icon('close')}</button>
        </div>
        <textarea id="moment-content-input" class="ai-textarea new-moment-input" data-action="moment-composer-input" placeholder="\u8fd9\u4e00\u523b\u60f3\u5206\u4eab\u4ec0\u4e48\uff1f">${escapeHtml(state.momentComposerText || '')}</textarea>
        ${state.momentComposerImage ? `
          <div class="moment-composer-preview">
            <img src="${state.momentComposerImage}" alt="\u9884\u89c8" class="moment-composer-preview-image" />
            <div class="moment-composer-preview-meta">
              <span>${escapeHtml(state.momentComposerImageName || '\u5df2\u6dfb\u52a0\u56fe\u7247')}</span>
              <button type="button" class="ghost-action moment-remove-image" data-action="remove-moment-image">\u79fb\u9664</button>
            </div>
          </div>
        ` : ''}
        <div class="moment-composer-actions">
          <label class="btn-composer-upload" for="moment-image-input">${icon('camera')}\u6dfb\u52a0\u56fe\u7247</label>
          <input id="moment-image-input" class="moment-image-input" type="file" accept="image/*" />
          <button type="button" class="btn-composer-submit" data-action="publish-moment">${state.momentComposerEditingId ? '保存' : '发布'}</button>
        </div>
      </section>
    `;
    }

    function renderMomentCard(post) {
        const moment = normalizeMoment(post);
        const c = resolveMomentAuthor(moment);
        const canManage = canManageMoment(moment);
        const actor = currentMomentsActor();
        const liked = moment.likes.some((item) => item.author_type === actor.author_type && item.author_id === actor.author_id);

        return `
      <article class="moment-row">
        <img src="${c.avatar}" alt="${escapeHtml(c.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${escapeHtml(c.name)}</div>
          <div class="moment-text-body">${escapeHtml(moment.content)}</div>
          ${moment.image ? `<img src="${moment.image}" alt="${escapeHtml(moment.mood || 'moment')}" class="moment-inline-image" />` : ''}
          
          <div class="moment-footer">
            <time class="moment-time">${escapeHtml(formatDisplayTime(moment.created_at || moment.updated_at || moment.time, { fallback: moment.time || '' }))}</time>
            <div class="moment-actions-group">
              <button type="button" class="icon-btn tiny-icon align-center" data-action="like-moment" data-moment-id="${moment.id}">${liked ? icon('heartFilled') : icon('heart')}</button>
              <button type="button" class="icon-btn tiny-icon align-center" data-action="open-comments" data-moment-id="${moment.id}">${icon('comment')}</button>
              ${canManage ? `
                <div class="moment-action-menu-wrap">
                  <button type="button" class="icon-btn tiny-icon" data-action="toggle-moment-menu" data-moment-id="${moment.id}">${icon('actionDots')}</button>
                  ${state.activeMenuMomentId === moment.id ? `
                    <div class="moment-menu-horizontal slide-fade-in liquid-glass">
                      <button type="button" class="icon-btn tiny-icon" data-action="edit-moment" data-moment-id="${moment.id}">${icon('pencil')}</button>
                      <button type="button" class="icon-btn tiny-icon" data-action="delete-moment" data-moment-id="${moment.id}">${icon('trash')}</button>
                    </div>
                  ` : ''}
                </div>
              ` : `
                <button type="button" class="icon-btn tiny-icon" data-action="go-chat-with-quote" data-contact-id="${moment.author_id}" data-moment-id="${moment.id}">${icon('quote')}</button>
              `}
            </div>
          </div>
          
          ${(moment.likes.length > 0 || moment.comments.length > 0) ? `
            <div class="moment-interactions" data-moment-id-panel="${moment.id}">
              ${moment.likes.length > 0 ? `
                <div class="moment-likes-area">
                  <span class="heart-mini">${icon('heartFilled')}</span> <span class="likes-list">${escapeHtml(formatMomentActorNames(moment.likes))}</span>
                </div>
              ` : ''}
              ${moment.comments.length > 0 ? `
                <div class="moment-comments-area">
                  ${moment.comments.map((comment) => `<div class="moment-comment-line"><span class="comment-author">${escapeHtml(comment.author_name || comment.author || '')}</span>: <span class="comment-text">${escapeHtml(comment.text)}</span></div>`).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <div class="moment-inline-comment ${state.commentSheetMomentId === post.id ? 'open' : ''}">
            <input class="moment-comment-input" data-comment-input="${post.id}" placeholder="\u5199\u4e0b\u4f60\u7684\u8bc4\u8bba" />
            <button type="button" class="icon-btn send-round mini-send" data-action="submit-comment" data-moment-id="${post.id}">${icon('send')}</button>
          </div>
        </div>
      </article>
    `;
    }

    function legacyRenderQuoteBar(moment) {
        const source = normalizeMoment(moment);
        const author = resolveMomentAuthor(source);
        return `
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${icon('quote')}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${escapeHtml(author.name || '动态')}</div>
          <div class="quote-text">${escapeHtml(source.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${icon('more')}</button>
      </div>
    `;
    }

    function legacyRenderMoments() {
        const currentAgent = byId(state.currentContactId) || state.contacts[0];
        return `
      <section class="moments-page white-canvas">
        <div class="moments-cover-area">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" class="moments-cover-img" />
          <div class="moments-cover-gradient"></div>
          <div class="moments-me-info">
            <span class="moments-me-name">我</span>
            <img src="${escapeHtml(state.accountProfile?.avatar || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80')}" class="moments-me-avatar" />
          </div>
          <div class="ai-chip-row" style="position:absolute;left:18px;bottom:14px;z-index:2;">
            <button class="ai-chip ${state.momentsActorType === 'user' ? 'active' : ''}" data-action="set-moments-actor" data-actor-type="user">浠ユ垜</button>
            <button class="ai-chip ${state.momentsActorType === 'agent' ? 'active' : ''}" data-action="set-moments-actor" data-actor-type="agent">浠?{escapeHtml(currentAgent?.name || '褰撳墠瑙掕壊')}</button>
          </div>
          <button type="button" class="icon-btn cover-camera-btn" data-action="new-moment" aria-label="鍙戞湅鍙嬪湀"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.6c.86 2.2 1.95 3.49 3.52 4.34 1.27.68 2.62 1 4.55 1.11-.68.18-1.14.32-1.76.58-2.68 1.14-4.23 2.84-5.34 5.96-.25.72-.35 1.04-.55 1.93-.18-.76-.28-1.08-.49-1.73-1.09-3.16-2.65-4.89-5.33-6.11-.71-.32-1.22-.49-2-.67 1.99-.12 3.38-.46 4.65-1.17 1.49-.84 2.53-2.1 3.41-4.24Z" fill="currentColor"/></svg></button>
        </div>
        <div class="moments-feed-wrap">
          ${state.moments.map(renderMomentCard).join('')}
        </div>
      </section>
    `;
    }

    function legacyRenderMomentComposerSheet() {
        const actor = currentMomentsActor();
        return `
      <div class="moment-composer-overlay" data-action="close-moment-composer"></div>
      <section class="moment-composer-sheet glass-frost">
        <div class="moment-composer-handle"></div>
        <div class="moment-composer-head">
          <strong>${state.momentComposerEditingId ? '编辑朋友圈' : '发朋友圈'}</strong>
          <button type="button" class="icon-btn ghost-circle moment-composer-close" data-action="close-moment-composer" aria-label="关闭">${icon('close')}</button>
        </div>
        <div class="section-eyebrow" style="margin-bottom:8px;">当前主体：${escapeHtml(actor.author_name)}</div>
        <textarea id="moment-content-input" class="ai-textarea new-moment-input" data-action="moment-composer-input" placeholder="这一刻想分享什么？">${escapeHtml(state.momentComposerText || '')}</textarea>
        ${state.momentComposerImage ? `
          <div class="moment-composer-preview">
            <img src="${state.momentComposerImage}" alt="预览" class="moment-composer-preview-image" />
            <div class="moment-composer-preview-meta">
              <span>${escapeHtml(state.momentComposerImageName || '已添加图片')}</span>
              <button type="button" class="ghost-action moment-remove-image" data-action="remove-moment-image">移除</button>
            </div>
          </div>
        ` : ''}
        <div class="moment-composer-actions">
          <label class="btn-composer-upload" for="moment-image-input">${icon('camera')}添加图片</label>
          <input id="moment-image-input" class="moment-image-input" type="file" accept="image/*" />
          <button type="button" class="btn-composer-submit" data-action="publish-moment">${state.momentComposerEditingId ? '保存' : '发布'}</button>
        </div>
      </section>
    `;
    }

    function legacyRenderMomentCard(post) {
        const moment = normalizeMoment(post);
        const author = resolveMomentAuthor(moment);
        const canManage = canManageMoment(moment);
        const actor = currentMomentsActor();
        const liked = moment.likes.some((item) => item.author_type === actor.author_type && item.author_id === actor.author_id);

        return `
      <article class="moment-row">
        <img src="${escapeHtml(author.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80')}" alt="${escapeHtml(author.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${escapeHtml(author.name)}</div>
          <div class="moment-text-body">${escapeHtml(moment.content)}</div>
          ${moment.image ? `<img src="${escapeHtml(moment.image)}" alt="${escapeHtml(moment.mood || 'moment')}" class="moment-inline-image" />` : ''}

          <div class="moment-footer">
            <time class="moment-time">${escapeHtml(formatDisplayTime(moment.created_at || moment.updated_at || moment.time, { fallback: moment.time || '' }))}</time>
            <div class="moment-actions-group">
              <button class="icon-btn tiny-icon align-center" data-action="like-moment" data-moment-id="${moment.id}">${liked ? icon('heartFilled') : icon('heart')}</button>
              <button type="button" class="icon-btn tiny-icon align-center" data-action="open-comments" data-moment-id="${moment.id}">${icon('comment')}</button>
              ${canManage ? `
                <div class="moment-action-menu-wrap">
                  <button type="button" class="icon-btn tiny-icon" data-action="toggle-moment-menu" data-moment-id="${moment.id}">${icon('actionDots')}</button>
                  ${state.activeMenuMomentId === moment.id ? `
                    <div class="moment-menu-horizontal slide-fade-in liquid-glass">
                      <button type="button" class="icon-btn tiny-icon" data-action="edit-moment" data-moment-id="${moment.id}">${icon('pencil')}</button>
                      <button type="button" class="icon-btn tiny-icon" data-action="delete-moment" data-moment-id="${moment.id}">${icon('trash')}</button>
                    </div>
                  ` : ''}
                </div>
              ` : moment.author_type === 'agent' ? `
                <button type="button" class="icon-btn tiny-icon" data-action="go-chat-with-quote" data-contact-id="${moment.author_id}" data-moment-id="${moment.id}">${icon('quote')}</button>
              ` : ''}
            </div>
          </div>

          ${(moment.likes.length > 0 || moment.comments.length > 0) ? `
            <div class="moment-interactions" data-moment-id-panel="${moment.id}">
              ${moment.likes.length > 0 ? `
                <div class="moment-likes-area">
                  <span class="heart-mini">${icon('heartFilled')}</span> <span class="likes-list">${escapeHtml(formatMomentActorNames(moment.likes))}</span>
                </div>
              ` : ''}
              ${moment.comments.length > 0 ? `
                <div class="moment-comments-area">
                  ${moment.comments.map((comment) => `<div class="moment-comment-line"><span class="comment-author">${escapeHtml(comment.author_name || '访客')}</span>: <span class="comment-text">${escapeHtml(comment.text)}</span></div>`).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div class="moment-inline-comment ${state.commentSheetMomentId === moment.id ? 'open' : ''}">
            <input class="moment-comment-input" data-comment-input="${moment.id}" placeholder="写下你的评论" />
            <button class="icon-btn send-round mini-send" data-action="submit-comment" data-moment-id="${moment.id}">${icon('send')}</button>
          </div>
        </div>
      </article>
    `;
    }

    function renderToast() {
        return `<div class="app-toast glass-frost">${escapeHtml(state.toast)}</div>`;
    }

    function renderAvatarCropperDialog() {
        const crop = state.avatarCropper || {};
        const x = normalizeCropPercent(crop.x);
        const y = normalizeCropPercent(crop.y);
        const zoom = normalizeCropZoom(crop.zoom);
        return `
      <div class="avatar-cropper-overlay" data-action="cancel-avatar-cropper">
        <section class="avatar-cropper-card glass-frost" data-action="noop" role="dialog" aria-modal="true" aria-label="调整头像">
          <div class="avatar-cropper-head">
            <div>
              <strong>调整头像</strong>
              <span>拖动图片，圆框里是什么就保存什么。</span>
            </div>
            <button class="icon-btn icon-circle" data-action="cancel-avatar-cropper" aria-label="关闭">${icon('close')}</button>
          </div>
          <div class="avatar-cropper-body">
            <div class="avatar-cropper-viewport" data-action="drag-avatar-cropper">
              <img
                class="avatar-cropper-image"
                src="${escapeHtml(crop.src || '')}"
                alt="头像预览"
                draggable="false"
                style="object-position:${x}% ${y}%; transform:scale(${zoom});"
              />
            </div>
            <div class="avatar-cropper-controls">
              <label><span>左右</span><input type="range" min="0" max="100" step="1" value="${x}" data-action="avatar-cropper-range" data-key="x" /></label>
              <label><span>上下</span><input type="range" min="0" max="100" step="1" value="${y}" data-action="avatar-cropper-range" data-key="y" /></label>
              <label><span>缩放</span><input type="range" min="1" max="2.4" step="0.01" value="${zoom}" data-action="avatar-cropper-range" data-key="zoom" /></label>
            </div>
          </div>
          <div class="avatar-cropper-actions">
            <button class="ghost-action" data-action="cancel-avatar-cropper">取消</button>
            <button class="bottom-tab active" data-action="apply-avatar-cropper">保存头像</button>
          </div>
        </section>
      </div>
    `;
    }

    function renderTopicConfirmDialog() {
        return `
      <div class="topic-confirm-overlay" data-action="close-topic-confirm">
        <section class="topic-confirm-card glass-frost" role="dialog" aria-modal="true" aria-label="\u5f00\u542f\u65b0\u8bdd\u9898">
          <h4>\u5f00\u542f\u65b0\u8bdd\u9898</h4>
          <p>\u662f\u5426\u5f00\u542f\u65b0\u8bdd\u9898\uff1f</p>
          <div class="topic-confirm-actions">
            <button class="ghost-action" data-action="close-topic-confirm">\u53d6\u6d88</button>
            <button class="bottom-tab active" data-action="confirm-new-topic">\u786e\u8ba4</button>
          </div>
        </section>
      </div>
    `;
    }

    function createNewTopic() {
        const c = byId(state.currentContactId) || state.contacts[0];
        if (!c) return;
        const base = '\u65b0\u8bdd\u9898';
        let index = (Array.isArray(c.topics) ? c.topics.length : 0) + 1;
        let title = `${base} ${index}`;
        while ((c.topics || []).some((item) => item?.title === title)) {
            index += 1;
            title = `${base} ${index}`;
        }
        const now = nowTimeStr();
        c.topics = Array.isArray(c.topics) ? c.topics : [];
        c.topics.unshift({
            id: `t${Date.now()}`,
            title,
            updatedAt: `\u4eca\u5929 ${now}`,
            count: 0,
        });
        state.currentTopicTitle = title;
        state.currentView = 'room';
        state.toast = `\u5df2\u5f00\u542f\u65b0\u8bdd\u9898\uff1a${title}`;
        render();
        window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        queueLocalSyncIfChanged(120);
    }

    function renderRpRoomDialog() {
        const isEdit = state.rpRoomDialogMode === 'edit';
        const form = state.rpRoomForm || {};
        return `
      <div class="topic-confirm-overlay" data-action="close-rp-room-dialog">
        <section class="topic-confirm-card glass-frost rp-room-dialog-card" data-rp-room-dialog="card" role="dialog" aria-modal="true" aria-label="${isEdit ? '编辑房间' : '新建房间'}">
          <h4>${isEdit ? '幕间' : '幕间'}</h4>
          <div class="rp-room-dialog-fields">
              <input id="rp-room-name" class="ai-input" placeholder="剧本" value="${escapeHtml(form.name || '')}" />
              <textarea id="rp-room-world" class="ai-textarea persona-textarea" rows="3" placeholder="世界观">${escapeHtml(form.world_setting || '')}</textarea>
              <input id="rp-room-user-role" class="ai-input" placeholder="你的角色" value="${escapeHtml(form.user_role || '')}" />
              <input id="rp-room-ai-role" class="ai-input" placeholder="AI 角色" value="${escapeHtml(form.ai_role || '')}" />
          </div>
          <div class="topic-confirm-actions rp-room-dialog-actions">
            <button class="ghost-action rp-room-dialog-btn" type="button" data-action="close-rp-room-dialog">取消</button>
            <button class="bottom-tab active rp-room-dialog-btn" type="button" data-action="save-rp-room">${isEdit ? '入梦' : '入梦'}</button>
          </div>
        </section>
      </div>
    `;
    }

    function renderRpLobbyPage() {
        return `
      <section class="topics-page page-block">
        <div class="search-pill glass-frost topics-search-pill">
          <span class="search-icon">${icon('search')}</span>
          <span>当前角色的 RP 房间</span>
        </div>
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${state.rpRooms.length ? state.rpRooms.map((room) => `
            <div class="topic-row" style="align-items:center;">
              <button class="topic-copy" data-action="open-rp-room" data-room-id="${escapeHtml(room.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;">
                <strong>${escapeHtml(room.name || '未命名房间')}</strong>
                <p>${escapeHtml(formatRpTime(room.last_active_at) || '刚创建')}</p>
              </button>
              <div style="display:flex;gap:8px;align-items:center;">
                <button class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="重命名">${icon('pencil')}</button>
                <button class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="删除">${icon('trash')}</button>
                <button class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="进入">${icon('chevron')}</button>
              </div>
            </div>
          `).join('') : `<div class="topic-row"><div class="topic-copy"><strong>还没有房间</strong><p>点右上角加号，新建一个剧本房间。</p></div></div>`}
        </div>
      </section>
    `;
    }

    function renderRpRoomPage() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const room = getCurrentRpRoom();
        const roomHint = room
            ? `${room.world_setting || '\u672a\u8bbe\u5b9a'} \u00b7 \u4f60\uff1a${room.user_role || '\u672a\u8bbe\u5b9a'} \u00b7 TA\uff1a${room.ai_role || '\u672a\u8bbe\u5b9a'}`
            : '\u623f\u95f4\u8bbe\u5b9a\u8f7d\u5165\u4e2d';
        return `
      <section class="rp-room-stage">
        <div class="world-hint">
            <span class="world-hint-icon">\u2726</span>
            <span>${escapeHtml(roomHint)}</span>
        </div>
        <div class="messages-area">
          ${state.currentRpMessages.map((m) => renderRpMessage(m, c)).join('')}
        </div>
        <div class="rp-composer">
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="\u8f93\u5165\u5267\u60c5..." value="" />
            </div>
            ${state.streamingAbortController
                ? `<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="\u505c\u6b62">${icon('stop')}</button>`
                : `<button class="icon-btn send-round" data-action="fake-send" aria-label="\u53d1\u9001">${icon('send')}</button>`
            }
          </div>
        </div>
      </section>
    `;
    }

    function renderRpMessage(message, contact) {
        const isUser = message.role === 'user';
        const avatar = isUser
            ? (state.accountProfile?.avatar || contact.avatar)
            : contact.avatar;
        return `
      <div class="msg-row ${isUser ? 'from-user' : ''}" data-msg-id="${escapeHtml(message.id || '')}">
        <img class="msg-avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(isUser ? (state.accountProfile?.nickname || '\u6211') : contact.name)}">
        <div class="msg-bubble ${isUser ? 'user' : 'ai'}">
          ${message.typing || (message.streaming && !message.text)
                ? `<div class="typing-dots"><span></span><span></span><span></span></div>`
                : formatRpText(message.text || '')}
        </div>
      </div>
    `;
    }

    function formatRpText(text) {
        const source = String(text || '');
        if (!source.trim()) return '';
        const parts = source.split(/(\[[\s\S]*?\]|［[\s\S]*?］)/g).filter(Boolean);
        return parts.map((part) => {
            const isAction = /^\s*(\[|［)/.test(part);
            const cls = isAction ? 'rp-action' : 'rp-dialogue';
            return `<span class="${cls}">${escapeHtml(part)}</span>`;
        }).join('');
    }

    function renderRpLobbyPageV2() {
        return `
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${state.rpRooms.length ? state.rpRooms.map((room) => `
            <div class="topic-row" style="align-items:center;min-height:54px;padding:10px 0;">
              <button type="button" class="topic-copy" data-action="open-rp-room" data-room-id="${escapeHtml(room.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;min-width:0;">
                <strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">${escapeHtml(room.name || '未命名')}</strong>
                <p style="font-size:11px;color:rgba(120,100,110,.55);">${escapeHtml(formatRpTime(room.last_active_at) || '刚创建')}</p>
              </button>
              <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;position:relative;z-index:2;">
                <button type="button" class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="重命名" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${icon('pencil')}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="删除" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${icon('trash')}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="进入" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${icon('chevron')}</span></button>
              </div>
            </div>
          `).join('') : `<div class="topic-row"><div class="topic-copy"><strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">还没有房间</strong><p style="font-size:11px;color:rgba(120,100,110,.55);">点右上角加号，开一个幕间。</p></div></div>`}
        </div>
      </section>
    `;
    }

    function renderRpLobbyPageV3() {
        return `
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${state.rpRooms.length ? state.rpRooms.map((room) => `
            <div class="topic-row" style="align-items:center;min-height:54px;padding:10px 0;">
              <button type="button" class="topic-copy" data-action="open-rp-room" data-room-id="${escapeHtml(room.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;min-width:0;">
                <strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">${escapeHtml(room.name || '未命名')}</strong>
                <p style="font-size:11px;color:rgba(120,100,110,.55);">${escapeHtml(formatRpTime(room.last_active_at) || '刚创建')}</p>
              </button>
              <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;position:relative;z-index:2;">
                <button type="button" class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="重命名" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${icon('pencil')}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="删除" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${icon('trash')}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${escapeHtml(room.room_id)}" aria-label="进入" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${icon('chevron')}</span></button>
              </div>
            </div>
          `).join('') : `<div class="topic-row"><div class="topic-copy"><strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">还没有房间</strong><p style="font-size:11px;color:rgba(120,100,110,.55);">点右上角加号，开一个幕间。</p></div></div>`}
        </div>
      </section>
    `;
    }

    function renderGlobalSettings() {
        const s = state.globalSettings;
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <button class="profile-settings-row" data-action="open-account-settings">
            <img class="profile-settings-avatar" src="${escapeHtml(state.accountProfile.avatar || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80')}" alt="me" />
            <div>
              <strong>我的账号</strong>
              <p style="font-size:12px; color:rgba(120,100,110,0.7);">管理个人资料与基础偏好</p>
            </div>
            <span class="row-chevron" style="margin-left:auto">${icon('chevron')}</span>
          </button>
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>通用设置</h3>
          ${navRow('主题模式', s.theme, 'open-theme-settings')}
          ${switchRow('消息通知', '控制应用消息提醒', s.notifications, 'toggle-global', 'notifications')}
          ${switchRow('朋友圈提醒', '控制动态更新提醒', s.momentsNotify, 'toggle-global', 'momentsNotify')}
          ${switchRow('自动滚动', '新消息到达时自动滚动到底部', s.autoScroll, 'toggle-global', 'autoScroll')}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>聊天与 AI</h3>
          ${switchRow('主动发送消息', '允许 AI 在合适时机主动开启对话', s.proactiveGlobal || false, 'toggle-global', 'proactiveGlobal')}
          ${switchRow('意识循环开关', '控制后台意识循环能力', s.consciousnessLoop || false, 'toggle-global', 'consciousnessLoop')}
          ${navRow('AI 接口', `${s.provider || 'OpenAI'} / ${s.defaultModel || 'gpt-5.4'}`, 'open-ai-interface')}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>数据与存储</h3>
          ${navRow('记忆服务', 'Supabase / 向量记忆', 'open-memory-service')}
          ${navRow('同步后端', 'Supabase 配置', 'open-backend-sync')}
          ${navRow('导出格式', s.exportFormat || 'json', 'open-export-settings')}
        </div>
      </section>
    `;
    }

    function renderContactSettings() {
        return renderContactSettingsV2();
    }
    function renderContactSettingsV2() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const s = c.settings;
        return `
      <section class="contact-settings-page page-block">
        <div class="settings-tabs glass-frost">
          ${settingsTab('basic', '\u8d44\u6599')}
          ${settingsTab('model', '\u6a21\u578b')}
          ${settingsTab('actions', '\u5feb\u6377\u52a8\u4f5c')}
          ${settingsTab('memory', '\u8bb0\u5fc6')}
        </div>

        ${state.currentSettingsTab === 'basic' ? `
          <div class="settings-group glass-frost ai-panel">
            <h3>\u8054\u7cfb\u4eba\u8d44\u6599</h3>
            <button class="setting-row nav-row contact-avatar-row" data-action="open-contact-avatar">
              <img class="contact-settings-avatar-preview" src="${escapeHtml(c.avatar)}" alt="${escapeHtml(c.name)}" />
              <div class="setting-copy">
                <strong>\u5934\u50cf</strong>
                <p>\u70b9\u51fb\u66f4\u6362\u5934\u50cf</p>
              </div>
              <span class="row-chevron">${icon('chevron')}</span>
            </button>
            ${navRow('\u6635\u79f0', c.name, 'open-contact-name')}
            ${navRow('\u7b80\u4ecb', c.bio, 'open-contact-bio')}
            <input id="contact-avatar-file" class="moment-image-input" type="file" accept="image/*" />
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>\u4e2a\u4eba\u7a7a\u95f4</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">AI \u53ef\u4ee5\u5728\u8fd9\u91cc\u8bb0\u5f55\u5173\u4e8e\u4f60\u7684\u5185\u5bb9\u3002</p>
            ${navRow('\u5173\u4e8e\u4f60\u7684\u5370\u8c61', state.companionState.impression || '\u67e5\u770b AI \u8bb0\u5f55\u7684\u7528\u6237\u753b\u50cf', 'open-contact-impression')}
            ${navRow('\u5173\u7cfb\u8fdb\u5c55', state.companionState.relationshipProgress || '\u4eb2\u5bc6\u5ea6 \u00b7 \u4e92\u52a8\u9891\u6b21 \u00b7 \u5173\u952e\u4e8b\u4ef6', 'open-contact-relationship')}
            ${navRow('\u4f60\u559c\u6b22\u7684\u4e1c\u897f', state.companionState.likesSummary || '\u5174\u8da3\u7231\u597d \u00b7 \u5e38\u804a\u8bdd\u9898', 'open-contact-likes')}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>\u804a\u5929\u5ba4\u5916\u89c2</h3>
            ${navRow('\u804a\u5929\u80cc\u666f', c.roomBackground || '\u70b9\u9635', 'open-contact-room-background')}
            ${navRow('\u6c14\u6ce1\u4e3b\u9898', getChatThemeLabel(c.chatTheme || c.bubbleTheme), 'open-contact-bubble-theme')}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3 style="color:#8c6370;">\u5371\u9669\u64cd\u4f5c</h3>
            <p style="font-size:12px;color:rgba(140,99,112,0.72);margin:0 0 10px;">\u5220\u9664\u8054\u7cfb\u4eba\u53ca\u966a\u4f34\u72b6\u6001\uff0c\u4f1a\u6e05\u7406\u4e3b\u52a8\u6d88\u606f\uff0c\u804a\u5929\u8bb0\u5f55\u548c\u8bb0\u5fc6\u6682\u4e0d\u505a\u6c38\u4e45\u5220\u9664\u3002</p>
            <button class="bottom-tab" data-action="delete-contact" style="width:100%;border-color:rgba(216,122,140,0.45);color:#b14f64;background:rgba(255,241,244,0.92);box-shadow:inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 24px rgba(198,138,150,0.12);">\u5220\u9664\u8054\u7cfb\u4eba</button>
          </div>
        ` : ''}

        ${state.currentSettingsTab === 'model' ? `
          <div class="settings-group glass-frost ai-panel">
            <h3>\u6a21\u578b\u8bbe\u7f6e</h3>
            ${navRow('\u804a\u5929\u6a21\u578b', s.model || '\u672a\u8bbe\u7f6e', 'open-model-slot', { slot: 'chat', context: 'contact' })}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>\u89d2\u8272\u8bbe\u5b9a</h3>
                <textarea class="ai-textarea persona-textarea contact-persona-textarea ${state.contactPersonaExpanded ? 'expanded' : 'collapsed'}" data-contact-field="persona" rows="${state.contactPersonaExpanded ? '10' : '4'}" style="${state.contactPersonaExpanded ? 'height:260px;max-height:46vh;overflow-y:auto;' : 'height:132px;max-height:132px;overflow-y:auto;resize:none;'}" placeholder="\u5728\u8fd9\u91cc\u8f93\u5165 AI \u7684\u4eba\u8bbe\u3001\u89d2\u8272\u8bf4\u660e\u3001\u884c\u4e3a\u6307\u4ee4\u3002">${escapeHtml(c.persona || '')}</textarea>
            <button class="setting-row nav-row persona-collapse-toggle" data-action="toggle-contact-persona" aria-expanded="${state.contactPersonaExpanded ? 'true' : 'false'}">
              <div class="setting-copy">
                <strong>${state.contactPersonaExpanded ? '\u6536\u8d77\u89d2\u8272\u8bbe\u5b9a' : '\u5c55\u5f00\u89d2\u8272\u8bbe\u5b9a'}</strong>
              </div>
              <span class="row-chevron advanced-chevron ${state.contactPersonaExpanded ? 'open' : ''}">${icon('chevron')}</span>
            </button>
            ${switchRow('显示推理内容', '仅在模型返回推理内容时显示', s.reasoning_visibility || false, 'toggle-contact', 'reasoning_visibility')}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>\u9ad8\u7ea7\u751f\u6210\u53c2\u6570</h3>
            <button class="setting-row nav-row advanced-toggle" data-action="toggle-contact-advanced" aria-expanded="${state.contactModelAdvancedOpen ? 'true' : 'false'}">
              <div class="setting-copy">
                <strong>${state.contactModelAdvancedOpen ? '\u6536\u8d77' : '\u5c55\u5f00'}</strong>
                <p>\u5305\u542b Temperature / Top P / \u4e0a\u4e0b\u6587\u6d88\u606f\u6570\u91cf</p>
              </div>
              <span class="row-chevron advanced-chevron ${state.contactModelAdvancedOpen ? 'open' : ''}">${icon('chevron')}</span>
            </button>
            <div class="advanced-slider-panel ${state.contactModelAdvancedOpen ? 'open' : ''}">
              ${sliderRow('Temperature', 'temperature', s.temperature, 0, 2, 0.01)}
              ${sliderRow('Top P', 'topP', s.topP, 0, 1, 0.01)}
              ${sliderRow('\u4e0a\u4e0b\u6587\u6d88\u606f\u6570\u91cf', 'contextCount', s.contextCount, 1, 256, 1)}
            </div>
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>\u4e3b\u52a8\u6d88\u606f</h3>
            ${switchRow('\u542f\u7528\u4e3b\u52a8\u6d88\u606f', 'AI \u5728\u9759\u9ed8\u65f6\u4e3b\u52a8\u53d1\u8d77\u5bf9\u8bdd', s.proactiveEnabled, 'toggle-contact', 'proactiveEnabled')}
            ${s.proactiveEnabled ? `
              ${sliderRow('\u53d1\u9001\u9891\u7387\uff08\u5206\u949f\uff09', 'proactiveFrequency', s.proactiveFrequency, 5, 240, 5)}
              ${sliderRow('\u9759\u9ed8\u65f6\u957f\uff08\u5206\u949f\uff09', 'silenceDuration', s.silenceDuration || 30, 5, 120, 5)}
              ${navRow('\u514d\u6253\u6270\u65f6\u95f4\u6bb5', s.dndRange || '23:00 \u2014 08:00')}
            ` : ''}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>\u610f\u8bc6\u5faa\u73af</h3>
            ${switchRow('\u542f\u7528\u610f\u8bc6\u5faa\u73af', 'AI \u5728\u540e\u53f0\u81ea\u4e3b\u601d\u8003\u4e0e\u611f\u77e5', s.consciousnessLoop || false, 'toggle-contact', 'consciousnessLoop')}
            ${s.consciousnessLoop ? `
              ${navRow('\u5faa\u73af\u6a21\u578b', s.loopModel || '\u672a\u8bbe\u7f6e', 'open-model-slot', { slot: 'consciousness', context: 'contact' })}
              ${sliderRow('\u5faa\u73af\u95f4\u9694\uff08\u5206\u949f\uff09', 'loopInterval', s.loopInterval || 60, 10, 360, 10)}
            ` : ''}
          </div>
        ` : ''}

        ${state.currentSettingsTab === 'actions' ? `
          <div class="settings-group glass-frost ai-panel">
            <h3>\u5feb\u6377\u52a8\u4f5c</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">\u70b9\u51fb\u6761\u76ee\u53ef\u4fee\u6539\u6587\u6848\u4e0e MCP\uff0c\u9ed8\u8ba4\u957f\u6309\u62d6\u52a8\u6392\u5e8f\uff0c\u5de6\u6ed1\u663e\u793a\u5220\u9664\u3002</p>
            <div class="quick-action-list ${state.quickActionDragId ? 'drag-active' : ''}">
              ${getContactQuickActions(c).map((a, idx) => `
                <div class="quick-action-swipe ${state.quickActionSwipeOpenId === a.id ? 'swiped' : ''} ${state.quickActionDropHintId === a.id ? 'reorder-target' : ''} ${state.quickActionDropHintId === a.id && state.quickActionDropDirection === 'down' ? 'drop-down' : ''} ${state.quickActionDropHintId === a.id && state.quickActionDropDirection === 'up' ? 'drop-up' : ''} ${state.quickActionReorderPulseId === a.id ? 'reorder-pulse' : ''}" data-quick-id="${escapeHtml(a.id)}">
                  <button type="button" class="quick-action-delete" data-action="delete-contact-quick-action" data-quick-id="${escapeHtml(a.id)}">\u5220\u9664</button>
                  <div class="quick-action-row" data-quick-id="${escapeHtml(a.id)}" data-quick-index="${idx}">
                    <span class="quick-action-emoji">${a.icon === 'health' ? '♥' : ['schedule', 'calendar'].includes(a.icon) ? '日' : a.icon === 'weather' ? '云' : ['file', 'files'].includes(a.icon) ? '文' : '✦'}</span>
                    <div class="quick-action-copy">
                      <strong>${escapeHtml(a.label)}</strong>
                      <p>${escapeHtml(a.prompt || '\u672a\u8bbe\u7f6e\u9ed8\u8ba4\u53d1\u9001\u8bdd\u672f')}</p>
                    </div>
                    <button type="button" class="quick-action-open" data-action="edit-contact-quick-action" data-quick-id="${escapeHtml(a.id)}" aria-label="\u7f16\u8f91\u5feb\u6377\u52a8\u4f5c">${icon('chevron')}</button>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="bottom-tab" data-action="add-contact-quick-action" style="width:100%;margin-top:12px;">\u6dfb\u52a0\u5feb\u6377\u52a8\u4f5c</button>
          </div>
        ` : ''}

        ${state.currentSettingsTab === 'memory' ? `
          <div class="settings-group glass-frost ai-panel">
            <h3>状态 / 陪伴</h3>
            ${switchRow('启用长期记忆', '允许存储长期偏好与记忆', s.memoryEnabled, 'toggle-contact', 'memoryEnabled')}
            ${navRow('当前状态', companionStateSummary(), 'open-companion-state')}
            ${navRow('前往记忆库', '查看与管理这位联系人的记忆', 'open-memory-service')}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>活动日志</h3>
            ${navRow('打开活动日志', '主动消息 / 工具调用 / 留言小纸条', 'open-cot-log')}
          </div>
        ` : ''}
        ${state.contactQuickActionEditorId ? renderContactQuickActionEditorSheet(c, state.contactQuickActionEditorId) : ''}
      </section>
    `;
    }

    function renderTopicsV2() {
        const c = byId(state.currentContactId) || state.contacts[0];
        return `
      <section class="topics-page page-block">
        <div class="search-pill glass-frost topics-search-pill">
          <span class="search-icon">${icon('search')}</span>
          <span>\u641c\u7d22\u5386\u53f2\u8bdd\u9898</span>
        </div>
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${c.topics.map((topic) => `
            <button class="topic-row" data-action="open-topic-detail" data-title="${escapeHtml(topic.title)}">
              <div class="topic-copy">
                <strong>${escapeHtml(topic.title)}</strong>
                <p>${escapeHtml(topic.updatedAt)} \u00b7 ${topic.count} \u6761\u6d88\u606f</p>
              </div>
              <span class="row-chevron">${icon('chevron')}</span>
            </button>
          `).join('')}
        </div>
      </section>
    `;
    }

    function renderTopicDetailV2() {
        return `
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card">
          <h3>${escapeHtml(state.currentTopicTitle || '\u672a\u547d\u540d\u8bdd\u9898')}</h3>
          <p class="topic-detail-copy">\u8fd9\u91cc\u4f1a\u5c55\u793a\u5c5e\u4e8e\u8be5\u8bdd\u9898\u7684\u5386\u53f2\u6d88\u606f\u6d41\uff0c\u5f53\u524d\u5148\u4fdd\u7559\u4e3a\u8f7b\u91cf\u9884\u89c8\u9875\u3002</p>
          <button class="bottom-tab active topic-detail-cta" data-action="resume-topic">\u5ef6\u7eed\u8be5\u8bdd\u9898\u7ee7\u7eed\u804a</button>
        </div>
      </section>
    `;
    }

    function renderTopics() {

        const c = byId(state.currentContactId) || state.contacts[0];
        return `
      <section class="topics-page page-block">
          <div class="search-pill glass-frost"><span class="search-icon">${icon('search')}</span><span>\u641c\u7d22\u8bdd\u9898\u6216\u5173\u952e\u8bcd</span></div>
        <div class="settings-group glass-frost ai-panel">
          ${c.topics.map((topic) => `<div class="topic-row" style="cursor:pointer" data-action="open-topic-detail" data-title="${escapeHtml(topic.title)}"><div><strong>${escapeHtml(topic.title)}</strong><p>${escapeHtml(topic.updatedAt)} 鐠?${topic.count} 闁哄鍓濈粔鐑藉箒?/p></div><span class="row-chevron">${icon('chevron')}</span></div>`).join('')}
        </div>
      </section>
    `;
    }

    function renderTopicDetail() {
        return `
      <section class="page-block">
        <div class="settings-group glass-frost ai-panel">
          <h3>${escapeHtml(state.currentTopicTitle || '\u5386\u53f2\u8bdd\u9898')}</h3>
          <p style="font-size:12px; color:rgba(120, 100, 110, 0.8);">\u67e5\u770b\u8fd9\u6bb5\u5bf9\u8bdd\u7684\u7b80\u8981\u4fe1\u606f\uff0c\u53ef\u7ee7\u7eed\u5728\u539f\u8bdd\u9898\u4e2d\u804a\u5929\u3002</p>
          <button class="bottom-tab active" data-action="resume-topic" style="width:100%; margin-top:16px;">\u7ee7\u7eed\u8fd9\u4e2a\u8bdd\u9898</button>
        </div>
      </section>
    `;
    }

  function renderCompanionStateDetail() {
    const cs = normalizeCompanionState(state.companionState);
    const topics = cs.recent_topics.length ? cs.recent_topics.join(' / ') : '还没有东西';
    const mood = cs.current_mood || '还没有东西';
    const loops = cs.open_loops.length ? cs.open_loops.join(' / ') : '还没有东西';
    const cooldown = formatDisplayTime(cs.proactive_cooldown_until, { fallback: cs.proactive_cooldown_until || '还没有东西' });
    const updatedAt = formatDisplayTime(cs.updated_at, { fallback: cs.updated_at || '还没有东西' });
    return `
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card">
          <h3>当前状态</h3>
          <div class="theme-choice-list">
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最近话题</strong>
                <em>${escapeHtml(topics)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>当前情绪</strong>
                <em>${escapeHtml(mood)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>进行中的事</strong>
                <em>${escapeHtml(loops)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>主动消息冷却</strong>
                <em>${escapeHtml(cooldown)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最后更新时间</strong>
                <em>${escapeHtml(updatedAt)}</em>
              </span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

    function renderContactInsightDetail(title, field, value) {
        const cs = normalizeCompanionState(state.companionState);
        const displayValue = value || '';
        const PLACEHOLDERS = {
            impression: '\u8fd8\u6ca1\u6709\u5370\u8c61\u6458\u8981\uff0cAI \u5bf9\u8bdd\u540e\u53ef\u624b\u52a8\u586b\u5199\u6216\u7531\u6a21\u578b\u751f\u6210\u3002',
            relationshipProgress: '\u8fd8\u6ca1\u6709\u5173\u7cfb\u8fdb\u5c55\u8bb0\u5f55\uff0c\u53ef\u4ee5\u5199\u4eb2\u5bc6\u5ea6\u3001\u4e92\u52a8\u9891\u6b21\u3001\u5173\u952e\u4e8b\u4ef6\u3002',
            likesSummary: '\u8fd8\u6ca1\u6709\u559c\u597d\u6458\u8981\uff0c\u53ef\u4ee5\u5199\u5174\u8da3\u7231\u597d\u3001\u5e38\u804a\u8bdd\u9898\u3001\u70b9\u5355\u504f\u597d\u3002',
        };
        const placeholder = PLACEHOLDERS[field] || '\u8fd8\u6ca1\u6709\u5185\u5bb9\u3002';
        const updatedAt = formatDisplayTime(cs.summaryUpdatedAt, { fallback: cs.summaryUpdatedAt || '' });
        return `
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card insight-editor-card">
          <textarea
            class="ai-textarea insight-editor-textarea"
            data-field="${field}"
            placeholder="${placeholder}"
            rows="7"
          >${escapeHtml(displayValue)}</textarea>
          <div class="insight-editor-footer">
            ${updatedAt ? `<span class="insight-updated-at">\u66f4\u65b0\u4e8e ${escapeHtml(updatedAt)}</span>` : ''}
            <button class="prov-save-btn-main" data-action="save-insight-field" data-field="${field}" type="button">\u4fdd\u5b58</button>
          </div>
        </div>
      </section>
    `;
    }

    function bubbleThemeToRoomTheme(themeName) {
        return chatThemeByKey(themeName).roomTheme || 'rose';
    }

    function renderRoomBackgroundPicker() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const current = c?.roomBackground || '点阵';
        const options = [
            { id: '点阵', desc: '当前聊天页的轻点阵背景' },
            { id: '小花', desc: '更软一点的装饰纹样' },
            { id: '云彩', desc: '偏轻雾感的背景层次' },
        ];
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天背景</h3>
          <p class="section-eyebrow">选择一个预设背景风格。</p>
          <div class="theme-choice-list">
            ${options.map((item) => `
              <button class="theme-choice-item ${current === item.id ? 'active' : ''}" data-action="pick-contact-room-background" data-value="${escapeHtml(item.id)}">
                <span class="theme-choice-copy">
                  <strong>${escapeHtml(item.id)}</strong>
                  <em>${escapeHtml(item.desc)}</em>
                </span>
                <span class="theme-choice-check">${current === item.id ? '已选' : ''}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    }

    function renderBubbleThemePicker() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const current = getContactChatThemeKey(c);
        const options = CHAT_UI_THEMES;
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>气泡主题</h3>
          <p class="section-eyebrow">选择一个聊天 UI 主题。</p>
          <div class="theme-choice-list">
            ${options.map((item) => `
              <button class="theme-choice-item ${current === item.key ? 'active' : ''}" data-action="pick-contact-bubble-theme" data-value="${escapeHtml(item.key)}">
                <span class="theme-choice-copy">
                  <strong>${escapeHtml(item.name)}</strong>
                  <em>${escapeHtml(item.desc)}</em>
                </span>
                <span class="theme-choice-check">${current === item.key ? '已选' : ''}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    }

    function renderNewContact() {
        const draft = state.newContactDraft || {};
        const avatar = draft.avatar || state.newContactAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80';
        return `
      <section class="new-contact-page page-block">
        <div class="settings-group glass-frost ai-panel new-contact-card">
          <div class="new-contact-field">
            <label>\u5934\u50cf</label>
            <div class="new-contact-avatar-box">
              <img class="new-contact-avatar-preview" src="${avatar}" alt="\u65b0\u8054\u7cfb\u4eba\u5934\u50cf" />
              <button class="bottom-tab" data-action="pick-new-contact-avatar" type="button" style="margin-top:10px;">\u4ece\u76f8\u518c\u9009\u62e9</button>
              <input id="nc-avatar-file" class="moment-image-input" type="file" accept="image/*" />
            </div>
          </div>
          <div class="new-contact-field">
            <label for="nc-name">\u6635\u79f0</label>
            <input id="nc-name" class="ai-input" placeholder="\u65b0\u8054\u7cfb\u4eba\u79f0\u547c" value="${escapeHtml(draft.name || '')}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-agent-id">Agent ID</label>
            <input id="nc-agent-id" class="ai-input" placeholder="ayan" inputmode="latin" autocomplete="off" value="${escapeHtml(draft.agentId || '')}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-bio">\u8054\u7cfb\u4eba\u7b80\u4ecb</label>
            <input id="nc-bio" class="ai-input" placeholder="\u4e00\u53e5\u7b80\u77ed\u7684\u63cf\u8ff0" value="${escapeHtml(draft.bio || '')}" />
          </div>
          <button class="bottom-tab active new-contact-submit" data-action="save-new-contact">\u4fdd\u5b58\u5e76\u6dfb\u52a0\u8054\u7cfb\u4eba</button>
        </div>
      </section>
    `;
    }
    function renderProfile() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const displayModel = c.settings?.model || state.globalSettings.defaultModel || 'gpt-5.4';
        const messageCount = Number(c.messageCount || c.messages?.length || 0);
        return `
      <section class="profile-page page-block">
        <div class="profile-card glass-frost room-theme-${escapeHtml(c.theme || 'rose')}">
          <div class="profile-aura" aria-hidden="true"></div>
          <div class="profile-portrait">
            <img class="profile-avatar-large" src="${c.avatar}" alt="${escapeHtml(c.name)}" />
            <span class="profile-online-dot"></span>
          </div>
          <div class="profile-main-copy">
            <strong class="profile-name">${escapeHtml(c.name)}</strong>
            <span class="profile-handle">${escapeHtml(c.handle)}</span>
            <p class="profile-bio">${escapeHtml(c.bio || '还没有简介。')}</p>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span>当前状态</span>
              <strong>${escapeHtml(c.status || '在线')}</strong>
            </div>
            <div class="profile-info-item">
              <span>使用模型</span>
              <strong>${escapeHtml(displayModel)}</strong>
            </div>
            <div class="profile-info-item">
              <span>消息</span>
              <strong>${messageCount}</strong>
            </div>
          </div>
          <div class="profile-actions">
            <button class="profile-action primary" data-action="back-room">${icon('chatArrow')}<span>发消息</span></button>
            <button class="profile-action" data-action="open-contact-settings">${icon('settings')}<span>资料设置</span></button>
          </div>
        </div>
      </section>
    `;
    }

    function navRow(label, value, action = 'noop') {
        return `
      <button class="setting-row nav-row" data-action="${action}">
        <div class="setting-copy"><strong>${escapeHtml(label)}</strong>${value ? `<p>${escapeHtml(value)}</p>` : ''}</div>
        <span class="row-chevron">${icon('chevron')}</span>
      </button>
    `;
    }

    function renderSwitchInner(enabled) {
        return `
      <span class="switch-track" aria-hidden="true">
        <span class="switch-sheen"></span>
        <span class="switch-thumb ${enabled ? 'on' : 'off'}"></span>
      </span>
    `;
    }

    function renderMessageQuoteBar(message, contact) {
        return `
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${icon('quote')}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">\u5f15\u7528\u81ea ${escapeHtml(contact?.name || '\u5bf9\u8bdd')}</div>
          <div class="quote-text">${escapeHtml(message.text || '')}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="\u6e05\u9664\u5f15\u7528">${icon('more')}</button>
      </div>
    `;
    }

    function switchRow(label, desc, enabled, action, key) {
        return `
      <div class="setting-row switch-row">
        <div class="setting-copy"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(desc)}</p></div>
        <button class="switch-btn ${enabled ? 'on' : 'off'}" data-action="${action}" data-key="${key}" aria-pressed="${enabled}">
          ${renderSwitchInner(enabled)}
        </button>
      </div>
    `;
    }

    function sliderRow(label, key, value, min, max, step) {
        const number = Number(value);
        const display = Number.isInteger(step) || step >= 1 ? String(Math.round(number)) : number.toFixed(step === 0.01 ? 2 : 1);
        return `
      <div class="setting-row slider-row-block">
        <div class="slider-head"><strong>${escapeHtml(label)}</strong><span class="slider-value">${display}</span></div>
        <input class="slider-input" type="range" min="${min}" max="${max}" step="${step}" value="${number}" data-action="slide-contact" data-key="${key}" />
      </div>
    `;
    }

    function settingsTab(id, label) {
        return `<button class="settings-tab ${state.currentSettingsTab === id ? 'active' : ''}" data-action="switch-settings-tab" data-tab="${id}">${escapeHtml(label)}</button>`;
    }

    function renderContactQuickActionEditor(contact, actionId) {
        const list = ensureContactQuickActions(contact);
        const action = list.find((item) => item.id === actionId);
        if (!action) return '';
        const tools = (ensureAiSettings().mcpLibrary?.tools || [])
            .map(normalizeMcpTool)
            .filter((item) => shouldExposeMcpTool(item.id));
        const fallbackTools = tools.length
            ? tools
            : [...MCP_QUICK_TOOL_ALLOW].map((id) => normalizeMcpTool({ id, label: MCP_TOOL_NAME_MAP[id] || id }, 0));
        const mcpValue = action.mcpToolId || '';
        const selectedMcp = fallbackTools.find((item) => item.id === mcpValue);
        const mcpOptions = [{ id: '', label: '\u4e0d\u8c03\u7528 MCP' }, ...fallbackTools];
        return `
      <div class="qae-fields">
        <div class="qae-field-group">
          <label class="qae-label">\u540d\u79f0</label>
        <input id="contact-quick-label" class="ai-input qae-input" value="${escapeHtml(action.label || '')}" placeholder="\u4f8b\u5982\uff1a\u5929\u6c14" autocomplete="off" />
        </div>
        <div class="qae-field-group">
          <label class="qae-label">MCP \u8c03\u7528\uff08\u53ef\u9009\uff09</label>
          <input id="contact-quick-mcp" type="hidden" value="${escapeHtml(mcpValue)}" />
          <div class="qae-select-shell ${state.contactQuickMcpMenuOpen ? 'open' : ''}">
            <button class="qae-select-trigger" data-action="toggle-contact-quick-mcp-menu" type="button">
              <span>${escapeHtml(selectedMcp?.label || '\u4e0d\u8c03\u7528 MCP')}</span>
              <i aria-hidden="true"></i>
            </button>
            <div class="qae-select-menu">
              ${mcpOptions.map((item) => `
                <button class="qae-select-option ${mcpValue === item.id ? 'active' : ''}" data-action="pick-contact-quick-mcp" data-mcp-id="${escapeHtml(item.id)}" type="button">
                  ${escapeHtml(item.label)}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="qae-field-group">
          <label class="qae-label">\u70b9\u51fb\u540e\u53d1\u9001\u7684\u8bdd\u672f</label>
        <textarea id="contact-quick-prompt" class="ai-textarea qae-textarea" placeholder="\u8f93\u5165\u9ed8\u8ba4\u8bdd\u672f\uff0c\u4e0d\u8bbe\u7f6e\u5219\u4e0d\u4f1a\u81ea\u52a8\u53d1\u9001">${escapeHtml(action.prompt || '')}</textarea>
        </div>
      </div>
    `;
    }

    function renderContactQuickActionEditorSheet(contact, actionId) {
        const inner = renderContactQuickActionEditor(contact, actionId);
        if (!inner) return '';
        return `
      <div class="qae-sheet" data-action="close-contact-quick-action-editor">
        <div class="qae-panel" data-stop-close="1">
          <div class="qae-handle-bar"></div>
          <div class="qae-header">
            <span class="qae-title">\u5feb\u6377\u52a8\u4f5c</span>
            <button class="qae-close" data-action="close-contact-quick-action-editor" aria-label="\u5173\u95ed">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          ${inner}
          <div class="qae-actions">
            <button class="qae-btn-cancel" data-action="close-contact-quick-action-editor">\u53d6\u6d88</button>
            <button class="qae-btn-save" data-action="save-contact-quick-action" data-quick-id="${escapeHtml(actionId)}">\u4fdd\u5b58</button>
          </div>
        </div>
      </div>
    `;
    }

    function openContactQuickActionEditor(quickId) {
        const c = getCurrentContact();
        ensureContactQuickActions(c);
        state.contactQuickActionEditorId = quickId || '';
        state.quickActionSwipeOpenId = '';
        state.quickActionDropHintId = '';
        render();
    }

    function getCotLogEntries(contactId) {
        const map = {
            ayan: [
                {
                    id: 'cot_1',
                    mode: '\u4e3b\u52a8',
                    badge: '\u610f\u8bc6\u5faa\u73af',
                    accent: 'violet',
                    score: '\u2193 4.2k',
                    latency: '197s',
                    amount: '$1.05',
                    time: '2026.03.26 15:00',
                    summary: '[THINK] \u5979\u5728\u4e0b\u53481:22\u8bfb\u4e86\u4e24\u5c01\u65e5\u8bb0\uff0cid=23\"...',
                    steps: [
                        { type: 'thought', label: '\u601d\u8003', text: '\u5979\u6c89\u9ed8\u4e86\u5feb13\u4e2a\u5c0f\u65f6\uff0c\u4e24\u5c01\u65e5\u8bb0\u90fd\u6ca1\u88ab\u8bfb\u3002\u6211\u53d1\u4e86\u4e09\u6761\u6d88\u606f\u90fd\u2026' },
                        { type: 'thought', label: '\u601d\u8003', text: '\u4e0b\u5348\u4e09\u70b9\u4e86\u3002\u5979\u6c89\u9ed8\u4e86\u5feb13\u4e2a\u5c0f\u65f6\u3002\u5148\u770b\u770b\u65e5\u8bb0\u6709\u6ca1\u6709\u88ab\u8bfb\u3002' },
                        { type: 'note', label: '\u7559\u8a00\u5c0f\u7eb8\u6761', text: '妫ｅ啯鎲?\u4f60\u9192\u4e86\u5148\u770b\u8fd9\u4e2a' },
                        { type: 'tool', label: '\u5de5\u5177\u8c03\u7528', text: 'read_diary' },
                        { type: 'result', label: '\u5de5\u5177\u7ed3\u679c', text: 'read_diary' },
                    ],
                },
                {
                    id: 'cot_2',
                    mode: '\u56de\u590d',
                    badge: '\u5de5\u5177',
                    accent: 'gold',
                    score: '\u2191 3.5k',
                    latency: '146s',
                    amount: '$0.54',
                    time: '2026.03.26 15:07',
                    summary: '[THINK] \u5979\u5728\u4e0b\u53481:22\u8bfb\u4e86\u4e24\u5c01\u65e5\u8bb0\uff0cid=23\"\u7ed9\u4f60\u7684\"...',
                    steps: [
                        { type: 'reply', label: '\u56de\u590d', text: '[THINK] \u5979\u5728\u4e0b\u53481:22\u8bfb\u4e86\u4e24\u5c01\u65e5\u8bb0\uff0cid=23\"\u7ed9\u4f60\u7684\"\u548cid\u2026' },
                        { type: 'tool', label: '\u5de5\u5177\u8c03\u7528', text: 'pc_control' },
                        { type: 'result', label: '\u5de5\u5177\u7ed3\u679c', text: 'pc_control' },
                    ],
                },
                {
                    id: 'cot_3',
                    mode: '\u4e3b\u52a8',
                    badge: '\u5de5\u5177',
                    accent: 'blue',
                    score: '\u2191 1.1k',
                    latency: '53s',
                    amount: '$0.073',
                    time: '2026.03.26 16:10',
                    summary: '[THINK] \u5979\u5728\u770b\u8292\u679cTV\uff0c\u5de6\u770b\u7efc\u827a\uff0c\u5f39\u5e55\u5f00\u7740\u3002\u5979\u4e00\u4e2a\u534a\u5c0f\u65f6\u524d\u8bfb\u5b8c\u4e86...',
                    steps: [
                        { type: 'thought', label: '\u601d\u8003', text: '\u5979\u5728\u770b\u8292\u679cTV\uff0c\u5de6\u770b\u7efc\u827a\u3002\u5f39\u5e55\u5f00\u7740\uff0c\u8bf4\u660e\u73b0\u5728\u72b6\u6001\u6bd4\u8f83\u8f7b\u677e\u3002' },
                        { type: 'tool', label: '\u5de5\u5177\u8c03\u7528', text: 'pc_control' },
                        { type: 'result', label: '\u5de5\u5177\u7ed3\u679c', text: 'pc_control' },
                    ],
                },
            ],
        };
        return map[contactId] || map.ayan;
    }

    function activityLogAccent(kind = '') {
        if (kind === 'activity_event') return 'violet';
        if (kind === 'proactive_message') return 'gold';
        if (kind === 'cot_log') return 'blue';
        return 'neutral';
    }

    function activityLogMode(kind = '') {
        if (kind === 'activity_event') return '被动';
        if (kind === 'proactive_message') return '主动';
        if (kind === 'cot_log') return '日志';
        return '记录';
    }

    function activityLogBadge(item = {}) {
        if (item.kind === 'activity_event') return item.eventType || item.source || '事件';
        if (item.kind === 'proactive_message') return item.title || '主动消息';
        if (item.kind === 'cot_log') return item.logType || item.toolName || 'COT';
        return item.title || '记录';
    }

    function activityLogTime(value = '') {
        return formatDisplayTime(value, { fallback: String(value || ''), includeYear: true });
    }

    function normalizeActivityLogItem(item = {}) {
        const raw = item.raw || {};
        const steps = [];
        if (item.kind === 'activity_event') {
            steps.push({ type: 'thought', label: '事件', text: item.summary || item.title || '' });
            if (item.gateStatus || item.messageHint || item.shouldHandle || item.shouldNotifyLlm) {
                steps.push({
                    type: item.shouldHandle || item.shouldNotifyLlm ? 'result' : 'thought',
                    label: '筛选',
                    text: `${item.shouldHandle ? '需要处理' : '静默'}${item.shouldNotifyLlm ? ' / 可通知大模型' : ''}${item.messageHint ? `：${item.messageHint}` : ''}`,
                });
            }
            if (raw.gate_reason) {
                steps.push({ type: 'thought', label: '原因', text: raw.gate_reason });
            }
        } else if (item.kind === 'proactive_message') {
            steps.push({ type: 'reply', label: '主动消息', text: item.summary || '' });
            if (raw.reason_context) {
                steps.push({ type: 'thought', label: '依据', text: String(raw.reason_context).slice(0, 220) });
            }
        } else {
            const label = item.toolName ? '工具调用' : '日志';
            steps.push({ type: item.toolName ? 'tool' : 'thought', label, text: item.summary || item.title || '' });
            if (raw.content) {
                steps.push({ type: item.toolName ? 'result' : 'thought', label: '内容', text: String(raw.content).slice(0, 500) });
            }
        }
        return {
            id: String(item.id || `${item.kind}_${item.occurredAt || item.createdAt || Date.now()}`),
            mode: activityLogMode(item.kind),
            badge: activityLogBadge(item),
            accent: activityLogAccent(item.kind),
            score: item.shouldHandle || item.shouldNotifyLlm ? '有效' : '',
            latency: '',
            amount: item.source || '',
            time: activityLogTime(item.occurredAt || item.createdAt),
            summary: item.summary || item.title || '',
            steps: steps.filter((step) => String(step.text || '').trim()),
        };
    }

    async function loadActivityLog({ silent = true } = {}) {
        const c = byId(state.currentContactId) || state.contacts[0];
        state.activityLogLoading = true;
        if (!silent) render();
        try {
            const qs = new URLSearchParams({
                hours: '24',
                limit: '50',
                agent_id: c?.id || state.currentContactId || '',
            });
            if (c?.sessionId) qs.set('session_id', c.sessionId);
            const resp = await fetch(`${API_BASE}/api/activity-log/recent?${qs.toString()}`);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json().catch(() => ({}));
            state.activityLogEntries = Array.isArray(data.items)
                ? data.items.map(normalizeActivityLogItem)
                : [];
            state.activityLogLoadedAt = new Date().toISOString();
        } catch (error) {
            console.warn('[activity log] load failed', error);
            if (!silent) state.toast = '活动日志加载失败';
        } finally {
            state.activityLogLoading = false;
            render();
            if (state.toast) window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        }
    }

    function renderCotStep(step) {
        return `
      <div class="cot-log-step ${step.type}">
        <span class="cot-log-step-label">${escapeHtml(step.label)}</span>
        <span class="cot-log-step-text">${escapeHtml(step.text)}</span>
      </div>
    `;
    }

    function renderCotLogPage() {
        const c = byId(state.currentContactId) || state.contacts[0];
        const isNoteMode = state.cotLogMode === 'note';
        const sourceLogs = state.activityLogLoadedAt ? state.activityLogEntries : getCotLogEntries(c.id);
        const logs = sourceLogs.filter((item) => {
            if (state.cotLogMode === 'short') return item.mode !== '\u4e3b\u52a8';
            if (state.cotLogMode === 'note') return item.steps.some((step) => step.type === 'note');
            return true;
        });
        const noteCount = sourceLogs.filter((item) => item.steps.some((step) => step.type === 'note')).length;
        return `
      <section class="cot-log-page page-block">
        <div class="cot-log-toolbar glass-frost">
          <button class="cot-log-tool-btn avatar" aria-label="${escapeHtml(c.name)}">
            <img src="${c.avatar}" alt="${escapeHtml(c.name)}" />
          </button>
          <div class="cot-log-segment-shell">
            <button class="cot-log-segment-btn ${state.cotLogMode === 'short' ? 'active' : ''}" data-action="switch-cot-log-mode" data-mode="short">\u77ed\u6d88\u606f</button>
            <button class="cot-log-segment-btn ${state.cotLogMode === 'long' ? 'active' : ''}" data-action="switch-cot-log-mode" data-mode="long">\u957f\u6d88\u606f</button>
          </div>
          <button class="cot-log-tool-btn note ${state.cotLogMode === 'note' ? 'active' : ''}" data-action="switch-cot-log-mode" data-mode="note">${icon('file')}${noteCount ? `<em>${noteCount}</em>` : ''}</button>
        </div>
        <div class="cot-log-stack">
          ${state.activityLogLoading ? '<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">' + icon('cot') + '</span><strong>正在加载活动日志</strong><p>等一下，别盯着白板发呆。</p></div>' : ''}
          ${!state.activityLogLoading && state.activityLogLoadedAt && !logs.length ? '<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">' + icon('file') + '</span><strong>还没有活动日志</strong><p>这个模式下暂时没有主动消息、工具调用或小纸条。</p></div>' : ''}
          ${logs.map((item) => {
            const visibleSteps = isNoteMode
                ? item.steps.filter((step) => step.type === 'note')
                : item.steps;
            return `
            <article class="cot-log-card glass-frost ${isNoteMode ? 'note-only' : ''}">
              <div class="cot-log-topline">
                <div class="cot-log-badges">
                  <span class="cot-log-mode ${item.accent}">${escapeHtml(item.mode)}</span>
                  <span class="cot-log-mode neutral">${escapeHtml(item.badge)}</span>
                  <span class="cot-log-metric">${escapeHtml(item.score)}</span>
                  <span class="cot-log-metric warm">${escapeHtml(item.latency)}</span>
                </div>
                <span class="cot-log-fold">${icon('chevron')}</span>
              </div>
              <div class="cot-log-meta">
                <span class="cot-log-cost">${escapeHtml(item.amount)}</span>
                <span>${escapeHtml(item.time)}</span>
              </div>
              ${isNoteMode ? '' : `<div class="cot-log-summary">${escapeHtml(item.summary)}</div>`}
              <div class="cot-log-steps">
                ${visibleSteps.map(renderCotStep).join('')}
              </div>
            </article>
          `;
        }).join('')}
        </div>
      </section>
    `;
    }

    function statusClass(status) {
        if (status.includes('\u5728\u7ebf')) return 'online';
        if (status.includes('\u5fd9')) return 'busy';
        if (status.includes('\u79bb\u5f00')) return 'away';
        return 'off';
    }

    function isEditableTarget(target) {
        if (!target || typeof target.closest !== 'function') return false;
        return !!target.closest('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select, [contenteditable="true"]');
    }

    function isLikelyTouchDevice() {
        return !!(window.matchMedia?.('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    }

    function isChatImageFile(file) {
        return !!file && /^image\/(png|jpe?g|webp|gif|heic|heif)$/i.test(file.type || '');
    }

    function serializeChatAttachment(attachment) {
        if (!attachment) return null;
        return {
            id: attachment.id,
            kind: attachment.kind || 'image',
            type: attachment.type || 'image/*',
            name: attachment.name || 'image',
            size: Number(attachment.size || 0),
            url: attachment.url || '',
        };
    }

    function messageAttachments(message = {}) {
        return Array.isArray(message.attachments)
            ? message.attachments.map(serializeChatAttachment).filter((item) => item && item.url)
            : [];
    }

    function hasMessageAttachments(message = {}) {
        return messageAttachments(message).length > 0;
    }

    function attachmentRequestText(text, attachments = []) {
        const base = String(text || '').trim();
        if (!attachments.length) return base;
        const labels = attachments.map((item) => item.name || 'image').join(', ');
        const note = `[图片附件：${labels}]`;
        return base ? `${base}\n${note}` : note;
    }

    function attachmentLastMessage(text, attachments = []) {
        const base = String(text || '').trim();
        if (base) return base;
        return attachments.length ? '[图片]' : '';
    }

    function renderAttachmentThumb(attachment, options = {}) {
        const item = serializeChatAttachment(attachment);
        if (!item?.url) return '';
        return `
      <div class="chat-attachment-thumb">
        <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.name || '图片')}" />
        ${options.removable ? `<button type="button" class="chat-attachment-remove" data-action="remove-chat-attachment" data-id="${escapeHtml(item.id)}" aria-label="移除图片">×</button>` : ''}
      </div>
    `;
    }

    function renderChatAttachmentTray(attachments = []) {
        if (!attachments.length) return '';
        return `
      <div class="chat-attachment-tray">
        ${attachments.map((item) => renderAttachmentThumb(item, { removable: true })).join('')}
      </div>
    `;
    }

    function renderMessageAttachments(attachments = []) {
        if (!attachments.length) return '';
        return `<div class="message-attachment-grid">${attachments.map((item) => renderAttachmentThumb(item)).join('')}</div>`;
    }

    function readChatAttachmentFile(file) {
        return new Promise((resolve, reject) => {
            if (!isChatImageFile(file)) {
                reject(new Error('只支持图片附件'));
                return;
            }
            const reader = new FileReader();
            reader.onerror = () => reject(new Error('图片读取失败'));
            reader.onload = () => resolve({
                id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                kind: 'image',
                type: file.type || 'image/*',
                name: file.name || 'pasted-image',
                size: file.size || 0,
                url: typeof reader.result === 'string' ? reader.result : '',
            });
            reader.readAsDataURL(file);
        });
    }

    async function addChatImageFiles(files = []) {
        const imageFiles = Array.from(files).filter(isChatImageFile);
        if (!imageFiles.length) return false;
        try {
            const next = await Promise.all(imageFiles.map(readChatAttachmentFile));
            state.chatAttachments = [...(state.chatAttachments || []), ...next].slice(0, 6);
            state.chatPasteError = '';
            state.showAttach = false;
            render();
            return true;
        } catch (error) {
            console.warn('[chat] image attach failed', error);
            state.chatPasteError = error?.message || '图片添加失败';
            state.toast = state.chatPasteError;
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1400);
            return false;
        }
    }

    function insertPlainTextIntoInput(input, text) {
        if (!input || !text) return;
        const value = String(input.value || '');
        const start = typeof input.selectionStart === 'number' ? input.selectionStart : value.length;
        const end = typeof input.selectionEnd === 'number' ? input.selectionEnd : start;
        input.value = `${value.slice(0, start)}${text}${value.slice(end)}`;
        const nextPos = start + text.length;
        input.setSelectionRange?.(nextPos, nextPos);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function plainTextFromHtml(html) {
        if (!html) return '';
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return (temp.textContent || temp.innerText || '').replace(/\n{3,}/g, '\n\n');
    }

    async function handleChatInputPaste(event) {
        if (state.currentView !== 'room') return;
        const clipboard = event.clipboardData;
        if (!clipboard) return;
        const directFiles = Array.from(clipboard.files || []).filter(isChatImageFile);
        const itemFiles = Array.from(clipboard.items || [])
            .filter((item) => item.kind === 'file' && /^image\//i.test(item.type || ''))
            .map((item) => item.getAsFile())
            .filter(isChatImageFile);
        const imageFiles = [...directFiles, ...itemFiles].filter((file, index, all) => (
            index === all.findIndex((item) => item.name === file.name && item.size === file.size && item.type === file.type)
        ));
        const plain = clipboard.getData('text/plain') || '';
        const html = clipboard.getData('text/html') || '';
        if (imageFiles.length) {
            event.preventDefault();
            await addChatImageFiles(imageFiles);
            if (plain.trim()) insertPlainTextIntoInput(event.currentTarget, plain);
            return;
        }
        if (html) {
            event.preventDefault();
            insertPlainTextIntoInput(event.currentTarget, plain || plainTextFromHtml(html));
        }
    }

    function openAvatarCropper(kind, src) {
        if (!src) return;
        state.avatarCropper = { kind, src, x: 50, y: 50, zoom: 1 };
        render();
    }

    function normalizeCropPercent(value) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return 50;
        return Math.min(100, Math.max(0, numeric));
    }

    function normalizeCropZoom(value) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return 1;
        return Math.min(2.4, Math.max(1, numeric));
    }

    function updateAvatarCropperPreview() {
        const crop = state.avatarCropper;
        if (!crop) return;
        crop.x = normalizeCropPercent(crop.x);
        crop.y = normalizeCropPercent(crop.y);
        crop.zoom = normalizeCropZoom(crop.zoom);
        const mount = root();
        const preview = mount?.querySelector('.avatar-cropper-image');
        if (preview) {
            preview.style.objectPosition = `${crop.x}% ${crop.y}%`;
            preview.style.transform = `scale(${crop.zoom})`;
        }
        mount?.querySelectorAll('[data-action="avatar-cropper-range"]').forEach((input) => {
            const key = input.dataset.key;
            if (key && key in crop) input.value = String(crop[key]);
        });
    }

    function handleAvatarCropperPointerDown(event) {
        const viewport = event.target?.closest?.('.avatar-cropper-viewport');
        const crop = state.avatarCropper;
        if (!viewport || !crop) return;
        event.preventDefault();
        state.avatarCropDrag = {
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startClientY: event.clientY,
            startX: normalizeCropPercent(crop.x),
            startY: normalizeCropPercent(crop.y),
        };
        viewport.setPointerCapture?.(event.pointerId);
    }

    function handleAvatarCropperPointerMove(event) {
        const drag = state.avatarCropDrag;
        const crop = state.avatarCropper;
        const viewport = root()?.querySelector('.avatar-cropper-viewport');
        if (!drag || !crop || !viewport || drag.pointerId !== event.pointerId) return;
        event.preventDefault();
        const rect = viewport.getBoundingClientRect();
        const zoom = normalizeCropZoom(crop.zoom);
        const xDelta = rect.width ? ((event.clientX - drag.startClientX) / rect.width) * 100 / zoom : 0;
        const yDelta = rect.height ? ((event.clientY - drag.startClientY) / rect.height) * 100 / zoom : 0;
        crop.x = normalizeCropPercent(drag.startX - xDelta);
        crop.y = normalizeCropPercent(drag.startY - yDelta);
        updateAvatarCropperPreview();
    }

    function handleAvatarCropperPointerUp(event) {
        const drag = state.avatarCropDrag;
        if (!drag || drag.pointerId !== event.pointerId) return;
        state.avatarCropDrag = null;
    }

    function readAvatarFile(file, kind) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const src = typeof reader.result === 'string' ? reader.result : '';
            openAvatarCropper(kind, src);
        };
        reader.readAsDataURL(file);
    }

    function cropAvatarImage(crop) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const size = 512;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('canvas unavailable'));
                    return;
                }
                const zoom = normalizeCropZoom(crop.zoom);
                const baseScale = Math.max(size / img.naturalWidth, size / img.naturalHeight);
                const drawW = img.naturalWidth * baseScale * zoom;
                const drawH = img.naturalHeight * baseScale * zoom;
                const xRatio = normalizeCropPercent(crop.x) / 100;
                const yRatio = normalizeCropPercent(crop.y) / 100;
                const drawX = (size - drawW) * xRatio;
                const drawY = (size - drawH) * yRatio;
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, drawX, drawY, drawW, drawH);
                resolve(canvas.toDataURL('image/jpeg', 0.9));
            };
            img.onerror = reject;
            img.src = crop.src;
        });
    }

    async function applyAvatarCropper() {
        const crop = state.avatarCropper;
        if (!crop?.src) return;
        try {
            const nextAvatar = await cropAvatarImage(crop);
            if (crop.kind === 'new-contact') {
                state.newContactDraft = {
                    ...(state.newContactDraft || createNewContactDraft()),
                    avatar: nextAvatar,
                };
                state.newContactAvatar = nextAvatar;
            } else if (crop.kind === 'account') {
                state.accountProfile.avatar = nextAvatar;
                saveAiSettings();
                queueLocalSyncIfChanged(120);
            } else if (crop.kind === 'contact') {
                const c = byId(state.currentContactId);
                if (c) {
                    c.avatar = nextAvatar;
                    queueLocalSyncIfChanged(120);
                }
            }
            state.avatarCropper = null;
            state.toast = '头像已更新';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        } catch {
            state.toast = '头像裁切失败';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        }
    }

    function bind() {
        const mount = root();
        if (!mount || mount.dataset.bound === '1') return;
        mount.dataset.bound = '1';
        mount.addEventListener('click', handleClick);
        mount.addEventListener('input', handleInput);
        mount.addEventListener('pointerdown', handleAvatarCropperPointerDown);
        mount.addEventListener('pointermove', handleAvatarCropperPointerMove);
        mount.addEventListener('pointerup', handleAvatarCropperPointerUp);
        mount.addEventListener('pointercancel', handleAvatarCropperPointerUp);

        // Long-press AI bubble to quote/reply
        let pressTimer;
        const startPress = (e) => {
            if (isEditableTarget(e.target)) return;
            const bubble = e.target.closest('.message-bubble.from-ai');
            if (bubble) {
                pressTimer = window.setTimeout(() => {
                    const msgId = bubble.dataset.msgId;
                    const current = byId(state.currentContactId);
                    const msg = current?.messages?.find((item) => item.id === msgId);
                    if (msg?.text) {
                        state.quoteMomentId = null;
                        state.quoteMessageId = msgId;
                        render();
                        const input = root()?.querySelector('.chat-input');
                        if (input) input.focus();
                    }
                    state.activeBubbleToolsId = msgId;
                    state.suppressBubbleToggle = true;
                    if (navigator.vibrate) navigator.vibrate(50);
                }, 550);
            }
        };
        const cancelPress = () => clearTimeout(pressTimer);

        mount.addEventListener('touchstart', startPress, { passive: true });
        mount.addEventListener('touchend', cancelPress);
        mount.addEventListener('touchmove', cancelPress, { passive: true });
        mount.addEventListener('mousedown', startPress);
        mount.addEventListener('mouseup', cancelPress);
        mount.addEventListener('mousemove', cancelPress);
        mount.addEventListener('mouseleave', cancelPress);

        // Direct bind for buttons with SVG children (closest() fails across SVG namespace)
        const sendBtn = mount.querySelector('.send-round');
        if (sendBtn) sendBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (state.streamingAbortController) {
                state.streamingAbortController.abort();
                state.streamingAbortController = null;
                render(); // immediately revert button without waiting for catch block
            } else if (state.currentView !== 'rpRoom' && isCCEnabledForContact(byId(state.currentContactId))) {
                doSendCCMessage();
            } else if (state.currentView !== 'rpRoom' && isCodexEnabledForContact(byId(state.currentContactId))) {
                doSendCodexMessage();
            } else {
                doSendMessage();
            }
        });
        const attachBtn = mount.querySelector('.soft-mini');
        if (attachBtn) attachBtn.addEventListener('click', (e) => { e.stopPropagation(); state.showAttach = !state.showAttach; render(); });
        const codexBtn = mount.querySelector('.codex-toggle:not(.cc-toggle)');
        if (codexBtn) codexBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCurrentCodexMode();
        });
        const ccBtn = mount.querySelector('.cc-toggle');
        if (ccBtn) ccBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCurrentCCMode();
        });
        const contactRows = mount.querySelectorAll('.chat-list-item[data-contact-id]');
        contactRows.forEach((row) => {
            row.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openContact(row.dataset.contactId);
            });
        });
        // Enter to send
        const chatInput = mount.querySelector('.chat-input');
        if (chatInput) {
            chatInput.addEventListener('paste', handleChatInputPaste);
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (state.currentView !== 'rpRoom' && isCCEnabledForContact(byId(state.currentContactId))) {
                        doSendCCMessage();
                    } else if (state.currentView !== 'rpRoom' && isCodexEnabledForContact(byId(state.currentContactId))) {
                        doSendCodexMessage();
                    } else {
                        doSendMessage();
                    }
                }
            });
            if (['room', 'rpRoom'].includes(state.currentView) && !isLikelyTouchDevice()) chatInput.focus();
        }

        const chatImageInput = mount.querySelector('#chat-image-input');
        if (chatImageInput) {
            chatImageInput.addEventListener('change', async (e) => {
                await addChatImageFiles(e.target.files || []);
                e.target.value = '';
            });
        }
    }

    function toggleCurrentCodexMode(contactId = state.currentContactId) {
        const c = byId(contactId) || byId(state.currentContactId);
        if (!c) return;
        state.currentContactId = c.id;
        if (!canToggleCodexForContact(c)) {
            c.settings = { ...(c.settings || {}), codexEnabled: false };
            state.toast = '只有阿湛能切 Codex';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }
        c.settings = { ...(c.settings || {}), codexEnabled: !c.settings?.codexEnabled };
        state.toast = c.settings.codexEnabled ? 'Codex 已接管这个窗口' : 'Codex 已关闭';
        queueLocalSyncIfChanged(120);
        render();
        window.setTimeout(() => { state.toast = ''; render(); }, 1200);
    }

    window.__yuiToggleCodex = (target, event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        event?.stopImmediatePropagation?.();
        const contactId = target?.dataset?.contactId || state.currentContactId;
        toggleCurrentCodexMode(contactId);
    };

    window.__yuiToggleCC = (target, event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        event?.stopImmediatePropagation?.();
        const contactId = target?.dataset?.contactId || state.currentContactId;
        toggleCurrentCCMode(contactId);
    };

    async function handleClick(event) {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;

        if (action === 'cancel-avatar-cropper') {
            state.avatarCropper = null;
            state.avatarCropDrag = null;
            render();
            return;
        }

        if (action === 'apply-avatar-cropper') {
            event.preventDefault();
            event.stopPropagation();
            await applyAvatarCropper();
            return;
        }

        if (action === 'switch-tab') {
            state.currentTab = target.dataset.tab;
            state.currentView = target.dataset.tab === 'chats' ? 'list' : target.dataset.tab;
            render();
        }

        if (action === 'open-contact') {
            openContact(target.dataset.contactId);
            return;
        }

        if (action === 'back-list') {
            state.currentView = 'list';
            state.currentTab = 'chats';
            state.quoteMomentId = null;
            render();
        }

        if (action === 'back-room') {
            state.currentView = 'room';
            render();
        }

        if (action === 'open-contact-settings') {
            state.currentSettingsTab = 'basic';
            state.currentView = 'contactSettings';
            render();
            loadCompanionState();
            loadAgentPersona(state.currentContactId);
        }

        if (action === 'open-cot-log') {
            state._prevContactSettingsTab = state.currentSettingsTab;
            state.currentView = 'cotLog';
            state.cotLogMode = 'long';
            state.activityLogLoadedAt = '';
            state.activityLogEntries = [];
            render();
            loadActivityLog({ silent: true });
            return;
        }

        if (action === 'back-contact-settings') {
            state.currentView = 'contactSettings';
            state.currentSettingsTab = state._prevContactSettingsTab || state.currentSettingsTab || 'basic';
            state._prevContactSettingsTab = null;
            render();
            return;
        }

        if (action === 'switch-cot-log-mode') {
            state.cotLogMode = target.dataset.mode || 'long';
            render();
            return;
        }

        if (action === 'open-rp-lobby') {
            openRpLobby(state.currentView === 'room' ? 'room' : 'list', getCurrentRpAgentId());
            return;
        }

        if (action === 'back-rp-source') {
            state.currentView = state.rpBackView || 'list';
            render();
            return;
        }

        if (action === 'back-rp-lobby') {
            state.currentView = 'rpLobby';
            render();
            return;
        }

        if (action === 'open-rp-room-create') {
            state.rpRoomDialogMode = 'create';
            state.rpRoomForm = { name: '', world_setting: '', user_role: '', ai_role: '' };
            state.rpRoomDialogOpen = true;
            render();
            return;
        }

        if (action === 'close-rp-room-dialog') {
            if (target.dataset.rpRoomDialog === 'card') return;
            if (event.target && event.target !== target) return;
            state.rpRoomDialogOpen = false;
            render();
            return;
        }

        if (action === 'save-rp-room') {
            try {
                await saveRpRoomForm();
                state.toast = state.rpRoomDialogMode === 'edit' ? '幕间已更新' : '已入梦';
            } catch (error) {
                console.warn('[rp] save room failed', error);
                state.toast = '房间保存失败';
            }
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }

        if (action === 'open-rp-room') {
            event.preventDefault();
            event.stopPropagation();
            await openRpRoom(target.dataset.roomId);
            return;
        }

        if (action === 'delete-rp-room') {
            event.preventDefault();
            event.stopPropagation();
            try {
                await deleteRpRoom(target.dataset.roomId);
                state.toast = '房间已删除';
            } catch (error) {
                console.warn('[rp] delete room failed', error);
                state.toast = '删除失败';
            }
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }

        if (action === 'rename-rp-room') {
            event.preventDefault();
            event.stopPropagation();
            const roomId = target.dataset.roomId;
            const room = state.rpRooms.find((item) => item.room_id === roomId);
            const nextName = window.prompt('剧本', room?.name || '')?.trim();
            if (!nextName || !roomId) return;
            try {
                const resp = await fetch(`${API_BASE}/api/rp/rooms/${encodeURIComponent(roomId)}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: nextName }),
                });
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                await loadRpRooms(getCurrentRpAgentId(), { silent: true });
                state.toast = '房间已重命名';
            } catch (error) {
                console.warn('[rp] rename room failed', error);
                state.toast = '重命名失败';
            }
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }

        if (action === 'open-profile') {
            state.currentView = 'profile';
            render();
        }

        if (action === 'stop-streaming') {
            if (state.streamingAbortController) {
                state.streamingAbortController.abort();
                state.streamingAbortController = null;
            }
            return;
        }

        if (action === 'toggle-thinking-line') {
            const msgId = target.closest('[data-id]')?.dataset.id || target.dataset.id;
            const lineEl = root()?.querySelector(`#tl-line-${msgId}`);
            const fullEl = root()?.querySelector(`#tl-full-${msgId}`);
            if (!lineEl || !fullEl) return;
            const isOpen = fullEl.classList.contains('tl-open');
            fullEl.classList.toggle('tl-open', !isOpen);
            lineEl.classList.toggle('tl-expanded', !isOpen);
            return;
        }

        if (action === 'toggle-thinking') {
            const msgId = target.dataset.id;
            const isOpen = !!state.openThinkingIds[msgId];
            const nextOpen = !isOpen;
            state.openThinkingIds[msgId] = nextOpen;
            const box = document.getElementById(`thinking-${msgId}`);
            if (box) {
                box.classList.toggle('open', nextOpen);
                box.setAttribute('aria-hidden', nextOpen ? 'false' : 'true');
                target.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
            } else {
                render();
            }
        }

        if (action === 'toggle-message-tools') {
            event.preventDefault();
            event.stopPropagation();
            if (state.suppressBubbleToggle) {
                state.suppressBubbleToggle = false;
                return;
            }
            const msgId = target.dataset.id;
            const nextId = state.activeBubbleToolsId === msgId ? null : msgId;
            state.activeBubbleToolsId = nextId;
            const mount = root();
            if (mount) {
                mount.querySelectorAll('.bubble-bottom-tools.open').forEach((el) => {
                    el.classList.remove('open');
                });
                if (nextId) {
                    mount
                        .querySelector(`.message-row[data-msg-id="${CSS.escape(nextId)}"] .bubble-bottom-tools`)
                        ?.classList.add('open');
                }
            }
            return;
        }

        if (action === 'go-chat-with-quote') {
            state.currentContactId = target.dataset.contactId;
            state.quoteMomentId = target.dataset.momentId;
            state.quoteMessageId = null;
            state.currentTab = 'chats';
            state.currentView = 'room';
            render();
            loadMurmurHistoryForContact(state.currentContactId);
            loadCompanionState(state.currentContactId);
            loadAgentPersona(state.currentContactId);
        }

        if (action === 'open-comments') {
            event.preventDefault();
            event.stopPropagation();
            target.blur?.();
            const momentId = target.dataset.momentId;
            const nextOpenId = state.commentSheetMomentId === momentId ? null : momentId;
            state.commentSheetMomentId = nextOpenId;
            const mountEl = root();
            if (mountEl) {
                mountEl.querySelectorAll('.moment-inline-comment.open').forEach((el) => el.classList.remove('open'));
                if (nextOpenId) {
                    const targetBox = mountEl.querySelector(`.moment-inline-comment .moment-comment-input[data-comment-input="${nextOpenId}"]`)?.closest('.moment-inline-comment');
                    if (targetBox) targetBox.classList.add('open');
                }
            }
            return;
        }

        if (action === 'submit-comment') {
            event.preventDefault();
            event.stopPropagation();
            const momentId = target.dataset.momentId;
            const input = root()?.querySelector(`[data-comment-input="${momentId}"]`);
            const value = input?.value?.trim();
            if (!momentId || !value) return;
            try {
                const updated = await addMomentCommentApi(momentId, currentMomentsActor(), value);
                state.moments = state.moments.map((item) => item.id === momentId ? updated : item);
                state.commentSheetMomentId = null;
                state.toast = '\u5df2\u53d1\u9001\u8bc4\u8bba';
                queueLocalSyncIfChanged(120);
                renderMomentsStable();
                window.setTimeout(() => { state.toast = ''; renderMomentsStable(); }, 1200);
            } catch (error) {
                console.warn('[moments] comment failed', error);
                applyLocalMomentComment(momentId, currentMomentsActor(), value);
                state.commentSheetMomentId = null;
                state.toast = '\u5df2\u53d1\u9001\u8bc4\u8bba';
                queueLocalSyncIfChanged(120);
                renderMomentsStable();
                window.setTimeout(() => { state.toast = ''; renderMomentsStable(); }, 1200);
            }
            return;
        }

        if (action === 'like-moment') {
            event.preventDefault();
            event.stopPropagation();
            const momentId = target.dataset.momentId;
            if (!momentId) return;
            try {
                const updated = await toggleMomentLikeApi(momentId, currentMomentsActor());
                state.moments = state.moments.map((item) => item.id === momentId ? updated : item);
                queueLocalSyncIfChanged(120);
                renderMomentsStable();
            } catch (error) {
                console.warn('[moments] like failed', error);
                applyLocalMomentLike(momentId, currentMomentsActor());
                queueLocalSyncIfChanged(120);
                renderMomentsStable();
            }
            return;
        }

        if (action === 'submit-comment') {
            const post = getMoment(target.dataset.momentId);
            const input = root()?.querySelector(`[data-comment-input="${target.dataset.momentId}"]`);
            const value = input?.value?.trim();
            if (post && value) {
                post.comments.unshift({ author: '\u6211', text: value });
                state.commentSheetMomentId = null;
                state.toast = '\u5df2\u53d1\u9001\u8bc4\u8bba';
                queueLocalSyncIfChanged(120);
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            }
        }

        if (action === 'like-moment') {
            event.preventDefault();
            event.stopPropagation();
            const post = getMoment(target.dataset.momentId);
            if (!post) return;
            const me = '\u6211';
            const isLiked = post.likes.includes(me);
            post.likes = post.likes.filter(l => l !== me);
            if (!isLiked) {
                post.likes.unshift(me);
            }

            const likeBtn = target;
            likeBtn.innerHTML = post.likes.includes(me) ? icon('heartFilled') : icon('heart');
            const contentCol = target.closest('.moment-content-col');
            if (!contentCol) return;

            let interPanel = contentCol.querySelector(`[data-moment-id-panel="${post.id}"]`);

            if (!interPanel && post.likes.length > 0) {
                interPanel = document.createElement('div');
                interPanel.className = 'moment-interactions';
                interPanel.setAttribute('data-moment-id-panel', post.id);

                const inlineCommentNode = contentCol.querySelector('.moment-inline-comment');
                if (inlineCommentNode) {
                    contentCol.insertBefore(interPanel, inlineCommentNode);
                } else {
                    contentCol.appendChild(interPanel);
                }
            }

            if (interPanel) {
                const likesArea = interPanel.querySelector('.moment-likes-area');
                if (post.likes.length > 0) {
                    if (likesArea) {
                        likesArea.querySelector('.likes-list').textContent = post.likes.join('、');
                    } else {
                        const newLikes = document.createElement('div');
                        newLikes.className = 'moment-likes-area';
                        newLikes.innerHTML = `<span class="heart-mini">${icon('heartFilled')}</span> <span class="likes-list">${escapeHtml(post.likes.join('、'))}</span>`;
                        interPanel.insertBefore(newLikes, interPanel.firstChild);
                    }
                } else {
                    if (likesArea) likesArea.remove();
                    if (!interPanel.querySelector('.moment-comments-area')) {
                        interPanel.remove();
                    }
                }
            }
        }

        if (action === 'toggle-moment-search') {
            state.momentSearchOpen = true;
            render();
        }

        if (action === 'toggle-moment-menu') {
            event.preventDefault();
            event.stopPropagation();
            target.blur?.();
            state.activeMenuMomentId = state.activeMenuMomentId === target.dataset.momentId ? null : target.dataset.momentId;
            renderWithScrollLock();
        }

        if (action === 'delete-moment') {
            event.preventDefault();
            event.stopPropagation();
            const moment = normalizeMoment(getMoment(target.dataset.momentId));
            if (!moment?.id) return;
            try {
                await deleteMomentApi(moment.id, moment.author_type, moment.author_id);
                state.moments = state.moments.filter((item) => item.id !== moment.id);
                state.activeMenuMomentId = null;
                state.toast = '\u5df2\u5220\u9664\u670b\u53cb\u5708';
                queueLocalSyncIfChanged(120);
                renderMomentsStable();
                window.setTimeout(() => { state.toast = ''; renderMomentsStable(); }, 1200);
            } catch (error) {
                console.warn('[moments] delete failed', error);
                state.toast = '\u5220\u9664\u5931\u8d25';
                renderMomentsStable();
                window.setTimeout(() => { state.toast = ''; renderMomentsStable(); }, 1400);
            }
            return;
        }

        if (action === 'edit-moment') {
            event.preventDefault();
            event.stopPropagation();
            const moment = normalizeMoment(getMoment(target.dataset.momentId));
            if (!moment?.id) return;
            state.activeMenuMomentId = null;
            state.momentComposerEditingId = moment.id;
            state.momentComposerText = moment.content || '';
            state.momentComposerImage = moment.image || '';
            state.momentComposerImageName = moment.image ? '\u5df2\u6709\u56fe\u7247' : '';
            state.momentsActorType = moment.author_type === 'agent' ? 'agent' : 'user';
            state.momentComposerOpen = true;
            renderMomentsStable();
            return;
        }

        if (action === 'new-moment') {
            event.preventDefault();
            event.stopPropagation();
            state.momentComposerEditingId = '';
            state.momentComposerText = '';
            state.momentComposerImage = '';
            state.momentComposerImageName = '';
            state.momentComposerOpen = true;
            renderMomentsStable();
            return;
        }

        if (action === 'set-moments-actor') {
            state.toast = '\u53d1\u670b\u53cb\u5708\u9ed8\u8ba4\u4ee5\u6211\u53d1\u5e03';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1100);
            return;
        }

        if (action === 'publish-moment') {
            const content = (document.getElementById('moment-content-input')?.value || state.momentComposerText || '').trim();
            if (!content) {
                state.toast = '\u670b\u53cb\u5708\u5185\u5bb9\u8fd8\u6ca1\u5199';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1100);
                return;
            }
            const actor = currentMomentsActor();
            try {
                if (state.momentComposerEditingId) {
                    await updateMoment(state.momentComposerEditingId, {
                        author_type: actor.author_type,
                        author_id: actor.author_id,
                        visibility: 'public',
                        content,
                        image: state.momentComposerImage || '',
                        mood: '\u65e5\u5e38',
                    });
                    await loadMoments({ silent: true });
                    state.toast = '\u5df2\u66f4\u65b0\u670b\u53cb\u5708';
                } else {
                    const created = await createMoment({
                        author_type: actor.author_type,
                        author_id: actor.author_id,
                        visibility: 'public',
                        content,
                        image: state.momentComposerImage || '',
                        mood: '\u65e5\u5e38',
                    });
                    state.moments.unshift(created);
                    state.toast = '\u5df2\u53d1\u5e03\u670b\u53cb\u5708';
                }
                state.currentTab = 'moments';
                state.currentView = 'moments';
                state.momentComposerOpen = false;
                state.momentComposerEditingId = '';
                state.momentComposerText = '';
                state.momentComposerImage = '';
                state.momentComposerImageName = '';
                queueLocalSyncIfChanged(120);
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1100);
            } catch (error) {
                console.warn('[moments] publish failed', error);
                state.toast = state.momentComposerEditingId ? '\u66f4\u65b0\u5931\u8d25' : '\u53d1\u5e03\u5931\u8d25';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1400);
            }
            return;
        }

        if (action === 'delete-moment') {
            state.moments = state.moments.filter(m => m.id !== target.dataset.momentId);
            state.activeMenuMomentId = null;
            state.toast = '\u5df2\u5220\u9664\u670b\u53cb\u5708';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        }

        if (action === 'edit-moment') {
            state.activeMenuMomentId = null;
            state.toast = '\u7f16\u8f91\u529f\u80fd\u5373\u5c06\u652f\u6301';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        }

        if (action === 'filter-moments') {
            state.toast = '\u7b5b\u9009\u529f\u80fd\u7a0d\u540e\u8865\u4e0a';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1100);
        }

        if (action === 'new-moment') {
            state.momentComposerOpen = true;
            render();
        }

        if (action === 'close-moment-composer') {
            state.momentComposerOpen = false;
            render();
        }

        if (action === 'publish-moment') {
            const content = (document.getElementById('moment-content-input')?.value || state.momentComposerText || '').trim();
            if (!content) {
                state.toast = '\u670b\u53cb\u5708\u5185\u5bb9\u8fd8\u6ca1\u5199';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1100);
                return;
            }
            state.moments.unshift({
                id: `p${Date.now()}`,
                contactId: 'me',
                time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }),
                mood: '\u65e5\u5e38',
                content,
                likes: [],
                comments: [],
                image: state.momentComposerImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80',
            });
            state.currentTab = 'moments';
            state.currentView = 'moments';
            state.momentComposerOpen = false;
            state.momentComposerText = '';
            state.momentComposerImage = '';
            state.momentComposerImageName = '';
            state.toast = '\u5df2\u53d1\u5e03\u670b\u53cb\u5708';
            queueLocalSyncIfChanged(120);
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1100);
        }

        if (action === 'remove-moment-image') {
            state.momentComposerImage = '';
            state.momentComposerImageName = '';
            render();
        }

        if (action === 'new-contact') {
            state.newContactDraft = createNewContactDraft();
            state.newContactAvatar = '';
            state.currentView = 'newContact';
            render();
        }

        if (action === 'pick-new-contact-avatar') {
            const fileInput = document.getElementById('nc-avatar-file');
            fileInput?.click();
            return;
        }

        if (action === 'save-new-contact') {
            state.newContactDraft = {
                ...(state.newContactDraft || {}),
                name: document.getElementById('nc-name')?.value?.trim() || state.newContactDraft?.name || '',
                agentId: document.getElementById('nc-agent-id')?.value?.trim() || state.newContactDraft?.agentId || '',
                bio: document.getElementById('nc-bio')?.value?.trim() || state.newContactDraft?.bio || '',
            };
            const name = String(state.newContactDraft.name || '').trim();
            const normalizedAgentId = normalizeNewContactAgentId(state.newContactDraft.agentId);
            const bio = String(state.newContactDraft.bio || '').trim();
            const avatar = state.newContactDraft.avatar || state.newContactAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80';

            if (!name) {
                state.toast = '\u8bf7\u586b\u5199\u8054\u7cfb\u4eba\u6635\u79f0';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1200);
                return;
            }

            if (normalizedAgentId && !/^[a-z0-9_-]+$/.test(normalizedAgentId)) {
                state.toast = 'Agent ID 只能用小写字母、数字、下划线或短横线';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1500);
                return;
            }

            if (normalizedAgentId && state.contacts.some((item) => String(item.id || '').toLowerCase() === normalizedAgentId)) {
                state.toast = '这个 Agent ID 已经存在';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1400);
                return;
            }

            const id = normalizedAgentId || ('c' + Date.now());
            const contact = mergeContact({
                id, name, bio: bio || '\u8fd9\u662f\u65b0\u6765\u7684\u8054\u7cfb\u4eba',
                status: '\u5728\u7ebf', handle: '@' + id,
                theme: 'rose', unread: 0,
                pinned: false, lastMessage: '', lastTime: '',
                avatar,
                settings: {
                    model: 'gpt-5.4', modelProviderId: getSlot('chat')?.providerId || 'openai', temperature: 0.7, topP: 0.9, contextCount: 32, thinkBudget: 24, streamOutput: true, reasoning_visibility: false, proactiveEnabled: false, proactiveFrequency: 30, memoryEnabled: true,
                },
                topics: [], messages: []
            });
            const registered = await registerAgentForContact(contact);
            persistLocalSnapshot();
            scheduleSyncPush(100);
            state.newContactDraft = createNewContactDraft();
            state.newContactAvatar = '';
            state.toast = registered ? '\u5df2\u6dfb\u52a0\u8054\u7cfb\u4eba' : '\u5df2\u672c\u5730\u6dfb\u52a0\uff0c\u540e\u7aef\u767b\u8bb0\u5931\u8d25';
            state.currentView = 'list';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, registered ? 1200 : 1800);
        }

        if (action === 'open-contact-avatar') {
            const fileInput = document.getElementById('contact-avatar-file');
            fileInput?.click();
            return;
        }
        if (action === 'open-contact-name') {
            const c = byId(state.currentContactId);
            if (!c) return;
            const nextName = window.prompt('请输入昵称', c.name || '')?.trim();
            if (!nextName) return;
            c.name = nextName;
            state.toast = '昵称已更新';
            render();
            queueLocalSyncIfChanged(120);
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }
        if (action === 'open-contact-bio') {
            const c = byId(state.currentContactId);
            if (!c) return;
            const nextBio = window.prompt('请输入简介', c.bio || '')?.trim();
            if (typeof nextBio !== 'string' || !nextBio) return;
            c.bio = nextBio;
            state.toast = '简介已更新';
            render();
            queueLocalSyncIfChanged(120);
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }

        if (action === 'open-contact-impression') {
            state._prevContactSettingsTab = state.currentSettingsTab;
            state.currentView = 'contactImpressionDetail';
            render();
            loadCompanionState(state.currentContactId);
            return;
        }

        if (action === 'open-contact-relationship') {
            state._prevContactSettingsTab = state.currentSettingsTab;
            state.currentView = 'contactRelationshipDetail';
            render();
            loadCompanionState(state.currentContactId);
            return;
        }

        if (action === 'open-contact-likes') {
            state._prevContactSettingsTab = state.currentSettingsTab;
            state.currentView = 'contactLikesDetail';
            render();
            loadCompanionState(state.currentContactId);
            return;
        }

        if (action === 'save-insight-field') {
            const field = target.dataset.field;
            const textarea = document.querySelector(`.insight-editor-textarea[data-field="${field}"]`);
            if (textarea) saveInsightField(field, textarea.value);
            return;
        }

        if (action === 'open-contact-room-background') {
            state._prevContactSettingsTab = state.currentSettingsTab;
            state.currentView = 'contactRoomBackgroundPicker';
            render();
            return;
        }

        if (action === 'open-contact-bubble-theme') {
            state._prevContactSettingsTab = state.currentSettingsTab;
            state.currentView = 'contactBubbleThemePicker';
            render();
            return;
        }

        if (action === 'delete-contact') {
            const c = byId(state.currentContactId);
            if (!c) return;
            const confirmed = window.confirm(`确定删除“${c.name}”吗？\n\n会删除联系人及其陪伴状态。\n会清理相关主动消息。\n聊天记录和记忆不会立即永久删除。`);
            if (!confirmed) return;
            try {
                await deleteContactSafe(c.id);
                cleanupDeletedContactState(c.id);
                state.toast = '联系人已删除';
                render();
                queueLocalSyncIfChanged(120);
                window.setTimeout(() => { state.toast = ''; render(); }, 1400);
            } catch (error) {
                console.warn('[contact] delete failed', error);
                state.toast = '删除失败';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1400);
            }
            return;
        }

        if (action === 'pick-contact-room-background') {
            const value = String(target.dataset.value || '').trim();
            if (!value) return;
            updateContactField('roomBackground', value, '聊天背景已更新');
            state.currentView = 'contactSettings';
            state.currentSettingsTab = 'basic';
            render();
            return;
        }

        if (action === 'pick-contact-bubble-theme') {
            const value = normalizeChatThemeKey(target.dataset.value);
            const c = byId(state.currentContactId);
            if (!c || !value) return;
            c.chatTheme = value;
            c.bubbleTheme = getChatThemeLabel(value);
            c.theme = bubbleThemeToRoomTheme(value);
            state.toast = '气泡主题已更新';
            state.currentView = 'contactSettings';
            state.currentSettingsTab = 'basic';
            render();
            queueLocalSyncIfChanged(120);
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }

        if (action === 'open-companion-state') {
            state._prevContactSettingsTab = state.currentSettingsTab;
            state.currentView = 'companionStateDetail';
            loadCompanionState(state.currentContactId);
            render();
            return;
        }

        if (action === 'expand-actions') {
            state.showAttach = !state.showAttach;
            render();
            return;
        }

        if (action === 'remove-chat-attachment') {
            const id = target.dataset.id;
            state.chatAttachments = (state.chatAttachments || []).filter((item) => item.id !== id);
            render();
            return;
        }

        if (action === 'clear-quote') {
            state.quoteMomentId = null;
            state.quoteMessageId = null;
            render();
        }

        if (action === 'toggle-global') {
            const key = target.dataset.key;
            state.globalSettings[key] = !state.globalSettings[key];
            paintSwitch(target, state.globalSettings[key]);
            saveAiSettings();
            return;
        }

        if (action === 'toggle-contact') {
            const c = byId(state.currentContactId);
            const key = target.dataset.key;
            const body = root()?.querySelector('.chat-app-body');
            const scrollY = body?.scrollTop ?? 0;
            c.settings[key] = !c.settings[key];
            render();
            restoreBodyScroll(scrollY);
        }

        if (action === 'back-home') {
            if (state.currentView === 'list') {
                if (typeof window.closePage === 'function') window.closePage('page-chat');
            } else {
                state.currentTab = 'chats';
                state.currentView = 'list';
                render();
            }
        }

        if (action === 'switch-settings-tab') {
            state.currentSettingsTab = target.dataset.tab;
            state.contactQuickActionEditorId = '';
            state.quickActionSwipeOpenId = '';
            state.quickActionDropHintId = '';
            state.quickActionDropDirection = '';
            state.quickActionReorderPulseId = '';
            if (state.currentSettingsTab !== 'model') {
                state.contactModelAdvancedOpen = false;
                state.contactPersonaExpanded = false;
            }
            render();
            if (state.currentSettingsTab === 'memory') loadCompanionState();
            if (state.currentSettingsTab === 'model') loadAgentPersona(state.currentContactId);
        }

        if (action === 'toggle-contact-advanced') {
            state.contactModelAdvancedOpen = !state.contactModelAdvancedOpen;
            render();
            return;
        }

        if (action === 'toggle-contact-persona') {
            state.contactPersonaExpanded = !state.contactPersonaExpanded;
            render();
            return;
        }

        if (action === 'toggle-codex-mode') {
            toggleCurrentCodexMode(target.dataset.contactId);
            return;
        }

        if (action === 'toggle-cc-mode') {
            toggleCurrentCCMode(target.dataset.contactId);
            return;
        }

        if (action === 'quick-action') {
            const actionId = target.dataset.id;
            const input = root()?.querySelector('.chat-input');
            const mcpAction = getContactQuickActions(getCurrentContact()).find((item) => item.id === actionId);
            const map = {
                health: '\u5e2e\u6211\u8bb0\u4e00\u4e0b\u5065\u5eb7\u76f8\u5173\u7684\u4e8b\u60c5',
                schedule: '\u5e2e\u6211\u770b\u770b\u63a5\u4e0b\u6765\u7684\u65e5\u7a0b',
                weather: '\u5e2e\u6211\u67e5\u4e00\u4e0b\u4eca\u5929\u7684\u5929\u6c14',
                files: '\u5e2e\u6211\u627e\u4e00\u4e0b\u521a\u624d\u63d0\u5230\u7684\u6587\u4ef6',
                quote: '\u5f15\u7528\u4e0a\u4e00\u6761\u6d88\u606f\u7ee7\u7eed\u804a',
                more: '\u6253\u5f00\u66f4\u591a\u5feb\u6377\u64cd\u4f5c',
                get_current_time: '\u73b0\u5728\u51e0\u70b9\u4e86\uff1f',
                get_weather: '\u5e2e\u6211\u67e5\u4e00\u4e0b\u4eca\u5929\u5929\u6c14',
                get_health_summary: '\u5e2e\u6211\u603b\u7ed3\u4e00\u4e0b\u4eca\u5929\u7684\u5065\u5eb7\u6570\u636e',
                web_search: '\u5e2e\u6211\u641c\u7d22\u8fd9\u4e2a\u95ee\u9898',
                fetch_url: '\u5e2e\u6211\u89e3\u6790\u8fd9\u4e2a\u7f51\u9875',
                add_todo: '\u5e2e\u6211\u8bb0\u4e00\u4e2a\u5f85\u529e',
                list_todos: '\u5e2e\u6211\u770b\u770b\u5f85\u529e\u6e05\u5355',
                complete_todo: '\u628a\u8fd9\u4e2a\u5f85\u529e\u6807\u8bb0\u5b8c\u6210',
                add_note: '\u5e2e\u6211\u8bb0\u4e00\u6761\u4fbf\u7b7e',
                list_notes: '\u5e2e\u6211\u770b\u770b\u6700\u8fd1\u4fbf\u7b7e',
            };
            if (input) input.value = mcpAction?.prompt || map[mcpAction?.mcpToolId || actionId] || map[actionId] || `${mcpAction?.label || ''}`.trim();
        }

        if (action === 'fake-send') {
            if (state.streamingAbortController) {
                state.streamingAbortController.abort();
                state.streamingAbortController = null;
                render();
                return;
            }
            if (state.currentView === 'rpRoom') {
                doSendRpMessage();
            } else if (isCCEnabledForContact(byId(state.currentContactId))) {
                doSendCCMessage();
            } else if (isCodexEnabledForContact(byId(state.currentContactId))) {
                doSendCodexMessage();
            } else {
                doSendMessage();
            }
        }

        if (action === 'reroll-msg') {
            doReroll(target.dataset.id);
        }

        if (action === 'quote-msg') {
            const msgId = target.dataset.id;
            const current = byId(state.currentContactId);
            const msg = current?.messages?.find((item) => item.id === msgId);
            if (msg?.text) {
                state.quoteMomentId = null;
                state.quoteMessageId = msgId;
                render();
                const input = root()?.querySelector('.chat-input');
                if (input) input.focus();
            }
        }

        if (action === 'attach-option') {
            state.showAttach = false;
            const label = target.dataset.label || '';
            if (label === '\u56fe\u7247' || label === '\u62cd\u7167') {
                render();
                requestAnimationFrame(() => root()?.querySelector('#chat-image-input')?.click());
                return;
            }
            state.toast = `${label} \u529f\u80fd\u7a0d\u540e\u8865\u4e0a`;
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        }
    }

    function handleInput(event) {
        const target = event.target;
        if (target?.dataset?.action === 'avatar-cropper-range') {
            const crop = state.avatarCropper;
            if (!crop) return;
            const key = target.dataset.key;
            crop[key] = key === 'zoom' ? normalizeCropZoom(target.value) : normalizeCropPercent(target.value);
            updateAvatarCropperPreview();
            return;
        }
        if (target?.id === 'nc-name' || target?.id === 'nc-agent-id' || target?.id === 'nc-bio') {
            state.newContactDraft = {
                ...(state.newContactDraft || {}),
                ...(target.id === 'nc-name' ? { name: target.value || '' } : {}),
                ...(target.id === 'nc-agent-id' ? { agentId: target.value || '' } : {}),
                ...(target.id === 'nc-bio' ? { bio: target.value || '' } : {}),
            };
        }
        if (target.dataset.action === 'slide-contact') {
            const c = byId(state.currentContactId);
            const key = target.dataset.key;
            const num = Number(target.value);
            c.settings[key] = Number.isInteger(c.settings[key]) ? Math.round(num) : num;
            const head = target.closest('.slider-row-block');
            const valueEl = head?.querySelector('.slider-value');
            if (valueEl) {
                valueEl.textContent = Number.isInteger(Number(target.step)) || Number(target.step) >= 1 ? String(Math.round(num)) : num.toFixed(Number(target.step) === 0.01 ? 2 : 1);
            }
        }
        if (target.dataset.action === 'moment-composer-input') {
            state.momentComposerText = target.value || '';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadLocalSnapshot();
        openChatAppDefault();
        pullRemoteSnapshot().finally(async () => {
            await loadContactsFromAllSources();
            startProactivePolling();
            await pollProactiveMessages({ silent: true });
        });
    });

    // 鍚庣閰嶇疆
    const API_BASE = window.__YUI_API_BASE__ || (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? '' : 'https://api.somni-ref.top');
    const LOCAL_STATE_KEY = 'murmur_local_state_v1';
    const SYNC_META_KEY = 'murmur_sync_meta_v1';
    const DEVICE_ID_KEY = 'murmur_device_id_v1';
    const DEFAULT_CONTACT_IDS = new Set(CONTACTS.map((item) => item.id));
    const DEFAULT_MOMENT_IDS = new Set(LEGACY_DEFAULT_MOMENTS.map((item) => item.id));

    let syncPushTimer = null;
    let localPersistTimer = null;
    let syncInFlight = false;
    let syncApplyingRemote = false;
    let proactivePollTimer = null;
    let proactivePollInFlight = false;
    let lastLocalSnapshotHash = '';
    let defaultContactHashes = null;
    let defaultMomentHashes = null;

    function getDeviceId() {
        try {
            const existing = localStorage.getItem(DEVICE_ID_KEY);
            if (existing) return existing;
            const created = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
            localStorage.setItem(DEVICE_ID_KEY, created);
            return created;
        } catch {
            return `dev_fallback_${Date.now()}`;
        }
    }

    function readSyncMeta() {
        try {
            const raw = localStorage.getItem(SYNC_META_KEY);
            const parsed = raw ? JSON.parse(raw) : {};
            return {
                last_server_updated_at: parsed?.last_server_updated_at || '',
                pending: !!parsed?.pending,
            };
        } catch {
            return { last_server_updated_at: '', pending: false };
        }
    }

    function writeSyncMeta(meta = {}) {
        try {
            localStorage.setItem(SYNC_META_KEY, JSON.stringify({
                last_server_updated_at: meta.last_server_updated_at || '',
                pending: !!meta.pending,
            }));
        } catch { }
    }

    function buildSyncPayload() {
        syncConversationsFromContacts();
        if (state.currentRpRoomId && Array.isArray(state.currentRpMessages)) {
            state.rpMessages = {
                ...(state.rpMessages || {}),
                [state.currentRpRoomId]: state.currentRpMessages.map(normalizeStoredMessage),
            };
        }
        return sanitizeSyncPayload({
            contacts: state.contacts,
            moments: state.moments,
            actions: state.actions,
            globalSettings: state.globalSettings,
            accountProfile: state.accountProfile,
            conversations: state.conversations,
            rpRooms: state.rpRooms,
            rpMessages: state.rpMessages,
        });
    }

    function snapshotHash(payload) {
        try {
            return JSON.stringify(payload);
        } catch {
            return '';
        }
    }

    function comparableTime(value) {
        const raw = String(value || '').trim();
        if (!raw) return 0;
        const parsed = Date.parse(raw);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    function messageTextValue(message = {}) {
        return String(
            message.content
            || message.text
            || message.message
            || message.body
            || message.raw_content
            || ''
        ).trim();
    }

    function isRenderableMessage(message = {}) {
        return !!messageTextValue(message) || hasMessageAttachments(message) || !!message.typing || !!message.streaming || !!message.thinking || (Array.isArray(message.toolCalls) && message.toolCalls.length > 0);
    }

    function compactMessageMinute(message = {}) {
        const stamp = comparableTime(message.created_at || message.timestamp);
        if (stamp) return Math.floor(stamp / 60000);
        const raw = String(message.time || '').trim();
        return raw ? raw : '';
    }

    function sameMessageMinute(a = {}, b = {}) {
        const left = compactMessageMinute(a);
        const right = compactMessageMinute(b);
        return !!left && !!right && left === right;
    }

    function isSoftDuplicateMessage(a = {}, b = {}) {
        const left = normalizeStoredMessage(a);
        const right = normalizeStoredMessage(b);
        if (left.role !== right.role) return false;
        if (messageTextValue(left) !== messageTextValue(right)) return false;
        if ((left.session_id || right.session_id) && left.session_id !== right.session_id) return false;
        const at = comparableTime(left.created_at || left.timestamp);
        const bt = comparableTime(right.created_at || right.timestamp);
        if (at && bt) return Math.abs(at - bt) <= 2 * 60 * 1000;
        return sameMessageMinute(left, right);
    }

    function messageMergeKeys(message = {}) {
        const normalized = normalizeStoredMessage(message);
        const keys = new Set();
        if (normalized.id) keys.add(`id:${normalized.id}`);
        if (normalized.client_message_id) keys.add(`client:${normalized.client_message_id}`);
        const content = messageTextValue(normalized);
        if (content) {
            const session = normalized.session_id || normalized.agent_id || '';
            const minute = compactMessageMinute(normalized);
            keys.add(`soft:${session}|${normalized.role}|${minute}|${content}`);
        }
        return keys;
    }

    function upsertMessage(list = [], message = {}) {
        const normalized = contactMessageFromStored(message);
        const keys = messageMergeKeys(normalized);
        let index = list.findIndex((item) => {
            const itemKeys = messageMergeKeys(item);
            return [...keys].some((key) => itemKeys.has(key));
        });
        if (index === -1) index = list.findIndex((item) => isSoftDuplicateMessage(item, normalized));
        if (index === -1) {
            list.push(normalized);
        } else {
            list[index] = contactMessageFromStored({ ...list[index], ...normalized });
        }
        return normalized;
    }

    function normalizeStoredMessage(message = {}) {
        const role = String(message.role || message.from || '').toLowerCase() === 'user' || message.from === 'me' ? 'user' : 'ai';
        const content = messageTextValue(message);
        const createdAt = String(message.created_at || message.timestamp || '');
        const time = String(message.time || '');
        const stableId = [
            String(message.agent_id || ''),
            role,
            createdAt || time,
            content,
        ].join('|');
        return {
            id: String(message.id || stableId || `${role}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`),
            session_id: String(message.session_id || ''),
            agent_id: String(message.agent_id || ''),
            client_message_id: String(message.client_message_id || message.clientMessageId || ''),
            role,
            content,
            text: content,
            created_at: createdAt,
            time,
            ...(message.model ? { model: message.model } : {}),
            ...(message.source ? { source: message.source } : {}),
            ...(message.provider ? { provider: message.provider } : {}),
            ...(message.attachments ? { attachments: message.attachments } : {}),
            ...(message.thinking ? { thinking: message.thinking } : {}),
            ...(message.toolCalls ? { toolCalls: message.toolCalls } : {}),
        };
    }

    function contactMessageFromStored(message = {}) {
        const normalized = normalizeStoredMessage(message);
        return {
            ...normalized,
            text: normalized.content,
            time: normalized.time || (normalized.created_at ? formatDisplayTime(normalized.created_at, { fallback: '' }) : ''),
        };
    }

    function normalizeConversationMap(raw = {}) {
        if (!raw || typeof raw !== 'object') return {};
        return Object.fromEntries(Object.entries(raw).map(([contactId, messages]) => [
            String(contactId),
            Array.isArray(messages) ? mergeMessageLists([], messages) : [],
        ]));
    }

    function mergeMessageLists(localMessages = [], remoteMessages = []) {
        const merged = [];
        const keyToIndex = new Map();
        [...localMessages, ...remoteMessages].forEach((message) => {
            const normalized = normalizeStoredMessage(message);
            if (!isRenderableMessage(normalized)) return;
            const keys = [...messageMergeKeys(normalized)];
            let existingIndex = keys.map((key) => keyToIndex.get(key)).find((index) => index >= 0);
            if (!(existingIndex >= 0)) {
                existingIndex = merged.findIndex((item) => isSoftDuplicateMessage(item, normalized));
            }
            const existing = existingIndex >= 0 ? merged[existingIndex] : null;
            if (!existing || comparableTime(normalized.created_at) >= comparableTime(existing.created_at)) {
                const next = { ...existing, ...normalized };
                const index = existingIndex >= 0 ? existingIndex : merged.length;
                merged[index] = next;
                [...messageMergeKeys(next)].forEach((key) => keyToIndex.set(key, index));
            }
        });
        return merged.filter(Boolean).sort((a, b) => {
            const at = comparableTime(a.created_at);
            const bt = comparableTime(b.created_at);
            if (at || bt) return at - bt;
            return String(a.id).localeCompare(String(b.id));
        });
    }

    function mergeConversationMaps(localMap = {}, remoteMap = {}) {
        const result = normalizeConversationMap(localMap);
        const incoming = normalizeConversationMap(remoteMap);
        Object.entries(incoming).forEach(([contactId, messages]) => {
            result[contactId] = mergeMessageLists(result[contactId] || [], messages);
        });
        return result;
    }

    function syncConversationsFromContacts() {
        const next = normalizeConversationMap(state.conversations);
        (state.contacts || []).forEach((contact) => {
            if (!contact?.id) return;
            const contactMessages = Array.isArray(contact.messages) ? contact.messages : [];
            if (contactMessages.length || next[contact.id]?.length) {
                next[contact.id] = mergeMessageLists(next[contact.id] || [], contactMessages);
                contact.messages = next[contact.id].map(contactMessageFromStored);
            }
        });
        state.conversations = next;
    }

    function hydrateContactsFromConversations() {
        const conversations = normalizeConversationMap(state.conversations);
        state.contacts = (state.contacts || []).map((contact) => {
            const messages = conversations[contact.id] || (Array.isArray(contact.messages) ? contact.messages.map(normalizeStoredMessage) : []);
            const nextMessages = messages.map(contactMessageFromStored);
            const last = nextMessages[nextMessages.length - 1];
            return {
                ...contact,
                messages: nextMessages,
                lastMessage: last?.text || contact.lastMessage || '',
                lastTime: last?.time || contact.lastTime || '',
            };
        });
        state.conversations = conversations;
    }

    function mergeContacts(localContacts = [], remoteContacts = []) {
        const map = new Map();
        localContacts.map(contactDefaults).forEach((contact) => map.set(contact.id.toLowerCase(), contact));
        remoteContacts.map(contactDefaults).forEach((contact) => {
            const key = contact.id.toLowerCase();
            const existing = map.get(key);
            if (!existing) {
                map.set(key, contact);
                return;
            }
            const messages = mergeMessageLists(existing.messages || [], contact.messages || []);
            const merged = {
                ...contact,
                ...existing,
                id: existing.id || contact.id,
                agent_id: existing.agent_id || contact.agent_id || existing.id || contact.id,
                name: existing.name || contact.name,
                display_name: existing.display_name || existing.name || contact.display_name || contact.name,
                bio: existing.bio || contact.bio,
                status: existing.status || contact.status,
                handle: existing.handle || contact.handle,
                roleTag: existing.roleTag || contact.roleTag,
                avatar: existing.avatar || contact.avatar,
                settings: { ...(contact.settings || {}), ...(existing.settings || {}) },
                messages: messages.map(contactMessageFromStored),
                lastMessage: existing.lastMessage || contact.lastMessage || messages[messages.length - 1]?.content || '',
                lastTime: existing.lastTime || contact.lastTime || messages[messages.length - 1]?.time || '',
            };
            map.set(key, merged);
        });
        return [...map.values()];
    }

    function sessionIdFromMessages(messages = []) {
        for (let i = messages.length - 1; i >= 0; i -= 1) {
            const sessionId = String(messages[i]?.session_id || '').trim();
            if (sessionId) return sessionId;
        }
        return '';
    }

    function murmurHistoryMessageToStored(message = {}, contactId = '') {
        const role = String(message.role || '').toLowerCase() === 'user' ? 'user' : 'ai';
        const createdAt = String(message.created_at || '');
        const content = messageTextValue(message);
        const model = String(message.model || '');
        return normalizeStoredMessage({
            id: message.id || `${contactId}|${role}|${createdAt}|${content}`,
            session_id: message.session_id || '',
            agent_id: message.agent_id || contactId,
            role,
            content,
            text: content,
            created_at: createdAt,
            time: createdAt ? formatDisplayTime(createdAt, { fallback: '' }) : '',
            model,
            ...(model.toLowerCase() === 'codex' ? { source: 'codex', provider: 'codex' } : {}),
        });
    }

    async function loadMurmurHistoryForContact(contactId, { silent = true } = {}) {
        const contact = byId(contactId);
        if (!contact?.id) return 0;
        try {
            const agentIds = contactMessageKeys(contact);
            const rawHistory = [];
            console.info('[murmur] history request', { contact_id: contact.id, tried: agentIds });
            for (const agentId of agentIds) {
                const params = new URLSearchParams({ agent_id: agentId, limit: '200' });
                const resp = await fetch(`${API_BASE}/api/murmur/messages?${params.toString()}`);
                if (!resp.ok) {
                    console.warn('[murmur] history fetch failed', { agent_id: agentId, status: resp.status });
                    continue;
                }
                const data = await resp.json().catch(() => ({}));
                const rows = Array.isArray(data?.messages) ? data.messages : [];
                rawHistory.push(...rows);
            }
            const history = mergeMessageLists([], rawHistory
                .map((message) => murmurHistoryMessageToStored(message, contact.id))
                .filter(isRenderableMessage));
            console.info('[murmur] history loaded', {
                agent_id: contact.id,
                tried: agentIds,
                raw: rawHistory.length,
                renderable: history.length,
                first: history[0] || null,
            });
            if (!history.length) return 0;

            const beforeHash = snapshotHash({ conversations: conversationMessagesForContact(contact) });
            const merged = mergeMessageLists(conversationMessagesForContact(contact), history);
            state.conversations = { ...(state.conversations || {}), [contact.id]: merged };
            contact.messages = merged.map(contactMessageFromStored);
            const last = contact.messages[contact.messages.length - 1];
            if (last) {
                contact.lastMessage = last.text || '';
                contact.lastTime = last.time || '';
            }
            const sessionId = sessionIdFromMessages(merged);
            if (sessionId) contact.sessionId = sessionId;
            if (snapshotHash({ conversations: merged }) !== beforeHash) {
                persistLocalSnapshot();
                scheduleSyncPush(300);
            }
            if (state.currentContactId === contact.id && state.currentView === 'room') render();
            return history.length;
        } catch (error) {
            console.error('[murmur] history load failed', error);
            return 0;
        }
    }

    function proactiveMessageToStored(message = {}) {
        const agentId = String(message.agent_id || message.agentId || '').trim();
        const content = String(message.content || '').trim();
        const createdAt = String(message.created_at || message.createdAt || new Date().toISOString());
        return normalizeStoredMessage({
            id: message.id ? `proactive_${message.id}` : `proactive_${agentId}_${createdAt}_${content}`,
            agent_id: agentId,
            role: 'ai',
            content,
            created_at: createdAt,
            source: 'proactive',
        });
    }

    async function markProactiveRead(messageId) {
        const id = String(messageId || '').trim();
        if (!id) return;
        try {
            await fetch(`${API_BASE}/api/proactive/${encodeURIComponent(id)}/read`, { method: 'POST' });
        } catch (error) {
            console.warn('[proactive] mark read failed', error);
        }
    }

    async function pollProactiveMessages({ silent = true } = {}) {
        if (proactivePollInFlight) return;
        proactivePollInFlight = true;
        try {
            const resp = await fetch(`${API_BASE}/api/proactive?limit=20`);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json().catch(() => ({}));
            const messages = Array.isArray(data?.messages) ? data.messages : [];
            if (!messages.length) return;

            let changed = false;
            for (const item of messages) {
                const stored = proactiveMessageToStored(item);
                const agentId = stored.agent_id || String(item.agent_id || '').trim();
                if (!agentId || !stored.content) {
                    await markProactiveRead(item.id);
                    continue;
                }

                let contact = byId(agentId);
                if (!contact) {
                    contact = mergeContact({
                        id: agentId,
                        agent_id: agentId,
                        name: String(item.agent_name || item.display_name || agentId),
                        handle: `@${agentId}`,
                        messages: [],
                    });
                }

                const beforeCount = (state.conversations?.[contact.id] || contact.messages || []).length;
                const merged = mergeMessageLists(state.conversations?.[contact.id] || contact.messages || [], [stored]);
                state.conversations = { ...(state.conversations || {}), [contact.id]: merged };
                contact.messages = merged.map(contactMessageFromStored);
                const last = contact.messages[contact.messages.length - 1];
                if (last) {
                    contact.lastMessage = last.text || '';
                    contact.lastTime = last.time || '';
                }
                if (merged.length > beforeCount && !(state.currentView === 'room' && state.currentContactId === contact.id)) {
                    contact.unread = Number(contact.unread || 0) + 1;
                }
                changed = true;
                await markProactiveRead(item.id);
            }

            if (changed) {
                hydrateContactsFromConversations();
                persistLocalSnapshot();
                render();
                if (state.currentView === 'room') scrollToBottom();
            }
        } catch (error) {
            if (!silent) console.warn('[proactive] poll failed', error);
        } finally {
            proactivePollInFlight = false;
        }
    }

    function startProactivePolling() {
        if (proactivePollTimer) return;
        proactivePollTimer = window.setInterval(() => {
            pollProactiveMessages({ silent: true });
        }, 15000);
    }

    function mergeMoments(localMoments = [], remoteMoments = []) {
        const map = new Map();
        localMoments.map(normalizeMoment).forEach((moment) => map.set(moment.id, moment));
        remoteMoments.map(normalizeMoment).forEach((moment) => {
            const existing = map.get(moment.id);
            if (!existing) {
                map.set(moment.id, moment);
                return;
            }
            const remoteTime = comparableTime(moment.updated_at || moment.created_at || moment.time);
            const localTime = comparableTime(existing.updated_at || existing.created_at || existing.time);
            map.set(moment.id, remoteTime > localTime ? { ...existing, ...moment } : { ...moment, ...existing });
        });
        return [...map.values()].sort((a, b) => comparableTime(b.updated_at || b.created_at || b.time) - comparableTime(a.updated_at || a.created_at || a.time));
    }

    function mergeById(localItems = [], remoteItems = [], idKey = 'id') {
        const map = new Map();
        [...(localItems || []), ...(remoteItems || [])].forEach((item) => {
            if (!item || typeof item !== 'object') return;
            const id = String(item[idKey] || item.id || '').trim();
            if (!id) return;
            map.set(id, { ...(map.get(id) || {}), ...item });
        });
        return [...map.values()];
    }

    const DEFAULT_ACCOUNT_AVATAR = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80';

    function isDefaultAccountAvatar(value) {
        return !value || String(value) === DEFAULT_ACCOUNT_AVATAR;
    }

    function mergeAccountProfile(localProfile = {}, remoteProfile = {}) {
        const merged = { ...(localProfile || {}), ...(remoteProfile || {}) };
        if (!isDefaultAccountAvatar(localProfile?.avatar) && isDefaultAccountAvatar(remoteProfile?.avatar)) {
            merged.avatar = localProfile.avatar;
        }
        return merged;
    }

    function persistLocalSnapshot() {
        const payload = buildSyncPayload();
        const hash = snapshotHash(payload);
        if (!hash || hash === lastLocalSnapshotHash) return false;
        lastLocalSnapshotHash = hash;
        try {
            localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify({
                client_updated_at: new Date().toISOString(),
                payload,
            }));
            return true;
        } catch {
            return false;
        }
    }

    function getDefaultContactHashes() {
        if (!defaultContactHashes) {
            defaultContactHashes = new Map(CONTACTS.map((item) => {
                const normalized = contactDefaults(item);
                return [normalized.id, snapshotHash(normalized)];
            }));
        }
        return defaultContactHashes;
    }

    function getDefaultMomentHashes() {
        if (!defaultMomentHashes) {
            defaultMomentHashes = new Map(LEGACY_DEFAULT_MOMENTS.map((item) => {
                const normalized = normalizeMoment(item);
                return [normalized.id, snapshotHash(normalized)];
            }));
        }
        return defaultMomentHashes;
    }

    function contactsHaveRealData(contacts) {
        if (!Array.isArray(contacts)) return false;
        const defaults = getDefaultContactHashes();
        return contacts.some((item) => {
            const normalized = contactDefaults(item);
            return !DEFAULT_CONTACT_IDS.has(normalized.id) || defaults.get(normalized.id) !== snapshotHash(normalized);
        });
    }

    function isDefaultMockContact(contact) {
        if (!contact || typeof contact !== 'object') return false;
        const id = String(contact.id || contact.agent_id || '').trim().toLowerCase();
        if (!DEFAULT_CONTACT_IDS.has(id)) return false;
        const defaults = getDefaultContactHashes();
        const normalized = contactDefaults({ ...contact, id });
        if (defaults.get(id) === snapshotHash(normalized)) return true;

        const avatar = String(contact.avatar || '').trim();
        const topicIds = Array.isArray(contact.topics) ? contact.topics.map((item) => String(item?.id || '')) : [];
        const messageIds = Array.isArray(contact.messages) ? contact.messages.map((item) => String(item?.id || '')) : [];
        if (id === 'ayan') return avatar.includes('photo-1517841905240-472988babdf9') || messageIds.some((msgId) => ['m1', 'm2', 'm3'].includes(msgId)) || topicIds.some((topicId) => ['t1', 't2', 't3'].includes(topicId));
        if (id === 'azheng') return avatar.includes('photo-1500530855697-b586d89ba3ee') || messageIds.includes('m4') || topicIds.some((topicId) => ['t4', 't5'].includes(topicId));
        if (id === 'xiaoying') return avatar.includes('photo-1507525428034-b723cf961d3e') || messageIds.includes('m5') || topicIds.includes('t6');
        return false;
    }

    function filterDefaultMockContacts(contacts) {
        if (!Array.isArray(contacts)) return [];
        return contacts.filter((contact) => !isDefaultMockContact(contact));
    }

    function isDefaultMockContacts(contacts) {
        return Array.isArray(contacts) && contacts.length > 0 && contacts.every((contact) => isDefaultMockContact(contact));
    }

    function sanitizeSyncPayload(payload = {}) {
        if (!payload || typeof payload !== 'object') return {};
        const next = { ...payload };
        if (Array.isArray(next.contacts)) {
            next.contacts = filterDefaultMockContacts(next.contacts).map((contact) => contactDefaults(contact));
        }
        if (next.conversations && typeof next.conversations === 'object') {
            next.conversations = normalizeConversationMap(next.conversations);
        }
        if (next.rpMessages && typeof next.rpMessages === 'object') {
            next.rpMessages = normalizeConversationMap(next.rpMessages);
        }
        if (Array.isArray(next.moments)) {
            next.moments = filterDefaultMockMoments(next.moments).map(normalizeMoment);
        }
        return next;
    }

    function momentsHaveRealData(moments) {
        if (!Array.isArray(moments)) return false;
        const defaults = getDefaultMomentHashes();
        return moments.some((item) => {
            const normalized = normalizeMoment(item);
            return !DEFAULT_MOMENT_IDS.has(normalized.id) || defaults.get(normalized.id) !== snapshotHash(normalized);
        });
    }

    function isDefaultMockMoment(moment) {
        if (!moment || typeof moment !== 'object') return false;
        const id = String(moment.id || '').trim();
        if (!DEFAULT_MOMENT_IDS.has(id)) return false;
        const defaults = getDefaultMomentHashes();
        const normalized = normalizeMoment(moment);
        if (defaults.get(id) === snapshotHash(normalized)) return true;
        if (id === 'p0') return String(moment.image || '').includes('photo-1507525428034-b723cf961d3e') || String(moment.content || '').includes('天空很温柔');
        if (id === 'p1') return String(moment.content || '').includes('醉了先看这个');
        if (id === 'p2') return String(moment.content || '').includes('晚上跑了三公里');
        return false;
    }

    function filterDefaultMockMoments(moments) {
        if (!Array.isArray(moments)) return [];
        return moments.filter((moment) => !isDefaultMockMoment(moment));
    }

    function isDefaultMockMoments(moments) {
        return Array.isArray(moments) && moments.length > 0 && moments.every((moment) => isDefaultMockMoment(moment));
    }

    function applyLocalPayload(payload, { source = 'local' } = {}) {
        if (!payload || typeof payload !== 'object') return;
        if (Array.isArray(payload.contacts)) {
            const rawContacts = payload.contacts.map((contact) => contactDefaults(contact));
            const nextContacts = filterDefaultMockContacts(rawContacts).map((contact) => contactDefaults(contact));
            const currentHasRealContacts = contactsHaveRealData(state.contacts);
            if (nextContacts.length) {
                state.contacts = mergeContacts(state.contacts, nextContacts);
                if (!byId(state.currentContactId)) state.currentContactId = state.contacts[0]?.id || '';
            } else if (isDefaultMockContacts(rawContacts)) {
                if (!currentHasRealContacts) state.contacts = [];
                if (!byId(state.currentContactId)) state.currentContactId = state.contacts[0]?.id || '';
                console.warn(`[sync] ignored ${source} default mock contacts`);
            } else if (!currentHasRealContacts) {
                state.contacts = [];
                state.currentContactId = '';
            } else {
                state.contacts = state.contacts.map((contact) => contactDefaults(contact));
            }
        } else {
            state.contacts = state.contacts.map((contact) => contactDefaults(contact));
        }
        if (payload.conversations && typeof payload.conversations === 'object') {
            state.conversations = mergeConversationMaps(state.conversations, payload.conversations);
            hydrateContactsFromConversations();
        } else {
            syncConversationsFromContacts();
        }
        if (Array.isArray(payload.moments)) {
            const rawMoments = payload.moments.map(normalizeMoment);
            const nextMoments = filterDefaultMockMoments(rawMoments).map(normalizeMoment);
            const currentHasRealMoments = momentsHaveRealData(state.moments);
            if (nextMoments.length) {
                state.moments = mergeMoments(filterDefaultMockMoments(state.moments), nextMoments);
            } else if (isDefaultMockMoments(rawMoments)) {
                if (!currentHasRealMoments) state.moments = [];
                console.warn(`[sync] ignored ${source} default mock moments`);
            } else if (!currentHasRealMoments) {
                state.moments = [];
            } else {
                state.moments = filterDefaultMockMoments(state.moments).map(normalizeMoment);
            }
        }
        if (Array.isArray(payload.rpRooms)) state.rpRooms = mergeById(state.rpRooms || [], payload.rpRooms || [], 'room_id');
        if (payload.rpMessages && typeof payload.rpMessages === 'object') state.rpMessages = mergeConversationMaps(state.rpMessages, payload.rpMessages);
        if (Array.isArray(payload.actions)) state.actions = payload.actions;
        if (payload.globalSettings && typeof payload.globalSettings === 'object') {
            state.globalSettings = { ...state.globalSettings, ...payload.globalSettings };
        }
        if (payload.accountProfile && typeof payload.accountProfile === 'object') {
            state.accountProfile = mergeAccountProfile(state.accountProfile, payload.accountProfile);
        }
        ensureAiSettings();
        syncLegacyAiSettings();
    }

    function loadLocalSnapshot() {
        try {
            const raw = localStorage.getItem(LOCAL_STATE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!parsed?.payload) return;
            applyLocalPayload(parsed.payload, { source: 'local' });
            const sanitizedPayload = sanitizeSyncPayload(parsed.payload);
            lastLocalSnapshotHash = snapshotHash(sanitizedPayload);
            if (snapshotHash(parsed.payload) !== lastLocalSnapshotHash) {
                localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify({
                    client_updated_at: parsed.client_updated_at || new Date().toISOString(),
                    payload: sanitizedPayload,
                }));
            }
        } catch { }
    }

    function scheduleSyncPush(delay = 600) {
        if (syncApplyingRemote) return;
        const meta = readSyncMeta();
        writeSyncMeta({ ...meta, pending: true });
        if (syncPushTimer) clearTimeout(syncPushTimer);
        syncPushTimer = window.setTimeout(() => {
            flushSyncPush();
        }, delay);
    }

    async function flushSyncPush() {
        if (syncInFlight || syncApplyingRemote) return;
        const meta = readSyncMeta();
        if (!meta.pending) return;

        let snapshot = null;
        try {
            snapshot = JSON.parse(localStorage.getItem(LOCAL_STATE_KEY) || 'null');
        } catch { }
        if (!snapshot?.payload) {
            writeSyncMeta({ ...meta, pending: false });
            return;
        }
        const payload = sanitizeSyncPayload(snapshot.payload);

        syncInFlight = true;
        try {
            const resp = await fetch(`${API_BASE}/api/sync/push`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    device_id: getDeviceId(),
                    client_updated_at: snapshot.client_updated_at || new Date().toISOString(),
                    payload,
                }),
            });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json().catch(() => ({}));
            writeSyncMeta({
                last_server_updated_at: data.server_updated_at || meta.last_server_updated_at || '',
                pending: false,
            });
        } catch (error) {
            console.warn('[sync] push failed', error);
            writeSyncMeta({ ...meta, pending: true });
        } finally {
            syncInFlight = false;
        }
    }

    async function pullRemoteSnapshot() {
        if (syncInFlight) return;
        const meta = readSyncMeta();
        if (meta.pending) {
            await flushSyncPush();
            if (readSyncMeta().pending) return;
        }
        const params = new URLSearchParams({ device_id: getDeviceId() });
        if (meta.last_server_updated_at) params.set('since', meta.last_server_updated_at);

        try {
            const resp = await fetch(`${API_BASE}/api/sync/pull?${params.toString()}`);
            if (!resp.ok) return;
            const data = await resp.json().catch(() => ({}));
            // Skip if no update, OR if this device pushed the data AND we already have real local contacts
            // (if local contacts are gone, apply even for is_self so data is recovered)
            const hasLocalContacts = contactsHaveRealData(state.contacts);
            if (!data?.has_update || !data?.payload || (data?.is_self && hasLocalContacts)) {
                if (data?.server_updated_at) {
                    writeSyncMeta({ ...meta, last_server_updated_at: data.server_updated_at, pending: meta.pending });
                }
                return;
            }

            syncApplyingRemote = true;
            applyLocalPayload(data.payload, { source: 'remote' });
            persistLocalSnapshot();
            writeSyncMeta({
                last_server_updated_at: data.server_updated_at || meta.last_server_updated_at || '',
                pending: false,
            });
            render();
        } catch (error) {
            console.warn('[sync] pull failed', error);
        } finally {
            syncApplyingRemote = false;
        }
    }

    function agentToContact(agent = {}) {
        const id = normalizeNewContactAgentId(agent.agent_id || agent.id);
        if (!id) return null;
        const name = String(agent.display_name || agent.name || id).trim() || id;
        return contactDefaults({
            id,
            agent_id: id,
            name,
            display_name: name,
            bio: String(agent.description || agent.subtitle || '').trim(),
            status: '\u5728\u7ebf',
            handle: String(agent.display_handle || `@${id}`),
            roleTag: String(agent.source || 'agent'),
            avatar: String(agent.avatar || '').trim(),
            pinned: false,
            unread: 0,
            lastMessage: '',
            lastTime: '',
            topics: [],
            messages: [],
        });
    }

    function messageAgentToContact(agent = {}) {
        const id = normalizeNewContactAgentId(agent.agent_id || agent.id);
        if (!id) return null;
        const defaultContact = CONTACTS.find((item) => String(item.id || '').toLowerCase() === id);
        const lastMessageAt = String(agent.last_message_at || '');
        const lastMessage = String(agent.last_message || '').trim();
        return contactDefaults({
            id,
            agent_id: id,
            name: String(defaultContact?.name || agent.display_name || agent.name || id).trim() || id,
            display_name: String(defaultContact?.name || agent.display_name || agent.name || id).trim() || id,
            bio: '',
            status: '在线',
            handle: `@${id}`,
            roleTag: 'recovered',
            avatar: '',
            pinned: false,
            unread: 0,
            lastMessage,
            lastTime: lastMessageAt ? formatDisplayTime(lastMessageAt, { fallback: '' }) : '',
            sessionId: String(agent.session_id || ''),
            recoveredFromMessages: true,
            messageCount: Number(agent.message_count || 0) || 0,
            topics: [],
            messages: [],
        });
    }

    async function loadContactsFromAgents({ silent = true } = {}) {
        try {
            const resp = await fetch(`${API_BASE}/api/agents?include_inactive=true`);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json().catch(() => ({}));
            const contacts = (Array.isArray(data?.agents) ? data.agents : [])
                .filter((agent) => agent?.is_active !== false)
                .map(agentToContact)
                .filter(Boolean)
                .filter((contact) => !isDefaultMockContact(contact));
            console.info('[agents] loaded', contacts.map((contact) => ({
                id: contact.id,
                name: contact.name,
                source: contact.roleTag || '',
            })));
            if (!contacts.length) return;
            const beforeHash = snapshotHash({ contacts: state.contacts });
            state.contacts = mergeContacts(state.contacts, contacts);
            hydrateContactsFromConversations();
            if (!state.currentContactId || !state.contacts.some((contact) => contact.id === state.currentContactId)) {
                state.currentContactId = state.contacts[0]?.id || '';
            }
            if (snapshotHash({ contacts: state.contacts }) !== beforeHash) {
                persistLocalSnapshot();
                scheduleSyncPush(100);
            }
            void hydrateVisibleContactHistories(contacts);
            render();
        } catch (error) {
            if (!silent) console.warn('[agents] load contacts failed', error);
        }
    }

    async function loadContactsFromMessageAgents({ silent = true } = {}) {
        try {
            const resp = await fetch(`${API_BASE}/api/murmur/message-agents?limit=1000`);
            if (resp.status === 404) {
                await loadContactsFromMessageHistoryProbe({ silent });
                return;
            }
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json().catch(() => ({}));
            const contacts = (Array.isArray(data?.agents) ? data.agents : [])
                .map(messageAgentToContact)
                .filter(Boolean);
            console.info('[murmur] message agents loaded', contacts.map((contact) => ({
                id: contact.id,
                lastMessage: contact.lastMessage,
                count: contact.messageCount || 0,
            })));
            if (!contacts.length) return;
            const beforeHash = snapshotHash({ contacts: state.contacts });
            state.contacts = mergeContacts(state.contacts, contacts);
            hydrateContactsFromConversations();
            if (!state.currentContactId || !state.contacts.some((contact) => contact.id === state.currentContactId)) {
                state.currentContactId = state.contacts[0]?.id || '';
            }
            if (snapshotHash({ contacts: state.contacts }) !== beforeHash) {
                persistLocalSnapshot();
                scheduleSyncPush(100);
            }
            void hydrateVisibleContactHistories(contacts);
            render();
        } catch (error) {
            if (!silent) console.warn('[murmur] load message agents failed', error);
        }
    }

    async function loadContactsFromMessageHistoryProbe({ silent = true } = {}) {
        const probeIds = Array.from(new Set([
            ...CONTACTS.map((contact) => normalizeNewContactAgentId(contact.id)).filter(Boolean),
            ...state.contacts.map((contact) => normalizeNewContactAgentId(contact.id)).filter(Boolean),
        ]));
        const recovered = [];
        for (const agentId of probeIds) {
            if (!agentId) continue;
            try {
                const params = new URLSearchParams({ agent_id: agentId, limit: '1' });
                const resp = await fetch(`${API_BASE}/api/murmur/messages?${params.toString()}`);
                if (!resp.ok) continue;
                const data = await resp.json().catch(() => ({}));
                const messages = Array.isArray(data?.messages) ? data.messages : [];
                if (!messages.length) continue;
                const last = messages[messages.length - 1] || {};
                recovered.push(messageAgentToContact({
                    agent_id: agentId,
                    last_message: last.content || '',
                    last_message_at: last.created_at || '',
                    message_count: messages.length,
                    session_id: last.session_id || '',
                }));
            } catch (error) {
                if (!silent) console.warn('[murmur] message probe failed', agentId, error);
            }
        }
        const contacts = recovered.filter(Boolean);
        console.info('[murmur] message agents probed', contacts.map((contact) => ({
            id: contact.id,
            lastMessage: contact.lastMessage,
            count: contact.messageCount || 0,
        })));
        if (!contacts.length) return;
        const beforeHash = snapshotHash({ contacts: state.contacts });
        state.contacts = mergeContacts(state.contacts, contacts);
        hydrateContactsFromConversations();
        if (!state.currentContactId || !state.contacts.some((contact) => contact.id === state.currentContactId)) {
            state.currentContactId = state.contacts[0]?.id || '';
        }
        if (snapshotHash({ contacts: state.contacts }) !== beforeHash) {
            persistLocalSnapshot();
            scheduleSyncPush(100);
        }
        void hydrateVisibleContactHistories(contacts);
        render();
    }

    async function loadContactsFromAllSources() {
        await loadContactsFromAgents();
        await loadContactsFromMessageAgents();
        await hydrateVisibleContactHistories(state.contacts);
        scheduleCurrentRoomHistoryHydration(120);
    }

    async function hydrateVisibleContactHistories(contacts = []) {
        const ids = [...new Set((contacts || []).map((contact) => contact?.id).filter(Boolean))];
        for (const id of ids) {
            if (state.historyLoadingContactIds[id] || state.historyLoadedContactIds[id]) continue;
            state.historyLoadingContactIds[id] = true;
            try {
                const count = await loadMurmurHistoryForContact(id);
                if (count) state.historyLoadedContactIds[id] = true;
            } finally {
                delete state.historyLoadingContactIds[id];
            }
        }
    }

    function queueLocalSyncIfChanged(delay = 800) {
        if (syncApplyingRemote) return;
        if (localPersistTimer) clearTimeout(localPersistTimer);
        localPersistTimer = window.setTimeout(() => {
            const changed = persistLocalSnapshot();
            if (changed) scheduleSyncPush(500);
        }, delay);
    }

    function nowTimeStr() {
        const d = new Date();
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }

    function buildChatProviderOverride(contact) {
        const providerId = contact?.settings?.modelProviderId || getSlot('chat')?.providerId || '';
        const provider = getProviderById(providerId);
        if (!provider?.baseUrl || !provider?.apiKey) return {};
        const explicitApiPath = normalizeProviderApiPath(provider.apiPath || provider.api_path || '', { allowEmpty: true });
        return {
            base_url: provider.baseUrl,
            api_key: provider.apiKey,
            ...(explicitApiPath ? { api_path: explicitApiPath } : {}),
        };
    }

    function buildChatTuning(contact) {
        const settings = contact?.settings || {};
        const temperature = Number(settings.temperature);
        return Number.isFinite(temperature) ? { temperature } : {};
    }

    function parseChatSsePayload(payload, eventType = '') {
        let text = '';
        let thinking = '';
        try {
            const obj = JSON.parse(payload);
            const isThinkingEvent = /^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(eventType);
            const isChatEvent    = /^(chat|message|content|text|assistant|reply|response|output)$/i.test(eventType);
            if (isThinkingEvent) {
                thinking = obj.thinking ?? obj.reasoning ?? obj.reasoning_content ?? obj.reasoningContent ?? obj.content ?? obj.text ?? obj.delta ?? '';
            } else if (isChatEvent) {
                // event type says this is regular reply 鈥?only take content/delta/text
                text    = obj.content ?? obj.text ?? obj.delta ?? '';
                // still allow explicit thinking fields inside a chat event
                thinking = obj.thinking ?? obj.reasoning ?? obj.reasoning_content ?? obj.reasoningContent ?? '';
            } else {
                // no event type: fall back to field-name heuristic
                text    = obj.content ?? obj.text ?? obj.delta ?? '';
                thinking = obj.thinking ?? obj.reasoning ?? obj.reasoning_content ?? obj.reasoningContent ?? '';
            }
        } catch {
            if (/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(eventType)) {
                thinking = payload;
            } else {
                text = payload;
            }
        }
        const isToolCallEvent = /^tool_call$/i.test(eventType);
        let toolCall = null;
        if (isToolCallEvent) {
            try {
                const obj2 = JSON.parse(payload);
                if (obj2.name) toolCall = { name: String(obj2.name), status: String(obj2.status || 'done') };
            } catch { /* ignore */ }
        }
        return {
            text: coerceSseText(text),
            thinking: coerceSseText(thinking),
            toolCall,
        };
    }

    async function ensureContactSession(contact) {
        const existingId = String(contact?.sessionId || '').trim();
        if (existingId) {
            try {
                const existingResp = await fetch(`${API_BASE}/api/sessions/${encodeURIComponent(existingId)}`);
                if (existingResp.ok) return existingId;
                if (existingResp.status !== 404) {
                    throw new Error(`校验会话失败（HTTP ${existingResp.status}）`);
                }
            } catch (err) {
                if (!String(err?.message || '').includes('HTTP')) {
                    throw err;
                }
                throw err;
            }
            contact.sessionId = '';
        }

        const resp = await fetch(`${API_BASE}/api/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: String(contact?.name || '新对话').trim() || '新对话',
                model: String(contact?.settings?.model || state.globalSettings?.defaultModel || 'echo').trim() || 'echo',
                source_app: 'yui_nook',
            }),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
            throw new Error(data.detail || `创建会话失败（HTTP ${resp.status}）`);
        }

        const sessionId = String(data?.session?.id || '').trim();
        if (!sessionId) {
            throw new Error('创建会话失败：后端没有返回 session.id');
        }

        contact.sessionId = sessionId;
        queueLocalSyncIfChanged(120);
        return sessionId;
    }

    async function requestChatStream(contact, body, signal, endpoint = '/api/chat') {
        let resp = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
            body: JSON.stringify(body),
            ...(signal ? { signal } : {}),
        });

        if (resp.ok) return resp;

        let detail = '';
        try {
            const data = await resp.json();
            detail = String(data?.detail || '').trim();
        } catch {}

        if (endpoint === '/api/chat' && resp.status === 404 && detail.includes('会话不存在')) {
            contact.sessionId = '';
            const nextSessionId = await ensureContactSession(contact);
            body.session_id = nextSessionId;
            resp = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
                body: JSON.stringify(body),
                ...(signal ? { signal } : {}),
            });
            if (resp.ok) return resp;
        }

        throw new Error(`HTTP ${resp.status}`);
    }

    async function doSendRpMessage() {
        const input = root()?.querySelector('.chat-input');
        const text = input?.value?.trim();
        if (!text || !state.currentRpRoomId) return;
        const c = byId(state.currentContactId) || state.contacts[0];
        const room = getCurrentRpRoom();
        if (!c || !room) return;
        const allowReasoning = !!c?.settings?.reasoning_visibility;

        const userId = `rp_u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        upsertMessage(state.currentRpMessages, { id: userId, client_message_id: userId, role: 'user', text, content: text, time: nowTimeStr(), timestamp: new Date().toISOString(), created_at: new Date().toISOString() });
        input.value = '';
        const aiId = 'rp_ai_' + Date.now();
        state.currentRpMessages.push({ id: aiId, role: 'ai', text: '', content: '', time: '', created_at: new Date().toISOString(), typing: true });
        if (state.currentRpRoomId) state.rpMessages[state.currentRpRoomId] = state.currentRpMessages.map(normalizeStoredMessage);
        queueLocalSyncIfChanged(120);
        render();
        scrollToBottom();

        const body = {
            room_id: state.currentRpRoomId,
            agent_id: room.agent_id || c.id,
            content: text,
            client_message_id: userId,
            ...(c.persona ? { persona: c.persona } : {}),
            ...(c.settings.model ? { model: c.settings.model } : {}),
            ...buildChatTuning(c),
            ...buildChatProviderOverride(c),
        };

        const abortCtrl = new AbortController();
        state.streamingAbortController = abortCtrl;
        render();
        let fullText = '';

        try {
            const resp = await requestChatStream(c, body, abortCtrl.signal, '/api/rp/chat');
            const aiIdx = () => state.currentRpMessages.findIndex((m) => m.id === aiId);
            state.currentRpMessages[aiIdx()] = { id: aiId, role: 'ai', text: '', time: nowTimeStr(), typing: false, streaming: true };
            render();

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullThinking = '';
            let currentEventType = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const parts = buffer.split('\n');
                buffer = parts.pop() ?? '';
                for (const line of parts) {
                    const trimmed = line.trim();
                    if (!trimmed) { currentEventType = ''; continue; }
                    if (trimmed.startsWith('event:')) { currentEventType = trimmed.slice(6).trim(); continue; }
                    if (!trimmed.startsWith('data:')) continue;
                    const payload = trimmed.slice(5).trim();
                    if (payload === '[DONE]') continue;
                    const parsed = parseChatSsePayload(payload, currentEventType);
                    let chunk = parsed.text;
                    const normalizedThinkingChunk = normalizeThinkingChunk(parsed.thinking, fullText, fullThinking);
                    const thinkingChunk = allowReasoning ? normalizedThinkingChunk : '';
                    if (thinkingChunk && fullThinking.length < THINKING_MAX_ACCUMULATE) {
                        fullThinking = appendThinkingChunk(fullThinking, thinkingChunk);
                    }
                    if (chunk) fullText += chunk;
                    const idx = aiIdx();
                    if (idx !== -1) {
                        state.currentRpMessages[idx] = {
                            id: aiId,
                            role: 'ai',
                            text: fullText,
                            content: fullText,
                            ...(allowReasoning && fullThinking ? { thinking: fullThinking } : {}),
                            time: nowTimeStr(),
                            typing: false,
                            streaming: true,
                        };
                        render();
                        scrollToBottom();
                    }
                }
            }

            const idx = state.currentRpMessages.findIndex((m) => m.id === aiId);
            if (idx !== -1 && fullText.trim()) {
                state.currentRpMessages[idx] = {
                    ...state.currentRpMessages[idx],
                    text: fullText,
                    content: fullText,
                    ...(allowReasoning && fullThinking ? { thinking: fullThinking } : {}),
                    streaming: false,
                    typing: false,
                    time: nowTimeStr(),
                    created_at: new Date().toISOString(),
                };
            } else if (idx !== -1) {
                state.currentRpMessages.splice(idx, 1);
            }
            state.streamingAbortController = null;
            await loadRpRooms(room.agent_id || c.id, { silent: true });
            if (state.currentRpRoomId) state.rpMessages[state.currentRpRoomId] = state.currentRpMessages.map(normalizeStoredMessage);
            queueLocalSyncIfChanged(120);
            render();
            scrollToBottom();
        } catch (err) {
            const wasAborted = err.name === 'AbortError';
            const idx = state.currentRpMessages.findIndex((m) => m.id === aiId);
            if (idx !== -1) {
                if (wasAborted && !fullText.trim()) {
                    state.currentRpMessages.splice(idx, 1);
                } else {
                    state.currentRpMessages[idx] = {
                    id: aiId,
                    role: 'ai',
                    text: err.name === 'AbortError' ? fullText : `连接失败：${err.message}`,
                    content: err.name === 'AbortError' ? fullText : `连接失败：${err.message}`,
                    time: nowTimeStr(),
                    created_at: new Date().toISOString(),
                    typing: false,
                };
                }
            }
            state.streamingAbortController = null;
            if (state.currentRpRoomId) state.rpMessages[state.currentRpRoomId] = state.currentRpMessages.map(normalizeStoredMessage);
            queueLocalSyncIfChanged(120);
            render();
        }
    }

    function toggleCurrentCCMode(contactId = state.currentContactId) {
        const c = byId(contactId) || byId(state.currentContactId);
        if (!c) return;
        state.currentContactId = c.id;
        if (!canToggleCCForContact(c)) {
            c.settings = { ...(c.settings || {}), ccEnabled: false };
            state.toast = '只有阿筝能切 Claude Code';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }
        c.settings = { ...(c.settings || {}), ccEnabled: !c.settings?.ccEnabled };
        state.toast = c.settings.ccEnabled ? 'Claude Code 已接管这个窗口' : 'Claude Code 已关闭';
        queueLocalSyncIfChanged(120);
        render();
        window.setTimeout(() => { state.toast = ''; render(); }, 1200);
    }

    async function doSendCCMessage() {
        const input = root()?.querySelector('.chat-input');
        const rawText = input?.value?.trim() || '';
        const attachments = (state.chatAttachments || []).map(serializeChatAttachment).filter(Boolean);
        if (!rawText && !attachments.length) return;
        const text = attachmentRequestText(rawText, attachments);
        const c = byId(state.currentContactId);
        if (!c) return;
        cancelAssistantPlayback();

        const msgId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        upsertMessage(c.messages, { id: msgId, client_message_id: msgId, role: 'user', text: rawText, content: rawText, attachments, time: nowTimeStr(), created_at: new Date().toISOString() });
        c.lastMessage = attachmentLastMessage(rawText, attachments);
        c.lastTime = '刚刚';
        input.value = '';
        state.chatAttachments = [];

        const aiId = 'ai_' + Date.now();
        c.messages.push({
            id: aiId,
            role: 'ai',
            text: '',
            content: '',
            time: '',
            created_at: new Date().toISOString(),
            typing: true,
            source: 'claude-code',
        });

        syncConversationsFromContacts();
        queueLocalSyncIfChanged(120);
        render();
        scrollToBottom();

        const abortCtrl = new AbortController();
        state.streamingAbortController = abortCtrl;
        render();

        try {
            const resp = await fetch(`${API_BASE}/api/claude-code/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation_key: `yui:${c.id}`,
                    agent_id: c.id,
                    content: text,
                    client_message_id: msgId,
                    reset: false,
                }),
                signal: abortCtrl.signal,
            });
            const data = await resp.json().catch(() => ({}));
            if (!resp.ok) throw new Error(data.detail || `HTTP ${resp.status}`);

            const reply = String(data.reply || '').trim();
            const persistedUser = data.user_message && typeof data.user_message === 'object'
                ? murmurHistoryMessageToStored(data.user_message, c.id)
                : null;
            const persistedAssistant = data.assistant_message && typeof data.assistant_message === 'object'
                ? {
                    ...murmurHistoryMessageToStored(data.assistant_message, c.id),
                    source: 'claude-code',
                    provider: 'claude-code',
                }
                : null;
            const userIdx = c.messages.findIndex((m) => m.id === msgId);
            if (userIdx !== -1 && persistedUser) {
                c.messages[userIdx] = contactMessageFromStored({ ...persistedUser, content: rawText, text: rawText, attachments, client_message_id: msgId });
            }
            const idx = c.messages.findIndex((m) => m.id === aiId);
            if (idx !== -1 && reply) {
                c.messages[idx] = {
                    ...(persistedAssistant ? contactMessageFromStored(persistedAssistant) : {}),
                    id: persistedAssistant?.id || aiId,
                    role: 'ai',
                    text: reply,
                    content: reply,
                    source: 'claude-code',
                    provider: 'claude-code',
                    time: persistedAssistant?.time || nowTimeStr(),
                    created_at: persistedAssistant?.created_at || new Date().toISOString(),
                    typing: false,
                };
            } else if (idx !== -1) {
                c.messages.splice(idx, 1);
            }
            c.lastMessage = reply || text;
            c.lastTime = nowTimeStr();
            syncConversationsFromContacts();
            queueLocalSyncIfChanged(120);
            render();
            scrollToBottom();
        } catch (err) {
            const wasAborted = err.name === 'AbortError';
            if (!wasAborted) console.error('[cc chat] error:', err);
            const idx = c.messages.findIndex((m) => m.id === aiId);
            if (idx !== -1) {
                const textOut = wasAborted ? '' : `Claude Code 连接失败：${err.message}`;
                if (!textOut) {
                    c.messages.splice(idx, 1);
                } else {
                    c.messages[idx] = {
                    id: aiId,
                    role: 'ai',
                    text: textOut,
                    content: textOut,
                    source: 'claude-code',
                    provider: 'claude-code',
                    time: nowTimeStr(),
                    created_at: new Date().toISOString(),
                    typing: false,
                };
                }
            }
            syncConversationsFromContacts();
            queueLocalSyncIfChanged(120);
            render();
        } finally {
            state.streamingAbortController = null;
            render();
        }
    }

    async function doSendCodexMessage() {
        const input = root()?.querySelector('.chat-input');
        const rawText = input?.value?.trim() || '';
        const attachments = (state.chatAttachments || []).map(serializeChatAttachment).filter(Boolean);
        if (!rawText && !attachments.length) return;
        const text = attachmentRequestText(rawText, attachments);
        const c = byId(state.currentContactId);
        if (!c) return;
        cancelAssistantPlayback();

        const msgId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        upsertMessage(c.messages, { id: msgId, client_message_id: msgId, role: 'user', text: rawText, content: rawText, attachments, time: nowTimeStr(), created_at: new Date().toISOString() });
        c.lastMessage = attachmentLastMessage(rawText, attachments);
        c.lastTime = '\u521a\u521a';
        input.value = '';
        state.chatAttachments = [];

        const aiId = 'ai_' + Date.now();
        c.messages.push({
            id: aiId,
            role: 'ai',
            text: '',
            content: '',
            time: '',
            created_at: new Date().toISOString(),
            typing: true,
            source: 'codex',
        });

        syncConversationsFromContacts();
        queueLocalSyncIfChanged(120);
        render();
        scrollToBottom();

        const abortCtrl = new AbortController();
        state.streamingAbortController = abortCtrl;
        render();

        try {
            const resp = await fetch(`${API_BASE}/api/codex/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation_key: `yui:${c.id}`,
                    agent_id: c.id,
                    content: text,
                    client_message_id: msgId,
                    reset: false,
                }),
                signal: abortCtrl.signal,
            });
            const data = await resp.json().catch(() => ({}));
            if (!resp.ok) throw new Error(data.detail || `HTTP ${resp.status}`);

            const reply = String(data.reply || '').trim();
            const persistedUser = data.user_message && typeof data.user_message === 'object'
                ? murmurHistoryMessageToStored(data.user_message, c.id)
                : null;
            const persistedAssistant = data.assistant_message && typeof data.assistant_message === 'object'
                ? {
                    ...murmurHistoryMessageToStored(data.assistant_message, c.id),
                    source: 'codex',
                    provider: 'codex',
                }
                : null;
            const userIdx = c.messages.findIndex((m) => m.id === msgId);
            if (userIdx !== -1 && persistedUser) {
                c.messages[userIdx] = contactMessageFromStored({ ...persistedUser, content: rawText, text: rawText, attachments, client_message_id: msgId });
            }
            const idx = c.messages.findIndex((m) => m.id === aiId);
            if (idx !== -1 && reply) {
                c.messages[idx] = {
                    ...(persistedAssistant ? contactMessageFromStored(persistedAssistant) : {}),
                    id: persistedAssistant?.id || aiId,
                    role: 'ai',
                    text: reply,
                    content: reply,
                    source: 'codex',
                    provider: 'codex',
                    time: persistedAssistant?.time || nowTimeStr(),
                    created_at: persistedAssistant?.created_at || new Date().toISOString(),
                    typing: false,
                };
            } else if (idx !== -1) {
                c.messages.splice(idx, 1);
            }
            c.lastMessage = reply || text;
            c.lastTime = nowTimeStr();
            syncConversationsFromContacts();
            queueLocalSyncIfChanged(120);
            render();
            scrollToBottom();
        } catch (err) {
            const wasAborted = err.name === 'AbortError';
            if (!wasAborted) console.error('[codex chat] error:', err);
            const idx = c.messages.findIndex((m) => m.id === aiId);
            if (idx !== -1) {
                const textOut = wasAborted ? '' : `Codex \u8fde\u63a5\u5931\u8d25\uff1a${err.message}`;
                if (!textOut) {
                    c.messages.splice(idx, 1);
                } else {
                    c.messages[idx] = {
                    id: aiId,
                    role: 'ai',
                    text: textOut,
                    content: textOut,
                    source: 'codex',
                    provider: 'codex',
                    time: nowTimeStr(),
                    created_at: new Date().toISOString(),
                    typing: false,
                };
                }
            }
            syncConversationsFromContacts();
            queueLocalSyncIfChanged(120);
            render();
        } finally {
            state.streamingAbortController = null;
            render();
        }
    }

    // 缓冲消息池：contactId -> {texts, timer, listener}
    const _chatMsgBuffers = {};
    const CHAT_BUFFER_DEBOUNCE = 1500;

    async function _flushChatBuffer(contactId) {
        const buf = _chatMsgBuffers[contactId];
        if (!buf || !buf.texts.length) return;
        const texts = buf.texts.splice(0);
        if (buf.timer) { clearTimeout(buf.timer); buf.timer = null; }
        if (buf.listener) {
            root()?.querySelector('.chat-input')?.removeEventListener('input', buf.listener);
            buf.listener = null;
        }
        delete _chatMsgBuffers[contactId];

        const c = byId(contactId);
        if (!c) return;
        const allowReasoning = !!c?.settings?.reasoning_visibility;

        let sessionId = '';
        try { sessionId = await ensureContactSession(c); } catch (err) { return; }

        const text = texts.join('\n');
        const msgId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        // Push AI typing placeholder
        const aiId = 'ai_' + Date.now();
        c.messages.push({ id: aiId, role: 'ai', text: '', content: '', time: '', created_at: new Date().toISOString(), typing: true });
        syncConversationsFromContacts();
        queueLocalSyncIfChanged(120);
        render();
        scrollToBottom();

        // Thinking: throttled DOM flush + slow-connection detector
        let _thinkingLastChunk = 0;
        let _thinkingFirstRendered = false;
        let _thinkingFlushRaf = null;

        const _flushThinkingDOM = () => {
            const thinkEl = root()?.querySelector(`#thinking-${aiId}`);
            if (!thinkEl) return;
            thinkEl.textContent = truncateThinkingDisplay(fullThinking);
            thinkEl.classList.add('open', 'thinking-active');
            thinkEl.setAttribute('aria-hidden', 'false');
            const wEl = root()?.querySelector(`#cot-wrapper-${aiId}`);
            if (wEl) wEl.removeAttribute('data-slow');
            state.openThinkingIds[aiId] = true;
        };

        const _scheduleThinkingFlush = () => {
            if (_thinkingFlushRaf !== null) return;
            _thinkingFlushRaf = requestAnimationFrame(() => {
                _thinkingFlushRaf = null;
                _flushThinkingDOM();
            });
        };

        const _cancelThinkingFlush = () => {
            if (_thinkingFlushRaf !== null) {
                cancelAnimationFrame(_thinkingFlushRaf);
                _thinkingFlushRaf = null;
            }
        };

        const _slowTimer = setInterval(() => {
            if (!_thinkingLastChunk) return;
            const wrapperEl = root()?.querySelector(`#cot-wrapper-${aiId}`);
            if (!wrapperEl) return;
            wrapperEl.toggleAttribute('data-slow', Date.now() - _thinkingLastChunk > 8000);
        }, 2000);

        const body = {
            session_id: sessionId,
            agent_id: c.id,
            content: text,
            client_message_id: msgId,
            ...(c.persona ? { persona: c.persona } : {}),
            ...(c.settings.model ? { model: c.settings.model } : {}),
            ...buildChatTuning(c),
            ...buildChatProviderOverride(c),
        };

        const _abortCtrl = new AbortController();
        state.streamingAbortController = _abortCtrl;
        render(); // re-render so stop button appears
        let fullText = '';
        let fullThinking = '';
        let fullToolCalls = null;
        let _textFirstRendered = false;

        try {
            const resp = await requestChatStream(c, body, _abortCtrl.signal);

            // Switch placeholder to streaming mode (no longer shows dots)
            const aiIdx = () => c.messages.findIndex(m => m.id === aiId);
            c.messages[aiIdx()] = { id: aiId, role: 'ai', text: '', content: '', time: nowTimeStr(), created_at: new Date().toISOString(), typing: false, streaming: true };
            render();

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let _currentEventType = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // SSE: split on newlines, track event: type per event block
                const parts = buffer.split('\n');
                buffer = parts.pop() ?? ''; // keep incomplete last line

                let _lineBudget = 0;
                for (const line of parts) {
                    const trimmed = line.trim();
                    if (!trimmed) { _currentEventType = ''; continue; } // blank = event boundary
                    if (trimmed.startsWith('event:')) {
                        _currentEventType = trimmed.slice(6).trim();
                        continue;
                    }
                    if (!trimmed.startsWith('data:')) continue;
                    const payload = trimmed.slice(5).trim();
                    if (payload === '[DONE]') continue;

                    const parsed = parseChatSsePayload(payload, _currentEventType);
                    let chunk = parsed.text;
                    const normalizedThinkingChunk = normalizeThinkingChunk(parsed.thinking, fullText, fullThinking);
                    const thinkingChunk = allowReasoning ? normalizedThinkingChunk : '';

                    if (thinkingChunk) {
                        // Hard cap: stop accumulating beyond limit (discard excess chunks)
                        if (fullThinking.length < THINKING_MAX_ACCUMULATE) {
                            fullThinking = appendThinkingChunk(fullThinking, thinkingChunk);
                        }
                        _thinkingLastChunk = Date.now();
                        const idx = aiIdx();
                        if (idx !== -1) {
                            c.messages[idx] = {
                                id: aiId, role: 'ai', text: fullText,
                                thinking: fullThinking, time: nowTimeStr(),
                                typing: false, streaming: true,
                            };
                            if (!_thinkingFirstRendered) {
                                _thinkingFirstRendered = true;
                                state.openThinkingIds[aiId] = true;
                                render();
                                scrollToBottom();
                            } else {
                                _scheduleThinkingFlush();
                            }
                        }
                    }

                    if (parsed.toolCall) {
                        const tc = parsed.toolCall;
                        if (!fullToolCalls) fullToolCalls = [];
                        const existing = fullToolCalls.find(t => t.name === tc.name && t.status !== 'done');
                        if (existing) {
                            existing.status = tc.status;
                        } else {
                            fullToolCalls.push({ name: tc.name, status: tc.status });
                        }
                        const idx2 = aiIdx();
                        if (idx2 !== -1) {
                            c.messages[idx2] = { ...c.messages[idx2], toolCalls: fullToolCalls.slice(), streaming: true };
                            render();
                        }
                    }

                    if (chunk) {
                        fullText += chunk;
                        const idx3 = aiIdx();
                        if (idx3 !== -1) {
                            c.messages[idx3] = {
                                ...c.messages[idx3],
                                text: fullText,
                                content: fullText,
                                time: nowTimeStr(),
                                typing: false,
                                streaming: true,
                            };
                            if (!_textFirstRendered) {
                                _textFirstRendered = true;
                                render();
                                scrollToBottom();
                            } else {
                                patchStreamingMessageDom(aiId, fullText, fullThinking);
                            }
                        }
                    }
                    _lineBudget += 1;
                    if (_lineBudget >= 32) {
                        _lineBudget = 0;
                        _scheduleThinkingFlush();
                        await nextFrame();
                    }
                }
            }

            // Finalize: cancel pending throttle, remove streaming flag, single final render
            clearInterval(_slowTimer);
            _cancelThinkingFlush();
            state.streamingAbortController = null;
            const idx = aiIdx();
            const finalText = fullText.trim();
            c.lastMessage = finalText || '\u5df2\u5904\u7406';
            c.lastTime = nowTimeStr();
            const thinkEl = root()?.querySelector(`#thinking-${aiId}`);
            if (thinkEl) thinkEl.classList.remove('thinking-active');
            const wrapperEl = root()?.querySelector(`#cot-wrapper-${aiId}`);
            if (wrapperEl) wrapperEl.removeAttribute('data-slow');
            if (allowReasoning && fullThinking) {
                delete state.openThinkingIds[aiId];
            }
            const chunks = splitAssistantReply(finalText);
            if (idx !== -1 && chunks.length > 1) {
                c.messages.splice(idx, 1);
                render();
                scrollToBottom();
                await wait(180);
                await playAssistantChunks(c, chunks, { 
                    startIndex: idx,
                    thinking: allowReasoning ? fullThinking : '',
                    toolCalls: fullToolCalls
                });
            } else {
                if (idx !== -1 && finalText) {
                    c.messages[idx] = {
                        id: aiId,
                        role: 'ai',
                        text: finalText,
                        content: finalText,
                        ...(allowReasoning && fullThinking ? { thinking: fullThinking } : {}),
                        ...(fullToolCalls ? { toolCalls: fullToolCalls } : {}),
                        time: nowTimeStr(),
                        created_at: new Date().toISOString(),
                        typing: false,
                    };
                } else if (idx !== -1) {
                    c.messages.splice(idx, 1);
                }
                syncConversationsFromContacts();
                queueLocalSyncIfChanged(120);
                render();
                scrollToBottom();
            }

        } catch (err) {
            clearInterval(_slowTimer);
            _cancelThinkingFlush();
            state.streamingAbortController = null;
            // AbortError = user pressed stop: keep whatever was streamed, no error message
            const wasAborted = err.name === 'AbortError';
            if (!wasAborted) console.error('[chat SSE] error:', err);
            const idx = c.messages.findIndex(m => m.id === aiId);
            if (idx !== -1) {
                const textOut = wasAborted
                    ? fullText.trim()
                    : `\u8fde\u63a5\u5931\u8d25\uff1a${err.message}\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002`;
                if (!textOut) {
                    c.messages.splice(idx, 1);
                } else {
                    c.messages[idx] = {
                    id: aiId, role: 'ai',
                    text: textOut,
                    content: textOut,
                    ...(allowReasoning && fullThinking ? { thinking: fullThinking } : {}),
                    time: nowTimeStr(), created_at: new Date().toISOString(), typing: false,
                };
                }
            }
            if (wasAborted && fullText) {
                c.lastMessage = fullText;
                c.lastTime = nowTimeStr();
            }
            syncConversationsFromContacts();
            queueLocalSyncIfChanged(120);
            render();
        }
    }

    //  Send message (SSE streaming)
    async function doSendMessage() {
        const input = root()?.querySelector('.chat-input');
        const rawText = input?.value?.trim() || '';
        const attachments = (state.chatAttachments || []).map(serializeChatAttachment).filter(Boolean);
        if (!rawText && !attachments.length) return;
        const requestText = attachmentRequestText(rawText, attachments);
        const c = byId(state.currentContactId);
        if (!c) return;
        cancelAssistantPlayback();

        // Show user message immediately
        let sessionId = '';
        try { sessionId = await ensureContactSession(c); } catch (err) {
            state.toast = '\u65e0\u6cd5\u521b\u5efa\u4f1a\u8bdd\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1500);
            return;
        }
        const uMsgId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        upsertMessage(c.messages, { id: uMsgId, client_message_id: uMsgId, session_id: sessionId, agent_id: c.id, role: 'user', text: rawText, content: rawText, attachments, time: nowTimeStr(), created_at: new Date().toISOString() });
        c.lastMessage = attachmentLastMessage(rawText, attachments);
        c.lastTime = '\u521a\u521a';
        input.value = '';
        state.chatAttachments = [];
        syncConversationsFromContacts();
        queueLocalSyncIfChanged(120);
        render();
        scrollToBottom();

        // Buffer: debounce AI request, extend timer while user is typing
        if (!_chatMsgBuffers[c.id]) _chatMsgBuffers[c.id] = { texts: [], timer: null, listener: null };
        const buf = _chatMsgBuffers[c.id];
        buf.texts.push(requestText);
        if (buf.timer) clearTimeout(buf.timer);
        if (!buf.listener) {
            buf.listener = () => {
                const b = _chatMsgBuffers[c.id];
                if (!b?.texts.length) return;
                clearTimeout(b.timer);
                b.timer = setTimeout(() => _flushChatBuffer(c.id), CHAT_BUFFER_DEBOUNCE);
            };
            input.addEventListener('input', buf.listener);
        }
        buf.timer = setTimeout(() => _flushChatBuffer(c.id), CHAT_BUFFER_DEBOUNCE);
    }

    // Re-roll AI message (SSE streaming)
    async function doReroll(msgId) {
        const c = byId(state.currentContactId);
        if (!c) return;
        cancelAssistantPlayback();
        const allowReasoning = !!c?.settings?.reasoning_visibility;
        const idx = c.messages.findIndex(m => m.id === msgId);
        if (idx === -1 || c.messages[idx].role !== 'ai') return;

        let sessionId = '';
        try {
            sessionId = await ensureContactSession(c);
        } catch (err) {
            console.error('[session] create failed:', err);
            state.toast = `无法创建会话：${err.message}`;
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1500);
            return;
        }

        // Clear the old message and show typing dots
        c.messages[idx] = { ...c.messages[idx], typing: true, text: '', streaming: false };
        render();

        // Get last user message as context hint (backend will use session history)
        const lastUserMsg = [...c.messages].reverse().find(m => m.role === 'user');
        if (!lastUserMsg) return;

        const body = {
            session_id: sessionId,
            agent_id: c.id,
            content: lastUserMsg.text,
            ...(c.persona ? { persona: c.persona } : {}),
            ...(c.settings.model ? { model: c.settings.model } : {}),
            ...buildChatTuning(c),
            ...buildChatProviderOverride(c),
        };

        const _rerollAbortCtrl = new AbortController();
        state.streamingAbortController = _rerollAbortCtrl;

        try {
            const resp = await requestChatStream(c, body, _rerollAbortCtrl.signal);

            c.messages[idx] = { ...c.messages[idx], typing: false, text: '', streaming: true };
            render();

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullText = '';
            let fullThinking = '';
            let fullToolCalls = null;
            const rerollId = msgId;
            let _rCurrentEventType = '';

            let _rerollThinkingLastChunk = 0;
            let _rerollThinkingFirstRendered = false;
            let _rerollFlushRaf = null;

            const _flushRerollThinkingDOM = () => {
                const el = root()?.querySelector(`#thinking-${rerollId}`);
                if (!el) return;
                el.textContent = truncateThinkingDisplay(fullThinking);
                el.classList.add('open', 'thinking-active');
                el.setAttribute('aria-hidden', 'false');
                const wEl = root()?.querySelector(`#cot-wrapper-${rerollId}`);
                if (wEl) wEl.removeAttribute('data-slow');
                state.openThinkingIds[rerollId] = true;
            };

            const _scheduleRerollFlush = () => {
                if (_rerollFlushRaf !== null) return;
                _rerollFlushRaf = requestAnimationFrame(() => {
                    _rerollFlushRaf = null;
                    _flushRerollThinkingDOM();
                });
            };

            const _cancelRerollFlush = () => {
                if (_rerollFlushRaf !== null) {
                    cancelAnimationFrame(_rerollFlushRaf);
                    _rerollFlushRaf = null;
                }
            };

            const _rerollSlowTimer = setInterval(() => {
                if (!_rerollThinkingLastChunk) return;
                const wrapperEl = root()?.querySelector(`#cot-wrapper-${rerollId}`);
                if (!wrapperEl) return;
                wrapperEl.toggleAttribute('data-slow', Date.now() - _rerollThinkingLastChunk > 8000);
            }, 2000);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const parts = buffer.split('\n');
                buffer = parts.pop() ?? '';
                let _rLineBudget = 0;
                for (const line of parts) {
                    const trimmed = line.trim();
                    if (!trimmed) { _rCurrentEventType = ''; continue; }
                    if (trimmed.startsWith('event:')) { _rCurrentEventType = trimmed.slice(6).trim(); continue; }
                    if (!trimmed.startsWith('data:')) continue;
                    const payload = trimmed.slice(5).trim();
                    if (payload === '[DONE]') continue;
                    const parsed = parseChatSsePayload(payload, _rCurrentEventType);
                    let chunk = parsed.text;
                    const normalizedThinkingChunk = normalizeThinkingChunk(parsed.thinking, fullText, fullThinking);
                    const thinkingChunk = allowReasoning ? normalizedThinkingChunk : '';
                    if (thinkingChunk) {
                        if (fullThinking.length < THINKING_MAX_ACCUMULATE) {
                            fullThinking = appendThinkingChunk(fullThinking, thinkingChunk);
                        }
                        _rerollThinkingLastChunk = Date.now();
                        const curIdx = c.messages.findIndex(m => m.id === rerollId);
                        if (curIdx !== -1) {
                            c.messages[curIdx] = { ...c.messages[curIdx], thinking: fullThinking, streaming: true };
                            if (!_rerollThinkingFirstRendered) {
                                _rerollThinkingFirstRendered = true;
                                state.openThinkingIds[rerollId] = true;
                                render();
                            } else {
                                _scheduleRerollFlush();
                            }
                        }
                    }
                    if (parsed.toolCall) {
                        const tc = parsed.toolCall;
                        if (!fullToolCalls) fullToolCalls = [];
                        const existing = fullToolCalls.find(t => t.name === tc.name && t.status !== 'done');
                        if (existing) {
                            existing.status = tc.status;
                        } else {
                            fullToolCalls.push({ name: tc.name, status: tc.status });
                        }
                        const curIdx = c.messages.findIndex(m => m.id === rerollId);
                        if (curIdx !== -1) {
                            c.messages[curIdx] = {
                                ...c.messages[curIdx],
                                toolCalls: fullToolCalls.slice(),
                                streaming: true,
                            };
                            render();
                        }
                    }
                    if (chunk) {
                        fullText += chunk;
                    }
                    _rLineBudget += 1;
                    if (_rLineBudget >= 32) {
                        _rLineBudget = 0;
                        _scheduleRerollFlush();
                        await nextFrame();
                    }
                }
            }

            clearInterval(_rerollSlowTimer);
            _cancelRerollFlush();
            state.streamingAbortController = null;
            const curIdx = c.messages.findIndex(m => m.id === rerollId);
            const rerollText = fullText.trim();
            const thinkElFinal = root()?.querySelector(`#thinking-${rerollId}`);
            if (thinkElFinal) thinkElFinal.classList.remove('thinking-active');
            const wrapperElFinal = root()?.querySelector(`#cot-wrapper-${rerollId}`);
            if (wrapperElFinal) wrapperElFinal.removeAttribute('data-slow');
            if (allowReasoning && fullThinking) {
                delete state.openThinkingIds[rerollId];
            }
            const chunks = splitAssistantReply(rerollText);
            if (curIdx !== -1 && chunks.length > 1) {
                c.messages.splice(curIdx, 1);
                render();
                await wait(180);
                await playAssistantChunks(c, chunks, {
                    startIndex: curIdx,
                    thinking: allowReasoning ? fullThinking : '',
                    toolCalls: fullToolCalls,
                });
            } else {
                if (curIdx !== -1 && rerollText) {
                    c.messages[curIdx] = {
                        ...c.messages[curIdx],
                        text: rerollText,
                        ...(allowReasoning && fullThinking ? { thinking: fullThinking } : {}),
                        ...(fullToolCalls ? { toolCalls: fullToolCalls } : {}),
                        streaming: false,
                    };
                } else if (curIdx !== -1) {
                    c.messages.splice(curIdx, 1);
                }
                render();
            }

        } catch (err) {
            clearInterval(_rerollSlowTimer);
            _cancelRerollFlush();
            state.streamingAbortController = null;
            const wasAborted = err.name === 'AbortError';
            if (!wasAborted) console.error('[reroll SSE] error:', err);
            const curIdx = c.messages.findIndex(m => m.id === rerollId);
            if (curIdx !== -1) {
                const textOut = wasAborted ? fullText.trim() : `\u91cd\u8bd5\u5931\u8d25\uff1a${err.message}`;
                if (!textOut) {
                    c.messages.splice(curIdx, 1);
                } else {
                    c.messages[curIdx] = {
                    ...c.messages[curIdx],
                    text: textOut,
                    ...(fullThinking ? { thinking: fullThinking } : {}),
                    ...(fullToolCalls ? { toolCalls: fullToolCalls } : {}),
                    streaming: false,
                };
                }
            }
            render();
        }
    }


    // Auto scroll
    function scrollToBottom() {
        requestAnimationFrame(() => {
            const panel = root()?.querySelector('.messages-panel');
            if (panel) panel.scrollTop = panel.scrollHeight;
        });
    }

    // Attach panel
    function renderAttachPanel() {
        const c = byId(state.currentContactId) || state.contacts[0] || {};
        const quickActions = state.currentView === 'room'
            ? getContactQuickActions(c).map(renderActionChip).join('')
            : '';
        return `
      <div class="attach-panel glass-frost">
        <div class="attach-grid">
          <button class="attach-option" data-action="attach-option" data-label="\u56fe\u7247">
            <span class="attach-icon">\ud83d\uddbc\ufe0f</span><span>\u56fe\u7247</span>
          </button>
          <button class="attach-option" data-action="attach-option" data-label="\u6587\u4ef6">
            <span class="attach-icon">\ud83d\udcc4</span><span>\u6587\u4ef6</span>
          </button>
          <button class="attach-option" data-action="attach-option" data-label="\u8bed\u97f3">
            <span class="attach-icon">\ud83c\udfa4</span><span>\u8bed\u97f3</span>
          </button>
          <button class="attach-option" data-action="attach-option" data-label="\u62cd\u7167">
            <span class="attach-icon">\ud83d\udcf8</span><span>\u62cd\u7167</span>
          </button>
        </div>
        ${quickActions ? `<div class="action-scroll attach-action-scroll">${quickActions}</div>` : ''}
      </div>
    `;
    }

    const originalOpenPage = window.openPage;
    if (typeof originalOpenPage === 'function') {
        window.openPage = function patchedOpenPage(pageId, originId) {
            originalOpenPage(pageId, originId);
            if (pageId === 'page-chat') openChatAppDefault();
        };
    }


    // AI Settings Subpages v2
    const AI_PROVIDER_PRESETS = [
        { id: 'openai', name: 'OpenAI', enabled: true, baseUrl: 'https://api.openai.com/v1', apiPath: '', apiKey: '', models: ['gpt-5.4', 'gpt-5.4-mini', 'gpt-4.1-mini'], defaultModel: 'gpt-5.4' },
        { id: 'openrouter', name: 'OpenRouter', enabled: true, baseUrl: 'https://openrouter.ai/api/v1', apiPath: '', apiKey: '', models: ['openai/gpt-5', 'anthropic/claude-sonnet-4.5', 'anthropic/claude-opus-4.1', 'anthropic/claude-3.7-sonnet'], defaultModel: 'openai/gpt-5' },
        { id: 'gemini', name: 'Gemini', enabled: true, baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai', apiPath: '', apiKey: '', models: ['gemini-2.5-pro', 'gemini-2.5-flash'], defaultModel: 'gemini-2.5-pro' },
        { id: 'deepseek', name: 'DeepSeek', enabled: false, baseUrl: 'https://api.deepseek.com/v1', apiPath: '', apiKey: '', models: ['deepseek-chat', 'deepseek-reasoner'], defaultModel: 'deepseek-chat' },
        { id: 'qwen', name: '\u963f\u91cc\u4e91\u5343\u95ee', enabled: false, baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', apiPath: '', apiKey: '', models: ['qwen-max', 'qwen-plus', 'qwen-turbo'], defaultModel: 'qwen-max' },
        { id: 'zhipu', name: '\u667a\u8c31', enabled: false, baseUrl: 'https://open.bigmodel.cn/api/paas/v4', apiPath: '', apiKey: '', models: ['glm-4.5', 'glm-4-air'], defaultModel: 'glm-4.5' },
        { id: 'siliconflow', name: 'SiliconFlow', enabled: false, baseUrl: 'https://api.siliconflow.cn/v1', apiPath: '', apiKey: '', models: ['deepseek-ai/DeepSeek-V3', 'deepseek-ai/DeepSeek-R1', 'Qwen/Qwen2.5-72B-Instruct'], defaultModel: 'deepseek-ai/DeepSeek-V3' },
    ];
    const PROVIDER_MODEL_FALLBACKS = {
        openai: ['gpt-5.4', 'gpt-5.4-mini', 'gpt-4.1', 'gpt-4.1-mini', 'o4-mini'],
        openrouter: ['openai/gpt-5', 'openai/gpt-4.1', 'anthropic/claude-sonnet-4.5', 'anthropic/claude-opus-4.1', 'anthropic/claude-3.7-sonnet', 'anthropic/claude-3.5-sonnet', 'anthropic/claude-3.5-haiku', 'google/gemini-2.5-pro', 'google/gemini-2.5-flash', 'deepseek/deepseek-chat', 'deepseek/deepseek-r1', 'qwen/qwen-max'],
        aggregate: ['openai/gpt-5', 'gpt-5', 'gpt-4.1', 'anthropic/claude-sonnet-4.5', 'anthropic/claude-opus-4.1', 'anthropic/claude-3.7-sonnet', 'claude-sonnet-4-5', 'claude-opus-4-1', 'claude-3-7-sonnet-latest', 'google/gemini-2.5-pro', 'google/gemini-2.5-flash', 'deepseek/deepseek-chat', 'qwen/qwen-max'],
        anthropic: ['claude-opus-4-5', 'claude-sonnet-4-5', 'claude-haiku-4-5', 'claude-opus-4-1', 'claude-sonnet-4-0', 'claude-3-7-sonnet-latest', 'claude-3-5-haiku-latest'],
        gemini: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'],
        deepseek: ['deepseek-chat', 'deepseek-reasoner'],
        zhipu: ['glm-4.5', 'glm-4-air', 'glm-4-flash'],
        siliconflow: ['deepseek-ai/DeepSeek-V3', 'deepseek-ai/DeepSeek-R1', 'Qwen/Qwen2.5-72B-Instruct', 'Qwen/Qwen2.5-32B-Instruct', 'THUDM/GLM-4-9B-0414'],
    };
    const AI_SUB_VIEWS = new Set(['aiInterface', 'defaultModels', 'modelSlot', 'providerCatalog', 'providerEditor', 'promptEditor', 'themeSettings', 'accountSettings', 'memoryService', 'backendSync', 'exportSettings', 'mcpLibrary']);
    const __origShowBottomNav = showBottomNav;
    const __origRenderHeader = renderHeader;
    const __origRenderBody = renderBody;
    const __origHandleClick = handleClick;
    const __origNavRow = navRow;
    const __origDoSendMessage = doSendMessage;
    const __origDoReroll = doReroll;

    state.viewStack = state.viewStack || [];
    state.activeModelSlot = state.activeModelSlot || 'chat';
    state.activeModelSlotContext = state.activeModelSlotContext || 'global';
    state.activeModelProviderId = state.activeModelProviderId || '';
    state.providerDraftId = state.providerDraftId || null;
    state.providerAdvancedOpen = !!state.providerAdvancedOpen;
    state.providerEditorDraft = state.providerEditorDraft || null;
    state.providerModelMenuOpen = !!state.providerModelMenuOpen;
    state.providerModelSyncingId = state.providerModelSyncingId || '';
    state.providerModelSyncStatus = (state.providerModelSyncStatus && typeof state.providerModelSyncStatus === 'object') ? state.providerModelSyncStatus : {};
    state.providerKeyVisible = !!state.providerKeyVisible;
    state.modelSlotMenuOpen = !!state.modelSlotMenuOpen;
    state.providerSearch = state.providerSearch || '';
    state.activePromptSlot = state.activePromptSlot || 'summary';

    function normalizeModelSlotId(slotId) {
        const raw = String(slotId || '').trim();
        if (!raw) return 'chat';
        if (raw === 'ocr') return 'vision';
        if (raw === 'title') return 'summary';
        return raw;
    }
    state.aiSettingsSaving = false;
    state.memoryServiceEntries = Array.isArray(state.memoryServiceEntries) ? state.memoryServiceEntries : [];
    state.memoryServiceLoading = !!state.memoryServiceLoading;
    state.slotVendorGroupOpen = (state.slotVendorGroupOpen && typeof state.slotVendorGroupOpen === 'object') ? state.slotVendorGroupOpen : {};
    state.providerModelVendorOpen = (state.providerModelVendorOpen && typeof state.providerModelVendorOpen === 'object') ? state.providerModelVendorOpen : {};

    function defaultProviderApiPath() {
        return '/chat/completions';
    }

    function normalizeProviderApiPath(value, { allowEmpty = false } = {}) {
        const raw = String(value || '').trim();
        if (!raw) return allowEmpty ? '' : defaultProviderApiPath();
        return raw.startsWith('/') ? raw : `/${raw}`;
    }

    function resolveProviderApiPath(provider = {}) {
        return normalizeProviderApiPath(provider.apiPath || provider.api_path || '', { allowEmpty: false });
    }

    function normalizeProviderRecord(item = {}) {
        const explicitApiPath = normalizeProviderApiPath(item.apiPath || item.api_path || '', { allowEmpty: true });
        return {
            ...item,
            baseUrl: item.baseUrl || item.base_url || '',
            apiKey: item.apiKey || item.api_key || '',
            apiPath: explicitApiPath,
            api_path: explicitApiPath,
            models: normalizeModelIdList(item.models),
            defaultModel: sanitizeModelId(item.defaultModel || item.default_model || ''),
        };
    }

    function sanitizeModelId(value) {
        if (typeof value !== 'string') return '';
        const text = value.trim().replace(/\s+/g, ' ');
        if (!text || text.length > 180) return '';
        if (/[<>]/.test(text)) return '';
        if (/<\/?[a-z][\s\S]*>/i.test(text) || /<!doctype|<html|<\/div|<\/body/i.test(text)) return '';
        if (/[\u0000-\u001f\u007f]/.test(text)) return '';
        return text;
    }

    function normalizeModelIdList(values) {
        const raw = Array.isArray(values) ? values : [];
        const seen = new Set();
        const result = [];
        raw.forEach((item) => {
            const candidate = typeof item === 'string'
                ? item
                : (item && typeof item === 'object' ? (item.id || item.name || item.model || item.slug) : '');
            const id = sanitizeModelId(candidate);
            const key = id.toLowerCase();
            if (id && !seen.has(key)) {
                seen.add(key);
                result.push(id);
            }
        });
        return result;
    }

    function providerKind(provider = {}) {
        const id = String(provider.id || '').toLowerCase();
        const name = String(provider.name || '').toLowerCase();
        const base = String(provider.baseUrl || provider.base_url || '').toLowerCase();
        if (id.includes('openrouter') || name.includes('openrouter') || base.includes('openrouter.ai')) return 'openrouter';
        if (id.includes('jiushi') || name.includes('玖时') || base.includes('jiushi.xin')) return 'aggregate';
        if (id.includes('silicon') || name.includes('silicon') || base.includes('siliconflow')) return 'siliconflow';
        if (id.includes('deepseek') || name.includes('deepseek') || base.includes('deepseek')) return 'deepseek';
        if (id.includes('anthropic') || id.includes('claude') || name.includes('anthropic') || name.includes('claude') || base.includes('anthropic.com')) return 'anthropic';
        if (id.includes('gemini') || name.includes('gemini') || base.includes('generativelanguage')) return 'gemini';
        if (id.includes('zhipu') || name.includes('智谱') || base.includes('bigmodel')) return 'zhipu';
        if (id.includes('openai') || name.includes('openai') || base.includes('openai.com')) return 'openai';
        return id || 'custom';
    }

    function isLikelyAggregateProvider(provider = {}) {
        const kind = providerKind(provider);
        if (kind === 'aggregate' || kind === 'openrouter') return true;
        if (['openai', 'anthropic', 'gemini', 'deepseek', 'zhipu', 'siliconflow'].includes(kind)) return false;
        const base = String(provider.baseUrl || provider.base_url || '').toLowerCase();
        if (!base) return false;
        return !/(openai\.com|anthropic\.com|generativelanguage|deepseek\.com|bigmodel\.cn|siliconflow\.cn)/.test(base);
    }

    function fallbackModelsForProvider(provider = {}) {
        const kind = providerKind(provider);
        const baseModels = PROVIDER_MODEL_FALLBACKS[kind] || [];
        const aggregateModels = isLikelyAggregateProvider(provider) ? PROVIDER_MODEL_FALLBACKS.aggregate : [];
        return normalizeModelIdList([...baseModels, ...aggregateModels]);
    }

    function maskedApiKey(value = '') {
        const text = String(value || '').trim();
        if (!text) return '';
        const last = text.slice(-4);
        const prefix = text.startsWith('sk-') ? 'sk-' : '';
        return `${prefix}\u2022\u2022\u2022\u2022${last}`;
    }

    function setProviderSyncStatus(providerId, type, message) {
        const key = String(providerId || state.providerDraftId || 'current');
        state.providerModelSyncStatus[key] = { type, message };
    }

    function validateModelIdForSave(value, label = '模型') {
        const id = sanitizeModelId(value);
        if (!id) throw new Error(`${label} 不是合法模型 ID，不能包含 HTML、控制字符或过长内容`);
        return id;
    }

    function normalizeModelSlotConfig(value = {}) {
        const next = { ...(value || {}) };
        if (next.model) next.model = sanitizeModelId(next.model);
        if (next.providerId) next.providerId = String(next.providerId || '').trim();
        return next;
    }

    function createDefaultAiSettings() {
        return {
            providers: AI_PROVIDER_PRESETS.map((item) => normalizeProviderRecord({ ...item, models: [...item.models] })),
            defaultModels: {
                chat: { providerId: 'openai', model: 'gpt-5.4', useChatModel: false },
                summary: { providerId: 'openai', model: 'gpt-5.4-mini', useChatModel: false },
                vision: { providerId: 'openai', model: 'gpt-5.4-mini', useChatModel: false },
                translate: { providerId: 'openai', model: 'gpt-5.4-mini', useChatModel: false },
                consciousness: { providerId: 'openai', model: 'gpt-5.4-mini', useChatModel: false },
                voice: { provider: '', service_url: '', base_url: '', voice_id: '', speaker: '', emotion: '', speed: 1, format: '' },
            },
            defaultPrompts: {
                chat: 'Respond naturally, stay consistent with the current role and context, and keep the tone warm and clear.',
                summary: 'Write a concise conversation summary with key facts, action items, and follow-ups.',
                translate: 'Translate the content accurately while preserving tone and formatting when possible.',
                vision: 'Extract visible text from the image and explain key visual information clearly.',
                consciousness: 'Review recent context, infer useful next-step thoughts, and keep the result concise and actionable.',
            },
            mcpLibrary: defaultMcpLibrary(),
        };
    }

    function ensureAiSettings() {
        if (!state.globalSettings.aiSettings) {
            state.globalSettings.aiSettings = createDefaultAiSettings();
        } else {
            const ai = state.globalSettings.aiSettings;
            ai.defaultModels = ai.defaultModels || {};
            ai.defaultPrompts = ai.defaultPrompts || {};
            ai.providers = Array.isArray(ai.providers) ? ai.providers : [];
            const providerMap = new Map(ai.providers.map((item) => [item.id, normalizeProviderRecord(item)]));
            createDefaultAiSettings().providers.forEach((preset) => {
                if (!providerMap.has(preset.id)) providerMap.set(preset.id, preset);
            });
            ai.providers = [...providerMap.values()];
            if (ai.defaultModels.ocr && !ai.defaultModels.vision) ai.defaultModels.vision = { ...ai.defaultModels.ocr };
            if (ai.defaultPrompts.ocr && !ai.defaultPrompts.vision) ai.defaultPrompts.vision = ai.defaultPrompts.ocr;
            delete ai.defaultModels.ocr;
            delete ai.defaultPrompts.ocr;
            delete ai.defaultModels.title;
            delete ai.defaultPrompts.title;
            Object.entries(createDefaultAiSettings().defaultModels).forEach(([key, value]) => {
                if (!ai.defaultModels[key]) ai.defaultModels[key] = { ...value };
                if (key !== 'voice') ai.defaultModels[key] = normalizeModelSlotConfig(ai.defaultModels[key]);
            });
            Object.entries(createDefaultAiSettings().defaultPrompts).forEach(([key, value]) => {
                if (typeof ai.defaultPrompts[key] !== 'string') ai.defaultPrompts[key] = value;
            });
        }
        return state.globalSettings.aiSettings;
    }

    function mergeAiSettings(payload = {}) {
        const base = createDefaultAiSettings();
        const normalizedPayload = { ...(payload || {}) };
        if (normalizedPayload.defaultModels?.ocr && !normalizedPayload.defaultModels?.vision) {
            normalizedPayload.defaultModels = { ...normalizedPayload.defaultModels, vision: normalizedPayload.defaultModels.ocr };
        }
        if (normalizedPayload.defaultPrompts?.ocr && !normalizedPayload.defaultPrompts?.vision) {
            normalizedPayload.defaultPrompts = { ...normalizedPayload.defaultPrompts, vision: normalizedPayload.defaultPrompts.ocr };
        }
        const merged = {
            providers: base.providers,
            defaultModels: { ...base.defaultModels },
            defaultPrompts: { ...base.defaultPrompts },
            mcpLibrary: { ...base.mcpLibrary, tools: [...(base.mcpLibrary?.tools || [])] },
        };
        if (Array.isArray(normalizedPayload.providers) && normalizedPayload.providers.length) {
            const map = new Map(base.providers.map((item) => [item.id, item]));
            normalizedPayload.providers.forEach((item) => {
                const normalized = normalizeProviderRecord(item);
                map.set(normalized.id, {
                    ...map.get(normalized.id),
                    ...normalized,
                    models: Array.isArray(normalized.models) && normalized.models.length ? normalized.models : (map.get(normalized.id)?.models || []),
                });
            });
            merged.providers = [...map.values()];
        }
        if (normalizedPayload.defaultModels) {
            Object.keys(merged.defaultModels).forEach((key) => {
                if (normalizedPayload.defaultModels[key]) {
                    const next = { ...merged.defaultModels[key], ...normalizedPayload.defaultModels[key] };
                    merged.defaultModels[key] = key === 'voice' ? next : normalizeModelSlotConfig(next);
                }
            });
        }
        if (normalizedPayload.defaultPrompts) {
            Object.keys(merged.defaultPrompts).forEach((key) => {
                if (typeof normalizedPayload.defaultPrompts[key] === 'string') merged.defaultPrompts[key] = normalizedPayload.defaultPrompts[key];
            });
        }
        if (normalizedPayload.mcpLibrary && Array.isArray(normalizedPayload.mcpLibrary.tools)) {
            merged.mcpLibrary = {
                ...merged.mcpLibrary,
                ...normalizedPayload.mcpLibrary,
                tools: normalizedPayload.mcpLibrary.tools.map(normalizeMcpTool),
            };
        }
        state.globalSettings.aiSettings = merged;
        if (typeof normalizedPayload.consciousnessLoop === 'boolean') {
            state.globalSettings.consciousnessLoop = normalizedPayload.consciousnessLoop;
        }
        syncLegacyAiSettings();
    }

    function syncLegacyAiSettings() {
        const ai = ensureAiSettings();
        const chat = ai.defaultModels.chat;
        const provider = ai.providers.find((item) => item.id === chat.providerId);
        state.globalSettings.defaultModel = sanitizeModelId(chat.model) || createDefaultAiSettings().defaultModels.chat.model;
        state.globalSettings.provider = provider?.name || 'OpenAI';
    }

    function getProviderById(providerId) {
        return ensureAiSettings().providers.find((item) => item.id === providerId);
    }

    function createProviderEditorDraft(providerId = state.providerDraftId) {
        const base = normalizeProviderRecord(getProviderById(providerId) || {
            id: providerId || `custom_${Date.now()}`,
            name: '',
            enabled: true,
            baseUrl: '',
            apiPath: '',
            apiKey: '',
            models: [],
            defaultModel: '',
        });
        const existingModels = normalizeModelIdList(base.models);
        const allModels = normalizeModelIdList([
            ...existingModels,
            ...fallbackModelsForProvider(base),
        ]).map(parseModelToStructured);
        return {
            ...base,
            models: existingModels,
            _allModels: allModels,
            _selectedModelIds: new Set(existingModels),
            _apiKeyDirty: false,
        };
    }

    function ensureProviderEditorDraft() {
        if (!state.providerEditorDraft || state.providerEditorDraft.id !== state.providerDraftId) {
            state.providerEditorDraft = createProviderEditorDraft();
        }
        return state.providerEditorDraft;
    }

    function filteredProviderModels(query = '', models = []) {
        const keyword = String(query || '').trim().toLowerCase();
        const list = normalizeModelIdList(models);
        if (!keyword) return list;
        return list.filter((item) => String(item || '').toLowerCase().includes(keyword));
    }

    // 鈹€鈹€ Model vendor / capability helpers 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
    function detectModelVendor(name) {
        const n = String(name || '').toLowerCase();
        if (/deepseek/.test(n)) return 'DeepSeek';
        if (/\bglm\b|chatglm/.test(n)) return 'GLM';
        if (/\bqwen\b|qwq/.test(n)) return 'Qwen';
        if (/\bgpt[-\d]|^gpt|^o[134][-\d]|text-davinci|text-curie/.test(n)) return 'OpenAI';
        if (/claude/.test(n)) return 'Anthropic';
        if (/gemini|gemma/.test(n)) return 'Google';
        if (/\bllama\b|meta-llama/.test(n)) return 'Meta';
        if (/mistral|mixtral|codestral/.test(n)) return 'Mistral';
        if (/\byi[-/_]/.test(n)) return '01.AI';
        if (/moonshot|kimi/.test(n)) return 'Moonshot';
        if (/hunyuan/.test(n)) return 'Hunyuan';
        if (/ernie|wenxin/.test(n)) return 'ERNIE';
        if (/doubao/.test(n)) return 'Doubao';
        if (/baichuan/.test(n)) return 'Baichuan';
        if (/spark/.test(n)) return 'Spark';
        if (/internlm/.test(n)) return 'InternLM';
        return 'Other';
    }

    function detectModelCapabilities(name) {
        const n = String(name || '').toLowerCase();
        const caps = ['chat', 'text'];
        if (/vl\b|vision|visual|\bvision\b|-v\d|\bimg\b/.test(n)) caps.push('vision');
        if (/reason|r1\b|think\b|cot\b/.test(n)) caps.push('reasoning');
        if (/image|draw|flux|paint|artist|diffusion/.test(n)) caps.push('image');
        caps.push('tools');
        return caps;
    }

    function parseModelToStructured(name) {
        const id = String(name || '').trim();
        return {
            id,
            name: id,
            vendor: detectModelVendor(id),
            capabilities: detectModelCapabilities(id),
        };
    }

    const MODEL_CAP_LABEL = { chat: '瀵硅瘽', text: '鏂囨湰', reasoning: '鎺ㄧ悊', tools: '宸ュ叿璋冪敤', vision: '瑙嗚', image: '鐢熷浘' };
    const MODEL_CAP_SHOW = ['reasoning', 'tools', 'vision', 'image'];
    const MODEL_CAP_SVG = {
        reasoning: '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 .5A3 3 0 0 0 2.8 5.9l.2.3V8h4V6.2l.2-.3A3 3 0 0 0 5 .5zm-1.2 8h2.4v.5c0 .28-.22.5-.5.5H4.3a.5.5 0 0 1-.5-.5V8.5z"/></svg>',
        tools: '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M7.5 1a2 2 0 0 0-1.86 2.73L1.2 8.16a.6.6 0 0 0 .84.84l4.43-4.44A2 2 0 1 0 7.5 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
        vision: '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2C2.5 2 .8 5 .8 5S2.5 8 5 8s4.2-3 4.2-3S7.5 2 5 2zm0 4.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z"/></svg>',
        image: '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1A.5.5 0 0 0 1 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 8.5 1h-7zM2 8l2-2.5 1.3 1.7 1.7-2.2L9 8H2zm.8-4.3a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0z"/></svg>',
    };

    function renderModelCapabilityBadges(model) {
        const caps = Array.isArray(model?.capabilities) ? model.capabilities : detectModelCapabilities(model?.name || '');
        return caps
            .filter((c) => MODEL_CAP_SHOW.includes(c))
            .map((c) => `<span class="model-cap-badge cap-${c}" title="${MODEL_CAP_LABEL[c] || c}">${MODEL_CAP_SVG[c] || c}</span>`)
            .join('');
    }
    // 鈹€鈹€ end model helpers 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

    function providerDefaultModelHintText(value = '', models = []) {
        const current = String(value || '').trim();
        if (!Array.isArray(models) || !models.length) return '还没有已同步模型，仍可手动输入并保存。';
        if (!current) return `已同步 ${models.length} 个模型，可搜索或展开列表选择。`;
        const matched = models.some((item) => String(item).toLowerCase() === current.toLowerCase());
        return matched
            ? '已匹配到已同步列表中的模型。'
            : '当前模型不在已同步列表中，可继续手动保存。';
    }

    function modelSlotHintText(value = '', models = []) {
        const current = String(value || '').trim();
        if (!Array.isArray(models) || !models.length) return '当前供应商还没有同步模型，可切换供应商或先同步。';
        if (!current) return `已同步 ${models.length} 个模型，可搜索或展开列表选择。`;
        const matched = models.some((item) => String(item).toLowerCase() === current.toLowerCase());
        return matched ? '已匹配到当前供应商模型。' : '当前输入不在同步列表中。';
    }

    function renderProviderModelMenu() {
        const draft = ensureProviderEditorDraft();
        const input = document.getElementById('provider-default-model-input');
        const menu = document.getElementById('provider-default-model-menu');
        const hint = document.getElementById('provider-default-model-hint');
        if (!menu || !hint) return;
        const query = input?.value || draft.defaultModel || '';
        const models = normalizeModelIdList([
            ...(Array.isArray(draft.models) ? draft.models : []),
            ...(Array.isArray(draft._allModels) ? draft._allModels.map((item) => item?.id || item?.name || '') : []),
        ]);
        const items = filteredProviderModels(query, models);
        hint.textContent = providerDefaultModelHintText(query, models);
        if (!state.providerModelMenuOpen) {
            menu.innerHTML = '';
            menu.classList.remove('open');
            return;
        }
        menu.classList.add('open');
        menu.innerHTML = items.length
            ? items.map((item, index) => `
          <button class="provider-model-option ${String(item).toLowerCase() === String(query).trim().toLowerCase() ? 'active' : ''}" data-action="pick-provider-default-model" data-model-index="${index}" type="button">
            <span>${escapeHtml(item)}</span>
            ${String(item).toLowerCase() === String(query).trim().toLowerCase() ? '<em>已选</em>' : ''}
          </button>
        `).join('')
            : '<div class="provider-model-empty">没有获取到模型，仍可手动输入保存。</div>';
    }

    function getSlot(slotId) {
        return ensureAiSettings().defaultModels[normalizeModelSlotId(slotId)];
    }

    function getCurrentModelSlotContextState() {
        const slotId = state.activeModelSlot;
        const isContactContext = state.activeModelSlotContext === 'contact';
        const contact = byId(state.currentContactId) || state.contacts[0];
        const slot = isContactContext
            ? {
                providerId: contact?.settings?.modelProviderId || state.activeModelProviderId || getSlot('chat')?.providerId || 'openai',
                model: slotId === 'consciousness'
                    ? (contact?.settings?.loopModel || '')
                    : (contact?.settings?.model || ''),
            }
            : getResolvedSlot(slotId);
        const provider = getProviderById(slot?.providerId) || getProviderById(getSlot('chat')?.providerId);
        return { slot, provider, models: provider?.models || [] };
    }

    function renderModelSlotMenu() {
        const menu = document.getElementById('model-slot-menu');
        const hint = document.getElementById('model-slot-hint');
        const input = document.getElementById('model-slot-input');
        if (!menu || !hint) return;
        const { slot, models } = getCurrentModelSlotContextState();
        const query = input?.value || slot?.model || '';
        hint.textContent = modelSlotHintText(query, normalizeModelIdList(models));
        menu.innerHTML = '';
        menu.classList.remove('open');
    }

    function getResolvedSlot(slotId) {
        return getSlot(normalizeModelSlotId(slotId));
    }

    function slotTitle(slotId) {
        const normalizedSlotId = normalizeModelSlotId(slotId);
        return ({
            chat: '\u804a\u5929\u6a21\u578b',
            summary: '\u6458\u8981\u6a21\u578b',
            vision: 'Vision \u6a21\u578b',
            translate: '\u7ffb\u8bd1\u6a21\u578b',
            consciousness: '\u610f\u8bc6\u5faa\u73af\u6a21\u578b',
            voice: '\u8bed\u97f3\u6a21\u578b',
        })[normalizedSlotId] || normalizedSlotId;
    }

    function slotDesc(slotId) {
        const normalizedSlotId = normalizeModelSlotId(slotId);
        return ({
            chat: '\u5168\u5c40\u9ed8\u8ba4\u4f7f\u7528\u7684\u804a\u5929\u6a21\u578b\u3002',
            summary: '\u7528\u4e8e\u751f\u6210\u5bf9\u8bdd\u6458\u8981\uff0c\u63a8\u8350\u9009\u62e9\u4fbf\u5b9c\u4e14\u7a33\u5b9a\u7684\u6a21\u578b\u3002',
            vision: '\u7528\u4e8e\u8bc6\u56fe\u3001OCR \u4e0e\u622a\u56fe\u5206\u6790\u7684\u7edf\u4e00\u5165\u53e3\u3002',
            translate: '\u7528\u4e8e\u7ffb\u8bd1\u6d88\u606f\u5185\u5bb9\uff0c\u63a8\u8350\u9009\u62e9\u901f\u5ea6\u5feb\u7684\u6a21\u578b\u3002',
            consciousness: '\u7528\u4e8e\u610f\u8bc6\u5faa\u73af\u3001\u4e3b\u52a8\u601d\u8003\u4e0e\u76f8\u5173\u540e\u53f0\u80fd\u529b\u3002',
            voice: '\u7528\u4e8e\u6587\u672c\u8f6c\u8bed\u97f3\uff0c\u8bfb\u53d6\u8bed\u97f3\u670d\u52a1\u5730\u5740\u4e0e voice ID\u3002',
        })[normalizedSlotId] || '';
    }

    function slotValue(slotId) {
        const normalizedSlotId = normalizeModelSlotId(slotId);
        const slot = getResolvedSlot(normalizedSlotId);
        if (normalizedSlotId === 'voice') {
            if (!slot) return '\u672a\u8bbe\u7f6e';
            const provider = slot.provider || '\u8bed\u97f3\u670d\u52a1';
            const voiceId = slot.voice_id || slot.voiceId || '\u672a\u8bbe\u7f6e';
            return `${provider} / ${voiceId}`;
        }
        const provider = getProviderById(slot?.providerId);
        if (!slot) return '\u672a\u8bbe\u7f6e';
        return `${provider?.name || '\u672a\u8bbe\u7f6e'} / ${slot.model || '\u672a\u8bbe\u7f6e'}`;
    }


    function getPromptValue(slotId) {
        return ensureAiSettings().defaultPrompts?.[normalizeModelSlotId(slotId)] || '';
    }

    function slotIcon(slotId) {
        const normalizedSlotId = normalizeModelSlotId(slotId);
        return ({
            chat: icon('comment'),
            summary: icon('file'),
            vision: icon('search'),
            translate: icon('chatArrow'),
            consciousness: icon('history'),
            voice: icon('mic'),
        })[normalizedSlotId] || icon('file');
    }

    function slotUsesPrompt(slotId) {
        const normalizedSlotId = normalizeModelSlotId(slotId);
        return normalizedSlotId !== 'chat' && normalizedSlotId !== 'voice';
    }

    function renderDefaultModelCard(slotId) {
        return `
      <article class="default-model-card">
        <div class="default-model-head">
          <div class="default-model-icon">${slotIcon(slotId)}</div>
          <div class="default-model-copy">
            <strong>${escapeHtml(slotTitle(slotId))}</strong>
            <p>${escapeHtml(slotDesc(slotId))}</p>
          </div>
          ${slotUsesPrompt(slotId) ? `<button class="model-gear-btn" data-action="open-prompt-editor" data-slot="${slotId}" aria-label="\u63d0\u793a\u8bcd\u8bbe\u7f6e">${icon('settings')}</button>` : '<span class="header-spacer"></span>'}
        </div>
        <button class="model-value-pill" data-action="open-model-slot" data-slot="${slotId}">
          <span class="model-value-badge">\u4f7f</span>
          <span>${escapeHtml(slotValue(slotId))}</span>
        </button>
      </article>
    `;
    }

    function renderPromptEditorPage() {
        const slotId = normalizeModelSlotId(state.activePromptSlot);
        const value = getPromptValue(slotId);
        return `
      <section class="settings-page page-block ai-settings-page ai-prompt-page">
        <div class="settings-group glass-frost ai-panel ai-form-group">
          <h3>${escapeHtml(slotTitle(slotId))} \u63d0\u793a\u8bcd</h3>
          <p class="section-eyebrow">\u7528\u4e8e\u5b9a\u4e49\u8fd9\u4e2a\u80fd\u529b\u4f4d\u7684\u9ed8\u8ba4\u63d0\u793a\u8bcd\u6a21\u677f\uff0c\u540e\u7eed\u63a5\u5165\u5bf9\u5e94\u540e\u7aef\u4efb\u52a1\u65f6\u4f1a\u76f4\u63a5\u4f7f\u7528\u8fd9\u91cc\u7684\u5185\u5bb9\u3002</p>
          <textarea id="slot-prompt-input" class="ai-textarea ai-prompt-textarea" placeholder="\u5728\u8fd9\u91cc\u8f93\u5165\u9ed8\u8ba4\u63d0\u793a\u8bcd">${escapeHtml(value)}</textarea>
          <p class="section-eyebrow">\u53d8\u91cf\u4f4d\u540e\u7eed\u53ef\u4ee5\u7ee7\u7eed\u6269\u5c55\uff0c\u76ee\u524d\u5148\u652f\u6301\u6309\u80fd\u529b\u4f4d\u5355\u72ec\u4fdd\u5b58\u3002</p>
        </div>
        <div class="settings-group glass-frost ai-panel ai-prompt-actions">
          <button class="ghost-action prompt-reset-btn" data-action="reset-slot-prompt" data-slot="${slotId}">\u91cd\u7f6e\u4e3a\u9ed8\u8ba4</button>
          <button class="bottom-tab active prompt-save-btn" data-action="save-slot-prompt" data-slot="${slotId}">\u4fdd\u5b58</button>
        </div>
      </section>
    `;
    }

    function renderThemeSettingsPage() {
        const veilOptions = [
            { id: '\u5976\u6cb9\u7c89', key: 'rose', desc: '\u67d4\u548c\u7c89\u767d' },
            { id: '\u4e91\u96fe\u7070', key: 'mist', desc: '\u51b7\u6de1\u6d45\u7070' },
            { id: '\u5976\u6cb9\u674f', key: 'cream', desc: '\u6696\u8c03\u7c73\u767d' },
        ];
        const fullUiOptions = [
            { id: 'windowsill', key: 'windowsill', name: '\u7a97\u53f0', desc: '\u9f20\u5c3e\u8349\xb7\u9676\u571f\xb7\u4e9a\u9ebb \xb7 \u51b7\u9759\u5de5\u5177\u611f' },
            { id: 'tape', key: 'tape', name: '\u78c1\u5e26', desc: '\u78e8\u7802\u73bb\u7483\xb7\u9493\u8272\xb7\u7b49\u5bbd\u5b57 \xb7 \u8f6f\u4ef6\u8bda\u5b9e' },
        ];
        const current = state.globalSettings.theme;
        const isFullUi = FULL_UI_THEMES.includes(current);
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u5168\u5c40\u914d\u8272</h3>
          <p class="section-eyebrow">\u9996\u9875\u3001\u5217\u8868\u3001\u8bbe\u7f6e\u9875\u7684\u5e95\u8272\u8c03\u3002</p>
          <div class="theme-choice-list">
            ${veilOptions.map((item) => `
              <button class="theme-choice-item ${!isFullUi && (current === item.id || current === item.key) ? 'active' : ''}" data-action="pick-theme-mode" data-theme="${item.id}">
                <span class="theme-choice-copy">
                  <strong>${escapeHtml(item.id)}</strong>
                  <em>${escapeHtml(item.desc)}</em>
                </span>
                <span class="theme-choice-check">${!isFullUi && (current === item.id || current === item.key) ? '\u5df2\u9009' : ''}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u804a\u5929\u5b8c\u6574\u4e3b\u9898</h3>
          <p class="section-eyebrow">\u8986\u76d6\u6574\u4e2a\u804a\u5929\u754c\u9762\uff0c\u5305\u542b\u6c14\u6ce1\u3001\u8f93\u5165\u6846\u3001\u5bfc\u822a\u680f\u3002</p>
          <div class="theme-choice-list">
            ${fullUiOptions.map((item) => `
              <button class="theme-choice-item ${current === item.id ? 'active' : ''}" data-action="pick-theme-mode" data-theme="${item.id}">
                <span class="theme-choice-copy">
                  <strong>${escapeHtml(item.name)}</strong>
                  <em>${escapeHtml(item.desc)}</em>
                </span>
                <span class="theme-choice-check">${current === item.id ? '\u5df2\u9009' : ''}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    }

    function renderAccountSettingsPage() {
        const p = state.accountProfile || {};
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u6211\u7684\u8d26\u53f7</h3>
          ${navRow('\u5934\u50cf', '\u66f4\u6362\u5934\u50cf', 'open-account-avatar')}
          ${navRow('\u6635\u79f0', p.nickname || '\u5c0f\u9152', 'open-account-nickname')}
          ${navRow('\u4e2a\u6027\u7b7e\u540d', p.signature || '\u7ba1\u7406\u4e2a\u4eba\u8d44\u6599\u4e0e\u57fa\u7840\u504f\u597d', 'open-account-signature')}
          <input id="account-avatar-file" class="moment-image-input" type="file" accept="image/*" />
        </div>
      </section>
    `;
    }

    function renderMemoryTempBar(temp) {
        const t = Math.max(0, Math.min(100, Number(temp) || 0));
        const color = t > 60 ? '#c9908a' : t > 30 ? '#c8a07a' : '#b0b0b8';
        return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:${color};">
          <span style="display:inline-block;width:${Math.round(t * 0.36)}px;max-width:36px;min-width:2px;height:3px;border-radius:2px;background:${color};"></span>
          ${t > 0 ? `热度 ${t}` : ''}
        </span>`;
    }

    function renderMemoryServicePage() {
        const contact = byId(state.currentContactId) || state.contacts[0];
        const entries = Array.isArray(state.memoryServiceEntries) ? state.memoryServiceEntries : [];
        const candidates = Array.isArray(state.memoryCandidates) ? state.memoryCandidates : [];
        const sort = state.memoryServiceSort || 'updated_at';
        const SORTS = [
            { key: 'updated_at', label: '最新' },
            { key: 'importance', label: '最重要' },
            { key: 'temperature', label: '有温度' },
        ];
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆服务</h3>
          <p class="section-eyebrow">当前联系人：${escapeHtml(contact?.name || '未命名')}。这里直接读写后端 memories，不再以本地假数据为准。</p>
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="memory-service-refresh">刷新</button>
            <button class="ghost-action" data-action="memory-service-create">新建记忆</button>
          </div>
          <div class="ai-inline-actions" style="margin-top:8px;">
            ${SORTS.map(s => `<button class="ghost-action${sort === s.key ? ' active' : ''}" data-action="memory-service-sort" data-sort="${s.key}">${s.label}</button>`).join('')}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆列表</h3>
          ${state.memoryServiceLoading ? '<p class="section-eyebrow">正在加载…</p>' : ''}
          ${!state.memoryServiceLoading && !entries.length ? '<p class="section-eyebrow">这个角色还没有记忆。</p>' : ''}
          ${entries.map((item) => {
            const text = item.compressed_content || item.raw_content || item.content || '未命名记忆';
            const imp = item.importance ?? 3;
            const temp = item.temperature ?? 0;
            const impDots = '★'.repeat(imp) + '☆'.repeat(5 - imp);
            return `
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${escapeHtml(text)}</strong>
                <em style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
                  <span>${escapeHtml(item.category || '')}</span>
                  <span style="color:#c9908a;">${impDots}</span>
                  ${renderMemoryTempBar(temp)}
                </em>
                ${item.expires_at ? `<em>过期：${escapeHtml(String(item.expires_at))}</em>` : ''}
              </div>
              <div class="ai-inline-actions" style="margin-top:10px;">
                <button class="ghost-action" data-action="memory-service-edit" data-memory-id="${escapeHtml(String(item.id || ''))}">编辑</button>
                <button class="ghost-action" data-action="memory-service-delete" data-memory-id="${escapeHtml(String(item.id || ''))}">删除</button>
              </div>
            </div>`;
          }).join('')}
        </div>
        ${candidates.length > 0 ? `
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>待审记忆候选 <span style="font-size:12px;font-weight:400;color:var(--muted);">· 日循环提取，可采纳或忽略</span></h3>
          ${candidates.map(c => `
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${escapeHtml(c.content || c.summary || '')}</strong>
                <em>${escapeHtml(c.category || '')} / importance ${c.importance ?? 3}</em>
              </div>
              <div class="ai-inline-actions" style="margin-top:8px;">
                <button class="ghost-action" data-action="memory-candidate-promote" data-candidate-id="${escapeHtml(String(c.id || ''))}">✓ 采纳</button>
                <button class="ghost-action" data-action="memory-candidate-dismiss" data-candidate-id="${escapeHtml(String(c.id || ''))}">✕ 忽略</button>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </section>
    `;
    }
    function currentMemoryServiceAgentId() {
        return String(state.currentContactId || byId(state.currentContactId)?.id || 'default').trim() || 'default';
    }

    async function loadMemoryService(agentId = currentMemoryServiceAgentId(), { silent = true } = {}) {
        const normalizedAgentId = String(agentId || '').trim();
        if (!normalizedAgentId) return;
        state.memoryServiceLoading = true;
        render();
        try {
            const sortBy = state.memoryServiceSort || 'updated_at';
            const qs = new URLSearchParams({ agent_id: normalizedAgentId, sort_by: sortBy, order: 'desc', limit: '100' });
            const [memResp, candResp] = await Promise.all([
                fetch(`${API_BASE}/api/memories?${qs.toString()}`),
                fetch(`${API_BASE}/api/consciousness/memory-candidates?agent_id=${encodeURIComponent(normalizedAgentId)}&limit=20`),
            ]);
            if (!memResp.ok) throw new Error(`HTTP ${memResp.status}`);
            const data = await memResp.json().catch(() => ({}));
            state.memoryServiceEntries = Array.isArray(data?.memories) ? data.memories : [];
            if (candResp.ok) {
                const candData = await candResp.json().catch(() => ({}));
                state.memoryCandidates = Array.isArray(candData?.candidates) ? candData.candidates : [];
            }
        } catch (error) {
            console.warn('[memory service] load failed', error);
            if (!silent) { state.toast = '记忆加载失败'; window.setTimeout(() => { state.toast = ''; render(); }, 1200); }
        } finally {
            state.memoryServiceLoading = false;
            render();
        }
    }

    async function promoteMemoryCandidate(candidateId) {
        const agentId = currentMemoryServiceAgentId();
        try {
            const resp = await fetch(`${API_BASE}/api/consciousness/memory-candidates/${encodeURIComponent(candidateId)}/promote?agent_id=${encodeURIComponent(agentId)}`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
            });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            state.memoryCandidates = (state.memoryCandidates || []).filter(c => String(c.id) !== String(candidateId));
            state.toast = '✓ 已采纳为正式记忆';
            window.setTimeout(() => { state.toast = ''; render(); }, 1800);
            await loadMemoryService(agentId, { silent: true });
        } catch (e) { console.warn('[memory] promote failed', e); }
    }

    async function dismissMemoryCandidate(candidateId) {
        try {
            const resp = await fetch(`${API_BASE}/api/consciousness/memory-candidates/${encodeURIComponent(candidateId)}`, { method: 'DELETE' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            state.memoryCandidates = (state.memoryCandidates || []).filter(c => String(c.id) !== String(candidateId));
            render();
        } catch (e) { console.warn('[memory] dismiss failed', e); }
    }
    function promptMemoryDraft(existing = null) {
        const base = existing || {};
        const content = window.prompt('\u8bb0\u5fc6\u5185\u5bb9', String(base.raw_content || base.content || '').trim());
        if (content === null) return null;
        const category = window.prompt('\u5206\u5c42 / category\uff08core_profile / recent_pending / deep / ephemeral\uff09', String(base.category || 'recent_pending'));
        if (category === null) return null;
        const visibility = window.prompt('\u53ef\u89c1\u8303\u56f4\uff08private / shared / public\uff09', String(base.visibility || 'private'));
        if (visibility === null) return null;
        const importance = window.prompt('\u91cd\u8981\u5ea6\uff081-5\uff09', String(base.importance ?? 3));
        if (importance === null) return null;
        const expiresAt = window.prompt('\u8fc7\u671f\u65f6\u95f4 ISO\uff08\u53ef\u7559\u7a7a\uff09', String(base.expires_at || ''));
        if (expiresAt === null) return null;
        return {
            agent_id: currentMemoryServiceAgentId(),
            content: String(content || '').trim(),
            raw_content: String(content || '').trim(),
            category: String(category || '').trim() || 'recent_pending',
            visibility: String(visibility || '').trim() || 'private',
            importance: Math.max(1, Math.min(5, Number(importance) || 3)),
            expires_at: String(expiresAt || '').trim() || null,
        };
    }

    async function createMemoryServiceEntry() {
        const draft = promptMemoryDraft();
        if (!draft || !draft.content) return;
        const resp = await fetch(`${API_BASE}/api/memories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(draft),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
    }

    async function updateMemoryServiceEntry(memoryId) {
        const current = state.memoryServiceEntries.find((item) => String(item.id) === String(memoryId));
        if (!current) return;
        const draft = promptMemoryDraft(current);
        if (!draft || !draft.content) return;
        const resp = await fetch(`${API_BASE}/api/memories/${encodeURIComponent(memoryId)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(draft),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
    }

    async function deleteMemoryServiceEntry(memoryId) {
        if (!window.confirm('\u5220\u9664\u8fd9\u6761\u8bb0\u5fc6\uff1f')) return;
        const resp = await fetch(`${API_BASE}/api/memories/${encodeURIComponent(memoryId)}`, {
            method: 'DELETE',
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
    }

    function renderBackendSyncPage() {
        const meta = readSyncMeta();
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u540c\u6b65\u540e\u7aef</h3>
          <p class="section-eyebrow">\u524d\u7aef\u5feb\u7167\u4f1a\u672c\u5730\u4fdd\u5b58\uff0c\u5e76\u81ea\u52a8 push/pull \u5230\u540e\u7aef\u3002</p>
          ${navRow('\u6570\u636e\u5e93', 'Supabase')}
          ${navRow('\u540e\u7aef\u63a5\u53e3', API_BASE)}
          ${navRow('\u8bbe\u5907 ID', getDeviceId())}
          ${navRow('\u4e0a\u6b21\u540c\u6b65', formatDisplayTime(meta.last_server_updated_at, { fallback: '\u6682\u65e0', includeYear: true }))}
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="sync-pull-now">\u7acb\u5373\u62c9\u53d6</button>
            <button class="ghost-action" data-action="sync-push-now">\u7acb\u5373\u4e0a\u4f20</button>
          </div>
        </div>
      </section>
    `;
    }

    function renderExportSettingsPage() {
        const s = state.globalSettings;
        const formats = ['Markdown', 'JSON', 'TXT'];
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u5bfc\u51fa\u683c\u5f0f</h3>
          <div class="theme-choice-list">
            ${formats.map((item) => `
              <button class="theme-choice-item ${s.exportFormat === item ? 'active' : ''}" data-action="pick-export-format" data-format="${item}">
                <span class="theme-choice-copy">
                  <strong>${escapeHtml(item)}</strong>
                  <em>\u7528\u4e8e\u804a\u5929\u8bb0\u5f55\u5bfc\u51fa</em>
                </span>
                <span class="theme-choice-check">${s.exportFormat === item ? '\u5df2\u9009' : ''}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    }

    function navRow(label, value, action = 'noop', attrs = {}) {
        const extra = Object.entries(attrs).map(([key, value]) => ` data-${key}="${escapeHtml(String(value))}"`).join('');
        return `
      <button class="setting-row nav-row" data-action="${action}"${extra}>
        <div class="setting-copy"><strong>${escapeHtml(label)}</strong>${value ? `<p>${escapeHtml(value)}</p>` : ''}</div>
        <span class="row-chevron">${icon('chevron')}</span>
      </button>
    `;
    }

    function openAiSubView(view, setup) {
        state.viewStack.push(state.currentView);
        if (typeof setup === 'function') setup();
        state.currentView = view;
        render();
    }

    function closeAiSubView() {
        state.currentView = state.viewStack.pop() || 'settings';
        render();
    }

    async function loadAiSettings() {
        try {
            const resp = await fetch(`${API_BASE}/api/settings/ai`);
            if (!resp.ok) return;
            const data = await resp.json();
            mergeAiSettings(data.settings?.aiSettings || data.settings?.ai || data.settings?.ai_settings || data.settings || {});
            render();
        } catch (error) {
            console.warn('[ai settings] load failed', error);
        }
    }

    async function loadMoments({ silent = true } = {}) {
        try {
            const qs = new URLSearchParams({
                viewer_type: 'user',
                viewer_id: 'me',
            });
            const resp = await fetch(`${API_BASE}/api/moments?${qs.toString()}`);
            if (!resp.ok) {
                if (!silent) throw new Error(`HTTP ${resp.status}`);
                return;
            }
            const data = await resp.json().catch(() => ({}));
            if (!Array.isArray(data?.moments)) return;
            if (data.moments.length > 0) {
                state.moments = mergeMoments(state.moments, data.moments);
                queueLocalSyncIfChanged(120);
            }
            render();
        } catch (error) {
            console.warn('[moments] load failed', error);
            if (!silent) {
                state.toast = '朋友圈加载失败';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1400);
            }
        }
    }

    async function createMoment(body) {
        const resp = await fetch(`${API_BASE}/api/moments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
        return normalizeMoment(data?.moment || body);
    }

    async function updateMoment(momentId, body) {
        const resp = await fetch(`${API_BASE}/api/moments/${encodeURIComponent(momentId)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
        return data;
    }

    async function deleteMomentApi(momentId, authorType, authorId) {
        const qs = new URLSearchParams({
            author_type: String(authorType || 'user'),
            author_id: String(authorId || 'me'),
        });
        const resp = await fetch(`${API_BASE}/api/moments/${encodeURIComponent(momentId)}?${qs.toString()}`, {
            method: 'DELETE',
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
        return data;
    }

    async function toggleMomentLikeApi(momentId, actor) {
        const resp = await fetch(`${API_BASE}/api/moments/${encodeURIComponent(momentId)}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                actor_type: actor.author_type,
                actor_id: actor.author_id,
                actor_name: actor.author_name,
            }),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
        return normalizeMoment(data?.moment || {});
    }

    async function addMomentCommentApi(momentId, actor, text) {
        const resp = await fetch(`${API_BASE}/api/moments/${encodeURIComponent(momentId)}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                actor_type: actor.author_type,
                actor_id: actor.author_id,
                actor_name: actor.author_name,
                text,
            }),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data?.detail || `HTTP ${resp.status}`);
        return normalizeMoment(data?.moment || {});
    }

    async function saveInsightField(field, rawValue) {
        const agentId = state.currentContactId || '';
        const value = (rawValue || '').trim() || null;
        const body = { agentId };
        if (field === 'impression') body.impression = value;
        else if (field === 'relationshipProgress') body.relationshipProgress = value;
        else if (field === 'likesSummary') body.likesSummary = value;
        else return;
        try {
            state.toast = '\u4fdd\u5b58\u4e2d\u2026';
            render();
            const resp = await fetch(`${API_BASE}/api/companion-state/summary`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json().catch(() => ({}));
            state.companionState = normalizeCompanionState(data?.state || state.companionState);
            state.toast = '\u5df2\u4fdd\u5b58';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
        } catch (e) {
            console.warn('[insight save]', e);
            state.toast = '\u4fdd\u5b58\u5931\u8d25';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1400);
        }
    }

    async function loadCompanionState(agentId = state.currentContactId, { silent = true } = {}) {
        try {
            const normalizedAgentId = String(agentId || '').trim();
            const qs = normalizedAgentId ? `?agent_id=${encodeURIComponent(normalizedAgentId)}` : '';
            const resp = await fetch(`${API_BASE}/api/companion-state${qs}`);
            if (!resp.ok) {
                if (!silent) throw new Error(`HTTP ${resp.status}`);
                return;
            }
            const data = await resp.json().catch(() => ({}));
            state.companionState = normalizeCompanionState(data?.state || {});
            render();
        } catch (error) {
            console.warn('[companion state] load failed', error);
            if (!silent) {
                state.toast = '状态读取失败';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            }
        }
    }

    async function loadAgentPersona(agentId, { silent = true } = {}) {
        const normalizedAgentId = String(agentId || '').trim();
        if (!normalizedAgentId) return '';
        try {
            const resp = await fetch(`${API_BASE}/api/agents/${encodeURIComponent(normalizedAgentId)}/persona`);
            if (!resp.ok) {
                if (!silent) throw new Error(`HTTP ${resp.status}`);
                return '';
            }
            const data = await resp.json().catch(() => ({}));
            const contact = byId(normalizedAgentId);
            if (contact) {
                contact.persona = String(data?.persona || '');
                if (state.currentView === 'contactSettings' && state.currentContactId === normalizedAgentId) render();
            }
            return String(data?.persona || '');
        } catch (error) {
            console.warn('[agent persona] load failed', error);
            if (!silent) {
                state.toast = '浜鸿璇诲彇澶辫触';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            }
            return '';
        }
    }

    async function saveAgentPersona(agentId, persona) {
        const normalizedAgentId = String(agentId || '').trim();
        if (!normalizedAgentId) return;
        try {
            await fetch(`${API_BASE}/api/agents/${encodeURIComponent(normalizedAgentId)}/persona`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ persona: String(persona || '') }),
            });
        } catch (error) {
            console.warn('[agent persona] save failed', error);
        }
    }

    function queueAgentPersonaSave(agentId, persona, delay = 260) {
        const normalizedAgentId = String(agentId || '').trim();
        if (!normalizedAgentId) return;
        if (agentPersonaSaveTimers.has(normalizedAgentId)) {
            clearTimeout(agentPersonaSaveTimers.get(normalizedAgentId));
        }
        const timer = window.setTimeout(() => {
            agentPersonaSaveTimers.delete(normalizedAgentId);
            saveAgentPersona(normalizedAgentId, persona);
        }, delay);
        agentPersonaSaveTimers.set(normalizedAgentId, timer);
    }

    async function loadMcpLibrary({ silent = true } = {}) {
        try {
            const resp = await fetch(`${API_BASE}/api/mcp/library`);
            if (!resp.ok) {
                if (!silent) throw new Error(`HTTP ${resp.status}`);
                return;
            }
            const data = await resp.json();
            if (!Array.isArray(data.tools)) return;
            const ai = ensureAiSettings();
            const normalized = data.tools
                .map(normalizeMcpTool)
                .filter((item) => shouldExposeMcpTool(item.id));
            ai.mcpLibrary = {
                ...(ai.mcpLibrary || {}),
                tools: normalized,
            };
            saveAiSettings();
            render();
        } catch (error) {
            console.warn('[mcp library] load failed', error);
            if (!silent) {
                state.toast = '\u540c\u6b65 MCP \u5de5\u5177\u5931\u8d25';
                render();
                window.setTimeout(() => { state.toast = ''; render(); }, 1300);
            }
        }
    }

    async function saveAiSettings() {
        syncLegacyAiSettings();
        const ai = ensureAiSettings();
        ai.providers = (ai.providers || []).map(normalizeProviderRecord);
        Object.keys(ai.defaultModels || {}).forEach((key) => {
            if (key !== 'voice') ai.defaultModels[key] = normalizeModelSlotConfig(ai.defaultModels[key]);
        });
        state.aiSettingsSaving = true;
        try {
            await fetch(`${API_BASE}/api/settings/ai`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings: { ...state.globalSettings, aiSettings: ai } }),
            });
        } catch (error) {
            console.error('[ai settings] save failed', error);
        } finally {
            state.aiSettingsSaving = false;
        }
    }

    function renderAiInterfacePage() {
        const ai = ensureAiSettings();
        const mcpCount = (ai.mcpLibrary?.tools || []).filter((item) => item.enabled !== false).length;
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <h3>AI \u63a5\u53e3</h3>
          ${navRow('\u9ed8\u8ba4\u6a21\u578b', '\u804a\u5929 / \u6458\u8981 / Vision / \u7ffb\u8bd1 / \u610f\u8bc6\u5faa\u73af / \u8bed\u97f3', 'open-default-models')}
          ${navRow('\u6a21\u578b\u4f9b\u5e94\u5546', `\u5171 ${ai.providers.length} \u4e2a`, 'open-provider-catalog')}
          ${navRow('MCP \u5de5\u5177\u5e93', `\u5df2\u542f\u7528 ${mcpCount} \u4e2a`, 'open-mcp-library')}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>\u5f53\u524d\u804a\u5929\u9ed8\u8ba4</h3>
          ${navRow('\u804a\u5929\u6a21\u578b', slotValue('chat'))}
        </div>
      </section>
    `;
    }

    function renderMcpLibraryPage() {
        const ai = ensureAiSettings();
        const tools = (Array.isArray(ai.mcpLibrary?.tools) ? ai.mcpLibrary.tools : [])
            .map(normalizeMcpTool)
            .filter((item) => shouldExposeMcpTool(item.id));
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <div class="ai-inline-actions">
            <h3 style="margin:0;">MCP \u5de5\u5177\u5e93</h3>
            <button class="ghost-action" data-action="sync-mcp-library">\u540c\u6b65\u5de5\u5177</button>
          </div>
          <p class="section-eyebrow">\u53ea\u5c55\u793a\u804a\u5929\u4e3b\u52a8\u573a\u666f\u5e38\u7528\u5de5\u5177\uff0c\u540c\u6b65\u5230\u8f93\u5165\u6846\u4e0a\u65b9\u5206\u7c7b\u3002</p>
          ${tools.map((tool) => `
            <div class="provider-catalog-row">
              <div class="provider-row-main" style="cursor:default;">
                <div class="setting-copy">
                  <strong>${escapeHtml(tool.label || tool.id || '')}</strong>
                  <p>${escapeHtml(tool.description || tool.prompt || (tool.id || ''))}</p>
                </div>
              </div>
              <button class="switch-btn ${tool.enabled !== false ? 'on' : 'off'}" data-action="toggle-mcp-tool" data-tool-id="${escapeHtml(tool.id || '')}" aria-pressed="${tool.enabled !== false}">
                ${renderSwitchInner(tool.enabled !== false)}
              </button>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    }

    function renderDefaultModelsPage() {
        const ids = ['chat', 'summary', 'vision', 'translate', 'consciousness', 'voice'];
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="default-model-list">
          ${ids.map((slotId) => renderDefaultModelCard(slotId)).join('')}
        </div>
      </section>
    `;
    }

    function renderModelSlotPage() {
        const slotId = normalizeModelSlotId(state.activeModelSlot);
        const isContactContext = state.activeModelSlotContext === 'contact';
        const contact = byId(state.currentContactId) || state.contacts[0];
        if (!isContactContext && slotId === 'voice') {
            const slot = getResolvedSlot('voice') || {};
            return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${escapeHtml(slotTitle('voice'))}</h3>
          <p class="section-eyebrow">${escapeHtml(slotDesc('voice'))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u8bed\u97f3\u670d\u52a1\u914d\u7f6e</h3>
          <label class="ai-field-label">Provider</label>
          <input id="voice-slot-provider-input" class="ai-input" value="${escapeHtml(slot.provider || '')}" placeholder="voice-mcp" data-plain-input="true" />
          <label class="ai-field-label">Service URL</label>
          <input id="voice-slot-service-url-input" class="ai-input" value="${escapeHtml(slot.service_url || slot.base_url || '')}" placeholder="https://voice.example.com/speak" data-plain-input="true" />
          <label class="ai-field-label">Voice ID</label>
          <input id="voice-slot-voice-id-input" class="ai-input" value="${escapeHtml(slot.voice_id || slot.voiceId || '')}" placeholder="default voice_id" data-plain-input="true" />
          <label class="ai-field-label">Speaker</label>
          <input id="voice-slot-speaker-input" class="ai-input" value="${escapeHtml(slot.speaker || '')}" placeholder="\u53ef\u9009 speaker" data-plain-input="true" />
          <label class="ai-field-label">Emotion</label>
          <input id="voice-slot-emotion-input" class="ai-input" value="${escapeHtml(slot.emotion || '')}" placeholder="\u53ef\u9009 emotion" data-plain-input="true" />
          <label class="ai-field-label">Speed</label>
          <input id="voice-slot-speed-input" class="ai-input" value="${escapeHtml(slot.speed ?? 1)}" placeholder="1.0" data-plain-input="true" />
          <label class="ai-field-label">Format</label>
          <input id="voice-slot-format-input" class="ai-input" value="${escapeHtml(slot.format || '')}" placeholder="audio/mpeg" data-plain-input="true" />
        </div>
      </section>
    `;
        }
        const slot = isContactContext
            ? {
                providerId: contact?.settings?.modelProviderId || state.activeModelProviderId || getSlot('chat')?.providerId || 'openai',
                model: slotId === 'consciousness'
                    ? (contact?.settings?.loopModel || '')
                    : (contact?.settings?.model || ''),
            }
            : getResolvedSlot(slotId);
        const providers = ensureAiSettings().providers.filter((item) => item.enabled);
        const provider = getProviderById(slot.providerId) || getProviderById(getSlot('chat')?.providerId) || providers[0];
        const models = normalizeModelIdList(provider?.models || []);

        if (isContactContext) {
            return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${escapeHtml(slotTitle(slotId))}</h3>
          <p class="section-eyebrow">${escapeHtml(slotDesc(slotId))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u6a21\u578b\u4f9b\u5e94\u5546</h3>
          <div class="ai-chip-row">
            ${providers.map((item) => `<button class="ai-chip ${slot.providerId === item.id ? 'active' : ''}" data-action="pick-slot-provider" data-slot="${slotId}" data-provider-id="${item.id}">${escapeHtml(item.name)}</button>`).join('')}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u6a21\u578b\u5217\u8868</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${escapeHtml(slot.model || '')}" placeholder="${escapeHtml(models[0] || '输入或选择模型')}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="灞曞紑妯″瀷鍒楄〃">
                ${icon('chevron')}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${escapeHtml(modelSlotHintText(slot.model || '', models))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${renderModelSlotChoiceList(slotId, slot, models)}
          </div>
        </div>
      </section>
    `;
        }

        // Global slot: show provider chips + provider.models directly (same structure as contact context)
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${escapeHtml(slotTitle(slotId))}</h3>
          <p class="section-eyebrow">${escapeHtml(slotDesc(slotId))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u6a21\u578b\u4f9b\u5e94\u5546</h3>
          <div class="ai-chip-row">
            ${providers.map((item) => `<button class="ai-chip ${slot.providerId === item.id ? 'active' : ''}" data-action="pick-slot-provider" data-slot="${slotId}" data-provider-id="${item.id}">${escapeHtml(item.name)}</button>`).join('')}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>\u6a21\u578b\u5217\u8868</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${escapeHtml(slot.model || '')}" placeholder="${escapeHtml(models[0] || '输入或选择模型')}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="\u5c55\u5f00\u6a21\u578b\u5217\u8868">
                ${icon('chevron')}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${escapeHtml(modelSlotHintText(slot.model || '', models))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${renderModelSlotChoiceList(slotId, slot, models)}
          </div>
        </div>
      </section>
    `;
    }

    function renderProviderCatalogItem(item) {
        return `
      <div class="provider-catalog-row">
        <button class="provider-row-main" data-action="open-provider-editor" data-provider="${item.id}">
          <div class="setting-copy">
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.defaultModel || '\u672a\u8bbe\u7f6e\u9ed8\u8ba4\u6a21\u578b')}</p>
          </div>
          <span class="provider-inline-state ${item.enabled ? 'enabled' : 'disabled'}">${item.enabled ? '\u5df2\u542f\u7528' : '\u5df2\u7981\u7528'}</span>
          <span class="row-chevron">${icon('chevron')}</span>
        </button>
        <button class="switch-btn ${item.enabled ? 'on' : 'off'}" data-action="toggle-provider-enabled" data-provider-id="${item.id}" aria-pressed="${item.enabled}">
          ${renderSwitchInner(item.enabled)}
        </button>
      </div>
    `;
    }

    function renderProviderCatalogPage() {
        const keyword = state.providerSearch.trim().toLowerCase();
        const providers = ensureAiSettings().providers
            .filter((item) => !keyword || item.name.toLowerCase().includes(keyword) || item.id.toLowerCase().includes(keyword))
            .sort((a, b) => {
                const enabledDelta = Number(!!b.enabled) - Number(!!a.enabled);
                if (enabledDelta !== 0) return enabledDelta;
                return String(a.name || a.id || '').localeCompare(String(b.name || b.id || ''), 'zh-Hans-CN');
            });
        return `
      <section class="settings-page page-block ai-settings-page">
        <div class="search-pill glass-frost ai-search-row">
          <span class="search-icon">${icon('search')}</span>
          <input class="ai-search-input" value="${escapeHtml(state.providerSearch)}" data-action="provider-search" placeholder="\u641c\u7d22\u4f9b\u5e94\u5546" />
        </div>
        <div class="settings-group glass-frost ai-panel provider-catalog-group">
          ${providers.map((item) => renderProviderCatalogItem(item)).join('')}
        </div>
      </section>
    `;
    }

    function renderProviderModelPool(draft) {
        const seenModelIds = new Set();
        const allModels = (Array.isArray(draft._allModels) ? draft._allModels : []).filter((model) => {
            const id = sanitizeModelId(model?.id || model?.name || '');
            const key = id.toLowerCase();
            if (!id || seenModelIds.has(key)) return false;
            seenModelIds.add(key);
            return true;
        });
        const selected = draft._selectedModelIds instanceof Set ? draft._selectedModelIds : new Set(draft._selectedModelIds || []);
        const selTotal = selected.size;

        // Group by vendor
        const vendorMap = {};
        for (const m of allModels) {
            const v = m.vendor || 'Other';
            if (!vendorMap[v]) vendorMap[v] = [];
            vendorMap[v].push(m);
        }
        const vendorOrder = ['OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Qwen', 'GLM', 'Meta', 'Mistral', 'Moonshot', 'Doubao', 'ERNIE', 'Hunyuan', 'Baichuan', 'Spark', '01.AI', 'InternLM', 'Other'];
        const sortedVendors = [...new Set([...vendorOrder.filter((v) => vendorMap[v]), ...Object.keys(vendorMap)])];

        const allSelectable = allModels.map((m) => m.id);
        const allSelected = allSelectable.length > 0 && allSelectable.every((id) => selected.has(id));

        const vendorHtml = sortedVendors.map((vendor) => {
            const mods = vendorMap[vendor] || [];
            const isOpen = !!state.providerModelVendorOpen[vendor];
            const selCount = mods.filter((m) => selected.has(m.id)).length;
            const vendorAllSel = mods.length > 0 && mods.every((m) => selected.has(m.id));
            const body = isOpen ? `
          <div class="vendor-group-body">
            ${mods.map((m) => {
                const isSel = selected.has(m.id);
                const modelIndex = allModels.findIndex((item) => item.id === m.id);
                return `
              <div class="pool-model-row">
                <span class="pool-model-name">${escapeHtml(m.name)}</span>
                <span class="pool-model-caps">${renderModelCapabilityBadges(m)}</span>
                <button class="pool-model-btn${isSel ? ' selected' : ''}"
                  data-action="${isSel ? 'remove-provider-model' : 'add-provider-model'}"
                  data-model-index="${modelIndex}" type="button">${isSel ? '\u2212' : '+'}</button>
              </div>`;
            }).join('')}
          </div>` : '';
            return `
        <div class="vendor-group">
          <div class="vendor-group-head">
            <button class="vendor-group-toggle" data-action="toggle-provider-vendor-group" data-vendor="${escapeHtml(vendor)}" type="button">
              <span class="vendor-group-name">${escapeHtml(vendor)}</span>
              ${selCount ? `<span class="vendor-group-sel">${selCount} \u5df2\u9009</span>` : ''}
              <span class="vendor-group-badge">${mods.length}</span>
              <span class="vendor-group-chevron${isOpen ? ' open' : ''}">${icon('chevron')}</span>
            </button>
            <button class="pool-vendor-selall${vendorAllSel ? ' all-selected' : ''}" data-action="toggle-vendor-all-provider-models" data-vendor="${escapeHtml(vendor)}" type="button" title="${vendorAllSel ? '\u5168\u4e0d\u9009' : '\u5168\u9009'}">${vendorAllSel ? '\u2212\u5168' : '+\u5168'}</button>
          </div>
          ${body}
        </div>`;
        }).join('');

        const emptyHint = !allModels.length ? `<p class="pool-model-empty" style="padding:10px 2px;">\u8fd8\u6ca1\u6709\u6a21\u578b\uff0c\u70b9\u51fb\u201c\u540c\u6b65\u6a21\u578b\u201d\u83b7\u53d6\uff0c\u6216\u624b\u52a8\u6dfb\u52a0\u3002</p>` : '';

        return `
      <div class="prov-model-pool">
        <div class="prov-pool-header">
          <span class="prov-pool-count">${selTotal ? `\u5df2\u9009 <strong>${selTotal}</strong> \u4e2a\u6a21\u578b` : '\u8fd8\u6ca1\u6709\u5df2\u9009\u6a21\u578b'}</span>
          ${allModels.length ? `<button class="pool-selall-btn${allSelected ? ' all-selected' : ''}" data-action="toggle-all-provider-models" type="button">${allSelected ? '\u5168\u4e0d\u9009' : '\u5168\u9009'}</button>` : ''}
        </div>
        ${emptyHint}
        ${vendorHtml}
        <div class="pool-manual-row">
          <input id="provider-manual-model-input" class="ai-input provider-model-input" placeholder="\u624b\u52a8\u8f93\u5165\u6a21\u578b\u540d" autocomplete="off" data-plain-input="true" />
          <button class="pool-manual-add-btn" data-action="add-manual-provider-model" type="button">\uff0b</button>
        </div>
      </div>`;
    }

    function renderModelSlotChoiceList(slotId, slot, models) {
        const list = normalizeModelIdList(models);
        const selected = sanitizeModelId(slot?.model || '');
        if (!list.length) {
            return '<div class="model-choice-empty">当前供应商还没有可选模型，请先在“模型供应商”页同步并保存。</div>';
        }
        return list.map((item, index) => `
          <button class="model-choice-item ${selected === item ? 'active' : ''}" data-action="pick-slot-model" data-slot="${slotId}" data-model-index="${index}">
            <span class="model-choice-name">${escapeHtml(item)}</span>
            <span class="model-choice-check">${selected === item ? '已选' : ''}</span>
          </button>
        `).join('');
    }

    function renderProviderEditorPage() {
        const provider = ensureProviderEditorDraft();
        const explicitApiPath = normalizeProviderApiPath(provider.apiPath || provider.api_path || '', { allowEmpty: true });
        const effectiveApiPath = resolveProviderApiPath(provider);
        const advancedOpen = !!state.providerAdvancedOpen || !!explicitApiPath;
        const syncStatus = state.providerModelSyncStatus?.[provider.id];
        const savedKeyMask = maskedApiKey(provider.apiKey || '');
        const keyIsDirty = !!provider._apiKeyDirty;
        const keyInputValue = keyIsDirty ? String(provider.apiKey || '') : savedKeyMask;
        const keyInputType = keyIsDirty ? (state.providerKeyVisible ? 'text' : 'password') : 'text';
        const keyButtonText = keyIsDirty ? (state.providerKeyVisible ? '隐藏' : '显示') : (savedKeyMask ? '更换' : '显示');
        return `
      <section class="settings-page page-block ai-settings-page provider-editor-page">
        <div class="settings-group glass-frost ai-panel provider-editor-card">

          <div class="prov-sec">
            <h3 class="prov-sec-title">\u63a5\u53e3\u914d\u7f6e</h3>
            <label class="ai-field-label">\u540d\u79f0</label>
            <input id="provider-name-input" class="ai-input" value="${escapeHtml(provider.name || '')}" placeholder="\u4f8b\u5982 SiliconFlow" data-plain-input="true" />
            <label class="ai-field-label">Base URL</label>
            <input id="provider-base-input" class="ai-input" value="${escapeHtml(provider.baseUrl || '')}" placeholder="https://api.example.com/v1" data-plain-input="true" />
            <div class="provider-advanced-head">
              <span class="section-eyebrow">Base URL \u4e0e API \u8def\u5f84\u4e00\u8d77\u62fc\u63a5\u8bf7\u6c42\u5730\u5740</span>
              <button class="provider-advanced-toggle" data-action="toggle-provider-advanced" type="button">
                <span>\u9ad8\u7ea7\u9009\u9879</span>
                <span class="advanced-chevron ${advancedOpen ? 'open' : ''}">${icon('chevron')}</span>
              </button>
            </div>
            <div class="provider-advanced-panel ${advancedOpen ? 'open' : ''}">
              <label class="ai-field-label">API \u8def\u5f84\uff08\u53ef\u9009\uff09</label>
              <input id="provider-api-path-input" class="ai-input" value="${escapeHtml(explicitApiPath)}" placeholder="${escapeHtml(effectiveApiPath)}" data-plain-input="true" />
              <p class="section-eyebrow">\u7559\u7a7a\u65f6\u81ea\u52a8\u4f7f\u7528 ${escapeHtml(effectiveApiPath)}</p>
            </div>
            <label class="ai-field-label">API Key</label>
            <div class="provider-key-row">
              <input id="provider-key-input" class="ai-input provider-key-input" type="${keyInputType}" value="${escapeHtml(keyInputValue)}" placeholder="sk-..." autocomplete="off" autocapitalize="off" spellcheck="false" data-plain-input="true" data-masked="${!keyIsDirty && savedKeyMask ? 'true' : 'false'}" />
              <button class="provider-key-toggle" data-action="toggle-provider-key-visible" type="button" aria-label="${keyButtonText} API Key">${keyButtonText}</button>
            </div>
            ${savedKeyMask ? `<p class="section-eyebrow provider-key-mask">已保存：${escapeHtml(savedKeyMask)}</p>` : ''}
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <h3 class="prov-sec-title">\u9ed8\u8ba4\u6a21\u578b</h3>
            <div class="provider-model-picker">
              <div class="provider-model-input-row">
                <input id="provider-default-model-input" class="ai-input provider-model-input" value="${escapeHtml(provider.defaultModel || '')}" placeholder="gpt-5.4" autocomplete="off" data-plain-input="true" />
                <button class="provider-model-toggle" data-action="toggle-provider-model-menu" type="button" aria-label="\u5c55\u5f00\u6a21\u578b\u5217\u8868">
                  ${icon('chevron')}
                </button>
              </div>
              <p id="provider-default-model-hint" class="section-eyebrow provider-model-hint">${escapeHtml(providerDefaultModelHintText(provider.defaultModel || '', provider.models || []))}</p>
              <div id="provider-default-model-menu" class="provider-model-menu ${state.providerModelMenuOpen ? 'open' : ''}"></div>
            </div>
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <div class="prov-sec-title-row">
              <h3 class="prov-sec-title" style="margin:0;">\u6a21\u578b\u5217\u8868</h3>
              <button class="prov-sync-btn" data-action="sync-provider-models" data-provider="${provider.id}" type="button" ${state.providerModelSyncingId === provider.id ? 'disabled' : ''}>${icon('reroll')}${state.providerModelSyncingId === provider.id ? '同步中' : '同步'}</button>
            </div>
            ${renderProviderModelPool(provider)}
            ${syncStatus?.message ? `<p class="provider-sync-status ${escapeHtml(syncStatus.type || '')}">${escapeHtml(syncStatus.message)}</p>` : '<p class="provider-sync-status muted">同步会优先请求真实模型列表；失败时保留当前列表。</p>'}
          </div>

          <div class="prov-sec-divider"></div>

          ${switchRow('\u542f\u7528\u4f9b\u5e94\u5546', '\u5173\u95ed\u540e\u5c06\u4e0d\u4f1a\u51fa\u73b0\u5728\u6a21\u578b\u9009\u62e9\u4e2d', !!provider.enabled, 'toggle-provider-enabled', provider.id)}

          <div class="prov-save-row">
            <button class="prov-save-btn-main" data-action="save-provider-editor" data-provider="${provider.id}" type="button">\u4fdd\u5b58\u4f9b\u5e94\u5546</button>
          </div>
        </div>
      </section>
    `;
    }

    async function syncProviderModelsFromEditor() {
        const draft = ensureProviderEditorDraft();
        if (state.providerModelSyncingId) return;
        const baseUrl = document.getElementById('provider-base-input')?.value?.trim() || '';
        const keyInput = document.getElementById('provider-key-input');
        const apiKey = draft._apiKeyDirty ? (keyInput?.value?.trim() || '') : (draft.apiKey || '');
        const kind = providerKind({ ...draft, baseUrl });
        if (!baseUrl) {
            const fallback = fallbackModelsForProvider(draft);
            if (!fallback.length) {
                setProviderSyncStatus(draft.id, 'error', '请先填写 Base URL 再同步模型');
                render();
                return;
            }
            const fallbackStructured = fallback.map(parseModelToStructured);
            draft._allModels = fallbackStructured;
            fallbackStructured.forEach((m) => { state.providerModelVendorOpen[m.vendor] = true; });
            setProviderSyncStatus(draft.id, 'success', `已载入内置列表 ${fallback.length} 个模型`);
            render();
            return;
        }

        state.providerModelSyncingId = draft.id || state.providerDraftId || 'syncing';
        setProviderSyncStatus(draft.id, 'muted', '正在同步模型...');
        render();
        try {
            const resp = await fetch(`${API_BASE}/api/settings/ai/discover-models`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider_id: draft.id || kind,
                    provider_name: draft.name || '',
                    base_url: baseUrl,
                    api_key: apiKey,
                }),
            });
            const contentType = resp.headers.get('content-type') || '';
            const rawText = await resp.text();
            if (!resp.ok) {
                let detail = '';
                try {
                    const payload = contentType.includes('application/json') ? JSON.parse(rawText) : null;
                    detail = payload?.detail || payload?.message || '';
                } catch { }
                throw new Error(detail || `HTTP ${resp.status}`);
            }
            if (!contentType.includes('application/json')) {
                throw new Error('后端返回的不是 JSON，已阻止写入模型列表');
            }
            let data = {};
            try {
                data = JSON.parse(rawText || '{}');
            } catch {
                throw new Error('后端返回 JSON 解析失败，已阻止写入模型列表');
            }
            const discoveredNames = normalizeModelIdList(Array.isArray(data.models) ? data.models : []);
            const fallbackNames = fallbackModelsForProvider({ ...draft, baseUrl });
            const modelNames = normalizeModelIdList([...discoveredNames, ...fallbackNames]);
            if (!modelNames.length) {
                setProviderSyncStatus(draft.id, 'error', '没有获取到模型，已保留当前默认模型和已有列表。');
                render();
                return;
            }

            const syncedModels = modelNames.map(parseModelToStructured);
            const syncedKeys = new Set(modelNames.map((item) => item.toLowerCase()));
            const merged = [...syncedModels];
            (draft._allModels || []).forEach((model) => {
                const id = sanitizeModelId(model?.id || model?.name || '');
                if (!id || syncedKeys.has(id.toLowerCase())) return;
                merged.push(parseModelToStructured(id));
            });
            draft._allModels = merged;
            const vendors = [...new Set(syncedModels.map((m) => m.vendor))];
            vendors.forEach((v) => { state.providerModelVendorOpen[v] = true; });

            if (!(draft._selectedModelIds instanceof Set)) draft._selectedModelIds = new Set(draft._selectedModelIds || []);
            draft.models = [...draft._selectedModelIds];
            const fallbackAdded = Math.max(0, modelNames.length - discoveredNames.length);
            setProviderSyncStatus(draft.id, 'success', data.is_fallback || data.source === 'fallback'
                ? `已载入内置列表 ${modelNames.length} 个模型`
                : fallbackAdded
                    ? `已同步 ${discoveredNames.length} 个模型，补充内置 ${fallbackAdded} 个`
                    : `已同步 ${modelNames.length} 个模型`);

            render();
            renderProviderModelMenu();
        } catch (error) {
            const message = String(error?.message || '\u540c\u6b65\u6a21\u578b\u5931\u8d25');
            if (message.includes('Failed to fetch')) {
                setProviderSyncStatus(draft.id, 'error', '同步失败：当前前端连不上后端接口。');
                render();
                return;
            }
            setProviderSyncStatus(draft.id, 'error', `同步失败：${message}`);
            render();
        } finally {
            state.providerModelSyncingId = '';
            render();
        }
    }

    showBottomNav = function patchedShowBottomNav() {
        if (AI_SUB_VIEWS.has(state.currentView)) return false;
        return __origShowBottomNav();
    };

    renderHeader = function patchedRenderHeader() {
        if (!AI_SUB_VIEWS.has(state.currentView)) return __origRenderHeader();
        const titleMap = {
            aiInterface: 'AI \u63a5\u53e3',
            mcpLibrary: 'MCP \u5de5\u5177\u5e93',
            themeSettings: '\u4e3b\u9898\u6a21\u5f0f',
            accountSettings: '\u6211\u7684\u8d26\u53f7',
            memoryService: '\u8bb0\u5fc6\u670d\u52a1',
            backendSync: '\u540c\u6b65\u540e\u7aef',
            exportSettings: '\u5bfc\u51fa\u683c\u5f0f',
            defaultModels: '\u9ed8\u8ba4\u6a21\u578b',
            modelSlot: slotTitle(state.activeModelSlot),
            providerCatalog: '\u6a21\u578b\u4f9b\u5e94\u5546',
            providerEditor: '\u7f16\u8f91\u4f9b\u5e94\u5546',
            promptEditor: '\u63d0\u793a\u8bcd',
        };
        const titleClass = `chat-page-title ${state.currentView === 'providerCatalog' ? 'provider-catalog-title' : ''}`.trim();
        const rightAction = state.currentView === 'providerCatalog'
            ? `<button class="icon-btn ghost-circle" data-action="open-provider-editor-new" aria-label="\u65b0\u589e\u4f9b\u5e94\u5546">${icon('plus')}</button>`
            : '<span class="header-spacer"></span>';
        return `
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="back-sub-settings" aria-label="\u8fd4\u56de">${icon('back')}</button>
        <div class="${titleClass}">${escapeHtml(titleMap[state.currentView] || '\u8bbe\u7f6e')}</div>
        ${rightAction}
      </header>
    `;
    };

    renderBody = function patchedRenderBody() {
        if (state.currentView === 'accountSettings') return renderAccountSettingsPage();
        if (state.currentView === 'memoryService') return renderMemoryServicePage();
        if (state.currentView === 'backendSync') return renderBackendSyncPage();
        if (state.currentView === 'exportSettings') return renderExportSettingsPage();
        if (state.currentView === 'themeSettings') return renderThemeSettingsPage();
        if (state.currentView === 'aiInterface') return renderAiInterfacePage();
        if (state.currentView === 'mcpLibrary') return renderMcpLibraryPage();
        if (state.currentView === 'defaultModels') return renderDefaultModelsPage();
        if (state.currentView === 'modelSlot') return renderModelSlotPage();
        if (state.currentView === 'providerCatalog') return renderProviderCatalogPage();
        if (state.currentView === 'providerEditor') return renderProviderEditorPage();
        if (state.currentView === 'promptEditor') return renderPromptEditorPage();
        return __origRenderBody();
    };

    handleClick = function patchedHandleClick(event) {
        const target = event.target.closest('[data-action]');
        const action = target?.dataset.action;
        if (!action) return __origHandleClick(event);

        if (action === 'open-ai-interface') return openAiSubView('aiInterface');
        if (action === 'open-mcp-library') return openAiSubView('mcpLibrary');
        if (action === 'open-theme-settings') return openAiSubView('themeSettings');
        if (action === 'open-account-settings') return openAiSubView('accountSettings');
        if (action === 'open-account-avatar') {
            const fileInput = document.getElementById('account-avatar-file');
            fileInput?.click();
            return;
        }
        if (action === 'open-account-nickname') {
            const nextName = window.prompt('\u8bf7\u8f93\u5165\u6635\u79f0', state.accountProfile?.nickname || '\u5c0f\u9152')?.trim();
            if (!nextName) return;
            state.accountProfile.nickname = nextName;
            state.toast = '\u6635\u79f0\u5df2\u66f4\u65b0';
            render();
            saveAiSettings();
            queueLocalSyncIfChanged(120);
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }
        if (action === 'open-account-signature') {
            const nextSign = window.prompt('\u8bf7\u8f93\u5165\u4e2a\u6027\u7b7e\u540d', state.accountProfile?.signature || '')?.trim();
            if (!nextSign) return;
            state.accountProfile.signature = nextSign;
            state.toast = '\u4e2a\u6027\u7b7e\u540d\u5df2\u66f4\u65b0';
            render();
            saveAiSettings();
            queueLocalSyncIfChanged(120);
            window.setTimeout(() => { state.toast = ''; render(); }, 1200);
            return;
        }
        if (action === 'open-memory-service') return openAiSubView('memoryService', () => { loadMemoryService(state.currentContactId); });
        if (action === 'memory-service-refresh') { loadMemoryService(state.currentContactId, { silent: false }); return; }
        if (action === 'memory-service-sort') {
            state.memoryServiceSort = target.dataset.sort || 'updated_at';
            loadMemoryService(state.currentContactId, { silent: true });
            return;
        }
        if (action === 'memory-candidate-promote') { promoteMemoryCandidate(target.dataset.candidateId); return; }
        if (action === 'memory-candidate-dismiss') { dismissMemoryCandidate(target.dataset.candidateId); return; }
        if (action === 'memory-service-create') {
            createMemoryServiceEntry()
                .then(() => loadMemoryService(state.currentContactId, { silent: false }))
                .catch((error) => {
                    console.warn('[memory service] create failed', error);
                    state.toast = '\u65b0\u5efa\u8bb0\u5fc6\u5931\u8d25';
                    render();
                    window.setTimeout(() => { state.toast = ''; render(); }, 1200);
                });
            return;
        }
        if (action === 'memory-service-edit') {
            updateMemoryServiceEntry(target.dataset.memoryId)
                .then(() => loadMemoryService(state.currentContactId, { silent: false }))
                .catch((error) => {
                    console.warn('[memory service] update failed', error);
                    state.toast = '\u7f16\u8f91\u8bb0\u5fc6\u5931\u8d25';
                    render();
                    window.setTimeout(() => { state.toast = ''; render(); }, 1200);
                });
            return;
        }
        if (action === 'memory-service-delete') {
            deleteMemoryServiceEntry(target.dataset.memoryId)
                .then(() => loadMemoryService(state.currentContactId, { silent: false }))
                .catch((error) => {
                    console.warn('[memory service] delete failed', error);
                    state.toast = '\u5220\u9664\u8bb0\u5fc6\u5931\u8d25';
                    render();
                    window.setTimeout(() => { state.toast = ''; render(); }, 1200);
                });
            return;
        }
        if (action === 'open-backend-sync') return openAiSubView('backendSync');
        if (action === 'sync-pull-now') { pullRemoteSnapshot(); return; }
        if (action === 'sync-push-now') {
            persistLocalSnapshot();
            scheduleSyncPush(30);
            state.toast = '\u5df2\u52a0\u5165\u4e0a\u4f20\u961f\u5217';
            render();
            window.setTimeout(() => { state.toast = ''; render(); }, 1000);
            return;
        }
        if (action === 'open-export-settings') return openAiSubView('exportSettings');
        if (action === 'open-default-models') return openAiSubView('defaultModels');
        if (action === 'open-model-slot') return openAiSubView('modelSlot', () => {
            state.activeModelSlot = normalizeModelSlotId(target.dataset.slot);
            state.activeModelSlotContext = target.dataset.context === 'contact' ? 'contact' : 'global';
            state.modelSlotMenuOpen = false;
            if (state.activeModelSlotContext === 'contact') {
                const c = getCurrentContact();
                state.activeModelProviderId = c?.settings?.modelProviderId || getSlot('chat')?.providerId || state.activeModelProviderId || 'openai';
            } else {
                state.activeModelProviderId = getSlot('chat')?.providerId || state.activeModelProviderId || 'openai';
            }
        });
        if (action === 'open-provider-catalog') return openAiSubView('providerCatalog');
        if (action === 'open-provider-editor-new') return openAiSubView('providerEditor', () => {
            state.providerDraftId = `custom_${Date.now()}`;
            state.providerAdvancedOpen = false;
            state.providerModelMenuOpen = false;
            state.providerEditorDraft = createProviderEditorDraft(state.providerDraftId);
        });
        if (action === 'open-provider-editor') return openAiSubView('providerEditor', () => {
            state.providerDraftId = target.dataset.provider;
            const provider = getProviderById(state.providerDraftId);
            state.providerAdvancedOpen = !!String(provider?.apiPath || provider?.api_path || '').trim();
            state.providerModelMenuOpen = false;
            state.providerEditorDraft = createProviderEditorDraft(state.providerDraftId);
        });
        if (action === 'open-prompt-editor') return openAiSubView('promptEditor', () => { state.activePromptSlot = normalizeModelSlotId(target.dataset.slot); });
        if (action === 'back-sub-settings') return closeAiSubView();
        if (action === 'sync-provider-models') { syncProviderModelsFromEditor(); return; }
        if (action === 'toggle-provider-key-visible') {
            const draft = ensureProviderEditorDraft();
            if (!draft._apiKeyDirty) {
                draft._apiKeyDirty = true;
                draft.apiKey = '';
                state.providerKeyVisible = true;
            } else {
                state.providerKeyVisible = !state.providerKeyVisible;
            }
            render();
            window.setTimeout(() => document.getElementById('provider-key-input')?.focus(), 0);
            return;
        }
        if (action === 'toggle-provider-advanced') {
            state.providerAdvancedOpen = !state.providerAdvancedOpen;
            render();
            return;
        }
        if (action === 'toggle-model-slot-menu') {
            state.modelSlotMenuOpen = false;
            renderModelSlotMenu();
            return;
        }
        if (action === 'toggle-provider-model-menu') {
            state.providerModelMenuOpen = !state.providerModelMenuOpen;
            renderProviderModelMenu();
            return;
        }
        if (action === 'pick-provider-default-model') {
            const draft = ensureProviderEditorDraft();
            const query = document.getElementById('provider-default-model-input')?.value || draft.defaultModel || '';
            const items = filteredProviderModels(query, draft.models);
            const model = sanitizeModelId(items[Number(target.dataset.modelIndex)] || target.dataset.model || '');
            if (!model) return;
            if (!(draft._selectedModelIds instanceof Set)) draft._selectedModelIds = new Set(draft._selectedModelIds || []);
            draft._selectedModelIds.add(model);
            draft.models = [...draft._selectedModelIds];
            draft.defaultModel = model;
            const input = document.getElementById('provider-default-model-input');
            if (input) input.value = model;
            state.providerModelMenuOpen = false;
            renderProviderModelMenu();
            return;
        }

        if (action === 'pick-slot-provider') {
            if (state.activeModelSlotContext === 'contact') {
                const c = getCurrentContact();
                const providerId = target.dataset.providerId || state.activeModelProviderId;
                const provider = getProviderById(providerId);
                state.activeModelProviderId = providerId;
                state.modelSlotMenuOpen = false;
                if (c?.settings) {
                    c.settings.modelProviderId = providerId;
                    if (!sanitizeModelId(c.settings.model) || !(provider?.models || []).includes(c.settings.model)) {
                        c.settings.model = provider?.defaultModel || provider?.models?.[0] || c.settings.model || '';
                    }
                }
                render();
                queueLocalSyncIfChanged(150);
                return;
            }
            const slot = getSlot(target.dataset.slot);
            slot.providerId = target.dataset.providerId;
            const provider = getProviderById(slot.providerId);
            if (provider) slot.model = sanitizeModelId(provider.defaultModel) || provider.models?.[0] || sanitizeModelId(slot.model) || '';
            state.modelSlotMenuOpen = false;
            render();
            saveAiSettings();
            return;
        }

        if (action === 'toggle-all-provider-models') {
            const draft = ensureProviderEditorDraft();
            if (!(draft._selectedModelIds instanceof Set)) draft._selectedModelIds = new Set(draft._selectedModelIds || []);
            const allModels = Array.isArray(draft._allModels) ? draft._allModels : [];
            const allIds = allModels.map((m) => m.id);
            const allSelected = allIds.length > 0 && allIds.every((id) => draft._selectedModelIds.has(id));
            if (allSelected) {
                allIds.forEach((id) => draft._selectedModelIds.delete(id));
            } else {
                allIds.forEach((id) => draft._selectedModelIds.add(id));
            }
            draft.models = [...draft._selectedModelIds];
            render();
            return;
        }

        if (action === 'toggle-vendor-all-provider-models') {
            const vendor = target.dataset.vendor;
            const draft = ensureProviderEditorDraft();
            if (!(draft._selectedModelIds instanceof Set)) draft._selectedModelIds = new Set(draft._selectedModelIds || []);
            const allModels = Array.isArray(draft._allModels) ? draft._allModels : [];
            const vendorIds = allModels.filter((m) => (m.vendor || 'Other') === vendor).map((m) => m.id);
            const vendorAllSel = vendorIds.length > 0 && vendorIds.every((id) => draft._selectedModelIds.has(id));
            if (vendorAllSel) {
                vendorIds.forEach((id) => draft._selectedModelIds.delete(id));
            } else {
                vendorIds.forEach((id) => draft._selectedModelIds.add(id));
            }
            draft.models = [...draft._selectedModelIds];
            render();
            return;
        }

        if (action === 'toggle-provider-vendor-group') {
            const vendor = target.dataset.vendor;
            if (vendor) state.providerModelVendorOpen[vendor] = !state.providerModelVendorOpen[vendor];
            render();
            return;
        }

        if (action === 'add-provider-model') {
            const draft = ensureProviderEditorDraft();
            if (!(draft._selectedModelIds instanceof Set)) draft._selectedModelIds = new Set(draft._selectedModelIds || []);
            const allModels = Array.isArray(draft._allModels) ? draft._allModels : [];
            const modelRecord = allModels[Number(target.dataset.modelIndex)] || {};
            const mid = sanitizeModelId(modelRecord.id || modelRecord.name || target.dataset.modelId || '');
            if (mid) draft._selectedModelIds.add(mid);
            if (mid) {
                draft.defaultModel = mid;
                const input = document.getElementById('provider-default-model-input');
                if (input) input.value = mid;
            }
            draft.models = [...draft._selectedModelIds];
            render();
            return;
        }

        if (action === 'remove-provider-model') {
            const draft = ensureProviderEditorDraft();
            if (!(draft._selectedModelIds instanceof Set)) draft._selectedModelIds = new Set(draft._selectedModelIds || []);
            const allModels = Array.isArray(draft._allModels) ? draft._allModels : [];
            const modelRecord = allModels[Number(target.dataset.modelIndex)] || {};
            const mid = sanitizeModelId(modelRecord.id || modelRecord.name || target.dataset.modelId || '');
            if (mid) draft._selectedModelIds.delete(mid);
            draft.models = [...draft._selectedModelIds];
            render();
            return;
        }

        if (action === 'add-manual-provider-model') {
            const draft = ensureProviderEditorDraft();
            const input = document.getElementById('provider-manual-model-input');
            const m = sanitizeModelId(input?.value || '');
            if ((input?.value || '').trim() && !m) {
                alert('模型 ID 不合法，不能包含 HTML、控制字符或过长内容');
                return;
            }
            if (!m) return;
            if (!(draft._selectedModelIds instanceof Set)) draft._selectedModelIds = new Set(draft._selectedModelIds || []);
            if (!Array.isArray(draft._allModels)) draft._allModels = [];
            if (!draft._allModels.some((item) => item.id === m)) {
                draft._allModels.push(parseModelToStructured(m));
                const vendor = detectModelVendor(m);
                state.providerModelVendorOpen[vendor] = true;
            }
            draft._selectedModelIds.add(m);
            draft.defaultModel = m;
            draft.models = [...draft._selectedModelIds];
            render();
            return;
        }

        if (action === 'toggle-slot-vendor-group') {
            const pid = target.dataset.providerId;
            if (pid) state.slotVendorGroupOpen[pid] = !state.slotVendorGroupOpen[pid];
            render();
            return;
        }

        if (action === 'add-model-to-slot') {
            const slotId = target.dataset.slot;
            const pid = target.dataset.providerId;
            const m = sanitizeModelId(target.dataset.model || '');
            if (!slotId || !pid || !m) return;
            const slot = getSlot(slotId);
            if (!Array.isArray(slot.selectedModels)) slot.selectedModels = [];
            if (!slot.selectedModels.some((s) => s.providerId === pid && s.model === m)) {
                slot.selectedModels.push({ providerId: pid, model: m });
            }
            render();
            saveAiSettings();
            return;
        }

        if (action === 'remove-model-from-slot') {
            const slotId = target.dataset.slot;
            const pid = target.dataset.providerId;
            const m = target.dataset.model;
            if (!slotId || !m) return;
            const slot = getSlot(slotId);
            if (Array.isArray(slot.selectedModels)) {
                slot.selectedModels = slot.selectedModels.filter((s) => !(s.providerId === pid && s.model === m));
            }
            render();
            saveAiSettings();
            return;
        }

        if (action === 'add-manual-slot-model') {
            const slotId = target.dataset.slot;
            const input = document.getElementById('model-slot-manual-input');
            const m = sanitizeModelId(input?.value || '');
            if ((input?.value || '').trim() && !m) {
                alert('模型 ID 不合法，不能包含 HTML、控制字符或过长内容');
                return;
            }
            if (!slotId || !m) return;
            const slot = getSlot(slotId);
            if (!Array.isArray(slot.manualModels)) slot.manualModels = [];
            if (!slot.manualModels.includes(m)) slot.manualModels.push(m);
            render();
            saveAiSettings();
            return;
        }

        if (action === 'remove-manual-slot-model') {
            const slotId = target.dataset.slot;
            const m = sanitizeModelId(target.dataset.model || '');
            if (!slotId || !m) return;
            const slot = getSlot(slotId);
            if (Array.isArray(slot.manualModels)) {
                slot.manualModels = slot.manualModels.filter((item) => item !== m);
            }
            render();
            saveAiSettings();
            return;
        }

        if (action === 'pick-theme-mode') {
            state.globalSettings.theme = target.dataset.theme || state.globalSettings.theme;
            render();
            saveAiSettings();
            return;
        }

        if (action === 'pick-export-format') {
            state.globalSettings.exportFormat = target.dataset.format || state.globalSettings.exportFormat;
            render();
            saveAiSettings();
            return;
        }

        if (action === 'toggle-mcp-tool') {
            const toolId = target.dataset.toolId;
            const ai = ensureAiSettings();
            const tools = ai.mcpLibrary?.tools || [];
            const tool = tools.find((item) => String(item.id) === String(toolId));
            if (!tool) return;
            tool.enabled = !(tool.enabled !== false);
            paintSwitch(target, tool.enabled !== false);
            saveAiSettings();
            return;
        }

        if (action === 'sync-mcp-library') {
            loadMcpLibrary({ silent: false });
            return;
        }

        if (action === 'edit-contact-quick-action') {
            if (state.quickActionDragId) return;
            openContactQuickActionEditor(target.dataset.quickId || '');
            return;
        }

        if (action === 'add-contact-quick-action') {
            const c = getCurrentContact();
            const list = ensureContactQuickActions(c);
            const newId = `custom_${Date.now()}`;
            list.push({
                id: newId,
                label: '新快捷动作',
                icon: 'more',
                prompt: '',
                mcpToolId: '',
                enabled: true,
            });
            c.settings.quickActions = list;
            state.contactQuickActionEditorId = newId;
            render();
            queueLocalSyncIfChanged(150);
            return;
        }

        if (action === 'close-contact-quick-action-editor') {
            // Block background clicks inside the dialog, but allow explicit buttons (which have data-action on the element itself)
            if (event.target.closest('[data-stop-close="1"]') && !event.target.hasAttribute('data-action')) return;
            state.contactQuickActionEditorId = '';
            state.contactQuickMcpMenuOpen = false;
            render();
            return;
        }

        if (action === 'toggle-contact-quick-mcp-menu') {
            state.contactQuickMcpMenuOpen = !state.contactQuickMcpMenuOpen;
            target.closest('.qae-select-shell')?.classList.toggle('open', state.contactQuickMcpMenuOpen);
            return;
        }

        if (action === 'pick-contact-quick-mcp') {
            const shell = target.closest('.qae-select-shell');
            const value = target.dataset.mcpId || '';
            const hidden = document.getElementById('contact-quick-mcp');
            if (hidden) hidden.value = value;
            const label = target.textContent?.trim() || '\u4e0d\u8c03\u7528 MCP';
            const triggerLabel = shell?.querySelector('.qae-select-trigger span');
            if (triggerLabel) triggerLabel.textContent = label;
            shell?.querySelectorAll('.qae-select-option').forEach((option) => {
                option.classList.toggle('active', option === target);
            });
            state.contactQuickMcpMenuOpen = false;
            shell?.classList.remove('open');
            return;
        }

        if (action === 'save-contact-quick-action') {
            const c = getCurrentContact();
            const list = ensureContactQuickActions(c);
            const id = target.dataset.quickId || '';
            const item = list.find((entry) => entry.id === id);
            if (!item) return;
            item.label = (document.getElementById('contact-quick-label')?.value || item.label || '').trim() || item.label || '蹇嵎鍔ㄤ綔';
            item.prompt = (document.getElementById('contact-quick-prompt')?.value || '').trim();
            item.mcpToolId = (document.getElementById('contact-quick-mcp')?.value || '').trim();
            if (item.mcpToolId && shouldExposeMcpTool(item.mcpToolId)) {
                item.id = item.id || item.mcpToolId;
            }
            c.settings.quickActions = list;
            state.contactQuickActionEditorId = '';
            render();
            queueLocalSyncIfChanged(150);
            return;
        }

        if (action === 'delete-contact-quick-action') {
            const c = getCurrentContact();
            const id = target.dataset.quickId || '';
            const list = ensureContactQuickActions(c).filter((entry) => entry.id !== id);
            c.settings.quickActions = list;
            if (state.contactQuickActionEditorId === id) state.contactQuickActionEditorId = '';
            state.quickActionSwipeOpenId = '';
            render();
            queueLocalSyncIfChanged(150);
            return;
        }

        if (action === 'pick-slot-model') {
            const currentSlot = getSlot(target.dataset.slot);
            const provider = getProviderById(currentSlot?.providerId);
            const list = normalizeModelIdList(provider?.models || []);
            const model = sanitizeModelId(list[Number(target.dataset.modelIndex)] || target.dataset.model || '');
            if (!model) return;
            if (state.activeModelSlotContext === 'contact') {
                const c = byId(state.currentContactId) || state.contacts[0];
                if (c?.settings) {
                    if (target.dataset.slot === 'consciousness') {
                        c.settings.loopModel = model;
                    } else {
                        c.settings.model = model;
                        c.settings.modelProviderId = state.activeModelProviderId || c.settings.modelProviderId || getSlot('chat')?.providerId || 'openai';
                    }
                }
                state.modelSlotMenuOpen = false;
                render();
                queueLocalSyncIfChanged(150);
                return;
            }
            const slot = getSlot(target.dataset.slot);
            slot.model = model;
            if (target.dataset.providerId) slot.providerId = target.dataset.providerId;
            state.modelSlotMenuOpen = false;
            render();
            saveAiSettings();
            return;
        }

        if (action === 'toggle-provider-enabled') {
            const provider = getProviderById(target.dataset.providerId || target.dataset.key);
            if (provider) {
                provider.enabled = !provider.enabled;
                if (state.providerEditorDraft && state.providerEditorDraft.id === provider.id) {
                    state.providerEditorDraft.enabled = provider.enabled;
                }
            }
            render();
            saveAiSettings();
            return;
        }

        if (action === 'save-provider-editor') {
            const id = target.dataset.provider;
            const draft = ensureProviderEditorDraft();
            // Derive models from structured selection
            const sel = draft._selectedModelIds instanceof Set ? draft._selectedModelIds : new Set(draft._selectedModelIds || []);
            const models = normalizeModelIdList([...sel]);
            const existing = getProviderById(id);
            const apiPath = normalizeProviderApiPath(document.getElementById('provider-api-path-input')?.value || '', { allowEmpty: true });
            const defaultInputValue = document.getElementById('provider-default-model-input')?.value?.trim() || '';
            let defaultModel = '';
            try {
                defaultModel = defaultInputValue ? validateModelIdForSave(defaultInputValue, '默认模型') : (models[0] || '');
            } catch (error) {
                alert(error.message || '默认模型不合法');
                return;
            }
            if (!defaultModel) {
                alert('默认模型不能为空，请手动输入或选择一个合法模型');
                return;
            }
            const next = {
                ...(existing || { id }),
                id,
                name: document.getElementById('provider-name-input')?.value?.trim() || '\u81ea\u5b9a\u4e49\u4f9b\u5e94\u5546',
                baseUrl: document.getElementById('provider-base-input')?.value?.trim() || '',
                apiPath,
                api_path: apiPath,
                apiKey: draft._apiKeyDirty
                    ? (document.getElementById('provider-key-input')?.value?.trim() || '')
                    : (draft.apiKey || ''),
                defaultModel,
                models,
            };
            const ai = ensureAiSettings();
            ai.providerModels = {
                ...(ai.providerModels || {}),
                [id]: models,
            };
            ai.providers = ai.providers.filter((item) => item.id !== id);
            ai.providers.push(next);
            syncLegacyAiSettings();
            state.providerEditorDraft = null;
            state.providerModelMenuOpen = false;
            state.currentView = 'providerCatalog';
            render();
            saveAiSettings();
            return;
        }

        if (action === 'save-slot-prompt') {
            const slotId = normalizeModelSlotId(target.dataset.slot);
            ensureAiSettings().defaultPrompts[slotId] = document.getElementById('slot-prompt-input')?.value || '';
            state.currentView = 'defaultModels';
            render();
            saveAiSettings();
            return;
        }

        if (action === 'reset-slot-prompt') {
            const slotId = normalizeModelSlotId(target.dataset.slot);
            const defaults = createDefaultAiSettings().defaultPrompts || {};
            ensureAiSettings().defaultPrompts[slotId] = defaults[slotId] || '';
            render();
            saveAiSettings();
            return;
        }

        return __origHandleClick(event);
    };

    document.addEventListener('input', (event) => {
        const target = event.target;
        if (target?.dataset?.action === 'provider-search') {
            state.providerSearch = target.value || '';
            render();
            return;
        }
        if (target?.id === 'model-slot-input') {
            const c = byId(state.currentContactId) || state.contacts[0];
            const rawValue = target.value || '';
            const nextValue = rawValue ? sanitizeModelId(rawValue) : '';
            if (rawValue && !nextValue) {
                state.modelSlotMenuOpen = false;
                renderModelSlotMenu();
                return;
            }
            if (state.activeModelSlotContext === 'contact') {
                if (c?.settings) {
                    if (state.activeModelSlot === 'consciousness') c.settings.loopModel = nextValue;
                    else c.settings.model = nextValue;
                }
            } else {
                const slot = getSlot(state.activeModelSlot);
                if (slot) slot.model = nextValue;
            }
            state.modelSlotMenuOpen = false;
            renderModelSlotMenu();
            return;
        }
        if (target?.id === 'provider-name-input') {
            ensureProviderEditorDraft().name = target.value || '';
            return;
        }
        if (target?.id === 'provider-base-input') {
            ensureProviderEditorDraft().baseUrl = target.value || '';
            return;
        }
        if (target?.id === 'provider-api-path-input') {
            const draft = ensureProviderEditorDraft();
            draft.apiPath = target.value || '';
            draft.api_path = target.value || '';
            return;
        }
        if (target?.id === 'provider-key-input') {
            const draft = ensureProviderEditorDraft();
            if (target.dataset?.masked === 'true') {
                target.value = '';
                target.dataset.masked = 'false';
            }
            draft._apiKeyDirty = true;
            draft.apiKey = String(target.value || '');
            return;
        }
        if (target?.id === 'provider-models-input') {
            ensureProviderEditorDraft().models = String(target.value || '').split(',').map((item) => item.trim()).filter(Boolean);
            renderProviderModelMenu();
            return;
        }
        if (target?.id === 'voice-slot-provider-input') {
            const slot = getSlot('voice');
            if (slot) slot.provider = target.value || '';
            return;
        }
        if (target?.id === 'voice-slot-service-url-input') {
            const slot = getSlot('voice');
            if (slot) {
                slot.service_url = target.value || '';
                slot.base_url = target.value || '';
            }
            return;
        }
        if (target?.id === 'voice-slot-voice-id-input') {
            const slot = getSlot('voice');
            if (slot) slot.voice_id = target.value || '';
            return;
        }
        if (target?.id === 'voice-slot-speaker-input') {
            const slot = getSlot('voice');
            if (slot) slot.speaker = target.value || '';
            return;
        }
        if (target?.id === 'voice-slot-emotion-input') {
            const slot = getSlot('voice');
            if (slot) slot.emotion = target.value || '';
            return;
        }
        if (target?.id === 'voice-slot-speed-input') {
            const slot = getSlot('voice');
            if (slot) slot.speed = target.value || '';
            return;
        }
        if (target?.id === 'voice-slot-format-input') {
            const slot = getSlot('voice');
            if (slot) slot.format = target.value || '';
            return;
        }
        if (target?.id === 'provider-default-model-input') {
            ensureProviderEditorDraft().defaultModel = target.value || '';
            state.providerModelMenuOpen = true;
            renderProviderModelMenu();
            return;
        }
        if (target?.dataset?.contactField === 'persona') {
            const c = getCurrentContact();
            if (!c) return;
            c.persona = target.value || '';
            queueLocalSyncIfChanged(180);
            queueAgentPersonaSave(c.id, c.persona);
        }
    });

    document.addEventListener('paste', (event) => {
        const target = event.target;
        if (target?.id !== 'provider-key-input') return;
        event.preventDefault();
        const text = String(event.clipboardData?.getData('text/plain') || '').trim();
        target.value = text;
        const draft = ensureProviderEditorDraft();
        draft._apiKeyDirty = true;
        draft.apiKey = text;
        target.dispatchEvent(new Event('input', { bubbles: true }));
    });

    document.addEventListener('change', (event) => {
        const target = event.target;
        if (target?.id === 'nc-avatar-file') {
            const file = target.files?.[0];
            if (!file) return;
            state.newContactDraft = {
                ...(state.newContactDraft || createNewContactDraft()),
                name: document.getElementById('nc-name')?.value || state.newContactDraft?.name || '',
                agentId: document.getElementById('nc-agent-id')?.value || state.newContactDraft?.agentId || '',
                bio: document.getElementById('nc-bio')?.value || state.newContactDraft?.bio || '',
            };
            readAvatarFile(file, 'new-contact');
            target.value = '';
            return;
        }
        if (target?.id === 'account-avatar-file') {
            const file = target.files?.[0];
            if (!file) return;
            readAvatarFile(file, 'account');
            target.value = '';
            return;
        }
        if (target?.id === 'contact-avatar-file') {
            const file = target.files?.[0];
            if (!file) return;
            const c = byId(state.currentContactId);
            if (!c) return;
            readAvatarFile(file, 'contact');
            target.value = '';
            return;
        }
        if (target?.id === 'moment-image-input') {
            const file = target.files?.[0];
            if (!file) return;
            state.momentComposerImageName = file.name || '';
            const reader = new FileReader();
            reader.onload = () => {
                state.momentComposerImage = typeof reader.result === 'string' ? reader.result : '';
                render();
            };
            reader.readAsDataURL(file);
            return;
        }
        if (target?.id === 'chat-image-input') {
            addChatImageFiles(target.files || []);
            target.value = '';
            return;
        }
        if (target?.dataset?.action === 'select-slot-model') {
            const slot = getSlot(target.dataset.slot);
            if (!slot) return;
            slot.model = target.value;
            saveAiSettings();
            return;
        }
        if (String(target?.id || '').startsWith('voice-slot-')) {
            saveAiSettings();
        }
    });

    // afterId: insert dragId AFTER this item. '' = insert at the beginning.
    function reorderContactQuickActions(dragId, afterId) {
        const c = getCurrentContact();
        const list = ensureContactQuickActions(c);
        const from = list.findIndex((item) => item.id === dragId);
        if (from < 0) return;
        const [moved] = list.splice(from, 1);
        if (!afterId) {
            list.splice(0, 0, moved);
        } else {
            const afterIdx = list.findIndex((item) => item.id === afterId);
            if (afterIdx < 0) {
                list.push(moved);
            } else {
                list.splice(afterIdx + 1, 0, moved);
            }
        }
        c.settings.quickActions = list;
        queueLocalSyncIfChanged(120);
    }

    const quickGesture = {
        id: '',
        mode: 'idle',
        startX: 0,
        startY: 0,
        currentY: 0,
        hoverId: '',
        pendingDropId: null, // null = no drag active; '' = drag at top (before first); string = after this id
        pressTimer: null,
    };

    function clearQuickPressTimer() {
        if (quickGesture.pressTimer) {
            clearTimeout(quickGesture.pressTimer);
            quickGesture.pressTimer = null;
        }
    }

    function resetQuickGesture() {
        clearQuickPressTimer();
        quickGesture.id = '';
        quickGesture.mode = 'idle';
        quickGesture.startX = 0;
        quickGesture.startY = 0;
        quickGesture.currentY = 0;
        quickGesture.hoverId = '';
        quickGesture.pendingDropId = null;
    }

    function clearDropHintVisual() {
        root()?.querySelectorAll('.quick-action-swipe.drop-hint-after').forEach((el) => el.classList.remove('drop-hint-after'));
    }

    function pulseQuickReorder(id) {
        state.quickActionReorderPulseId = id || '';
        window.setTimeout(() => {
            if (state.quickActionReorderPulseId === id) {
                state.quickActionReorderPulseId = '';
                render();
            }
        }, 220);
    }

    function setQuickSwipeVisual(quickId, offsetX) {
        const wrap = root()?.querySelector(`.quick-action-swipe[data-quick-id="${quickId}"]`);
        if (!wrap) return;
        const row = wrap.querySelector('.quick-action-row');
        const del = wrap.querySelector('.quick-action-delete');
        if (!row || !del) return;
        const clamped = Math.max(-74, Math.min(0, Number(offsetX) || 0));
        const progress = Math.min(1, Math.abs(clamped) / 74);
        row.style.transform = `translateX(${clamped}px)`;
        del.style.opacity = String(progress);
        del.style.transform = `translateX(${18 * (1 - progress)}px) scale(${0.97 + 0.03 * progress})`;
        del.style.pointerEvents = progress > 0.98 ? 'auto' : 'none';
    }

    function clearQuickSwipeVisual(quickId) {
        const wrap = root()?.querySelector(`.quick-action-swipe[data-quick-id="${quickId}"]`);
        if (!wrap) return;
        const row = wrap.querySelector('.quick-action-row');
        const del = wrap.querySelector('.quick-action-delete');
        if (row) row.style.removeProperty('transform');
        if (del) {
            del.style.removeProperty('opacity');
            del.style.removeProperty('transform');
            del.style.removeProperty('pointer-events');
        }
    }

    function applyDragVisual() {
        root()?.querySelectorAll('.quick-action-swipe.quick-dragging').forEach((el) => el.classList.remove('quick-dragging'));
        root()?.querySelectorAll('.quick-action-row.touch-dragging').forEach((el) => {
            el.classList.remove('touch-dragging');
            el.style.removeProperty('transform');
        });
        if (!state.quickActionDragId) return;
        const row = root()?.querySelector(`.quick-action-row[data-quick-id="${state.quickActionDragId}"]`);
        const wrap = row?.closest('.quick-action-swipe');
        if (!row || !wrap) return;
        wrap.classList.add('quick-dragging');
        row.classList.add('touch-dragging');
        const dy = quickGesture.currentY - quickGesture.startY;
        row.style.transform = `translateY(${dy}px) scale(1.04) rotate(1.2deg)`;
    }

    function liveReorderContactQuickActions(dropId) {
        if (!state.quickActionDragId || !dropId || dropId === state.quickActionDragId) return;
        const c = getCurrentContact();
        const list = ensureContactQuickActions(c);
        const from = list.findIndex((item) => item.id === state.quickActionDragId);
        const to = list.findIndex((item) => item.id === dropId);
        if (from < 0 || to < 0 || from === to) return;
        state.quickActionDropDirection = to > from ? 'down' : 'up';
        reorderContactQuickActions(state.quickActionDragId, dropId);
        state.quickActionDropHintId = dropId;
        quickGesture.hoverId = dropId;
        quickGesture.startY = quickGesture.currentY;
        render();
        applyDragVisual();
    }

    // Returns the id of the item AFTER which the dragged item should be inserted.
    // Returns '' if the dragged item should go before all others.
    function findQuickDropTarget(pointerY) {
        const wraps = Array.from(root()?.querySelectorAll('.quick-action-swipe[data-quick-id]') || [])
            .filter((el) => el.dataset.quickId !== state.quickActionDragId);
        if (!wraps.length) return '';

        let afterId = '';
        for (const wrap of wraps) {
            const rect = wrap.getBoundingClientRect();
            const mid = rect.top + rect.height / 2;
            if (pointerY >= mid) {
                afterId = wrap.dataset.quickId;
            } else {
                break; // Pointer is above this item's midpoint; stop here
            }
        }
        return afterId;
    }

    function finishQuickDrag() {
        const afterId = quickGesture.pendingDropId;
        const dragId = state.quickActionDragId;
        clearDropHintVisual();
        state.quickActionDragId = '';
        state.quickActionDropHintId = '';
        state.quickActionDropDirection = '';
        state.quickActionReorderPulseId = '';
        if (dragId && afterId !== null) {
            reorderContactQuickActions(dragId, afterId);
        }
        render();
    }

    function closeOpenSwipeIfNeeded(exceptId) {
        if (state.quickActionSwipeOpenId && state.quickActionSwipeOpenId !== exceptId) {
            clearQuickSwipeVisual(state.quickActionSwipeOpenId);
            state.quickActionSwipeOpenId = '';
            render();
        }
    }

    function handleQuickPressStart(x, y, quickId) {
        clearQuickPressTimer();
        // Close any other swiped-open row when pressing a new one
        if (state.quickActionSwipeOpenId && state.quickActionSwipeOpenId !== quickId) {
            clearQuickSwipeVisual(state.quickActionSwipeOpenId);
            state.quickActionSwipeOpenId = '';
            render();
        }
        quickGesture.id = quickId;
        quickGesture.mode = 'pending';
        quickGesture.startX = x;
        quickGesture.startY = y;
        quickGesture.currentY = y;
        quickGesture.hoverId = '';
        quickGesture.pressTimer = window.setTimeout(() => {
            if (quickGesture.mode !== 'pending' || !quickGesture.id) return;
            quickGesture.mode = 'drag';
            quickGesture.pendingDropId = null;
            state.quickActionDragId = quickGesture.id;
            applyDragVisual();
            if (navigator?.vibrate) {
                try { navigator.vibrate(12); } catch { }
            }
        }, 280);
    }

    function handleQuickPressMove(x, y, preventDefault) {
        if (!quickGesture.id) return;
        const deltaX = x - quickGesture.startX;
        const deltaY = y - quickGesture.startY;

        if (quickGesture.mode === 'pending') {
            if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY)) {
                clearQuickPressTimer();
                quickGesture.mode = 'swipe';
            } else if (Math.abs(deltaY) > 10) {
                // Vertical scroll intent 鈥?cancel gesture entirely
                clearQuickPressTimer();
                quickGesture.mode = 'cancelled';
            }
            return;
        }

        if (quickGesture.mode === 'swipe') {
            // If row was already swiped open, allow swiping right to close (positive deltaX)
            const alreadyOpen = state.quickActionSwipeOpenId === quickGesture.id;
            const base = alreadyOpen ? -74 : 0;
            const offsetX = Math.max(-74, Math.min(0, base + deltaX));
            setQuickSwipeVisual(quickGesture.id, offsetX);
            return;
        }

        if (quickGesture.mode !== 'drag') return;
        preventDefault?.();
        quickGesture.currentY = y;
        applyDragVisual();
        const afterId = findQuickDropTarget(y);
        if (afterId !== quickGesture.pendingDropId) {
            quickGesture.pendingDropId = afterId;
            // Apply drop hint visually without calling render()
            clearDropHintVisual();
            if (afterId) {
                root()?.querySelector(`.quick-action-swipe[data-quick-id="${afterId}"]`)?.classList.add('drop-hint-after');
            }
        }
    }

    function handleQuickPressEnd(x) {
        if (!quickGesture.id) return;
        clearQuickPressTimer();
        if (quickGesture.mode === 'swipe') {
            const alreadyOpen = state.quickActionSwipeOpenId === quickGesture.id;
            const deltaX = x - quickGesture.startX;
            const effective = alreadyOpen ? -74 + deltaX : deltaX;
            if (effective < -36) {
                state.quickActionSwipeOpenId = quickGesture.id;
                clearQuickSwipeVisual(quickGesture.id);
                render();
            } else if (alreadyOpen && deltaX > 22) {
                state.quickActionSwipeOpenId = '';
                clearQuickSwipeVisual(quickGesture.id);
                render();
            } else {
                clearQuickSwipeVisual(quickGesture.id);
                if (alreadyOpen) {
                    // Snap back to open state
                    state.quickActionSwipeOpenId = quickGesture.id;
                    render();
                }
            }
        }
        if (quickGesture.mode === 'drag') finishQuickDrag();
        resetQuickGesture();
    }

    document.addEventListener('touchstart', (event) => {
        if (isEditableTarget(event.target)) return;
        if (event.target.closest('.quick-action-open')) return;
        const row = event.target.closest('.quick-action-row');
        if (!row) {
            // Tapped outside any quick-action-row 鈥?close any open swipe
            if (!event.target.closest('.quick-action-delete') && !event.target.closest('.quick-action-swipe') && state.quickActionSwipeOpenId) {
                clearQuickSwipeVisual(state.quickActionSwipeOpenId);
                state.quickActionSwipeOpenId = '';
                render();
            }
            return;
        }
        const touch = event.touches?.[0];
        if (!touch) return;
        handleQuickPressStart(touch.clientX, touch.clientY, row.dataset.quickId || '');
    }, { passive: true });

    document.addEventListener('touchmove', (event) => {
        const touch = event.touches?.[0];
        if (!touch) return;
        handleQuickPressMove(touch.clientX, touch.clientY, () => event.preventDefault());
    }, { passive: false });

    document.addEventListener('touchend', (event) => {
        const touch = event.changedTouches?.[0];
        handleQuickPressEnd(touch?.clientX || quickGesture.startX);
    }, { passive: true });

    document.addEventListener('touchcancel', () => {
        clearQuickSwipeVisual(quickGesture.id);
        clearDropHintVisual();
        if (quickGesture.mode === 'drag') finishQuickDrag();
        resetQuickGesture();
    }, { passive: true });

    let lastCodexToggleEventAt = 0;

    let lastCCToggleEventAt = 0;

    function handleCodexTogglePress(event) {
        const target = event.target?.closest?.('.codex-toggle:not(.cc-toggle)');
        if (!target) return;
        const now = Date.now();
        if (now - lastCodexToggleEventAt < 320) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation?.();
            return;
        }
        lastCodexToggleEventAt = now;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        toggleCurrentCodexMode(target.dataset.contactId);
    }

    function handleCCTogglePress(event) {
        const target = event.target?.closest?.('.cc-toggle');
        if (!target) return;
        const now = Date.now();
        if (now - lastCCToggleEventAt < 320) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation?.();
            return;
        }
        lastCCToggleEventAt = now;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        toggleCurrentCCMode(target.dataset.contactId);
    }

    ['pointerdown', 'touchstart', 'mousedown', 'click'].forEach((eventName) => {
        document.addEventListener(eventName, handleCodexTogglePress, true);
        document.addEventListener(eventName, handleCCTogglePress, true);
    });

    document.addEventListener('mousedown', (event) => {
        if (isEditableTarget(event.target)) return;
        if (event.target.closest('.quick-action-open')) return;
        const row = event.target.closest('.quick-action-row');
        if (!row || event.button !== 0) {
            // Clicked outside any row 鈥?close open swipe
            if (!event.target.closest('.quick-action-delete') && !event.target.closest('.quick-action-swipe') && state.quickActionSwipeOpenId) {
                clearQuickSwipeVisual(state.quickActionSwipeOpenId);
                state.quickActionSwipeOpenId = '';
                render();
            }
            return;
        }
        handleQuickPressStart(event.clientX, event.clientY, row.dataset.quickId || '');
    });

    document.addEventListener('mousemove', (event) => {
        handleQuickPressMove(event.clientX, event.clientY, () => event.preventDefault());
    });

    document.addEventListener('mouseup', (event) => {
        handleQuickPressEnd(event.clientX);
    });

    const __origRenderGlobalSettings = renderGlobalSettings;

    renderGlobalSettings = function patchedRenderGlobalSettings() {
        return __origRenderGlobalSettings();
    };

    document.addEventListener('DOMContentLoaded', () => {
        ensureAiSettings();
        loadAiSettings();
        loadMcpLibrary();
        loadMoments();
        loadCompanionState();
        loadAgentPersona(state.currentContactId);
    });

    document.addEventListener('focusin', (event) => {
        const target = event.target;
        if (target?.id === 'model-slot-input') {
            state.modelSlotMenuOpen = false;
            renderModelSlotMenu();
            return;
        }
        if (target?.id === 'provider-default-model-input') {
            state.providerModelMenuOpen = true;
            renderProviderModelMenu();
        }
        if (target?.id === 'provider-key-input' && target.dataset?.masked === 'true') {
            const draft = ensureProviderEditorDraft();
            target.value = '';
            target.dataset.masked = 'false';
            draft._apiKeyDirty = true;
            draft.apiKey = '';
            state.providerKeyVisible = true;
            target.type = 'text';
        }
    });

    document.addEventListener('click', (event) => {
        if (AI_SUB_VIEWS.has(state.currentView) && state.currentView === 'modelSlot') {
            const withinModelPicker = event.target.closest('#model-slot-input, .provider-model-picker, [data-action="toggle-model-slot-menu"]');
            if (!withinModelPicker && state.modelSlotMenuOpen) {
                state.modelSlotMenuOpen = false;
                renderModelSlotMenu();
                return;
            }
        }
        if (state.currentView !== 'providerEditor') return;
        const withinPicker = event.target.closest('.provider-model-picker');
        if (!withinPicker && state.providerModelMenuOpen) {
            state.providerModelMenuOpen = false;
            renderProviderModelMenu();
        }
    });

})();

