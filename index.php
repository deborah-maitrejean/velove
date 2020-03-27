<?php
function proteger($adr)
{
    $adresseCodee = "";
    for ($i = 0; $i < strlen($adr); $i++)
        $adresseCodee .= "&#" . ord(substr($adr, $i, 1)) . ";";
    return $adresseCodee;
}

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>VéLove</title>
    <meta name="description" content="Bienvenue sur VéLove, site interactif de location de vélos sur Lyon."/>
    <meta name="keywords"
          content="louer un vélo lyon, louer un velo lyon, location vélo lyon, location velo lyon, carte location velo"/>
    <meta name="robots" content="index, follow, archive"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="language" content="fr"/>
    <meta name="copyright" content="Déborah Maitrejean"/>

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="img/ico/favicon-48-48.ico" sizes="48x48">
    <link rel="shortcut icon" type="image/x-icon" href="img/ico/favicon-32-32.ico" sizes="32x32">
    <link rel="shortcut icon" type="image/x-icon" href="img/ico/favicon-16-16.ico" sizes="16x16">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- Intégration de la librairie jQuery -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
</head>

<body>
<div id="container">
    <span id="top"></span>
    <header>
        <img src="img/logo.png" alt="Logo du site VéLove." id="logo">
        <div>
            <a href="#top" class="scroll"><h1>VéLove</h1></a>
        </div>
        <!-- Menu principal -->
        <nav id="navigation">
            <!-- Dropdown menu -->
            <div id="dropdown">
                <button id="dropbtn"><i class="fa fa-bars fa-3x" aria-hidden="true"></i></button>
                <button id="dropbtn-close"><i class="fa fa-times fa-3x" aria-hidden="true"></i></button>
                <div id="dropdown-content">
                    <a href="#slides" class="scroll">Mode d'emploi</a>
                    <a href="#map" class="scroll">Réservation</a>
                </div>
            </div>
            <ul>
                <li><a href="#slides" class="scroll">Mode d'emploi</a></li>
                <li><a href="#map" class="scroll">Réservation</a></li>
            </ul>
        </nav>
    </header>

    <section id="section">
        <h2>Bienvenue sur VéLove, site interactif de location de vélos sur Lyon</h2>
        <section id="slides-container">
            <ul id="slides">
                <li class="slide showing">
                    <img src="img/slider/slide1.png" alt="Diapo 1 : séléctionnez une station sur la carte">
                </li>
                <li class="slide">
                    <img src="img/slider/slide2.png"
                         alt="Diapo 2 : un encart affiche désormais les données de la stations, il faut cliquer sur le bouton 'Réserver un vélo'">
                </li>
                <li class="slide">
                    <img src="img/slider/slide3.png" alt="Diapo 3 : il faut signer dans le canvas, puis sur 'valider'">
                </li>
                <li class="slide">
                    <img src="img/slider/slide4.png"
                         alt="Diapo 4 : votre vélo est réservé pour 20 minutes, le décompte s'affiche en bas de page">
                </li>
            </ul>
            <div id="slide-btn">
                <button id="prev" title="Précédent" class="controls">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <button class="controls" id="pause">Pause</button>
                <button id="next" title="Suivant" class="controls">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
            </div>
        </section>
    </section>

    <aside id="mapSection">
        <div id="map">
        </div>
        <div id="bookingContainer">
            <div id="loading">
                <p>Veuillez sélectionner une station sur la carte.</p>
                <div class="loader">
                    <div class="bar"><span class="sphere"></span></div>
                </div>
            </div>
            <div id="streetViewMap"></div>
            <div id="stationDetails" class="details-station-none">
                <h3 id="titleElt"></h3>
                <div id="divElt"></div>
                <div id="div2Elt"></div>
                <div id="div3Elt"></div>
                <div id="div4Elt"></div>
                <div id="div5Elt"></div>
                <p id="pElt"></p>
                <p id="p2Elt"></p>
                <button type="button" id="btnReserverVelo" class='btnReserver'>Réserver un vélo</button>
            </div>
            <div id="sectionCanvas" class="section-canvas-none">
                <h3 id="titre-canvas"></h3>
                <canvas id="canvas">
                    <p>Attention : Votre navigateur ne supporte pas l'élément canvas.</p>
                </canvas>
                <canvas id="canvasVerification"></canvas>
                <a href="contract.php" id="contract">Lire le contrat</a>
                <div id="canvasBtn">
                    <button type="submit" name="button" id="sign">Valider</button>
                    <button type="reset" name="button" id="reset">Réinitialiser</button>
                </div>
            </div>
        </div>
    </aside>

    <section id="legend">
        <h3>Légende</h3>
        <div>
            <figure>
                <img src="img/legend/station-open-and-available-bike.png" alt="La station est ouverte"
                     class="legendImg">
                <figcaption>Station ouverte</figcaption>
            </figure>
            <figure>
                <img src="img/legend/no-available-bikes.png" alt="Pas de vélo disponible dans cette station"
                     class="legendImg">
                <figcaption>Pas de vélo disponible</figcaption>
            </figure>
            <figure>
                <img src="img/legend/station-closed.png" alt="La station est fermée" class="legendImg">
                <figcaption>Station fermée</figcaption>
            </figure>
        </div>
    </section>

    <section id="timerSection">
        <div id="timer">
            <p id="noReservation">Aucune réservation en cours.</p>
            <p id="pTimer">Votre vélo est réservé pour <span id="minutes"></span> minute(s) et <span
                        id="seconds"></span> seconde(s).</p>
            <p id="endTimerMessage">Fin de la réservation de votre vélo.</p>
            <button type="button" name="button" id="cancelBtn">Annuler</button>
        </div>
        <div id="signDivElt">
            <figure id="figureSign">
                <img src="" alt="Votre signature est affichée" id="imgSignature">
            </figure>
            <!-- Trigger/Open The Modal -->
            <a href="contract.php" id="modalLink">Ouvrir le contrat signé</a>
            <!-- Modal -->
            <div id="contractModal" class="modal">
                <div class="modal-content"> <!-- Modal content -->
                    <span id="close" class="close"><i class="fa fa-times fa-2x" aria-hidden="true"></i></span>
                    <?php include_once("contract-modal.html"); ?>
                </div>
            </div>
        </div>
    </section>

    <article id="legalNotice" class="modal display-none">
        <div class="modal-content">
            <span id="closeLegalNotice" class="close"><i class="fa fa-times fa-2x" aria-hidden="true"></i></span>
            <?php include_once("legal_notice.php"); ?>
        </div>
    </article>

    <footer id="footer">
        <span>Application Web réalisée par <strong><a href="https://www.deborah-maitrejean.com/" title="Déborah Maitrejean, développeur Web freelance à Lyon">Déborah Maitrejean</a></strong></span>
        <span>VéLove &copy; 2018-2020 Tous droits réservés</span>
        <a href="#legalNotice" id="legalNoticeLink">Mentions légales</a>
    </footer>

    <div class="bottom"></div>
