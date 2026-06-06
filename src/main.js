import './styles/main.css';
import { initMap } from './components/Map.js';
import { initDetailPanel } from './components/DetailPanel.js';
import { initNavigation } from './components/Navigation.js';
import { initLanding } from './components/Landing.js';
import { AudioController } from './components/AudioController.js';

const soundscapes = {
  default: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg',
    label: 'Medina market ambience',
    description: 'A lively street-bed for wandering, tasting, and browsing the old city.'
  },
  Sacred: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Muezzin_call_to_prayer_from_Blue_Mosque_Istanbul.ogg',
    label: 'Sacred quarter atmosphere',
    description: 'A reverent cue to slow down, lower your voice, and notice thresholds.'
  },
  Craft: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Blacksmith_Working.ogg',
    label: 'Artisan workshop rhythm',
    description: 'Metal, motion, and handwork textures for Fez’s craft stops.'
  },
  Architecture: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Nature_sounds_-_birds_and_water.ogg',
    label: 'Quiet courtyard ambience',
    description: 'Soft birds and water for gates, riads, views, and reflective pauses.'
  },
  Stay: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Nature_sounds_-_birds_and_water.ogg',
    label: 'Riad courtyard calm',
    description: 'A gentler bed for restful stays and rooftop moments.'
  },
  Taste: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg',
    label: 'Market and café energy',
    description: 'Bustling ambience for food stops, cafés, and social corners.'
  }
};

const ambientAudio = new AudioController(soundscapes.default.src, soundscapes.default);

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initDetailPanel();
  initNavigation();
  initLanding();

  // Listen for Ambient Audio toggle
  document.addEventListener('toggle-audio', (e) => {
    ambientAudio.toggle(e.detail.active);
  });

  document.addEventListener('set-ambient-volume', (e) => {
    ambientAudio.setVolume(e.detail.volume);
  });

  // Duck ambient sound when narration is active for better clarity.
  document.addEventListener('audio-guide-state-change', (e) => {
    if (e.detail.active) {
      ambientAudio.duck();
    } else {
      ambientAudio.unduck();
    }
  });

  // Listen for landmark opening to contextually change audio track
  document.addEventListener('open-landmark', (e) => {
    const category = e.detail.landmark.category;
    const nextSoundscape = soundscapes[category] || soundscapes.default;
    ambientAudio.setTrack(nextSoundscape.src, nextSoundscape);
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
