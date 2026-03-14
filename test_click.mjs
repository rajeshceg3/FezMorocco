import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:5173');

  await page.waitForSelector('.btn-enter');
  await page.click('.btn-enter');

  await new Promise(r => setTimeout(r, 4000));

  console.log("clicking marker...");
  const markers = await page.$$('.leaflet-marker-icon');
  if (markers.length > 0) {
      // simulate click
      await page.evaluate(el => el.click(), markers[0]);
  }

  await new Promise(r => setTimeout(r, 1000));
  const panelVisible = await page.$('.detail-panel.visible');
  console.log('Panel visible?', !!panelVisible);

  await page.screenshot({ path: 'test_click.png' });

  await browser.close();
})();
