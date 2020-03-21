class FormatDate {
    init() {
        document.getElementById('date-contract').textContent = this.format(new Date());
    }

    format(lastUpdate) {
        // conversion de la date de mise à jour dans le bon format
        let date = new Date(lastUpdate); // récupération de la date (timestamp indiquant le moment de la dernière mise à jour en millisecondes)
        let days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        let months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];

        // construction du message
        let message = days[date.getDay()] + ' ';
        message += date.getDate() + ' ';
        message += months[date.getMonth()] + ' ';
        message += date.getFullYear() + ' à ';
        message += date.getHours() + 'h';
        message += date.getMinutes() + 'm';

        return message;
    }
}

new FormatDate().init();

module.exports = FormatDate;