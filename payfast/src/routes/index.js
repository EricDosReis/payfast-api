const payment = require('./payment');
const delivery = require('./delivery');

module.exports = (app) => {
  payment(app);
  delivery(app);
}
