const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes/payment');

routes(app);

module.exports = app;