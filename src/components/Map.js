import L from 'leaflet';
import { landmarks } from '../data/landmarks.js';
import { openDetailPanel } from './DetailPanel.js';

// Fix for Leaflet default icon not showing in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

let map;
let markersLayer;
const allMarkers = [];

export function initMap() {
  // Initialize with a zoomed-out view for the landing experience
  map = L.map('map', {
    center: [34.062, -4.975], // Centered on Fez Medina
    zoom: 13, // Zoomed out initially
    zoomControl: false,
    attributionControl: false
  });

  // OpenStreetMap Tile Layer (for now, eventually custom style)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Initialize Marker Layer Group
  markersLayer = L.layerGroup().addTo(map);

  // Add Markers
  landmarks.forEach(landmark => {
    const marker = L.marker([landmark.lat, landmark.lng], {
      title: landmark.title,
      alt: landmark.title,
      category: landmark.category // Store category for filtering
    });

    const popupContent = `
      <div class="popup-content">
        <h3>${landmark.title}</h3>
        <p>${landmark.category}</p>
        <button class="btn-explore" data-id="${landmark.id}">Explore</button>
      </div>
    `;

    marker.bindPopup(popupContent);

    allMarkers.push(marker);
    markersLayer.addLayer(marker);
  });

  // Event Delegation for "Explore" button in popups
  map.on('popupopen', (e) => {
    const popupNode = e.popup._contentNode;
    const exploreBtn = popupNode.querySelector('.btn-explore');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        const id = parseInt(exploreBtn.getAttribute('data-id'), 10);
        const landmark = landmarks.find(l => l.id === id);
        if (landmark) {
          openDetailPanel(landmark);
          map.closePopup(); // Close popup when opening detail panel
        }
      });
    }
  });

  // Expose map globally for debugging/testing
  window.map = map;
}

export function filterMarkers(category) {
  if (!markersLayer) return;

  markersLayer.clearLayers();

  allMarkers.forEach(marker => {
    if (!category || category === 'all' || marker.options.category === category) {
      markersLayer.addLayer(marker);
    }
  });
}

export function flyToMedina() {
  if (map) {
    map.flyTo([34.062, -4.975], 15, {
      duration: 3, // 3 seconds animation
      easeLinearity: 0.25
    });
  }
}
