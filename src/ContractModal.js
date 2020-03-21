import constants from './constants';

class ContractModal {
    constructor() {
        this.signatureModal = document.getElementById('signatureModal');
        this.close = document.getElementById('close');
    }

    default() {
        constants.modalLink.style.display = 'inline-block';
        // When the user clicks on the link, open the modal
        constants.modalLink.addEventListener('click', (e) => {
            e.preventDefault();
            constants.contractModal.style.display = 'block';
        });
    }

    init() {
        constants.modalLink.style.display = 'block';
        this.signatureModal.style.display = 'inline';
        this.signatureModal.src = sessionStorage.getItem('Signature');
        this.close.addEventListener('click', () => {
            constants.contractModal.style.display = 'none';
        });
    }

    end() {
        constants.modalLink.style.display = 'none';
        this.signatureModal.style.display = 'none';
    }
}

new ContractModal().default();

export default ContractModal;