var Modal = {
    init: function () {
        modalLink.style.display = 'block';
        var signatureModal = document.getElementById('signatureModal');
        signatureModal.style.display = 'inline';
        signatureModal.src = sessionStorage.getItem('Signature');
        var close = document.getElementById('close');
        close.addEventListener('click', function (e) {
            contractModal.style.display = 'none';
        });
    },

    end: function () {
        modalLink.style.display = 'none';
        signatureModal.style.display = 'none';
    },
};

modalLink.style.display = 'inline-block';
// When the user clicks on the link, open the modal
modalLink.addEventListener('click', function (e) {
    e.preventDefault();
    contractModal.style.display = 'block';
});
