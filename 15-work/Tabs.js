class Tabs {
    static TABS_BUTTON_BLOCK = 'tabs-button';
    static TABS_CONTENT_BLOCK = 'tabs-block-content';
    static TAB_ITEM_ACTIVE = 'tab-item-active';
    static TAB_CONTENT_ACTIVE = 'tab-content-active';

    constructor(element) {
        this.rootEl = element;

        this.navBlock = this.getNavBlock();
        this.divBlock = this.getDivBlock();

        this.navItems = Array.from(this.navBlock.children);
        this.tabContents = Array.from(this.divBlock.children);

        this.initTabs();
        this.showTab(0);
    }

    getNavBlock() {
        return this.rootEl.querySelector(`.${Tabs.TABS_BUTTON_BLOCK}`);
    }

    getDivBlock() {
        return this.rootEl.querySelector(`.${Tabs.TABS_CONTENT_BLOCK}`);
    }

    initTabs() {
        this.navBlock.addEventListener('click', (event) => {
            if (event.target.classList.contains('tab-item')) {
                const index = this.navItems.indexOf(event.target);
                this.showTab(index);
            }
        });
    }

    showTab(index) {
        this.navItems.forEach((item, i) => {
            const isActive = i === index;
            item.classList.toggle(Tabs.TAB_ITEM_ACTIVE, isActive);
            this.tabContents[i].classList.toggle(Tabs.TAB_CONTENT_ACTIVE, isActive);
        });
    }
}