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

        // Ajoute une popup enrichie
        this.marker.bindPopup(this.createPopupContent());
    }

    // Créer le contenu de la popup
    createPopupContent() {
        const iconMap = {
            lieu: "📍",
            ville: "🏠",
            trésor: "💎",
            boss: "🐉",
            événement: "⚡"
        };
    
        const icon = iconMap[this.type] || "❓"; // Icône par défaut si le type est inconnu
    
        return `
            <div class="popup-container">
                <h3 class="popup-title">${icon} ${this.title}</h3>
                <p class="popup-type"><strong>Type :</strong> ${this.type}</p>
                <p class="popup-summary">${this.summary}</p>
                <div class="popup-actions">
                    <button class="popup-button popup-delete" onclick="removeMarker(${this.id})">Supprimer</button>
                </div>
            </div>
        `;
    }

    // Supprimer le marqueur de la carte
    remove() {
        this.map.removeLayer(this.marker);
    }
}
