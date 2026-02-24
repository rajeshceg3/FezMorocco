import 'leaflet/dist/leaflet.css';
import './styles/main.css';
import { initMap, filterMarkers } from './components/Map.js';
import { initDetailPanel } from './components/DetailPanel.js';
import { initNavigation } from './components/Navigation.js';
import { initLanding } from './components/Landing.js';

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initDetailPanel();
  initNavigation();
  initLanding();

  // Listen for filter events from Navigation
  document.addEventListener('filter-landmarks', (e) => {
    const category = e.detail.category;
    filterMarkers(category);
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
