import './styles/main.css';
import { initMap, filterMarkers } from './components/Map.js';
import { initDetailPanel } from './components/DetailPanel.js';
import { initNavigation } from './components/Navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initDetailPanel();
  initNavigation();

  // Listen for filter events from Navigation
  document.addEventListener('filter-landmarks', (e) => {
    const category = e.detail.category;
    filterMarkers(category);
  });
});
