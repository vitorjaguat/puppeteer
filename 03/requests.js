const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();

  //event listeners (.on()):
  //   page.on('request', (request) => {
  //     const url = request.url();

  //     if (url.includes('https://www.google.com/')) {
  //       console.log(`URL: ${url}`);
  //       console.log(`Method: ${request.method()}`);
  //       console.log(`Headers: ${JSON.stringify(request.headers())}`);
  //     }
  //   });

  //   page.on('response', async (response) => {
  //     const url = response.url();

  //     if (url.includes('https://www.google.com/log?format=json')) {
  //       console.log(`URL: ${url}`);
  //       console.log(`Headers: ${JSON.stringify(response.headers())}`);
  //       console.log(`Response: ${JSON.stringify(await response.json())}`);
  //     }
  //   });

  page.on('request', (request) => {
    const url = request.url();

    if (url.includes('data:image')) {
      console.log(url);
    }
  });

  await page.goto(
    'https://www.google.com/search?q=deer&sxsrf=APwXEdcrstu3A6H-iLefnY-Pzh86EfM35Q:1684020232741&source=lnms&tbm=isch&sa=X&ved=2ahUKEwidmpGeuPP-AhW_I7kGHZRUAloQ_AUoAXoECAEQAw&biw=756&bih=470&dpr=2'
  );

  await browser.close();
})();
