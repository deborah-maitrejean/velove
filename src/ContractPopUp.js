class Contract {
    constructor() {
        this.width = null;
        this.height = null;
        this.top = null;
        this.left = null;
    }

    openContract() {
        // taille de la fenêtre
        this.width = 800;
        this.height = 800;
        this.top = (screen.height - this.height) / 2;
        this.left = (screen.width - this.width) / 2;

        let _this = this;
        window.open(
            'contract.php',
            'contrat_de_location',
            'menubar=no, scrollbars=no, top=' + _this.top + ', left=' + _this.left + ', width=' + _this.width + ', height=' + _this.height
        );
    }
}

// Evénement lors du clique sur le lien du contrat de location
document.getElementById('contract').addEventListener('click', (e) => {
    e.preventDefault();
    new Contract().openContract();
});
