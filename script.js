import { addMarker, removeMarker, downloadMarkers } from './markerStore.js';

// Initialisation de la carte
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
});

// Définir les dimensions de l'image
const bounds = [[0, 0], [2755, 6400]];
const image = L.imageOverlay('map.png', bounds).addTo(map);

map.fitBounds(bounds);

// Ajouter un marqueur par clic utilisateur
map.on('click', function (e) {
    const coords = e.latlng;
    const info = prompt("Entrez une information pour ce marqueur :", "Nouvelle info");
    addMarker(map, coords.lat, coords.lng, info);
});

// Rendre la fonction `removeMarker` disponible globalement
window.removeMarker = removeMarker;

//DL marquers
document.getElementById('download-markers').addEventListener('click', downloadMarkers);
