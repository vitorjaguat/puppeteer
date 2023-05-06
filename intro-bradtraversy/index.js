//Intro To Web Scraping With Puppeteer
//https://www.youtube.com/watch?v=S67gyqnYHmI&ab_channel=TraversyMedia

const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.traversymedia.com');

  //extract a pdf or a screenshot image of the page:
  //   await page.screenshot({ path: 'example.png', fullPage: true });
  //   await page.pdf({ path: 'example.pdf', format: 'A4' });

  //extract the html code of a page:
  //   const html = await page.content();
  //   console.log(html);

  //extract the title of a page:
  //   const title = await page.evaluate(() => document.title);
  //   console.log(title);

  //extract all text from a page:
  //   const text = await page.evaluate(() => document.body.innerText);
  //   console.log(text);

  //extract all links from a page:
  //1. the first argument in page.evaluate() accesses the page, the second iterate through the array generated from the first.
  //   const links = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll('a'), (e) => e.href)
  //   );
  //   console.log(links);

  //get all courses with levels and urls:
  //   const courses = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
  //       title: e.querySelector('.card-body h3').innerText,
  //       level: e.querySelector('.card-body .level').innerText,
  //       url: e.querySelector('.card-footer a').href,
  //     }))
  //   );
  //   console.log(courses);

  //alternative syntax:
  const coursesUsingEval = await page.$$eval('#cscourses .card', (elements) =>
    elements.map((e) => ({
      title: e.querySelector('.card-body h3').innerText,
      level: e.querySelector('.card-body .level').innerText,
      url: e.querySelector('.card-footer a').href,
    }))
  );
  console.log(coursesUsingEval);

  //save data to a JSON file:
  fs.writeFile('courses.json', JSON.stringify(coursesUsingEval), (err) => {
    if (err) throw err;
    console.log('File saved');
  });

  await browser.close();
}

run();
