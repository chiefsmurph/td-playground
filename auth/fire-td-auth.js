
const {
  CLIENT_ID,
  USERNAME,
  PASSWORD
} = process.env;

const puppeteer = require('puppeteer');

const fireTdAuth = async () => {
  const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });
  const page = await browser.newPage();

  const redirectURI = 'http://localhost:3000';
  const authURL = `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${encodeURIComponent(redirectURI)}&client_id=${encodeURIComponent(CLIENT_ID)}`;
  console.log({ authURL })
  await page.goto(authURL, { waitUntil: 'networkidle0' });
  await page.waitFor(1000);

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
