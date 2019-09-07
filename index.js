require('dotenv').config()

const authenticate = require('./auth/authenticate');




(async () => {


  const auth = await authenticate();
  console.log('bearer token received!', { auth })
  
  

})();


