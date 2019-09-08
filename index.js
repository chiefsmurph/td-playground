require('dotenv').config()

const authenticate = require('./auth');
const getHistoricals = require('./actions/get-historicals');



(async () => {


  const authHeader = await authenticate();
  console.log('bearer token received!', { authHeader });
  global.headers = {
    'Authorization': authHeader
  };
  
  const historicals = await getHistoricals('AAPL', 30);

  console.log(
    JSON.stringify(
      historicals,
      null, 
      2
    )
  );

})();


