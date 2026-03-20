import { flyToMedina } from './Map.js';

export function initLanding() {
  const app = document.getElementById('app');

  const landingScreen = document.createElement('div');
  landingScreen.className = 'landing-screen';

  const currentHour = new Date().getHours();
  let greeting = "Welcome to";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Morning in";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Afternoon in";
  } else if (currentHour >= 17 && currentHour < 20) {
    greeting = "Dusk over";
  } else {
    greeting = "Night falls on";
  }

  const proverbs = [
    "“Where water runs, the heart opens.”",
    "“Patience is the key to the labyrinth.”",
    "“A thousand years of silence speaks in these walls.”",
    "“The hand crafts what the soul envisions.”",
    "“Every doorway is a journey.”"
  ];

  let currentProverbIndex = Math.floor(Math.random() * proverbs.length);

  landingScreen.innerHTML = `
    <div class="landing-content">
      <p class="landing-greeting">${greeting}</p>
      <h1 class="landing-title">Fez</h1>
      <p class="landing-subtitle">The Spiritual Capital of Morocco</p>
      <p class="landing-proverb transition-opacity">${proverbs[currentProverbIndex]}</p>
      <button class="btn-enter">Begin the Walk</button>
    </div>
  `;

  app.appendChild(landingScreen);

  const proverbEl = landingScreen.querySelector('.landing-proverb');
  let timeoutId;
  const proverbInterval = setInterval(() => {
    proverbEl.style.opacity = '0';
    timeoutId = setTimeout(() => {
      currentProverbIndex = (currentProverbIndex + 1) % proverbs.length;
      proverbEl.textContent = proverbs[currentProverbIndex];
      proverbEl.style.opacity = '0.8';
    }, 500);
  }, 4000);

  const enterBtn = landingScreen.querySelector('.btn-enter');
  enterBtn.addEventListener('click', () => {
    clearInterval(proverbInterval);
    clearTimeout(timeoutId);
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
