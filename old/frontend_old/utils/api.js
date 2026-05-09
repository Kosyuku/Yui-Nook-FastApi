/**
 * API 请求封装
 */
const BASE_URL = 'http://127.0.0.1:8000/api';

export const api = {
    getLocalConfig() {
        try {
            return JSON.parse(localStorage.getItem('pyro_gemini_config') || '{}');
        } catch (e) {
            return {};
        }
    },

    // 基础 fetch 封装
    async request(endpoint, options = {}) {
        const url = `${BASE_URL}${endpoint}`;
        const config = this.getLocalConfig();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
        if (config.internal_token) {
            headers['X-Internal-Token'] = config.internal_token;
        }
        
        try {
            const response = await fetch(url, { ...options, headers });
            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || `Http Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error on ${endpoint}:`, error);
            throw error;
        }
    },

    // 模型 API
    async getModels() {
        return this.request('/models');
    },

    // 会话 API
    async getSessions() {
        return this.request('/sessions');
    },

    async createSession(title = '新对话', model = 'echo') {
        return this.request('/sessions', {
            method: 'POST',
            body: JSON.stringify({ title, model })
        });
    },

    async getSessionData(sessionId) {
        return this.request(`/sessions/${sessionId}`);
    },

    async updateSession(sessionId, updates) {
        return this.request(`/sessions/${sessionId}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    },

    async deleteSession(sessionId) {
        return this.request(`/sessions/${sessionId}`, {
            method: 'DELETE'
        });
    },

    // 聊天 SSE
    async chatStream(sessionId, content, model, overrides = {}, onMessage, onError, onDone) {
        const url = `${BASE_URL}/chat`;
        const config = this.getLocalConfig();
        
        try {
            const payload = { session_id: sessionId, content, model };
            // 传递所有覆盖配置
            if (overrides.api_key) payload.api_key = overrides.api_key;
            if (overrides.base_url) payload.base_url = overrides.base_url;
            // model 已经通过参数传入，不再重复设置

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(config.internal_token ? { 'X-Internal-Token': config.internal_token } : {}),
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errBody = await response.text();
                onError(new Error(errBody));
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                
                // SSE 格式解析：event: xxx\ndata: yyy\n\n
                // 按双换行分割消息块
                const blocks = buffer.split('\n\n');
                buffer = blocks.pop(); // 保留未完成的部分

                for (const block of blocks) {
                    if (!block.trim()) continue;
                    
                    const lines = block.split('\n');
                    let eventType = 'message';
                    let dataContent = '';
                    
                    for (const line of lines) {
                        if (line.startsWith('event:')) {
                            eventType = line.slice(6).trim();
                        } else if (line.startsWith('data:')) {
                            dataContent = line.slice(5).trim();
                        } else if (line.startsWith('data: ')) {
                            dataContent = line.slice(6).trim();
                        }
                    }

                    if (eventType === 'done' || dataContent === '[DONE]') {
                        onDone();
                        return;
                    }

                    if (eventType === 'error') {
                        onError(new Error(dataContent || '服务端错误'));
                        return;
                    }

                    if (dataContent) {
                        onMessage(dataContent);
                    }
                }
            }
            onDone();

        } catch (error) {
            onError(error);
        }
    },

    // 记忆 API
    async getMemories(category = null, limit = 50) {
        let endpoint = '/memories?limit=' + limit;
        if (category) endpoint += '&category=' + encodeURIComponent(category);
        return this.request(endpoint);
    },

    async createMemory(memory) {
        return this.request('/memories', {
            method: 'POST',
            body: JSON.stringify(memory)
        });
    },

    async updateMemory(memoryId, updates) {
        return this.request(`/memories/${memoryId}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    },

    async deleteMemory(memoryId) {
        return this.request(`/memories/${memoryId}`, {
            method: 'DELETE'
        });
    },

    // 日记/便签 API
    async getNotes(date = null, tags = null, limit = 50) {
        const params = new URLSearchParams({ limit: String(limit) });
        if (date) params.set('date', date);
        if (tags) params.set('tags', tags);
        return this.request(`/notes?${params.toString()}`);
    },

    async createNote(note) {
        return this.request('/notes', {
            method: 'POST',
            body: JSON.stringify(note),
        });
    },

    async deleteNote(noteId) {
        return this.request(`/notes/${noteId}`, {
            method: 'DELETE',
        });
    },

    // 大事记/历史
    async getHistory(date = null, limit = 100) {
        const params = new URLSearchParams({ limit: String(limit) });
        if (date) params.set('date', date);
        return this.request(`/history?${params.toString()}`);
    },

    // 主动消息
    async getProactive(limit = 10) {
        return this.request(`/proactive?limit=${limit}`);
    },

    async markProactiveRead(msgId) {
        return this.request(`/proactive/${msgId}/read`, {
            method: 'POST',
        });
    },
};
