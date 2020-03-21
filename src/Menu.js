class Menu {
    constructor(dropdownContent, btnOpen, btnClose,) {
        this.dropdownContent = dropdownContent;
        this.btnOpen = btnOpen;
        this.btnClose = btnClose;
    }

    init() {
        this.btnClose.style.display = 'none';
        this.btnOpen.addEventListener('click', () => {
            this.btnOpen.style.display = 'none';
            this.btnClose.style.display = 'block';
            this.dropdownContent.style.display = 'block';
        });

        this.btnClose.addEventListener('click', () => {
            this.btnClose.style.display = 'none';
            this.btnOpen.style.display = 'block';
            this.dropdownContent.style.display = 'none';
        });

        this.dropdownContent.addEventListener('click', () => {
            this.btnClose.style.display = 'none';
            this.btnOpen.style.display = 'block';
            this.dropdownContent.style.display = 'none';
        });
    }
}

new Menu(
    document.querySelector('#dropdown-content'),
    document.getElementById('dropbtn'),
    document.getElementById('dropbtn-close'),
).init();