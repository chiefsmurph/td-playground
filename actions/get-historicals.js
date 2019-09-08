const request = require('request-promise');

module.exports = async (ticker, period = 30) => {

  const response = await request.get({
    url: `https://api.tdameritrade.com/v1/marketdata/${ticker}/pricehistory`,
    headers: global.headers,
    qs: {
      periodType: 'day',
      period: 10,
      frequencyType: 'minute',
      frequency: period
    },
    json: true
  });

  return response.candles.map(hist => ({
    ...hist,
    dateStr: (new Date(hist.datetime))
  }));

};