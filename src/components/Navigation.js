export function initNavigation() {
  const nav = document.createElement('nav');
  nav.className = 'bottom-dock';

  const categories = [
    { id: 'all', label: 'Explore' },
    { id: 'Sacred', label: 'Sacred' },
    { id: 'Craft', label: 'Craft' },
    { id: 'Architecture', label: 'Architecture' }
  ];

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    if (cat.id === 'all') btn.classList.add('active');
    btn.textContent = cat.label;
    btn.dataset.category = cat.id;

    btn.addEventListener('click', () => {
      // Set active state
      nav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Dispatch event
      const event = new CustomEvent('filter-landmarks', {
        detail: { category: cat.id === 'all' ? null : cat.id }
      });
      document.dispatchEvent(event);
    });

    nav.appendChild(btn);
  });

  document.getElementById('app').appendChild(nav);
}
