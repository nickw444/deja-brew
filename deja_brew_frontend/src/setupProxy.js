const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/_api', proxy({
    target: 'https://localhost:5000/',
    xfwd: true,
    secure: false,
  }));
  app.use('/login/google', proxy({
    target: 'https://localhost:5000/',
    xfwd: true,
    secure: false,
  }));
};
