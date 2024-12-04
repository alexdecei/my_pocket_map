
Pour enrichir vos marqueurs avec des informations supplémentaires comme un titre, un type, et un résumé, voici comment adapter votre code et améliorer l'affichage.

Étape 1 : Ajouter des Propriétés aux Marqueurs
Modifiez la classe Marker pour inclure ces nouvelles propriétés.

Mise à jour de marker.js :
javascript
Copier le code
export class Marker {
    constructor(map, lat, lng, title = "Sans titre", type = "lieu", summary = "Pas de résumé", id = null) {
        if (!map || typeof map.addLayer !== "function") {
            throw new Error("Instance de carte invalide.");
        }

        this.id = id || Date.now(); // Génère un ID unique
        this.lat = lat;
        this.lng = lng;
        this.title = title;
        this.type = type;
        this.summary = summary;

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
                <h3>${this.title}</h3>
                <p><strong>Type :</strong> ${this.type}</p>
                <p>${this.summary}</p>
                <button onclick="removeMarker(${this.id})">Supprimer</button>
            </div>
        `;
    }

    // Supprimer le marqueur de la carte
    remove() {
        this.map.removeLayer(this.marker);
    }
}
