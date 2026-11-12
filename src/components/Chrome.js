// Quiet-by-default chrome for Fez: the medina leads; controls visit when called.
import { PinIcon, PotteryTag } from './Icons.js';

const PIN_KEY = 'fez-chrome-pin';
const RETIRE_MS = 2600;
const TOP_ZONE = 96;
const BOTTOM_ZONE = 150;
const CHROME_SEL = '.bottom-dock,.category-filter,.landmark-trail';

export function initChrome() {
  let pinned = false;
  try { pinned = localStorage.getItem(PIN_KEY) === '1'; } catch {}
  let chrome = true;         // greets on entry, then retires
  let focusWithin = false;
  let timer = null;
  let hint = null;

  const els = () => [...document.querySelectorAll(CHROME_SEL)];

  function apply() {
    const on = chrome || pinned;
    els().forEach(e => { e.classList.add('chrome'); e.classList.toggle('chrome-on', on); });
    if (!on) {
      if (!hint) {
        hint = document.createElement('button');
        hint.className = 'chrome-hint';
        hint.setAttribute('aria-label', 'Show controls');
        hint.innerHTML = PotteryTag;
        hint.addEventListener('click', () => { wake(); hint.focus?.(); });
        document.getElementById('app').appendChild(hint);
      }
    } else if (hint) { hint.remove(); hint = null; }
  }

  function retireSoon() {
    clearTimeout(timer);
    timer = setTimeout(() => { if (!focusWithin) { chrome = false; apply(); } }, RETIRE_MS);
  }
  function wake() { chrome = true; apply(); retireSoon(); }

  // Pin toggle joins the dock.
  const dock = document.querySelector('.bottom-dock');
  if (dock) {
    const pin = document.createElement('button');
    pin.className = 'dock-btn dock-pin';
    pin.dataset.id = 'pin';
    pin.setAttribute('aria-pressed', String(pinned));
    pin.setAttribute('aria-label', pinned ? 'Let controls retire' : 'Keep controls visible');
    pin.title = pinned ? 'Let controls retire' : 'Keep controls visible';
    pin.innerHTML = `${PinIcon}<span class="dock-label">Pin</span>`;
    pin.addEventListener('click', () => {
      pinned = !pinned;
      try { pinned ? localStorage.setItem(PIN_KEY, '1') : localStorage.removeItem(PIN_KEY); } catch {}
      pin.setAttribute('aria-pressed', String(pinned));
      pin.setAttribute('aria-label', pinned ? 'Let controls retire' : 'Keep controls visible');
      pin.title = pin.getAttribute('aria-label');
      if (pinned) { chrome = true; apply(); } else retireSoon();
    });
    dock.appendChild(pin);
  }

  document.addEventListener('focusin', (e) => {
    if (e.target.closest && e.target.closest(CHROME_SEL + ',.chrome-hint')) {
      focusWithin = true; clearTimeout(timer); chrome = true; apply();
    }
  });
  document.addEventListener('focusout', (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(CHROME_SEL + ',.chrome-hint')) {
      focusWithin = false; retireSoon();
    }
  });
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    if (e.clientY < TOP_ZONE || e.clientY > window.innerHeight - BOTTOM_ZONE) wake();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { focusWithin = false; chrome = false; apply(); }
  });

  // Greet only once the landing screen lets the map through.
  const app = document.getElementById('app');
  const landing = app.querySelector('.landing-screen');
  if (!landing) { apply(); retireSoon(); return; }
  els().forEach(e => e.classList.add('chrome', 'chrome-on'));
  new MutationObserver((_, obs) => {
    if (!app.querySelector('.landing-screen')) { obs.disconnect(); apply(); retireSoon(); }
  }).observe(app, { childList: true });
}
