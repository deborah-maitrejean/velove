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
    <link rel="icon" type="image/png" href="img/ico/logo.ico">

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
        <img src="img/logo.png" alt="logo du site VeLove, représentant un personnage sur un vélo." id="logo">
        <div>
            <h1>VéLove</h1>
            <p id="paragraphe1" title="titre du p1">Bienvenue sur VéLove, site interactif de location de vélos sur
                Lyon</p>
        </div>
        <!-- Menu principal -->
        <nav id="navigation">
            <!-- Dropdown menu -->
            <div id="dropdown">
                <button id="dropbtn"><i class="fa fa-bars fa-3x" aria-hidden="true"></i></button>
                <button id="dropbtn-close"><i class="fa fa-times fa-3x" aria-hidden="true"></i></button>
                <div id="dropdown-content">
                    <a href="#top" class="scroll"><span>VéLove</span></a>
                    <a href="#slides" class="scroll">Mode d'emploi</a>
                    <a href="#map" class="scroll">Réservation</a>
                </div>
            </div>
            <ul>
                <li><a href="#top" class="scroll"><span>VéLove</span></a></li>
                <li><a href="#slides" class="scroll">Mode d'emploi</a></li>
                <li><a href="#map" class="scroll">Réservation</a></li>
            </ul>
        </nav>
    </header>

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

    <aside id="mapSection">
        <div id="map">
        </div>
        <div id="reservation-container">
            <div id="chargement">
                <p>Veuillez sélectionner une station sur la carte.</p>
                <div class="loader">
                    <div class="bar"><span class="sphere"></span></div>
                </div>
            </div>
            <div id="streetViewMap"></div>
            <div id="detailsStation" class="details-station-none">
                <h3 id="titreElt"></h3>
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
                <a href="contract.html" id="contract">Lire le contrat</a>
                <div id="canvasBtn">
                    <button type="submit" name="button" id="sign">Valider</button>
                    <button type="reset" name="button" id="reset">Réinitialiser</button>
                </div>
            </div>
        </div>
    </aside>

    <figure id="legend">
        <figcaption>Legende</figcaption>
        <div>
            <div>
                <img src="img/legend/station-open-and-available-bike.png" alt="La station est ouverte"
                     class="legendImg">
                Station ouverte
            </div>
            <div>
                <img src="img/legend/no-available-bikes.png" alt="Pas de vélo disponible dans cette station"
                     class="legendImg">
                Pas de vélo disponible
            </div>
            <div>
                <img src="img/legend/station-closed.png" alt="La station est fermée" class="legendImg">
                Station fermée
            </div>
        </div>
    </figure>

    <section id="timerSection">
        <div id="timer">
            <p id="noReservation">Aucune réservation en cours.</p>
            <p id="pTimer">Votre vélo est réservé pour <span id="minutes"></span> minute(s) et <span
                        id="secondes"></span> seconde(s).</p>
            <p id="endTimerMessage">Fin de la réservation de votre vélo.</p>
            <button type="button" name="button" id="cancelBtn">Annuler</button>
        </div>
        <div id="signDivElt">
            <figure id="figureSign">
                <img src="" alt="Votre signature est affichée" id="imgSignature">
            </figure>
            <!-- Trigger/Open The Modal -->
            <a href="contract.html" id="modalLink">Ouvrir le contrat signé</a>
            <!-- Modal -->
            <div id="contractModal" class="modal">
                <div class="modal-content"> <!-- Modal content -->
                    <span id="close">&times;</span>
                    <?php include_once("contract.html"); ?>
                </div>
            </div>
        </div>
    </section>

    <article id="mentions-legales" class="display-none">
        <span id="close-mentions-legales"><i class="fa fa-times fa-3x" aria-hidden="true"></i></span>
        <?php include_once("mentions_legales.php"); ?>
    </article>

    <footer id="footer">
        <span>Site réalisé par <a href="http://deborah-maitrejean.com/">Déborah Maitrejean</a></span>
        <span>VéLove &copy; 2018 Tous droits réservés</span>
        <a href="#mentions-legales" id="mentions-legales-link">Mentions légales</a>
    </footer>

    <div class="bottom"></div>
</div>

<script src="js/constantes.js"></script>
<script src="js/ajax.js"></script>
<script src="js/GoogleMapStyle.js"></script>
<script src="js/markerclusterer.js"></script>
<script src="js/contractPopUp.js"></script>
<script src="js/canvas.js"></script>
<!-- Script permettant de vérifier que web storage peut être utilisé -->
<script src="js/webStorageTest.js"></script>
<script src="js/contractModal.js"></script>
<script src="js/timer.js"></script>
<script src="js/map.js"></script>
<!-- Chargement de l'API Google Maps -->
<script src="https://maps.googleapis.com/maps/api/js?key=yourkey&callback=VelovMap.init"
        async defer></script>
<script src="js/slider.js"></script>
<script src="js/navigation.js"></script>
<script src="js/menu.js"></script>
<script src="js/mentionsLegales.js"></script>

<!-- Message pour les utilisateurs ayant désactivé JS -->
<noscript>
    <p>Attention :<br>
        Afin de pouvoir utiliser Google Map, JavaScript doit être activé.
    </p>
</noscript>

</body>
</html>
