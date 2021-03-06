import constants from './constants';
import Station from './Station';
import Ajax from "./Ajax";
import FormatDate from "./FormatDate";
import GoogleMapStyle from "./GoogleMapStyle";

function initMap() {
    class VeloveMap {
        constructor(map, streetViewId, url) {
            this.map = map;
            this.streetViewId = streetViewId;
            this.url = url;
        }

        setData() {
            new Station().init();

            new Ajax(this.url, (response) => {
                let stations = JSON.parse(response);
                let markers = [];
                let marker;

                stations.forEach((station) => {
                    marker = this.setMarkers(station);
                    markers.push(marker);

                    this.markerEvent(marker);
                });

                this.setMarkerClusters(markers);
            }).get();
        }

        setMarkers(station) {
            let unicode;
            let markerColor;
            let markerUrl;
            let status = station.status; // état de la station, CLOSED or OPEN
            let availableBikes = station.available_bikes; // nombre de vélos disponibles et opérationnels

            if (status === 'OPEN') {
                status = 'ouverte';
                unicode = '\uf206';
                markerColor = 'black';
                if (availableBikes !== 0) {
                    markerUrl = 'img/label/red.png';
                } else {
                    markerUrl = 'img/label/blue.png';
                }
            } else if (status === 'CLOSED' && (availableBikes !== 0 || availableBikes === 0)) {
                status = 'fermée';
                unicode = '\uf00d';
                markerColor = 'black';
                markerUrl = 'img/label/yellow.png';
            }

            let image = this.customIcon(markerUrl);
            let maj = new FormatDate().format(station.last_update);

            return new google.maps.Marker({
                position: station.position,
                map: this.map,
                icon: image,
                label: {
                    fontFamily: 'Fontawesome',
                    text: unicode,
                    fontSize: '16px',
                    color: markerColor,
                },
                title: `Station N° ${station.name} - ${status}`,
                number: station.number,
                name: station.name,
                address: station.address,
                banking: station.banking,
                status: status,
                contractName: station.contract_name,
                bikeStands: station.bike_stands,
                availableBikeStands: station.available_bike_stands,
                availableBikes: availableBikes,
                maj: maj,
            });
        }

        customIcon(markerUrl) {
            return {
                url: markerUrl,
                size: new google.maps.Size(64, 64),
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40),
                labelOrigin: new google.maps.Point(25, 16),
            };
        }

        setMarkerClusters(markers) {
            new MarkerClusterer(
                this.map,
                markers, {
                    imagePath: 'img/markerclusterer/m/m',
                }
            );
        }

        markerEvent(marker) {
            google.maps.event.addListener(marker, "click", () => {
                new Station().displayDetails(marker);
                this.streetView(marker.position);
                new Station().check(marker);
            });
        }

        streetView(latLng) {
            new google.maps.StreetViewPanorama(document.getElementById(this.streetViewId), {
                position: latLng,
                linksControl: false,
                panControl: false,
            });
        }
    }

    let options = {
        center: {lat: 45.750000, lng: 4.835658999999964},
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: GoogleMapStyle,
        keyboardShortcuts: false,
    };
    new VeloveMap(
        new google.maps.Map(constants.mapElt, options),
        'streetViewMap',
        'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=264b2fb9f9dfaf025a175c8251bb239385116381',
    ).setData();
}

window.initMap = initMap;