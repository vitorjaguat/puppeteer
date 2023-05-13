const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  //load cookies
  const cookiesString = await fs.readFile('./cookies.json');
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);

  await page.goto(
    'https://accounts.google.com/v3/signin/identifier?dsh=S-1693698212%3A1684017362191407&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=Af_xneEII9EFBwehFU3XeJldJpKYc2C2zlg6iPS1tLVKx97cbW8Jke3zlA3BrKZ1pizZkNuG8nxR&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
  );

  //   await browser.close();
})();

//not working...
