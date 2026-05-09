/**
 * 系统设置页面 - 允许用户输入自定义 API Key 和 Endpoint
 */
export class SettingsPage {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
        this.loadSettings();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="settings-page">
                <header class="chat-header">
                    <button class="icon-btn mobile-menu-btn" id="mobile-menu-btn">
                        <i data-feather="menu"></i>
                    </button>
                    <div class="chat-title">系统设置</div>
                    <div class="header-actions"></div>
                </header>
                
                <div class="settings-content">
                    <section class="settings-section">
                        <h3>API 核心配置</h3>
                        <p class="hint">这些设置保存在本地浏览器中，发送消息时会覆盖后端默认配置。</p>
                        
                        <div class="form-group">
                            <label>API Key</label>
                            <input type="password" id="setting-api-key" placeholder="输入 Gemini / DeepSeek / Claude 的密钥">
                        </div>
                        
                        <div class="form-group">
                            <label>API 代理地址 (Base URL)</label>
                            <input type="text" id="setting-base-url" placeholder="例: https://generativelanguage.googleapis.com/v1beta/openai/">
                        </div>

                        <div class="form-group">
                            <label>默认模型名</label>
                            <input type="text" id="setting-model" placeholder="例: gemini-2.0-flash-thinking-exp-01-21">
                        </div>

                        <div class="form-group">
                            <label>网关内部 Token（可选）</label>
                            <input type="password" id="setting-internal-token" placeholder="对应后端 INTERNAL_API_TOKEN">
                        </div>
                    </section>

                    <button class="save-btn" id="save-settings-btn">保存配置</button>
                    <div id="save-status" class="status-msg"></div>
                </div>
            </div>
        `;
        if (window.feather) feather.replace();
    }

    loadSettings() {
        const saved = localStorage.getItem('pyro_gemini_config');
        if (saved) {
            const config = JSON.parse(saved);
            this.container.querySelector('#setting-api-key').value = config.api_key || '';
            this.container.querySelector('#setting-base-url').value = config.base_url || '';
            this.container.querySelector('#setting-model').value = config.model || '';
            this.container.querySelector('#setting-internal-token').value = config.internal_token || '';
        }
    }

    bindEvents() {
        const saveBtn = this.container.querySelector('#save-settings-btn');
        const status = this.container.querySelector('#save-status');
        
        saveBtn.addEventListener('click', () => {
            const config = {
                api_key: this.container.querySelector('#setting-api-key').value.trim(),
                base_url: this.container.querySelector('#setting-base-url').value.trim(),
                model: this.container.querySelector('#setting-model').value.trim(),
                internal_token: this.container.querySelector('#setting-internal-token').value.trim(),
            };
            
            localStorage.setItem('pyro_gemini_config', JSON.stringify(config));
            
            status.textContent = '✅ 已保存！下次发消息时生效。';
            status.style.color = 'green';
            
            setTimeout(() => { status.textContent = ''; }, 3000);
        });

        // 手机端汉堡菜单支持
        const mobileBtn = this.container.querySelector('#mobile-menu-btn');
        const sidebar = document.getElementById('sidebar-container');
        if (mobileBtn && sidebar) {
            mobileBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
        }
    }
}
