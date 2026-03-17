let currentAudio = null;

export function initDetailPanel() {
  const panel = document.createElement('div');
  panel.className = 'detail-panel';
  panel.id = 'detail-panel';

  // Static structure is safe to use innerHTML for
  panel.innerHTML = `
    <div class="panel-header">
      <h2 class="panel-title">Landmark Name</h2>
      <div class="header-actions">
        <button class="save-btn" aria-label="Save landmark">
          <svg class="bookmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <button class="close-btn" aria-label="Close details">×</button>
      </div>
    </div>
    <div class="panel-content">
      <div class="hero-image-container">
        <!-- Image will be injected here via background or img tag -->
      </div>
      <p class="intro-text">
        A poetic description of the landmark goes here.
      </p>

      <blockquote class="local-tip" style="display: none;">
        <!-- Local tip injected here -->
      </blockquote>

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

      <div class="info-section process-section" style="display: none;">
        <h3>Craft Process</h3>
        <div class="process-list">
          <!-- Process steps injected here -->
        </div>
      </div>

      <div class="info-section timeline-section" style="display: none;">
        <h3>History</h3>
        <ul class="timeline-list">
          <!-- Timeline events injected here -->
        </ul>
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

  // Set current landmark ID to the panel for saving
  panel.dataset.currentId = data.id;

  // Update Save Button State
  const saveBtn = panel.querySelector('.save-btn');

  const updateSaveButtonVisuals = () => {
    const savedLandmarks = JSON.parse(localStorage.getItem('savedLandmarks') || '[]');
    if (savedLandmarks.includes(data.id)) {
      saveBtn.classList.add('saved');
      saveBtn.querySelector('.bookmark-icon').setAttribute('fill', 'currentColor');
    } else {
      saveBtn.classList.remove('saved');
      saveBtn.querySelector('.bookmark-icon').setAttribute('fill', 'none');
    }
  };

  updateSaveButtonVisuals();

  saveBtn.onclick = () => {
    let savedLandmarks = JSON.parse(localStorage.getItem('savedLandmarks') || '[]');
    if (savedLandmarks.includes(data.id)) {
      savedLandmarks = savedLandmarks.filter(id => id !== data.id);
    } else {
      savedLandmarks.push(data.id);
    }
    localStorage.setItem('savedLandmarks', JSON.stringify(savedLandmarks));
    updateSaveButtonVisuals();
    document.dispatchEvent(new CustomEvent('saved-places-updated'));
  };

  // Populate data
  panel.querySelector('.panel-title').textContent = data.title;
  panel.querySelector('.intro-text').textContent = data.intro;

  // Local Tip
  const localTipEl = panel.querySelector('.local-tip');
  if (data.localTip) {
    localTipEl.textContent = `“${data.localTip}”`;
    localTipEl.style.display = 'block';
  } else {
    localTipEl.style.display = 'none';
  }

  // Image (using placeholder for now or data image)
  const imgContainer = panel.querySelector('.hero-image-container');
  // Clear existing content
  while (imgContainer.firstChild) {
    imgContainer.removeChild(imgContainer.firstChild);
  }

  const img = document.createElement('img');
  img.alt = data.title;
  img.className = 'hero-image';

  img.onload = () => {
    img.classList.add('loaded');
  };

  img.onerror = () => {
    // Fallback if image fails
    img.src = 'https://via.placeholder.com/600x300?text=Image+Unavailable';
    img.classList.add('loaded');
  };

  img.src = data.image || 'https://via.placeholder.com/600x300';
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

  // Timeline
  const timelineSection = panel.querySelector('.timeline-section');
  const timelineList = panel.querySelector('.timeline-list');
  // Clear existing timeline
  while (timelineList.firstChild) {
    timelineList.removeChild(timelineList.firstChild);
  }

  if (data.timeline && data.timeline.length > 0) {
    data.timeline.forEach(item => {
      const li = document.createElement('li');
      li.className = 'timeline-event';

      const year = document.createElement('span');
      year.className = 'timeline-year';
      year.textContent = item.year;

      const desc = document.createElement('span');
      desc.className = 'timeline-desc';
      desc.textContent = item.event;

      li.appendChild(year);
      li.appendChild(desc);
      timelineList.appendChild(li);
    });
    timelineSection.style.display = 'block';
  } else {
    timelineSection.style.display = 'none';
  }

  // Process Steps
  const processSection = panel.querySelector('.process-section');
  const processList = panel.querySelector('.process-list');
  // Clear existing process
  while (processList.firstChild) {
    processList.removeChild(processList.firstChild);
  }

  if (data.process && data.process.length > 0) {
    data.process.forEach(item => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'process-step';

      const stepTitle = document.createElement('h4');
      stepTitle.className = 'process-step-title';
      stepTitle.textContent = item.step;

      const stepDesc = document.createElement('p');
      stepDesc.className = 'process-step-desc';
      stepDesc.textContent = item.description;

      stepDiv.appendChild(stepTitle);
      stepDiv.appendChild(stepDesc);
      processList.appendChild(stepDiv);
    });
    processSection.style.display = 'block';
  } else {
    processSection.style.display = 'none';
  }

  // Audio Guide
  if (data.info.audioSnippet) {
    const audioContainer = document.createElement('div');
    audioContainer.style.marginTop = '16px';

    const audioBtn = document.createElement('button');
    audioBtn.className = 'custom-audio-btn';
    audioBtn.innerHTML = `<span class="icon">▶</span> <span class="text">Play Audio Guide</span>`;

    // Create new audio object
    const audioObj = new Audio(data.info.audioSnippet);

    audioBtn.onclick = () => {
      if (currentAudio && currentAudio !== audioObj) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        // Reset previous button if needed (handled by re-render, but good practice)
        const activeBtn = panel.querySelector('.custom-audio-btn.playing');
        if (activeBtn) {
           activeBtn.classList.remove('playing');
           activeBtn.innerHTML = `<span class="icon">▶</span> <span class="text">Play Audio Guide</span>`;
        }
      }

      if (audioObj.paused) {
        audioObj.play();
        audioBtn.classList.add('playing');
        audioBtn.innerHTML = `<span class="icon">⏸</span> <span class="text">Pause Audio Guide</span>`;
        currentAudio = audioObj;
      } else {
        audioObj.pause();
        audioBtn.classList.remove('playing');
        audioBtn.innerHTML = `<span class="icon">▶</span> <span class="text">Play Audio Guide</span>`;
      }
    };

    audioObj.onended = () => {
       audioBtn.classList.remove('playing');
       audioBtn.innerHTML = `<span class="icon">▶</span> <span class="text">Play Audio Guide</span>`;
    };

    audioContainer.appendChild(audioBtn);
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
  overlay.style.backgroundColor = 'rgba(0,0,0,0.95)';
  overlay.style.zIndex = '3000';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.4s ease';

  // Close button for better UX
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.className = 'lens-close-btn';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '24px';
  closeBtn.style.right = '24px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.color = 'white';
  closeBtn.style.fontSize = '3rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.opacity = '0.7';
  closeBtn.style.transition = 'opacity 0.3s ease';
  closeBtn.style.zIndex = '3010';

  closeBtn.onmouseenter = () => closeBtn.style.opacity = '1';
  closeBtn.onmouseleave = () => closeBtn.style.opacity = '0.7';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.objectFit = 'contain';
  img.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
  img.style.cursor = 'zoom-in';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';

  // Simple zoom effect on click
  let zoomed = false;
  img.onclick = (e) => {
    e.stopPropagation();
    zoomed = !zoomed;
    img.style.transform = zoomed ? 'scale(1.5)' : 'scale(1)';
    img.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
  };

  const closeLens = () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 400); // match transition time
  };

  closeBtn.onclick = (e) => {
    e.stopPropagation();
    closeLens();
  };

  overlay.onclick = () => {
    closeLens();
  };

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Trigger reflow for fade-in
  void overlay.offsetWidth;
  overlay.style.opacity = '1';
}

export function closeDetailPanel() {
  const panel = document.getElementById('detail-panel');
  if (panel) {
    panel.classList.remove('visible');
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  }
}
