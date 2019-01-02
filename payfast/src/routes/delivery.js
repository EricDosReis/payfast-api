const DeliveryController = require('../controllers/delivery');
const deliveryController = new DeliveryController();

module.exports = (app) => {
  app.get('/delivery/:zipCode', (req, res) => {
    deliveryController.getTime(req, res);
  });
}
