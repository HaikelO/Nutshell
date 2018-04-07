var Product = require('./controller');

Product = new Product();

module.exports = function (app) {
  app.post('/api/product/add', function (req, res) {
    Product.handlePost(req, res);
  });
  app.get('/api/product/detail/:id', function (req, res) {
    Product.handleGet(req, res);
  });
  app.delete('/api/product/:id', function (req, res) {
    Product.handleDelete(req, res);
  });
}   
