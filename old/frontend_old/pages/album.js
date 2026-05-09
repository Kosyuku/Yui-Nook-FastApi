export class AlbumPage {
    constructor(container) {
        this.container = container;
        this.storageKey = 'pyro_album_items';
        this.items = [];
    }

    init() {
        this.renderLayout();
        this.items = this.readItems();
        this.renderItems();
        this.bindEvents();
    }

    renderLayout() {
        this.container.innerHTML = `
            <div class="simple-page">
                <header class="simple-page-header">
                    <h2>照片库</h2>
                    <p>首版使用本地浏览器存储，后续可接云存储。</p>
                </header>
                <section class="simple-form">
                    <div class="simple-row">
                        <input id="album-file" type="file" accept="image/*" />
                    </div>
                </section>
                <section id="album-grid" class="album-grid"></section>
            </div>
        `;
    }

    bindEvents() {
        const input = this.container.querySelector('#album-file');
        input.addEventListener('change', async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const dataUrl = await this.fileToDataUrl(file);
            const item = {
                id: String(Date.now()),
                name: file.name,
                dataUrl,
                createdAt: new Date().toISOString(),
            };
            this.items.unshift(item);
            this.writeItems(this.items);
            this.renderItems();
            input.value = '';
        });

        this.container.addEventListener('click', (e) => {
            const btn = e.target.closest('.album-delete-btn');
            if (!btn) return;
            const id = btn.dataset.id;
            this.items = this.items.filter((it) => it.id !== id);
            this.writeItems(this.items);
            this.renderItems();
        });
    }

    renderItems() {
        const grid = this.container.querySelector('#album-grid');
        if (!this.items.length) {
            grid.innerHTML = '<div class="proactive-empty">还没有照片，上传第一张吧。</div>';
            return;
        }
        grid.innerHTML = this.items.map((it) => `
            <article class="album-card">
                <img src="${it.dataUrl}" alt="${this.escapeHtml(it.name)}" />
                <div class="album-card-footer">
                    <span>${this.escapeHtml(it.name)}</span>
                    <button class="delete-mem-btn album-delete-btn" data-id="${it.id}">删除</button>
                </div>
            </article>
        `).join('');
    }

    readItems() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch (e) {
            return [];
        }
    }

    writeItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
