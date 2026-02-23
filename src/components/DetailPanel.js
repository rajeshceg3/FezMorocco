export function initDetailPanel() {
  const panel = document.createElement('div');
  panel.className = 'detail-panel';
  panel.id = 'detail-panel';

  // Static structure is safe to use innerHTML for
  panel.innerHTML = `
    <div class="panel-header">
      <h2 class="panel-title">Landmark Name</h2>
      <button class="close-btn" aria-label="Close details">×</button>
    </div>
    <div class="panel-content">
      <div class="hero-image-container">
        <!-- Image will be injected here via background or img tag -->
      </div>
      <p class="intro-text">
        A poetic description of the landmark goes here.
      </p>

      <div class="info-section">
        <h3>Key Facts</h3>
        <ul class="facts-list">
          <!-- Facts injected here -->
        </ul>
      </div>

      <div class="info-section">
        <h3>Visitor Info</h3>
        <div class="visitor-info">
          <!-- Hours, etc -->
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').appendChild(panel);

  // Close button logic
  const closeBtn = panel.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    closeDetailPanel();
  });

  return panel;
}

export function openDetailPanel(data) {
  const panel = document.getElementById('detail-panel');
  if (!panel) return;

  // Populate data
  panel.querySelector('.panel-title').textContent = data.title;
  panel.querySelector('.intro-text').textContent = data.intro;

  // Image (using placeholder for now or data image)
  const imgContainer = panel.querySelector('.hero-image-container');
  // Clear existing content
  while (imgContainer.firstChild) {
    imgContainer.removeChild(imgContainer.firstChild);
  }

  const img = document.createElement('img');
  img.src = data.image || 'https://via.placeholder.com/600x300';
  img.alt = data.title;
  img.className = 'hero-image';
  imgContainer.appendChild(img);

  // Facts
  const factsList = panel.querySelector('.facts-list');
  // Clear existing facts
  while (factsList.firstChild) {
    factsList.removeChild(factsList.firstChild);
  }

  data.facts.forEach(fact => {
    const li = document.createElement('li');
    li.className = 'fact-item';

    const icon = document.createElement('span');
    icon.className = 'fact-icon';
    icon.textContent = '✦';

    const textNode = document.createTextNode(` ${fact}`);

    li.appendChild(icon);
    li.appendChild(textNode);
    factsList.appendChild(li);
  });

  // Visitor Info
  const visitorInfo = panel.querySelector('.visitor-info');
  // Clear existing info
  while (visitorInfo.firstChild) {
    visitorInfo.removeChild(visitorInfo.firstChild);
  }

  const hoursP = document.createElement('p');
  const hoursStrong = document.createElement('strong');
  hoursStrong.textContent = 'Hours: ';
  hoursP.appendChild(hoursStrong);
  hoursP.appendChild(document.createTextNode(data.info.hours));

  const bestTimeP = document.createElement('p');
  const bestTimeStrong = document.createElement('strong');
  bestTimeStrong.textContent = 'Best Time: ';
  bestTimeP.appendChild(bestTimeStrong);
  bestTimeP.appendChild(document.createTextNode(data.info.bestTime));

  visitorInfo.appendChild(hoursP);
  visitorInfo.appendChild(bestTimeP);

  // Show panel
  panel.classList.add('visible');
}

export function closeDetailPanel() {
  const panel = document.getElementById('detail-panel');
  if (panel) {
    panel.classList.remove('visible');
  }
}
