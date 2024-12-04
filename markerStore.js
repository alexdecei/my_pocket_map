import { Marker } from './marker.js';

const markerStore = [];

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
