var MentionsLegales = {
    init: function () {
        this.events();
    },

    events: function () {
        mentionsLegalesLink.addEventListener('click', function () {
            mentionsLegales.classList.remove('display-none');
            mentionsLegales.classList.add('mentions-legales');
            mentionsLegales.style.right = '-100%';
        });

        closeMentionsLegales.addEventListener('click', function () {
            mentionsLegales.classList.add('display-none');
            mentionsLegales.classList.remove('mentions-legales');
            mentionsLegales.style.right = '-100%';
        });
    },
}
MentionsLegales.init();
