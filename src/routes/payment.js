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
    }

    paymentDao
      .add(req.body)
      .then(() => {

        // TODO location
        res.location('/payment/:id');
        res.status(201).json(req.body);
      })
      .catch(res.status(500).send);
  });

  app.put('/payment', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .update(req.body)
      .then(() => res.status(200).end())
      .catch(res.status(500).send);
  });

  app.delete('/payment/:id', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .delete(req.params.id)
      .then(() => res.status(200).end())
      .catch(res.status(500).send);
  });

  app.get('/payment', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .getAll()
      .then(payments => {

      })
      .catch(res.status(500).send);
  });

  app.get('/payment/:id', (req, res) => {
    const paymentDao = new PaymentDao(db);

    paymentDao
      .getOne(req.params.id)
      .then(payment => {

      })
      .catch(res.status(500).send);
  });
}
