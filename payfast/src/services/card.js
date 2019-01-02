const httpRequest = require('../utils/http');
const config = {
  host: 'localhost',
  port: 3001,
}

module.exports = {
  authorize(data) {
    return httpRequest({
      ...config,
      path: '/card',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }, JSON.stringify(data));
  }
}
