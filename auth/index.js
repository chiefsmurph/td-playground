const fireTdAuth = require('./fire-td-auth');
const authHttpListener = require('./auth-http-listener');
const postAccessToken = require('./post-access-token');



// resolves to AUTH HEADER


module.exports = () => new Promise(async resolve => {

  authHttpListener(async code => {
    console.log('auth code received', { code })
    const {
      access_token,
      expires_in
    } = await postAccessToken(code);
    resolve(`Bearer ${access_token}`);

  });
  await fireTdAuth();

});