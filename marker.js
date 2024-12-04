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
        this.map = map;

        // Définir les emoji pour chaque type
        const iconMap = {
            lieu: "📍",
            ville: "🏠",
            trésor: "💎",
            boss: "🐉",
            événement: "⚡"
        };

        const emoji = iconMap[type] || "❓"; // Emoji par défaut si le type est inconnu

        // Crée une icône personnalisée avec l'emoji
        const customIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div class="emoji-icon">${emoji}</div>`,
            iconSize: [30, 30], // Taille de l'icône
            iconAnchor: [15, 15] // Ancre de l'icône au centre
        });

        // Crée le marqueur Leaflet avec l'icône personnalisée
        this.marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        // Ajoute une popup enrichie
        this.marker.bindPopup(this.createPopupContent());
    }

    // Créer le contenu de la popup
    createPopupContent() {
        return `
            <div class="popup-container">
                <h3 class="popup-title">${this.title}</h3>
                <p><strong>Type :</strong> ${this.type}</p>
                <p>${this.summary}</p>
                <button onclick="removeMarker(${this.id})">Supprimer</button>
            </div>
        `;
    }

    // Supprimer le marqueur de la carte
    remove() {
        this.marker.remove();
    }
}
