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

    this._paymentDao
      .add(req.body)
      .then((id) => {
        const payment = { id, ...req.body };

        res.location(`/payment/${id}`);
        res.status(201).json(payment);
      })
      .catch((error) => res.status(500).send(error));
  }

  update(req, res) {
    const errors = this._validateRequest(req);

    if (errors)
      res.status(400).send(errors);

    this._paymentDao
      .update(req.body)
      .then(() => {
        res.status(200).json(req.body);
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
    paymentDao
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