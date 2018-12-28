const PaymentDao = require('../dao/payment');
const db = require('../config/database');

module.exports = class PaymentController {
  constructor() {
    this._paymentDao = new PaymentDao(db);
  }

  create(req, res) {
    const errors = this._validateRequest(req);

    if (errors)
      res.status(400).send(errors);

    const payment = req.body;

    this._paymentDao
      .create(payment)
      .then((id) => {
        payment.status = 'CREATED';

        res.location(`/payment/${id}`);
        res.status(201).json({ id, ...payment });
      })
      .catch(error => res.status(500).send(error));
  }

  confirm(req, res) {
    const { id } = req.params;

    this._paymentDao
      .update(id, { status: 'CONFIRMED' })
      .then(payment => res.status(200).json(payment))
      .catch(error => res.status(500).send(error));
  }

  cancel(req, res) {
    const { id } = req.params;

    this._paymentDao
      .update(id, { status: 'CANCELED' })
      .then(payment => res.status(200).json(payment))
      .catch(error => res.status(500).send(error));
  }

  update(req, res) {
    const errors = this._validateRequest(req);

    if (errors)
      res.status(400).send(errors);

    const { id } = req.params;
    const payment = req.body;

    this._paymentDao
      .update(id, payment)
      .then(payment => res.status(200).json(payment))
      .catch(error => res.status(500).send(error));
  }

  delete(req, res) {
    this._paymentDao
      .delete(req.params.id)
      .then(() => res.status(204).end())
      .catch(error => res.status(500).send(error));
  }

  findAll(req, res) {
    this._paymentDao
      .findAll()
      .then(payments => res.status(200).json(payments))
      .catch(error => res.status(500).send(error));
  }

  findOne(req, res) {
    this._paymentDao
      .findOne(req.params.id)
      .then(payment => res.status(200).json(payment))
      .catch(error => res.status(500).send(error));
  }

  _validateRequest(req) {
    req
      .assert('type', 'Type is required')
      .notEmpty();

    req
      .assert('value', 'Value is required')
      .notEmpty();

    req
      .assert('value', 'Value must be float')
      .isFloat();

    req
      .assert('currency', 'Currency is required')
      .notEmpty();

    return req.validationErrors();
  }
}
