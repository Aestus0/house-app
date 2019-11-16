const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.NODE_ENV === 'development') {
    const context = process.env.REACT_APP_BASE_URL;
    const rewrite = `^${context}`;
    const pathRewrite = {};
    pathRewrite[rewrite] = '';
    app.use(proxy(context, {
      target: 'http://localhost:8080/',
      pathRewrite,
    }));
  }
};
