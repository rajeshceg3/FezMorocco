import { ExploreIcon, RouteIcon, SavedIcon, AudioIcon, NightIcon } from './Icons.js';

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
    { id: 'Architecture', label: 'Architecture' }
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

  dockItems.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'dock-btn';
    if (item.id === 'explore') btn.classList.add('active');
    btn.dataset.id = item.id;
    btn.innerHTML = `${item.icon}<span class="dock-label">${item.label}</span>`;

    btn.addEventListener('click', () => {
      // Handle Dock Actions

      // Explore: Toggle category filter
      if (item.id === 'explore') {
        const isHidden = categoryFilter.classList.toggle('hidden');
        btn.classList.toggle('active', !isHidden);
      }

      // Route
      if (item.id === 'route') {
        isRouteActive = !isRouteActive;
        btn.classList.toggle('active', isRouteActive);
        document.dispatchEvent(new CustomEvent('toggle-route', { detail: { active: isRouteActive } }));
      }

      // Saved
      if (item.id === 'saved') {
        console.log('Saved clicked');
        // Placeholder
      }

      // Audio
      if (item.id === 'audio') {
        isAudioActive = !isAudioActive;
        btn.classList.toggle('active', isAudioActive);
        console.log('Audio toggled', isAudioActive);
        document.dispatchEvent(new CustomEvent('toggle-audio', { detail: { active: isAudioActive } }));
      }

      // Night
      if (item.id === 'night') {
        isNightMode = !isNightMode;
        btn.classList.toggle('active', isNightMode);
        document.body.classList.toggle('night-mode', isNightMode);
        document.dispatchEvent(new CustomEvent('toggle-night', { detail: { active: isNightMode } }));
      }
    });

    dock.appendChild(btn);
  });

  app.appendChild(dock);
}
