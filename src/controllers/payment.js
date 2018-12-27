const PaymentDao = require('../dao/payment');
const db = require('../config/database');

module.exports = class PaymentController {
  constructor() {
    this._paymentDao = new PaymentDao(db);
  }

  create(req, res) {
    const errors = this._validateRequest(req);
    const payment = req.body;

    payment.status = 'CREATED';

    if (errors)
      res.status(400).send(errors);

    this._paymentDao
      .create(payment)
      .then((id) => {
        res.location(`/payment/${id}`);
        res.status(201).json({ id, ...payment });
      })
      .catch((error) => res.status(500).send(error));
  }

  confirm() {
    const { id } = req.params;

    this._paymentDao
      .update(id, { status: 'CONFIRMED' })
      .then(() => res.status(204).end())
      .catch(res.status(500).send);
  }

  cancel(req, res) {
    const { id } = req.params;

    this._paymentDao
      .update(id, { status: 'CANCELED' })
      .then(() => res.status(204).end())
      .catch(res.status(500).send);
  }

  update(req, res) {
    const errors = this._validateRequest(req);
    const { id } = req.params;
    const payment = req.body;

    if (errors)
      res.status(400).send(errors);

    this._paymentDao
      .update(id, payment)
      .then((payment) => {
        res.status(200).json(payment);
      })
      .catch(res.status(500).send);
  }

  delete(req, res) {
    this._paymentDao
      .delete(req.params.id)
      .then(() => res.status(204).end())
      .catch(res.status(500).send);
  }

  findAll(req, res) {
    this._paymentDao
      .findAll()
      .then(payments => res.status(200).json(payments))
      .catch(res.status(500).send);
  }

  findOne(req, res) {
    this._paymentDao
      .findOne(req.params.id)
      .then(payment => res.status(200).json(payment))
      .catch(res.status(500).send);
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