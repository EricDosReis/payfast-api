const http = require('http');

module.exports = function httpRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      statusCodeError(res, reject);

      let body = [];

      onData(res, body);
      onEnd(res, body, resolve, reject);
    });

    onError(req, reject);

    if (postData)
      req.write(postData);

    req.end();
  });
}

function statusCodeError(res, reject) {
  if (res.statusCode < 200 || res.statusCode >= 300)
    return reject(new Error(`statusCode: ${res.statusCode}`));
}

function onData(res, body) {
  res.on('data', (chunk) => {
    body.push(chunk);
  });
}

function onEnd(res, body, resolve, reject) {
  res.on('end', () => {
    try {
      body = JSON.parse(Buffer.concat(body).toString());
    } catch (error) {
      reject(error);
    }

    resolve(body);
  });
}

function onError(req, reject) {
  req.on('error', (error) => {
    reject(error);
  });
}
