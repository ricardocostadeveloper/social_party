import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080 });
  await page.setContent('<div style="background: linear-gradient(135deg, #1e1b4b, #4338ca); color: white; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; font-size: 40px; font-weight: bold;">Social Party Test</div>');
  await page.screenshot({ path: 'test_output.png' });
  await browser.close();
  console.log('SUCCESS');
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
