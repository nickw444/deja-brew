const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/_api', proxy({
    target: 'http://localhost:5000/',
    // changeOrigin: true,
    xfwd: true,
  }));
  app.use('/login/google', proxy({
    target: 'http://localhost:5000/',
    // changeOrigin: true,
    xfwd: true,
  }));
};
