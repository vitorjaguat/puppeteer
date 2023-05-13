const puppeteer = require('puppeteer-extra');
const fs = require('fs').promises;

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer
  .launch({
    headless: false,
    //using regular Chrome instead of Chromium:
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    // userDataDir:
    //   '/Users/vitorbutkusaguiar/Library/Application Support/Google/Chrome/Default',
    // simulating another ip adress:
    // args: ['--proxy-server=http://<ip_adress>:8080']
  })
  .then(async (browser) => {
    console.log('Running tests..');
    const page = await browser.newPage();

    //load cookies
    const cookiesString = await fs.readFile('./cookies.json');
    const cookies = JSON.parse(cookiesString);
    console.log(cookies);
    await page.setCookie(...cookies);

    await page.goto('https://www.google.com');
  });
