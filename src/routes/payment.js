const PaymentController = require('../controllers/payment');
const paymentController = new PaymentController();

module.exports = function(app) {
  app.post('/payment', (req, res) => {
    paymentController.create(req, res);
  });

  app.put('/payment/:id', (req, res) => {
    paymentController.confirm(req, res);
  });

  app.delete('/payment/:id', (req, res) => {
    paymentController.cancel(req, res);
  });

  app.get('/payment', (req, res) => {
    paymentController.findAll(req, res);
  });

  app.get('/payment/:id', (req, res) => {
    paymentController.findOne(req, res);
  });
}
