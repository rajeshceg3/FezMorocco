// One deliberate medina drawer. No timers, hover wake or stored pin state.
import { PotteryTag } from './Icons.js';

export function initChrome() {
  const app = document.getElementById('app');
  const trigger = document.createElement('button');
  trigger.className = 'chrome-hint';
  trigger.setAttribute('aria-label', 'Explore the medina');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', 'medina-tools');
  trigger.innerHTML = `${PotteryTag}<span>Medina</span>`;
  const drawer = document.createElement('section');
  drawer.id = 'medina-tools'; drawer.className = 'medina-tools';
  drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-labelledby', 'medina-heading');
  drawer.innerHTML = '<header class="medina-heading"><div><h1 id="medina-heading">Explore the medina</h1><p>Landmarks, craft lanes and courtyard notes</p></div><button class="tools-close" aria-label="Close medina tools">×</button></header>';
  const body=document.createElement('div');body.className='medina-body';drawer.appendChild(body);
  for (const selector of ['.landmark-trail', '.category-filter', '.bottom-dock', '.leaflet-control-zoom']) {
    const el = document.querySelector(selector); if (el) body.appendChild(el);
  }
  const categories = drawer.querySelector('.category-filter');
  categories.setAttribute('role', 'group'); categories.setAttribute('aria-label', 'Filter map markers');
  drawer.hidden = true; drawer.inert = true;
  app.append(trigger, drawer);
  let open = false;
  const background = () => [...app.children].filter(el => el !== drawer && el !== trigger && el.id !== 'detail-panel');
  function setOpen(value, restore = true) {
    open = value; drawer.hidden = !value; drawer.inert = !value;
    drawer.setAttribute('aria-hidden', String(!value)); trigger.setAttribute('aria-expanded', String(value));
    background().forEach(el => { el.inert = value; });
    if(value) {body.scrollTop=0;drawer.querySelector('.tools-close').focus({preventScroll:true});}
    else if(restore) trigger.focus({preventScroll:true});
  }
  trigger.onclick = () => setOpen(!open);
  drawer.querySelector('.tools-close').onclick = () => setOpen(false);
  document.addEventListener('open-landmark', () => setOpen(false, false));
  document.addEventListener('keydown', e => {
    if(!open) return;
    if(e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    if(e.key === 'Tab') {
      const els = [...drawer.querySelectorAll('button,a[href]')].filter(el => !el.disabled && el.tabIndex >= 0 && el.getClientRects().length);
      const first = els[0], last = els.at(-1);
      if(e.shiftKey && document.activeElement === first) {e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement === last) {e.preventDefault();first.focus();}
    }
  });
  document.addEventListener('close-landmark', () => trigger.focus({preventScroll:true}));
}
