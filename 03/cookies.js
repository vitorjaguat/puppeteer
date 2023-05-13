const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://accounts.google.com/signin/v2/identifier', {
    waitUntil: 'networkidle2',
  });

  console.log('ID page loaded');

  await page.type('#identifierId', '<userID>');
  await page.click('#identifierNext > div > button > span');
  await page.waitForNavigation({
    waitUntil: 'networkidle2',
  });
  //   await page.waitForSelector('#password', {
  //     // visible: true,
  //     // hidden: false,
  //   });

  console.log('PW page loaded');

  await page.type('input', '<password>');
  await page.click('button');
  //   await page.waitForNavigation({
  //     waitUntil: 'networkidle2',
  //   });

  console.log('password sent!');

  //save cookies
  const cookies = await page.cookies();
  console.log(cookies);
  await fs.writeFile('cookies.json', JSON.stringify(cookies, null, 2));

  await browser.close();
})();

//working!
