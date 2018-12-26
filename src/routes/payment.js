const PaymentController = require('../controllers/payment');
const paymentController = new PaymentController();

module.exports = (app) => {
  app.post('/payment', paymentController.create);

  app.put('/payment/:id', paymentController.update);

  app.delete('/payment/:id', paymentController.delete);

  app.get('/payment', paymentController.findAll);

  app.get('/payment/:id', paymentController.findOne);
}
