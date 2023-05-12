// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer
  .launch({
    headless: 'new',
    //using regular Chrome instead of Chromium:
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    userDataDir:
      '/Users/vitorbutkusaguiar/Library/Application Support/Google/Chrome/Default',
    // simulating another ip adress:
    // args: ['--proxy-server=http://<ip_adress>:8080']
  })
  .then(async (browser) => {
    console.log('Running tests..');
    const page = await browser.newPage();
    await page.goto('https://bot.sannysoft.com');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'testresult.png', fullPage: true });
    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
  });
