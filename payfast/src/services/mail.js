const soap = require('soap');
const BASE_URL = 'http://ws.correios.com.br/calculador';

module.exports = {
  getDeliveryTime(data) {
    return new Promise((resolve, reject) => {
      soap.createClient(`${BASE_URL}/CalcPrecoPrazo.asmx?wsdl`, (err, client) => {
        if (err)
          reject(err);

        client.CalcPrazo(data, (err, result) => {
          if (err)
            reject(err);

          resolve(result);
        })
      })
    })
  }
};
