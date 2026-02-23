import { flyToMedina } from './Map.js';

export function initLanding() {
  const app = document.getElementById('app');

  const landingScreen = document.createElement('div');
  landingScreen.className = 'landing-screen';

  landingScreen.innerHTML = `
    <div class="landing-content">
      <h1 class="landing-title">Fez</h1>
      <p class="landing-subtitle">The Spiritual Capital of Morocco</p>
      <button class="btn-enter">Begin the Walk</button>
    </div>
  `;

  app.appendChild(landingScreen);

  const enterBtn = landingScreen.querySelector('.btn-enter');
  enterBtn.addEventListener('click', () => {
    // Hide Landing Screen
    landingScreen.classList.add('hidden');

    // Zoom into Medina
    flyToMedina();

    // Remove from DOM after transition completes
    // Transition duration in CSS will be around 1s, so 1000ms is enough
    // But map zoom is 3s. Let's keep it in DOM but hidden?
    // Or remove it. Removing is better for performance.
    setTimeout(() => {
      landingScreen.remove();
    }, 1500);
  });
}
