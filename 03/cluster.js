const { Cluster } = require('puppeteer-cluster');
const fs = require('fs');

const urls = [
  'https://www.amazon.com.br/s?k=sabor+cereja&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1VMB9VWPKCKNR&sprefix=sabor+cereja%2Caps%2C235&ref=nb_sb_noss_2',
  'https://www.amazon.com.br/s?k=ant%C3%ADlope&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=TNJLG9FHYFI4&sprefix=ant%C3%ADlope%2Caps%2C273&ref=nb_sb_noss_2',
];

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 10,
    monitor: true,
    puppeteerOptions: {
      headless: 'new',
      //   defaultViewport: null,
      //   userDataDir: './tmp',
    },
  });

  cluster.on('taskerror', (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);

    const productHandles = await page.$$('.s-card-container');

    let title = 'Null';
    let price = 'Null';
    let img = 'Null';
    let items = [];
    let isBtnDisabled = false;

    while (!isBtnDisabled) {
      for (const productHandle of productHandles) {
        try {
          title = await page.evaluate(
            (el) => el.querySelector('h2 > a > span').textContent,
            productHandle
          );
        } catch (error) {}

        try {
          price = await page.evaluate(
            (el) => el.querySelector('.a-price > .a-offscreen').textContent,
            productHandle
          );
        } catch (error) {}

        try {
          img = await page.evaluate(
            (el) => el.querySelector('.s-image').getAttribute('src'),
            productHandle
          );
        } catch (error) {}

        if (title !== 'Null') {
          items.push({ title, price, img });

          //feed the .csv file:
          fs.appendFile(
            'results.csv',
            `${title.replaceAll(',', ' |')},${price.replaceAll(
              ',',
              '.'
            )},${img}\n`,
            (err) => {
              if (err) throw err;
            }
          );
        }
      }

      await page.waitForSelector('.s-pagination-next', { visible: true });

      const is_disabled =
        (await page.$('.s-pagination-next.s-pagination-disabled')) !== null;

      isBtnDisabled = is_disabled;

      if (!is_disabled) {
        await page.click('.s-pagination-next');
        //   await page.waitForNavigation();
      }
    }

    console.log(items);
  });

  for (const url of urls) {
    await cluster.queue(url);
  }

  await cluster.idle();
  await cluster.close();
})();
