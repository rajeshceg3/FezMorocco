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

  // Audio Guide
  if (data.info.audioSnippet) {
    const audioContainer = document.createElement('div');
    audioContainer.style.marginTop = '16px';

    const label = document.createElement('p');
    label.innerHTML = '<strong>Audio Guide:</strong>';
    label.style.marginBottom = '8px';

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = data.info.audioSnippet;
    audio.style.width = '100%';

    audioContainer.appendChild(label);
    audioContainer.appendChild(audio);
    visitorInfo.appendChild(audioContainer);
  }

  // Detail Lens
  if (data.detailLens) {
    const lensBtn = document.createElement('button');
    lensBtn.className = 'btn-enter'; // Reusing existing button style
    lensBtn.style.marginTop = '16px';
    lensBtn.style.width = '100%';
    lensBtn.textContent = 'Examine Details';
    lensBtn.onclick = () => openLens(data.detailLens);
    visitorInfo.appendChild(lensBtn);
  }

  // Show panel
  panel.classList.add('visible');
}

function openLens(imageUrl) {
  const overlay = document.createElement('div');
  overlay.className = 'lens-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
  overlay.style.zIndex = '3000';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.cursor = 'zoom-out';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.maxWidth = '100%';
  img.style.maxHeight = '100%';
  img.style.transition = 'transform 0.3s ease';
  img.style.cursor = 'zoom-in';

  // Simple zoom effect on click
  let zoomed = false;
  img.onclick = (e) => {
    e.stopPropagation();
    zoomed = !zoomed;
    img.style.transform = zoomed ? 'scale(2)' : 'scale(1)';
    img.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
  };

  overlay.onclick = () => {
    document.body.removeChild(overlay);
  };

  overlay.appendChild(img);
  document.body.appendChild(overlay);
}

export function closeDetailPanel() {
  const panel = document.getElementById('detail-panel');
  if (panel) {
    panel.classList.remove('visible');
  }
}
