import L from 'leaflet';
import { landmarks } from '../data/landmarks.js';
import { guidedRoute } from '../data/route.js';
import { openDetailPanel } from './DetailPanel.js';
import { ROUTE_HIGHLIGHT_COLOR } from '../constants.js';

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
let routePolyline;
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

    marker.on('click', () => {
      openDetailPanel(landmark);
    });

    allMarkers.push(marker);
    markersLayer.addLayer(marker);
  });

  // Listen for Route Toggle
  document.addEventListener('toggle-route', (e) => {
    if (!map) return;
    if (e.detail.active) {
      if (!routePolyline) {
        routePolyline = L.polyline(guidedRoute, {
          color: ROUTE_HIGHLIGHT_COLOR,
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 10', // Dotted line
          lineCap: 'round'
        });
      }
      routePolyline.addTo(map);
      map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
    } else {
      if (routePolyline) {
        routePolyline.remove();
      }
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
