const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.goto(
    'https://www.amazon.com.br/s?k=sabor+cereja&page=7&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1VMB9VWPKCKNR&qid=1683665997&sprefix=sabor+cereja%2Caps%2C235&ref=sr_pg_7',
    {
      waitUntil: 'load',
    }
  );

  const is_disabled =
    (await page.$('.s-pagination-next.s-pagination-disabled')) !== null;

  console.log(is_disabled);

  await browser.close();
})();
