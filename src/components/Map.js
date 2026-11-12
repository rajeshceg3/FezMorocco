import L from 'leaflet';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import 'maplibre-gl/dist/maplibre-gl.css';
import warmMapStyle from '../vendor/warm-map/style.json';
import { landmarks } from '../data/landmarks.js';
import { guidedRoute } from '../data/route.js';
import { openDetailPanel } from './DetailPanel.js';
import { LandmarkGlyph } from './Icons.js';
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
let routeBadgeRemovalTimer = null;
const allMarkers = [];

function getCssPxVar(varName, fallback) {
  const rootStyles = getComputedStyle(document.documentElement);
  const value = parseFloat(rootStyles.getPropertyValue(varName));
  return Number.isFinite(value) ? value : fallback;
}

function getRouteFitBoundsPadding() {
  const dockHeight = getCssPxVar('--dock-height', 70);
  const dockBottomGap = getCssPxVar('--dock-bottom-gap', 24);
  const categoryFilterHeight = 46; // visible filter chip row + shadow/margins
  const extraBottomGap = 12;

  const bottomPadding = Math.max(
    dockHeight + dockBottomGap + categoryFilterHeight + extraBottomGap,
    150
  );

  return {
    paddingTopLeft: [36, 36],
    paddingBottomRight: [36, bottomPadding]
  };
}

export function initMap() {
  // Initialize with a zoomed-out view for the landing experience
  map = L.map('map', {
    center: [34.062, -4.975], // Centered on Fez Medina
    zoom: 13, // Zoomed out initially
    zoomControl: false,
    attributionControl: true
  });

  // Warm paper basemap (worlds shared module): OpenFreeMap vector tiles,
  // custom watercolor-wash style. Free public instance, no API key.
  maplibreGL({ style: warmMapStyle }).addTo(map);
  map.attributionControl.addAttribution(
    '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> <a href="https://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
  );

  map.attributionControl.setPosition('topright');
  L.control.zoom({position: 'topleft'}).addTo(map);

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
        duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.5,
        easeLinearity: 0.25
      });
    }
  });

  // Listen for Route Toggle
  document.addEventListener('toggle-route', (e) => {
    if (!map) return;
    if (e.detail.active) {
      if (routeBadgeRemovalTimer) {
        clearTimeout(routeBadgeRemovalTimer);
        routeBadgeRemovalTimer = null;
      }

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
      map.fitBounds(routePolyline.getBounds(), getRouteFitBoundsPadding());

      // Add floating badge
      let badge = document.getElementById('route-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'route-badge';
        badge.className = 'route-badge';
        badge.innerHTML = '<span>Illustrative route, not turn-by-turn directions</span>';
        document.getElementById('app').appendChild(badge);
      }
      badge.classList.add('visible');
    } else {
      if (routePolyline) {
        routePolyline.remove();
      }

      // Remove floating badge
      const badge = document.getElementById('route-badge');
      if (badge) {
        badge.classList.remove('visible');
        routeBadgeRemovalTimer = setTimeout(() => {
          routeBadgeRemovalTimer = null;
          if (routePolyline && map.hasLayer(routePolyline)) return;

          const currentBadge = document.getElementById('route-badge');
          if (currentBadge) {
            currentBadge.remove();
          }
        }, 300); // match transition duration
      }
    }
  });

  // Landmark alley: every place visible at a glance, one tap to visit.
  const trail=document.createElement('nav');trail.className='landmark-trail';trail.setAttribute('role','radiogroup');trail.setAttribute('aria-label','Choose a landmark');const tokens=document.createElement('div');tokens.className='trail-tokens';trail.appendChild(tokens);
  const openById=(id)=>{const l=landmarks.find(l=>String(l.id)===String(id));if(l){document.dispatchEvent(new CustomEvent('open-landmark',{detail:{landmark:l}}));openDetailPanel(l);trail.querySelectorAll('[data-lm]').forEach(b=>{b.setAttribute('aria-checked',String(b.dataset.lm===String(l.id)));b.tabIndex=b.dataset.lm===String(l.id)?0:-1})}};
  landmarks.forEach(l=>{const b=document.createElement('button');b.type='button';b.className='trail-token arch-token';b.dataset.lm=l.id;b.setAttribute('role','radio');b.setAttribute('aria-checked','false');b.setAttribute('aria-label',l.title);b.title=l.title;b.tabIndex=-1;b.innerHTML=LandmarkGlyph({id:l.id});b.addEventListener('click',()=>openById(l.id));b.addEventListener('keydown',(e)=>{if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;e.preventDefault();const ids=landmarks.map(x=>x.id);const i=ids.indexOf(l.id);openById(ids[(i+(e.key==='ArrowRight'?1:ids.length-1))%ids.length])});tokens.appendChild(b)});
  const reset=document.createElement('button');reset.id='reset-map';reset.className='trail-reset';reset.textContent='Reset map';reset.onclick=()=>map.setView([34.062,-4.975],15,{animate:false});trail.appendChild(reset);
  document.getElementById('app').appendChild(trail);
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
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1, // 3 seconds animation
      easeLinearity: 0.25
    });
  }
}
