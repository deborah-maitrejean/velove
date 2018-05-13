/*---------- carte API google map ----------*/
var VelovMap = {
  _this: '',

  init: function () {
    _this = this;
    var options = {
      center: { lat: 45.750000, lng: 4.835658999999964 },
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyle,
      keyboardShortcuts: false,
    };
    this.map = new google.maps.Map(mapElt, options);

    this.url = 'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=264b2fb9f9dfaf025a175c8251bb239385116381';

    VelovMap.initStyle();
    VelovMap.stationsDataMarkers();
  },

  initStyle: function () {
    detailsStation.classList.remove('details-station');
    detailsStation.classList.add('details-station-none');
    modalLink.style.display = 'none';
  },

  detailsStationStyle: function () {
    sectionCanvas.classList.add('section-canvas-none');
    sectionCanvas.classList.remove('section-canvas');
    reservationContainer.style.display = 'block';
    chargement.style.display = 'none';
    detailsStation.classList.add('details-station');
    detailsStation.classList.remove('details-station-none');
    document.getElementById('streetViewMap').style.display = 'block';
  },

  ifSession: function () {
    sessionStorage.clear();
    console.log('Les données de la session sont effacées.');
    btnTimerElmt.style.display = 'none';
    signDivElt.style.display = 'none';
    pTimerElmt.style.display = 'none';
    endTimerMessage.style.display = 'none';
    noReservation.style.display = 'block';
    chargement.style.display = 'none';
    detailsStation.classList.remove('details-station');
    detailsStation.classList.add('details-station-none');
    document.getElementById('streetViewMap').style.display = 'none';
  },

  stationStreetView: function (latLng) {
    streetView = new google.maps.StreetViewPanorama(document.getElementById('streetViewMap'),{
      position: latLng,
      linksControl: false,
      panControl: false,
    });
  },

  stationsDataMarkers: function () {
    ajaxGet(this.url, function (reponse) {
      var markers = [];
      var marker;
      var unicode;
      var etat;
      var markerColor;
      var dataJcDecaux = JSON.parse(reponse);

      dataJcDecaux.forEach(function (donnees) {
        var status = donnees.status; // état de la station, peut être CLOSED ou OPEN
        var availableBikes = donnees.available_bikes; // nombre de vélos disponibles et opérationnels
        if (status === 'OPEN') {
          status = 'ouverte';
          unicode = '\uf206';
          markerColor = 'black';
          if (availableBikes !== 0) {
            markerUrl = 'img/label/red-blank.png';
          } else {
            markerUrl = 'img/label/orange-blank.png';
          }
        } else if (status === 'CLOSED' && (availableBikes !== 0  || availableBikes === 0)){
          status = 'fermée';
          unicode = '\uf00d';
          markerColor = 'black';
          markerUrl = 'img/label/pink-blank.png';
        }

        var lastUpdate = donnees.last_update; // timestamp indiquant le moment de la dernière mise à jour en millisecondes
        // conversion de la date de mise à jour dans le bon format
        var jours = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');
        var mois = new Array('janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre');
        // récupération de la date
        var date = new Date(lastUpdate);
        // construction du message
        var message = jours[date.getDay()] + ' ';
        message += date.getDate() + ' ';
        message += mois[date.getMonth()] + ' ';
        message += date.getFullYear() + ' à ';
        message += date.getHours() + 'h';
        message += date.getMinutes() + 'm';
        var maj = message;

        var image = {
          url: markerUrl,
          size: new google.maps.Size(64, 64),
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 40),
          labelOrigin: new google.maps.Point(25, 16),
        };

        marker = new google.maps.Marker({
          position: donnees.position,
          map: _this.map,
          icon: image,
          label: {
            fontFamily: 'Fontawesome',
            text: unicode,
            fontSize: '14px',
            color: markerColor,
          },
          title: 'Station N°' + donnees.name + ' - ' + status,
          number: donnees.number,
          name: donnees.name,
          address: donnees.address,
          banking: donnees.banking,
          status: status,
          contractName: donnees.contract_name,
          bikeStands: donnees.bike_stands,
          availableBikeStands: donnees.available_bike_stands,
          availableBikes: availableBikes,
          maj: maj,
        });

        marker.addListener('click', function () {
          VelovMap.selectionStation(this);
        });

        markers.push(marker);
      });

      var markerCluster = new MarkerClusterer(_this.map, markers,
        { imagePath: 'img/markerclusterer/m/m' }
      );

    });
  },

  selectionStation: function (marker) {
    console.log('L\'internaute a cliqué sur une station, les données de cette dernière s\'affichent.');
    VelovMap.detailsStationStyle();

    titreElt.textContent = 'Station N°' + marker.name;
    divElt.innerHTML = '<b>Adresse</b> : ' + marker.address;
    div2Elt.innerHTML = '<b>Statut</b> : ' + marker.status;
    div3Elt.innerHTML = '<b>Nombre de vélos disponibles</b> : ' + marker.availableBikes;
    div4Elt.innerHTML = '<b>Nombre de points d\'attache opérationnels</b> : ' + marker.bikeStands;
    div5Elt.innerHTML = '<b>Dernière mise à jour</b> : ' + marker.maj;

    VelovMap.stationStreetView(marker.position);

    if (marker.status === 'ouverte' && marker.availableBikes !== 0) {
      btnReserverElt.style.display = 'block';
      pElt.style.display = 'none';
      p2Elt.style.display = 'none';
      btnReserverElt.addEventListener('click', function () {
        if (sessionStorage.getItem('Signature') !== null) {
          alert('Attention : la nouvelle réservation effacera la précédente.');
          console.log('Nouvelle réservation.');
          VelovMap.ifSession();
          titreCanvas.textContent = 'Station n° ' + marker.name;

          sessionStorage.setItem('Nom de la station', marker.name);
          Canvas.init();
        } else {
          detailsStation.classList.remove('details-station');
          detailsStation.classList.add('details-station-none');
          document.getElementById('streetViewMap').style.display = 'none';
          console.log('Click sur le bouton RESERVER.');
          titreCanvas.textContent = 'Station n° ' + marker.name;

          sessionStorage.setItem('Nom de la station', marker.name);
          Canvas.init();
        }
      });
    } else if (marker.status === 'ouverte' && marker.availableBikes === 0) {
      btnReserverElt.style.display = 'none';
      pElt.style.display = 'block';
      pElt.textContent = 'Aucun vélo disponible dans cette station.';
    } else {
      btnReserverElt.style.display = 'none';
      p2Elt.style.display = 'block';
      p2Elt.textContent = 'La station est fermée.';
    }
  },
};
