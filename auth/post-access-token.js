const request = require('request-promise');
const { CLIENT_ID } = process.env;

module.exports = async code => {

  const response = await request.post({
    url: 'https://api.tdameritrade.com/v1/oauth2/token',
    form: {
      grant_type: 'authorization_code',
      code,
      client_id: CLIENT_ID,
      redirect_uri: 'http://localhost:3000'
    }
  });
  
  return JSON.parse(response);

};