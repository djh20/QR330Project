const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://djh20.ipdisk.co.kr:8000',
      changeOrigin: true,
    })
  )
};