</div>

<script src="./dist/polyfill.bundle.js"></script>
<script src="./dist/app.bundle.js"></script>
<script src="./dist/Ajax.bundle.js"></script>
<script src="./dist/constants.bundle.js"></script>
<script src="./dist/GoogleMapStyle.bundle.js"></script>
<script src="./dist/markerclusterer.bundle.js"></script>
<script src="./dist/ContractPopUp.bundle.js"></script>
<script src="./dist/Booking.bundle.js"></script>
<script src="./dist/Canvas.bundle.js"></script>
<script src="./dist/webStorageTest.bundle.js"></script>
<script src="./dist/ContractModal.bundle.js"></script>
<script src="./dist/Timer.bundle.js"></script>
<script src="./dist/FormatDate.bundle.js"></script>
<script src="./dist/Station.bundle.js"></script>
<script src="./dist/VeloveMap.bundle.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGM8IU3zeS4K7mtXApL-s9-u6dmv8iR3M&callback=initMap"
        async defer></script>
<script src="./dist/Slider.bundle.js"></script>
<script src="./dist/navigation.bundle.js"></script>
<script src="./dist/Menu.bundle.js"></script>
<script src="./dist/LegalNotice.bundle.js"></script>

<!-- Message pour les utilisateurs ayant désactivé JS -->
<noscript>
    <p>Attention :<br>
        Afin de pouvoir utiliser Google Map, JavaScript doit être activé.
    </p>
</noscript>

</body>
</html>