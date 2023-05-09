// https://www.youtube.com/watch?v=WOhtW3KxGHo&list=PLuJJZ-W1NwdqgvE0D-1SMS7EpWIC5cKqu&index=2&ab_channel=MichaelKitas

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
    // userDataDir: './tmp',
  });
  const page = await browser.newPage();
  await page.goto(
    'https://www.amazon.com.br/s?k=sabor+cereja&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1VMB9VWPKCKNR&sprefix=sabor+cereja%2Caps%2C235&ref=nb_sb_noss_2'
  );

  //   //   select all result cards and get title:
  //   const titles = await page.$$eval('.s-card-container', (cardsArr) =>
  //     cardsArr.map((card) => card.querySelector('h2 a span').textContent)
  //   );
  //   console.log(titles);
  //   //select all result cards and get prices:
  //   const prices = await page.$$eval('.s-card-container', (cardsArr) =>
  //     cardsArr.map(
  //       (card) =>
  //         // card.querySelector('.a-price-symbol').textContent +
  //         // card.querySelector('.a-price-whole').textContent +
  //         // ',' +
  //         // card.querySelector('.a-price-fraction').textContent
  //         card.querySelector('.a-price > .a-offscreen').textContent
  //     )
  //   );
  //   console.log(prices);

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

  await browser.close();
})();
