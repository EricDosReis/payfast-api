module.exports = class CardController {
  authorize(req, res) {
    const errors = this._validateResquest(req);
    
    if (errors)
      res.status(400).send(errors);
    
    const card = req.body;
    card.status = 'AUTHORIZED';

    res.status(201).json(card);
  }

  _validateResquest(req) {
    req
      .assert('number', 'number is required.')
      .notEmpty();

    req
      .assert('number', 'number must have 16 characters.')
      .len(16, 16);

    req
      .assert('holder', 'holder is required.')
      .notEmpty();

    req
      .assert('card', 'card is required.')
      .notEmpty();

    req
      .assert('expirationMonth', 'expirationMonth is required.')
      .notEmpty();

    req
      .assert('expirationMonth', 'expirationMonth must have 4 characters.')
      .len(2, 2);

    req
      .assert('expirationYear', 'expirationYear is required.')
      .notEmpty();

    req
      .assert('expirationYear', 'expirationYear must have 16 characters.')
      .len(4, 4);

    req
      .assert('cvv', 'cvv is required.')
      .notEmpty();

    req
      .assert('cvv', 'cvv must have 3 characters.')
      .len(3, 3);

    return req.validationErrors();
  }
}
