
const {
  CLIENT_ID,
  USERNAME,
  PASSWORD
} = process.env;

const puppeteer = require('puppeteer');

const fireTdAuth = async () => {
  const browser = await puppeteer.launch({ 
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
      '--accept="text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8"',
      '--accept-language="en,en-US;q=0,5"'
    ],
    headless: true,
    ignoreHTTPSErrors: true 
  });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');

  await page.evaluateOnNewDocument(() => {
    // overwrite the `languages` property to use a custom getter
    Object.defineProperty(navigator, "languages", {
      get: function() {
        return ["en-US", "en"];
      }
    });

    // overwrite the `plugins` property to use a custom getter
    Object.defineProperty(navigator, 'plugins', {
      get: function() {
        // this just needs to have `length > 0`, but we could mock the plugins too
        return [1, 2, 3, 4, 5];
      },
    });
  })

  // page.on("request", r => {
  //   if (
  //     ["image", "stylesheet", "font", "script"].indexOf(r.resourceType()) !== -1 
  //   ) {
  //     r.abort();
  //   } else {
  //     r.continue();
  //   }
  // });

  const redirectURI = 'http://localhost:3000';
  const authURL = `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${encodeURIComponent(redirectURI)}&client_id=${encodeURIComponent(CLIENT_ID)}`;
  console.log({ authURL })
  await page.goto(authURL, { waitUntil: 'networkidle0' });
  await page.waitFor(3000);

  await page.evaluate((username, password) => {
    document.querySelector('#username').value = username;
    document.querySelector('#password').value = password;
  }, USERNAME, PASSWORD)

  await page.waitFor(3000);

  await page.evaluate(() => document.querySelector('form').submit());

  await page.waitFor(3000);

  await page.evaluate(() => document.querySelector('form').submit());

  await page.waitFor(3000);

  await page.close();
  await browser.close();
};

module.exports = fireTdAuth;
