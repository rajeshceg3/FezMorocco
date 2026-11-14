const pp=require('puppeteer-core'),fs=require('fs'),{spawn}=require('child_process'),assert=require('assert');
(async()=>{let browser,server;const out=process.env.OUT||'verification/pixels';fs.mkdirSync(out,{recursive:true});const proof=[];const port=process.env.PORT||'8814';
try{
 if(!process.env.URL){server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--port',port,'--host','127.0.0.1'],{cwd:process.cwd(),stdio:'ignore'});await new Promise(r=>setTimeout(r,600));}
 browser=await pp.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
 for(const width of (process.env.WIDTHS||'320,390,1440').split(',').map(Number)){
 const context=await browser.createBrowserContext();const p=await context.newPage();await p.setViewport({width,height:844});await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:process.env.MOTION||'reduce'}]);
 await p.evaluateOnNewDocument(()=>{localStorage.setItem('fez-chrome-pin','1');localStorage.removeItem('savedLandmarks')});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(process.env.URL||`http://127.0.0.1:${port}`,{waitUntil:'networkidle2'});
 await p.waitForSelector('.btn-enter');await p.screenshot({path:`${out}/${width}-entry.png`});await p.click('.btn-enter');await p.waitForSelector('.landing-screen',{hidden:true});await p.waitForSelector('.maplibregl-canvas');
 assert.equal(await p.$eval('#app',e=>e.scrollTop),0);assert.equal(await p.$eval('#medina-tools',e=>e.hidden),true,'saved legacy pin cannot expose tools');
 await p.waitForFunction(()=>{let loaded=false;window.map.eachLayer(l=>{if(l.getMaplibreMap)loaded=loaded||l.getMaplibreMap().queryRenderedFeatures().length>0});return loaded},{timeout:30000});await new Promise(r=>setTimeout(r,1600));assert.equal(await p.$eval('#medina-tools',e=>e.hidden),true,'no greeting timer');
 await p.screenshot({path:`${out}/${width}-quiet.png`});
 const options=await p.$$eval('[data-lm]',es=>es.map(e=>({id:e.dataset.lm,title:e.getAttribute('aria-label')})));
 const open=async()=>{await p.click('.chrome-hint');await p.waitForSelector('#medina-tools:not([hidden])');};
 const fit=async(selector)=>{const m=await p.$eval(selector,e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,scroll:e.scrollWidth>e.clientWidth+1}});assert(m.x>=0&&m.y>=0&&m.right<=width+1&&m.bottom<=845&&!m.scroll,JSON.stringify(m));};
 await open();await fit('#medina-tools');assert.equal(await p.$eval('#map',e=>e.inert),true);await p.screenshot({path:`${out}/${width}-tools.png`});
 await p.keyboard.down('Shift');await p.keyboard.press('Tab');await p.keyboard.up('Shift');assert.equal(await p.evaluate(()=>document.activeElement.textContent.trim()),'−');await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.className),'tools-close');
 await p.keyboard.press('Escape');assert.equal(await p.$eval('.chrome-hint',e=>e===document.activeElement),true);
 for(const night of [false,true]){
  if(night){await open();await p.click('[data-id=night]');await p.click('.tools-close');}
  for(const o of options){
   await open();await p.click(`[data-lm="${o.id}"]`);await p.waitForSelector('.detail-panel.visible');assert.equal(await p.$eval('#medina-tools',e=>e.hidden),true);
   assert.equal(await p.$eval('.panel-title',e=>e.textContent),o.title);await fit('.detail-panel');
   assert.equal(await p.$eval('#map',e=>e.inert),true);assert.equal(await p.$eval('.chrome-hint',e=>e.inert),true);
   await p.waitForFunction(()=>{const im=document.querySelector('.hero-image');return !im||im.complete},{timeout:15000}).catch(()=>{});
   const floors=await p.evaluate(()=>{const els=[...document.querySelectorAll('.detail-panel.visible button,.detail-panel.visible p,.detail-panel.visible li,.detail-panel.visible h3,.detail-panel.visible span')].filter(e=>e.getBoundingClientRect().height&&getComputedStyle(e).display!=='none');return {minFont:Math.min(...els.map(e=>parseFloat(getComputedStyle(e).fontSize))),overflow:document.documentElement.scrollWidth>innerWidth};});
   assert(floors.minFont>=14);assert(!floors.overflow);
   await p.$eval('.detail-panel',e=>e.scrollTop=e.scrollHeight);assert(await p.$eval('.detail-panel',e=>e.scrollTop>0));await p.$eval('.detail-panel',e=>e.scrollTop=0);
   await p.screenshot({path:`${out}/${width}-${night}-${o.id}.png`});
   if(o===options[0]&&!night){const lens=await p.$('.btn-enter:not(.landing-screen .btn-enter)');if(lens){await lens.click();await p.waitForSelector('.lens-overlay');assert.equal(await p.$eval('.detail-panel',e=>e.inert),true);await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Close landmark photo');await p.keyboard.press('Escape');await p.waitForSelector('.lens-overlay',{hidden:true});assert.equal(await p.$eval('.detail-panel',e=>e.inert),false);}}
   if(o===options[0]&&!night){await p.click('.save-btn');assert((await p.evaluate(()=>JSON.parse(localStorage.getItem('savedLandmarks')))).includes(+o.id));}
   if(o===options[0]){await p.keyboard.press('Escape')}else{await p.click('.close-btn')}
   assert.equal(await p.$eval('.detail-panel',e=>e.inert),true);assert.equal(await p.$eval('.chrome-hint',e=>e===document.activeElement),true);proof.push({width,night,id:o.id,...floors});
  }
 }
 await open();for(const c of ['Sacred','Craft','Architecture','Taste','Stay','all']){await p.click(`[data-category="${c}"]`);assert.equal(await p.$eval(`[data-category="${c}"]`,e=>e.getAttribute('aria-pressed')),'true');}
 await p.click('[data-id=saved]');assert.equal(await p.$$eval('.leaflet-marker-icon',es=>es.length),1);await p.click('[data-id=saved]');
 await p.click('[data-id=route]');await p.waitForSelector('#route-badge.visible');assert((await p.$eval('#route-badge',e=>e.textContent)).includes('Illustrative'));await p.click('[data-id=route]');await p.click('#reset-map');
 await p.click('.leaflet-control-zoom-in');await p.click('.leaflet-control-zoom-out');await p.click('.tools-close');
 const attribution=await p.$eval('.leaflet-control-attribution',e=>{const r=e.getBoundingClientRect();return {text:e.textContent,x:r.x,right:r.right,bottom:r.bottom}});assert(attribution.text.includes('OpenStreetMap'));assert(attribution.x>=0&&attribution.right<=width+1&&attribution.bottom<=844);
 assert.equal(await p.evaluate(()=>window.fezAudio.paused),true,'silent start');assert.deepEqual(errors,[]);await context.close();console.log('PASS',width,options.length,'landmarks, both themes, explicit tools, keyboard, scroll, save, filters, route, reset, zoom');
 }
 fs.writeFileSync(out+'/proof.json',JSON.stringify(proof,null,2));
}finally{await browser?.close();server?.kill()}})().catch(e=>{console.error(e);process.exit(1)});
