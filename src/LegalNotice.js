import constants from './constants';

class LegalNotice {
    constructor(modal, open, close) {
        this.modal = modal;
        this.open = open;
        this.close = close;
    }

    events() {
        this.open.addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.style.display = 'block';
        });

        this.close.addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.style.display = 'none';
        });
    }
}

new LegalNotice(
    constants.legalNotice,
    constants.legalNoticeLink,
    constants.closeLegalNotice,
).events();