var Produits = require('./controller');

Produits = new Produits();

module.exports = function(app) {
  app.get('/api/products', function (req, res) {
    Produits.get(req, res);
  });
}
