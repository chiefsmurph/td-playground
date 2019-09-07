require('dotenv').config()
const puppeteer = require('puppeteer');

const path = require('path')
const fs = require('fs')
const express = require('express')
const https = require('https')


const certOptions = {
  key: fs.readFileSync(path.resolve('server.key')),
  cert: fs.readFileSync(path.resolve('server.crt'))
};

const app = express();



const server = https.createServer(certOptions, app).listen(3000);

app.get('/', (req, res) => {
  const { code } = req.query;
  res.send('hey');
});


const {
  CLIENT_ID,
  USERNAME,
  PASSWORD
} = process.env;


(async () => {

  const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });
  const page = await browser.newPage();

  const redirectURI = 'http://localhost:3000';
  const authURL = `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${decodeURI(redirectURI)}&client_id=${CLIENT_ID}%40AMER.OAUTHAP`;
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
  

})();


