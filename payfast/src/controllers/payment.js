const PaymentDao = require('../dao/payment');
const cardService = require('../services/card');
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

    if (payment.type === 'card')
      this._paymentWithCard(res, payment);

    else if (payment.type === 'payfast')
      this._paymentWithPayFast(res, payment);

    else
      res.status(400).send(this._paymentTypeErrorMessage());
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

  _paymentWithCard(res, payment) {
    cardService.authorize(payment.card)
      .then((data) => {
        if (data.status === 'AUTHORIZED') {
          delete payment.card;

          return this._paymentDao.create(payment);
        }
      })
      .then((id) => {
        this._onCreate(res, payment, id);
      })
      .catch(error => res.status(500).send(error));
  }

  _paymentWithPayFast(res, payment) {
    delete payment.card;

    this._paymentDao
      .create(payment)
      .then((id) => {
        this._onCreate(res, payment, id);
      })
      .catch(error => res.status(500).send(error));
  }

  _onCreate(res, payment, id) {
    const href = `http://localhost:3000/payment/${id}`;

    const links = [
      {
        href,
        rel: 'CONFIRM',
        method: 'PUT',
      },
      {
        href,
        rel: 'CANCEL',
        method: 'DELETE',
      }
    ];

    res.location(`/payment/${id}`);
    res.status(201).json({ id, ...payment, links });
  }

  _paymentTypeErrorMessage() {
    return [
      {
        "location": "body",
        "param": "type",
        "msg": "Type must be 'card' or 'payfast'",
        "value": payment.type,
      },
    ];
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
