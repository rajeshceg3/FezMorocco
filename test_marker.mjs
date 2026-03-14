import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  // click begin
  await page.waitForSelector('.btn-enter');
  await page.click('.btn-enter');

  await new Promise(r => setTimeout(r, 4000)); // wait for fly

  const markers = await page.$$('.leaflet-marker-icon');
  console.log('markers:', markers.length);
  if (markers.length > 0) {
     const html = await page.evaluate(el => el.outerHTML, markers[0]);
     console.log(html);
  }

  await browser.close();
})();
