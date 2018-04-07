var Products = require('./controller');

Products = new Products();

module.exports = function (app) {
  app.get('/api/products', function (req, res) {
    Products.handleGet(req, res);
  });
}
