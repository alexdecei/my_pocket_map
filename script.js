import { addMarker, removeMarker, downloadMarkers } from './markerStore.js';

// Références aux éléments HTML
const modal = document.getElementById('marker-form-modal');
const form = document.getElementById('marker-form');
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');

// une référence globale pour suivre le marqueur en cours d’édition
let markerBeingEdited = null;

// Ouvrir la modale
function openModal() {
    modal.style.display = 'flex';
}

// Fermer la modale
function closeModal() {
    modal.style.display = 'none';
    form.reset(); // Réinitialiser le formulaire
}


// Initialisation de la carte
export const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -3,
    doubleClickZoom: false // Désactiver le zoom au double-clic
});

// Définir les dimensions de l'image
const bounds = [[0, 0], [2755, 6400]];
const image = L.imageOverlay('map.png', bounds).addTo(map);

map.fitBounds(bounds);

// Ajouter un marqueur lors du clic sur la carte
map.on('dblclick', function (e) {
    const coords = e.latlng;

    // Ouvrir la modale pour saisir les infos
    openModal();

    // Gérer la soumission du formulaire
    form.onsubmit = function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page
    
        // Récupérer les valeurs saisies
        const title = document.getElementById('marker-title').value;
        const type = document.getElementById('marker-type').value;
        const summary = document.getElementById('marker-summary').value;
    
        if (markerBeingEdited) {
            // Modifier les informations du marqueur
            markerBeingEdited.title = title;
            markerBeingEdited.type = type;
            markerBeingEdited.summary = summary;
    
            // Mettre à jour la popup du marqueur
            markerBeingEdited.marker.bindPopup(markerBeingEdited.createPopupContent());
    
            console.log(`Marqueur ${markerBeingEdited.id} modifié.`);
        } else {
            // Ajouter un nouveau marqueur
            addMarker(map, coords.lat, coords.lng, title, type, summary);
        }
    
        // Fermer la modale et réinitialiser l'état
        closeModal();
        markerBeingEdited = null;
    };
    

    // Gérer le bouton d'annulation
    cancelButton.onclick = function () {
        closeModal();
        markerBeingEdited = null;
    };
});

// Rendre la fonction `removeMarker` disponible globalement
window.removeMarker = removeMarker;

//DL marquers
document.getElementById('download-markers').addEventListener('click', downloadMarkers);


//modifier le contenu du marqueur
function editMarker(markerId) {
    // Trouver le marqueur correspondant
    const marker = markerStore.find(m => m.id === markerId);
    if (!marker) {
        console.error("Marqueur introuvable");
        return;
    }

    markerBeingEdited = marker; // Stocker le marqueur en cours d'édition

    // Pré-remplir les champs de la modale avec les informations du marqueur
    document.getElementById('marker-title').value = marker.title;
    document.getElementById('marker-type').value = marker.type;
    document.getElementById('marker-summary').value = marker.summary;

    // Ouvrir la modale
    openModal();
}
