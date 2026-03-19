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

  // Clean, minimalist CartoDB Positron Tile Layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors, &copy; CARTO'
  }).addTo(map);

  // Initialize Marker Layer Group
  markersLayer = L.layerGroup().addTo(map);

  // Add Markers
  landmarks.forEach(landmark => {
    // Determine category-specific class for the marker
    const categoryClass = landmark.category ? `marker-${landmark.category.toLowerCase()}` : '';

    const customIcon = L.divIcon({
      className: `custom-marker ${categoryClass}`,
      iconSize: [16, 16],
      iconAnchor: [8, 8] // Center the dot on the coordinates
    });

    const marker = L.marker([landmark.lat, landmark.lng], {
      icon: customIcon,
      title: landmark.title,
      alt: landmark.title,
      category: landmark.category, // Store category for filtering
      id: landmark.id // Store id for "Saved" functionality
    });

    marker.on('click', () => {
      document.dispatchEvent(new CustomEvent('open-landmark', { detail: { landmark } }));
      openDetailPanel(landmark);
    });

    allMarkers.push(marker);
    markersLayer.addLayer(marker);
  });

  // Listen for Saved Filter
  let isSavedFilterActive = false;
  let currentCategoryFilter = 'all';

  document.addEventListener('filter-landmarks', (e) => {
    currentCategoryFilter = e.detail.category;
    applyFilters(isSavedFilterActive, currentCategoryFilter);
  });

  document.addEventListener('filter-saved', (e) => {
    isSavedFilterActive = e.detail.active;
    applyFilters(isSavedFilterActive, currentCategoryFilter);
  });

  document.addEventListener('saved-places-updated', () => {
    if (isSavedFilterActive) {
      applyFilters(isSavedFilterActive, currentCategoryFilter);
    }
  });

  // Listen for map panning from related landmarks
  document.addEventListener('open-landmark', (e) => {
    if (map) {
      map.flyTo([e.detail.landmark.lat, e.detail.landmark.lng], 16, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
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
          lineCap: 'round',
          className: 'animated-route'
        });
      }
      routePolyline.addTo(map);
      map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });

      // Add floating badge
      let badge = document.getElementById('route-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'route-badge';
        badge.className = 'route-badge';
        badge.innerHTML = '<span>Estimated Walk: 45 min</span>';
        document.getElementById('app').appendChild(badge);

        // Use a small timeout to allow CSS transition to trigger
        setTimeout(() => badge.classList.add('visible'), 10);
      }
    } else {
      if (routePolyline) {
        routePolyline.remove();
      }

      // Remove floating badge
      const badge = document.getElementById('route-badge');
      if (badge) {
        badge.classList.remove('visible');
        setTimeout(() => badge.remove(), 300); // match transition duration
      }
    }
  });

  // Expose map globally for debugging/testing
  window.map = map;
}

export function filterMarkers(category) {
  // This is now handled by the event listener in initMap to coordinate with saved filter.
  // We dispatch the event instead.
  document.dispatchEvent(new CustomEvent('filter-landmarks', { detail: { category } }));
}

function applyFilters(savedActive, category) {
  if (!markersLayer) return;

  markersLayer.clearLayers();

  const savedLandmarks = JSON.parse(localStorage.getItem('savedLandmarks') || '[]');

  allMarkers.forEach(marker => {
    let show = true;

    // Check category filter
    if (category && category !== 'all' && marker.options.category !== category) {
      show = false;
    }

    // Check saved filter
    if (savedActive && !savedLandmarks.includes(marker.options.id)) {
      show = false;
    }

    if (show) {
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
