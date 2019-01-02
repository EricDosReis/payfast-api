const mailService = require('../services/mail');
const deliveryData = {
  sCepOrigem: '15900000',
};

module.exports = class DeliveryController {
  getTime(req, res) {
    const { zipCode } = req.params;

    if (!zipCode)
      res.status(400).send(this._deliveryZipCodeErrorMessage());

    mailService.getDeliveryTime({
      nCdServico: '40010',
      sCepDestino: zipCode,
      ...deliveryData,
    })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).send(error));
  }

  _deliveryZipCodeErrorMessage() {
    return [
      {
        "location": "url",
        "param": "zipCode",
        "msg": "Type must be provided",
        "value": "null",
      },
    ];
  }
}