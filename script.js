// Initialisation de la carte
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
});

// Définir les dimensions de l'image
const bounds = [[0, 0], [1000, 1000]]; // Ajustez selon les dimensions réelles de votre image
const image = L.imageOverlay('map.png', bounds).addTo(map);

map.fitBounds(bounds);

// Ajouter un marqueur statique avec une popup
L.marker([500, 500]).addTo(map)
    .bindPopup('Ceci est un marqueur interactif')
    .openPopup();

// Ajouter un marqueur à l'endroit où l'utilisateur clique
map.on('click', function (e) {
    const coords = e.latlng; // Récupère les coordonnées du clic
    L.marker([coords.lat, coords.lng]) // Crée un nouveau marqueur
        .addTo(map)
        .bindPopup(`Marqueur ajouté à :<br>Lat: ${coords.lat.toFixed(2)}, Lng: ${coords.lng.toFixed(2)}`)
        .openPopup();
});

// Ajouter un cercle interactif
L.circle([400, 400], { // Coordonnées du centre
    color: 'red', // Couleur de la bordure
    fillColor: '#f03', // Couleur du remplissage
    fillOpacity: 0.5, // Opacité du remplissage
    radius: 100 // Rayon en pixels
}).addTo(map)
  .bindPopup('Ceci est une zone circulaire');

// Ajouter un événement sur un marqueur
const marker = L.marker([600, 600]).addTo(map);
marker.on('click', function () {
    alert('Vous avez cliqué sur un marqueur !');
});

// Charger des données GeoJSON
const geojsonData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [500, 500]
            },
            "properties": {
                "name": "Point d'intérêt (GeoJSON)"
            }
        }
    ]
};

L.geoJSON(geojsonData, {
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }
}).addTo(map);