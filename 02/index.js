//https://www.youtube.com/watch?v=lgyszZhAZOI&ab_channel=LearnWebCode

const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://learnwebcode.github.io/practice-requests/');

  //take a screenshot:
  //
  //   await page.screenshot({ path: 'amazing.png', fullPage: true, type:'jpeg' });

  //save this example array to a txt file, after each item add a return and new line:
  //   const names = ['red', 'orange', 'yellow'];
  //   await fs.writeFile('names.txt', names.join('\r\n'));

  //save all text inside string tags inside of .info class into a txt file, after each name add a return and a new line:
  //   const names2 = await page.evaluate(() => {
  //     return Array.from(document.querySelectorAll('.info strong')).map(
  //       (x) => x.textContent
  //     );
  //   });
  //   console.log(names2);
  //   await fs.writeFile('names2.txt', names2.join('\r\n'));

  //save all images src inside of an array, then open those images in the virtual browser and save them (buffer()):
  //   const photos = await page.$$eval('img', (imgs) => {
  //     return imgs.map((x) => x.src);
  //   });

  //   for (const photo of photos) {
  //     const imagepage = await page.goto(photo);
  //     await fs.writeFile(photo.split('/').pop(), await imagepage.buffer());
  //   } //the split and pop method are there to maintain the actual names of the images!

  // $$eval(a,b) select all elements
  // $eval(a,b) select a single element

  //simmulate clicking on the button, then getting the textContent of the #data div (that was empty before clicking):
  //   await page.click('#clickme');
  //   const clickedData = await page.$eval('#data', (el) => el.textContent);
  //   console.log(clickedData);

  //type in the text input, then submit, then wait for the browser to navigate to the new page, then select and get sensitive data:
  await page.type('#ourfield', 'blue');
  //here we have to use Promise.all([]) to be sure that all promises will fulfill in the right time:
  await Promise.all([page.click('#ourform button'), page.waitForNavigation()]);

  const sensitiveInfo = await page.$eval('#message', (el) => el.textContent);
  console.log(sensitiveInfo);

  await browser.close();
}

start();
