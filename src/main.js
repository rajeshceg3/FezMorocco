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

  // Listen for landmark opening to contextually change audio track
  document.addEventListener('open-landmark', (e) => {
    const category = e.detail.landmark.category;
    let newTrack = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg'; // Default for bustling/Taste

    if (category === 'Sacred') {
      newTrack = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Muezzin_call_to_prayer_from_Blue_Mosque_Istanbul.ogg';
    } else if (category === 'Craft') {
      // Using a different bustling track for craft if possible, or same as souk
      newTrack = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Blacksmith_Working.ogg';
    } else if (category === 'Stay' || category === 'Architecture') {
      // For lack of a better generic peaceful track in wikimedia commons, using the same or another placeholder.
      // A trick is to use a different section of the same soundscape or just stick with the default if none available.
      // We will default to a soft soundscape if available, otherwise just use the prayer track for architecture as it's reverent.
      newTrack = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Nature_sounds_-_birds_and_water.ogg'; // More peaceful
    }

    ambientAudio.setTrack(newTrack);
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
