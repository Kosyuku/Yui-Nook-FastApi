export class PlaceholderPage {
    constructor(container, title, icon) {
        this.container = container;
        this.title = title;
        this.icon = icon;
    }

    init() {
        this.container.innerHTML = `
            <div class="placeholder-page">
                ${this.icon}
                <h1>${this.title}</h1>
                <p>建设中... (第一步仅搭骨架，后续迭代填充)</p>
            </div>
        `;
    }
}
