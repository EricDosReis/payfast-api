module.exports = (app) => {
  app.get('/payment', (req, res) => {
    res.send('Ok');
  });

  app.post('/payment', (req, res) => {
    console.log(req.body);
    res.send('Ok');
  });
}
