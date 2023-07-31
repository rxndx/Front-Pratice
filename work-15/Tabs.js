class Tabs {
    static TABS_BUTTON_BLOCK = 'tabs-button';
    static TABS_CONTENT_BLOCK = 'tabs-block-content';
    static TAB_ITEM_ACTIVE = 'tab-item-active';
    static TAB_CONTENT_ACTIVE = 'tab-content-active';

    constructor(element) {
        this.rootEl = element;
        this.navItems = this.getNavItems();
        this.tabContents = this.getTabContents();

        this.initTabs();
        this.showTab(0);
    }

    getNavBlock() {
        return this.rootEl.querySelector(`.${Tabs.TABS_BUTTON_BLOCK}`);
    }

    getDivBlock() {
        return this.rootEl.querySelector(`.${Tabs.TABS_CONTENT_BLOCK}`);
    }

    getNavItems() {
        return Array.from(this.getNavBlock().children);
    }

    getTabContents() {
        return Array.from(this.getDivBlock().children);
    }

    initTabs() {
        this.navItems.forEach((item, index) => {
            item.addEventListener('click', this.showTab.bind(this, index));
        });
    }

    showTab(index) {
        this.navItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add(Tabs.TAB_ITEM_ACTIVE);
                this.tabContents[i].classList.add(Tabs.TAB_CONTENT_ACTIVE);
            } else {
                item.classList.remove(Tabs.TAB_ITEM_ACTIVE);
                this.tabContents[i].classList.remove(Tabs.TAB_CONTENT_ACTIVE);
            }
        });
    }
}