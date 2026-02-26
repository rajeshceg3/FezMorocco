import './styles/main.css';
import { initMap, filterMarkers } from './components/Map.js';
import { initDetailPanel } from './components/DetailPanel.js';
import { initNavigation } from './components/Navigation.js';
import { initLanding } from './components/Landing.js';
import { AudioController } from './components/AudioController.js';

const ambientAudio = new AudioController('https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg');

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

  // Listen for Ambient Audio toggle
  document.addEventListener('toggle-audio', (e) => {
    ambientAudio.toggle(e.detail.active);
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
