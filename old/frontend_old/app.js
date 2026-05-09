import { Sidebar } from './components/sidebar.js';
import { ChatPage } from './pages/chat.js';
import { PlaceholderPage } from './pages/placeholders.js';
import { SettingsPage } from './pages/settings.js';
import { MemoryPage } from './pages/memory.js';
import { HomePage } from './pages/home.js';
import { DiaryPage } from './pages/diary.js';
import { AlbumPage } from './pages/album.js';
import { TimelinePage } from './pages/timeline.js';
import { BottomNav } from './components/bottom-nav.js';
import { MoreDrawer } from './components/more-drawer.js';

class App {
    constructor() {
        this.sidebarContainer = document.getElementById('sidebar-container');
        this.mainContainer = document.getElementById('main-content');
        
        this.sidebar = null;
        this.bottomNav = null;
        this.moreDrawer = null;
        this.pages = {};
        this.currentPage = null;
    }

    async init() {
        // 1. 初始化页面实例
        this.pages = {
            home: new HomePage(this.mainContainer, (path) => this.navigate(path)),
            chat: new ChatPage(this.mainContainer),
            moments: new PlaceholderPage(
                this.mainContainer, 
                '朋友圈', 
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>'
            ),
            diary: new DiaryPage(this.mainContainer),
            album: new AlbumPage(this.mainContainer),
            timeline: new TimelinePage(this.mainContainer),
            memory: new MemoryPage(this.mainContainer),
            settings: new SettingsPage(this.mainContainer)
        };

        // 2. 初始化侧边栏
        this.sidebar = new Sidebar(
            this.sidebarContainer,
            (path) => this.navigate(path),
            (sessionId) => {
                // Desktop: clicking a session in the sidebar jumps directly to that chat
                if (this.currentPage !== 'chat') {
                    window.location.hash = '#chat';
                }
                this.pages.chat.loadSession(sessionId);
            }
        );
        await this.sidebar.init();

        // 3. 初始化移动端导航与抽屉
        this.initMobileShell();

        // 注册 PWA Service Worker
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('./sw.js');
            } catch (e) {
                console.warn('Service worker 注册失败', e);
            }
        }

        // 4. 首次路由解析
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    initMobileShell() {
        let navContainer = document.getElementById('bottom-nav-container');
        if (!navContainer) {
            navContainer = document.createElement('div');
            navContainer.id = 'bottom-nav-container';
            document.body.appendChild(navContainer);
        }
        this.bottomNav = new BottomNav(
            navContainer,
            (path) => { window.location.hash = `#${path}`; },
            () => this.moreDrawer?.open()
        );
        this.bottomNav.init();

        let drawerContainer = document.getElementById('more-drawer-container');
        if (!drawerContainer) {
            drawerContainer = document.createElement('div');
            drawerContainer.id = 'more-drawer-container';
            document.body.appendChild(drawerContainer);
        }
        this.moreDrawer = new MoreDrawer(drawerContainer, (path) => {
            window.location.hash = `#${path}`;
        });
        this.moreDrawer.init();
    }

    async handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        this.navigate(hash);
    }

    async navigate(path) {
        if (!this.pages[path]) {
            path = 'home';
        }

        if (this.currentPage && this.pages[this.currentPage]?.destroy) {
            this.pages[this.currentPage].destroy();
        }

        this.currentPage = path;
        this.sidebar.setActiveNav(path);
        this.bottomNav?.setActive(path);

        // Chat page: always show the contact list first.
        // Desktop sidebar can still call loadSession() directly.
        if (path === 'chat') {
            await this.pages.chat.init();
        } else {
            this.pages[path].init();
        }
    }
}

// 启动应用
const app = new App();
app.init();
