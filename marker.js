export class Marker {
    constructor(map, lat, lng, info = "Pas d'information", id = null) {
        this.id = id || new Date().getTime(); // Génère un ID unique si aucun n'est fourni
        this.lat = lat;
        this.lng = lng;
        this.info = info;

        // Crée le marqueur Leaflet
        this.marker = L.marker([lat, lng]).addTo(map);
        this.map = map;

        // Attache une popup avec un bouton pour supprimer
        this.marker.bindPopup(this.createPopup());
    }

    // Créer le contenu de la popup
    createPopup() {
        return `
            <div>
                <p>${this.info}</p>
                <button onclick="removeMarker(${this.id})">Supprimer</button>
            </div>
        `;
    }

    // Supprimer le marqueur de la carte
    remove() {
        this.map.removeLayer(this.marker);
    }
}
