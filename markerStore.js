import { Marker } from './marker.js';
import { map, markerState, openModal, closeModal, form } from './script.js';

const markerStore = [];

const initialMarkers = [];


// Ajouter un marqueur
export function addMarker(map, lat, lng, title = "Sans titre", type = "lieu", summary = "Pas de résumé") {
    const newMarker = new Marker(map, lat, lng, title, type, summary);
    markerStore.push(newMarker);
    return newMarker;
}


// Supprimer un marqueur par ID
export function removeMarker(id) {
    const index = markerStore.findIndex(marker => marker.id === id);
    if (index !== -1) {
        markerStore[index].remove(); // Supprime de la carte
        markerStore.splice(index, 1); // Supprime du tableau
        //console.log(`Marqueur ${id} supprimé.`);
    }
}

//modifier le contenu du marqueur
export function editMarker(markerId) {
    const marker = markerStore.find(m => m.id === markerId);
    if (!marker) {
        //console.error("Marqueur introuvable");
        return;
    }

    // Pré-remplir la modale avec les informations du marqueur
    form.querySelector('#marker-title').value = marker.title;
    form.querySelector('#marker-type').value = marker.type;
    form.querySelector('#marker-summary').value = marker.summary;


    // Gérer la soumission du formulaire pour enregistrer les modifications
    form.onsubmit = function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Mettre à jour les informations du marqueur
        marker.title = document.getElementById('marker-title').value;
        marker.type = document.getElementById('marker-type').value;
        marker.summary = document.getElementById('marker-summary').value;

        // Mettre à jour l'icône du marqueur
        marker.updateIcon();

        // Mettre à jour la popup
        marker.marker.bindPopup(marker.createPopupContent());

       // console.log(`Marqueur ${marker.id} modifié.`);

        // Fermer la modale
        closeModal();
    };

    // Ouvrir la modale
    openModal();
}



// récupérer les markers 
export function exportMarkers() {
    const simplifiedMarkers = markerStore.map(marker => ({
        id: marker.id,
        lat: marker.lat,
        lng: marker.lng,
        title: marker.title,
        type: marker.type,
        summary: marker.summary
    }));

    const markersJson = JSON.stringify(simplifiedMarkers, null, 2);
    //console.log(markersJson);
}



export function downloadMarkers() {
    const simplifiedMarkers = markerStore.map(marker => ({
        id: marker.id,
        lat: marker.lat,
        lng: marker.lng,
        title: marker.title,
        type: marker.type,
        summary: marker.summary
    }));

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(simplifiedMarkers, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "markers.json");
    document.body.appendChild(downloadAnchorNode);
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
        data.forEach(markerData => {
            addMarker(
                map,
                markerData.lat,
                markerData.lng,
                markerData.title,
                markerData.type,
                markerData.summary
            );
        });
    })
    .catch(error => {
        //console.error("Erreur lors du chargement des marqueurs :", error);
    });

