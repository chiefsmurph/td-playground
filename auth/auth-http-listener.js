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

let receiveCodeCallback;
app.get('/', (req, res) => {
  const { code } = req.query;
  receiveCodeCallback(code);
  res.send('thanks');
});


module.exports = callback => {
  receiveCodeCallback = callback;
};