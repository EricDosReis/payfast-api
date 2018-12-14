const PaymentDao = require('../dao/payment');
const db = require('../config/database');

module.exports = (app) => {
   app.post('/payment', (req, res) => {
    const PaymentDao = new PaymentDao(db);

    PaymentDao
      .add(req.body)
      .then(() => res.status(201).end())
      .catch(console.error);
  });

  app.put('/payment', (req, res) => {
    const PaymentDao = new PaymentDao(db);

    PaymentDao
      .update(req.body)
      .then(() => res.status(200).end())
      .catch(console.error);
  });

  app.delete('/payment/:id', (req, res) => {
    const PaymentDao = new PaymentDao(db);

    PaymentDao
      .delete(req.params.id)
      .then(() => res.status(200).end())
      .catch(console.error);
  });

  app.get('/payment', (req, res) => {
    const PaymentDao = new PaymentDao(db);

    PaymentDao
      .getAll()
      .then(payments => {

      })
      .catch(console.error);
  });

  app.get('/payment/:id', (req, res) => {
    const PaymentDao = new PaymentDao(db);

    PaymentDao
      .getOne(req.params.id)
      .then(payment => {

      })
      .catch(console.error);
  });
}
