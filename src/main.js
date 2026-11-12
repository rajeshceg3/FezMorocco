import './styles/main.css';
import './styles/chrome.css';
import { initMap } from './components/Map.js';
import { initDetailPanel } from './components/DetailPanel.js';
import { initNavigation } from './components/Navigation.js';
import { initLanding } from './components/Landing.js';
import { initChrome } from './components/Chrome.js';
import { AudioController } from './components/AudioController.js';

const ambientAudio = new AudioController();
window.fezAudio = ambientAudio; // exposed for verification

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initDetailPanel();
  initNavigation();
  initLanding();
initChrome();

  // Listen for Ambient Audio toggle
  document.addEventListener('toggle-audio', (e) => {
    ambientAudio.toggle(e.detail.active);
  });

  // Duck ambient sound when narration is active for better clarity.
  document.addEventListener('audio-guide-state-change', (e) => {
    if (e.detail.active) {
      ambientAudio.duck();
    } else {
      ambientAudio.unduck();
    }
  });

  // Opening a landmark shifts the synthesized ambience to its quarter:
  // sacred courtyards, the craft lanes, or the gate-and-roof breeze.
  document.addEventListener('open-landmark', (e) => {
    ambientAudio.setCategory(e.detail.landmark?.category);
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
