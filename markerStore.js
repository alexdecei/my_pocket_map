import { Marker } from './marker.js';

const markerStore = [];

const initialMarkers = [
    { lat: 500, lng: 500, info: "Point d'intérêt 1" },
    { lat: 400, lng: 400, info: "Point d'intérêt 2" },
];


// Ajouter un marqueur
export function addMarker(map, lat, lng, info) {
    const newMarker = new Marker(map, lat, lng, info);
    markerStore.push(newMarker);
    console.log(markerStore)
    return newMarker;
}


// Supprimer un marqueur par ID
export function removeMarker(id) {
    const index = markerStore.findIndex(marker => marker.id === id);
    if (index !== -1) {
        markerStore[index].remove(); // Supprime de la carte
        markerStore.splice(index, 1); // Supprime du tableau
        console.log(`Marqueur ${id} supprimé.`);
    }
}

// récupérer les markers 
function exportMarkers() {
    const markersJson = JSON.stringify(markerStore, null, 2); // Convertit en JSON bien formaté
    console.log(markersJson); // Affiche le JSON dans la console
}



// Charger les marqueurs initiaux
initialMarkers.forEach(markerData => {
    addMarker(markerData.lat, markerData.lng, markerData.info);
});

function downloadMarkers() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(markerStore, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "markers.json");
    document.body.appendChild(downloadAnchorNode); // Nécessaire pour Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
