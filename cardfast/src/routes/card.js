const CardController = require('../controllers/card');
const cardController = new CardController();

module.exports = (app) => {
  app.post('/card', (req, res) => {
    cardController.authorize(req, res);
  });
}
