import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const OUTPUT_DIR = path.join(__dirname, 'instagram_post');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const indexPath = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(indexPath).pipe(res);
  }
});

server.listen(5189, async () => {
  console.log('Serving dist on http://localhost:5189');

  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // 1. Desktop Home (1440x960)
    console.log('Capturing Desktop Home...');
    await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });
    await page.goto('http://localhost:5189', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01_raw_desktop_home.png') });

    // 2. Feed Scrolled with Cards & Filters (1440x960)
    console.log('Capturing Feed Cards Scrolled...');
    await page.evaluate(() => {
      window.scrollTo(0, 320);
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02_raw_feed_scrolled.png') });

    // 3. Mobile View (400x820)
    console.log('Capturing Mobile View...');
    await page.setViewport({ width: 400, height: 820, deviceScaleFactor: 2 });
    await page.goto('http://localhost:5189', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02_raw_mobile_home.png') });

    // 4. Event Detail Modal (1440x960)
    console.log('Capturing Event Detail Modal...');
    await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });
    await page.goto('http://localhost:5189', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    const firstCard = await page.$('.event-card');
    if (firstCard) {
      await firstCard.click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(OUTPUT_DIR, '03_raw_event_detail_modal.png') });
    }

    // 5. Create Event Modal
    console.log('Capturing Create Event Modal...');
    await page.goto('http://localhost:5189', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    const heroBtn = await page.$('#btn-hero-publish');
    if (heroBtn) {
      await heroBtn.click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(OUTPUT_DIR, '04_raw_create_event_modal.png') });
    }

    // 6. User Profile Modal with Confirmed Events!
    console.log('Capturing Profile Modal with confirmed events...');
    await page.goto('http://localhost:5189', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    
    // Click "Eu Vou" on first two cards (.going-btn)
    const goingButtons = await page.$$('.going-btn');
    if (goingButtons.length > 0) {
      await goingButtons[0].click();
      await new Promise(r => setTimeout(r, 400));
      if (goingButtons.length > 1) {
        await goingButtons[1].click();
        await new Promise(r => setTimeout(r, 400));
      }
    }
    
    // Open profile modal
    const profileBtn = await page.$('.user-profile-btn');
    if (profileBtn) {
      await profileBtn.click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(OUTPUT_DIR, '05_raw_profile_modal.png') });
    }

    await browser.close();
    console.log('All updated screenshots captured successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
