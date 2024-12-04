import { Marker } from './marker.js';

const markerStore = [];

const initialMarkers = [];


// Ajouter un marqueur
export function addMarker(map, lat, lng, info) {
    const newMarker = new Marker(map, lat, lng, info);
    markerStore.push(newMarker);
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
export function exportMarkers() {
    // Crée une copie simplifiée des marqueurs
    const simplifiedMarkers = markerStore.map(marker => ({
        id: marker.id, // Si vous utilisez un ID unique
        lat: marker.lat,
        lng: marker.lng,
        info: marker.info
    }));

    // Convertir en JSON et afficher dans la console
    const markersJson = JSON.stringify(simplifiedMarkers, null, 2);
    console.log(markersJson);
}


export function downloadMarkers() {
    // Crée une copie simplifiée des marqueurs
    const simplifiedMarkers = markerStore.map(marker => ({
        id: marker.id,
        lat: marker.lat,
        lng: marker.lng,
        info: marker.info
    }));

    // Préparer les données JSON pour le téléchargement
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(simplifiedMarkers, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "markers.json");
    document.body.appendChild(downloadAnchorNode); // Nécessaire pour Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


/////////////////////////////////////////////////////

// Charger les marqueurs depuis le fichier markers.json
fetch('markers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement de markers.json : ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Parcourir les marqueurs et les ajouter à la carte
        data.forEach(markerData => {
            addMarker(markerData.lat, markerData.lng, markerData.info);
        });
    })
    .catch(error => {
        console.error("Erreur lors du chargement des marqueurs :", error);
    });

