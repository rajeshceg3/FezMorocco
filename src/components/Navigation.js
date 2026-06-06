import { ExploreIcon, RouteIcon, SavedIcon, AudioIcon, NightIcon } from './Icons.js';

function createAudioPanel() {
  const panel = document.createElement('section');
  panel.className = 'audio-control-panel hidden';
  panel.setAttribute('aria-live', 'polite');
  panel.setAttribute('aria-label', 'Soundscape controls');

  panel.innerHTML = `
    <div class="audio-panel-main">
      <div>
        <p class="audio-eyebrow">Soundscape</p>
        <h3 class="audio-panel-title">Medina ambience is ready</h3>
        <p class="audio-panel-description">Turn on audio to hear each part of Fez shift as you explore.</p>
      </div>
      <span class="audio-live-pill">Off</span>
    </div>
    <label class="audio-volume-control">
      <span>Volume</span>
      <input type="range" min="0" max="1" step="0.05" value="0.5" aria-label="Ambient audio volume">
    </label>
    <p class="audio-panel-hint">Tip: landmark sounds pause automatically when you close or switch places.</p>
  `;

  return panel;
}

export function initNavigation() {
  const app = document.getElementById('app');

  // --- Category Filter (Floating above dock) ---
  const categoryFilter = document.createElement('div');
  categoryFilter.className = 'category-filter'; // Visible by default
  // Ideally positioned absolute above the dock

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Sacred', label: 'Sacred' },
    { id: 'Craft', label: 'Craft' },
    { id: 'Architecture', label: 'Architecture' },
    { id: 'Taste', label: 'Taste' },
    { id: 'Stay', label: 'Stay' }
  ];

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    if (cat.id === 'all') btn.classList.add('active');
    btn.textContent = cat.label;
    btn.dataset.category = cat.id;

    btn.addEventListener('click', () => {
      // Set active state for category buttons
      categoryFilter.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Dispatch event
      const event = new CustomEvent('filter-landmarks', {
        detail: { category: cat.id === 'all' ? null : cat.id }
      });
      document.dispatchEvent(event);
    });

    categoryFilter.appendChild(btn);
  });

  app.appendChild(categoryFilter);

  const audioPanel = createAudioPanel();
  app.appendChild(audioPanel);
  const audioTitle = audioPanel.querySelector('.audio-panel-title');
  const audioDescription = audioPanel.querySelector('.audio-panel-description');
  const audioPill = audioPanel.querySelector('.audio-live-pill');
  const volumeInput = audioPanel.querySelector('input[type="range"]');

  volumeInput.addEventListener('input', () => {
    document.dispatchEvent(new CustomEvent('set-ambient-volume', {
      detail: { volume: Number(volumeInput.value) }
    }));
  });

  // --- Bottom Dock ---
  const dock = document.createElement('nav');
  dock.className = 'bottom-dock';

  const dockItems = [
    { id: 'explore', icon: ExploreIcon, label: 'Explore' },
    { id: 'route', icon: RouteIcon, label: 'Route' },
    { id: 'saved', icon: SavedIcon, label: 'Saved' },
    { id: 'audio', icon: AudioIcon, label: 'Audio' },
    { id: 'night', icon: NightIcon, label: 'Night' }
  ];

  // State
  let isNightMode = false;
  let isRouteActive = false;
  let isAudioActive = false;
  let isSavedActive = false;
  let audioButton = null;

  const setAudioPanelVisible = (visible) => {
    audioPanel.classList.toggle('hidden', !visible);
  };

  const syncAudioButton = (active) => {
    isAudioActive = active;
    if (!audioButton) return;
    audioButton.classList.toggle('active', active);
    audioButton.setAttribute('aria-pressed', String(active));
  };

  dockItems.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'dock-btn';
    if (item.id === 'explore') btn.classList.add('active');
    btn.dataset.id = item.id;
    btn.setAttribute('aria-pressed', item.id === 'explore' ? 'true' : 'false');
    btn.innerHTML = `${item.icon}<span class="dock-label">${item.label}</span>`;

    if (item.id === 'audio') audioButton = btn;

    btn.addEventListener('click', () => {
      // Handle Dock Actions
      switch (item.id) {
        case 'explore': {
          const isHidden = categoryFilter.classList.toggle('hidden');
          btn.classList.toggle('active', !isHidden);
          btn.setAttribute('aria-pressed', String(!isHidden));
          break;
        }
        case 'route':
          isRouteActive = !isRouteActive;
          btn.classList.toggle('active', isRouteActive);
          btn.setAttribute('aria-pressed', String(isRouteActive));
          document.dispatchEvent(new CustomEvent('toggle-route', { detail: { active: isRouteActive } }));
          break;
        case 'saved':
          isSavedActive = !isSavedActive;
          btn.classList.toggle('active', isSavedActive);
          btn.setAttribute('aria-pressed', String(isSavedActive));
          document.dispatchEvent(new CustomEvent('filter-saved', { detail: { active: isSavedActive } }));
          break;
        case 'audio':
          syncAudioButton(!isAudioActive);
          setAudioPanelVisible(true);
          document.dispatchEvent(new CustomEvent('toggle-audio', { detail: { active: isAudioActive } }));
          break;
        case 'night':
          isNightMode = !isNightMode;
          btn.classList.toggle('active', isNightMode);
          btn.setAttribute('aria-pressed', String(isNightMode));
          document.body.classList.toggle('night-mode', isNightMode);
          document.dispatchEvent(new CustomEvent('toggle-night', { detail: { active: isNightMode } }));
          break;
      }
    });

    dock.appendChild(btn);
  });

  document.addEventListener('ambient-audio-state-change', (event) => {
    const { active, ducked, label, description, volume, reason } = event.detail;
    syncAudioButton(active);
    volumeInput.value = volume;
    audioTitle.textContent = label || 'Medina ambience';
    audioDescription.textContent = description || 'Ambient audio for the current part of the walk.';
    audioPill.textContent = active ? (ducked ? 'Softened for guide' : 'On') : 'Off';

    if (active || reason === 'track-changed' || reason === 'blocked') {
      setAudioPanelVisible(true);
    }
  });

  document.addEventListener('ambient-audio-blocked', () => {
    syncAudioButton(false);
    setAudioPanelVisible(true);
    audioTitle.textContent = 'Tap Audio to start the soundscape';
    audioDescription.textContent = 'Your browser needs a direct tap before it can play sound.';
    audioPill.textContent = 'Waiting';
  });

  document.addEventListener('audio-guide-state-change', (event) => {
    if (event.detail.active) {
      setAudioPanelVisible(true);
      audioPill.textContent = 'Guide playing';
    }
  });

  app.appendChild(dock);
}
