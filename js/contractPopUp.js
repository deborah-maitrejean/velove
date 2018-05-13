/*----- contrat de location -----*/
var Contract = {
  width: null,
  height: null,
  top: null,
  left: null,

  openContract: function () {
    // taille de la fenêtre
    this.width = 800;
    this.height = 800;
    this.top = (screen.height - this.height) / 2;
    this.left = (screen.width - this.width) / 2;
    window.open(
      'contract.html',
      'contrat_de_location',
      'menubar=no, scrollbars=no, top=' + this.top + ', left=' + this.left + ', width=' + this.width + ', height=' + this.height
    );
  },
};

// Evénement lors du clique sur le lien du contrat de location
document.getElementById('contract').addEventListener('click', function (e) {
  e.preventDefault();
  Contract.openContract();
});
