const PaymentDao = require('../dao/payment');
const db = require('../config/database');

module.exports = (app) => {
   app.post('/payment', (req, res) => {
    const paymentDao = new PaymentDao(db);

    req
      .assert('type', 'Type is required')
      .notEmpty();

    req
      .assert('value', 'Type is required')
      .notEmpty();

    req
      .assert('value', 'Value must be float')
      .isFloat();

    const errors = req.validatorErrors();

    if (errors) {
      res
        .status(400)
        .send(errors);

      return;
    }

    paymentDao
      .add(req.body)
      .then(() => res.status(201).end())
      .catch(console.error);
  });

  app.put('/payment', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .update(req.body)
      .then(() => res.status(200).end())
      .catch(console.error);
  });

  app.delete('/payment/:id', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .delete(req.params.id)
      .then(() => res.status(200).end())
      .catch(console.error);
  });

  app.get('/payment', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .getAll()
      .then(payments => {

      })
      .catch(console.error);
  });

  app.get('/payment/:id', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .getOne(req.params.id)
      .then(payment => {

      })
      .catch(console.error);
  });
}
