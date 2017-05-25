var Produit = require('./controller');

Produit = new Produit();


module.exports = function(app) {
  app.get('/api/Produit/:id', function (req, res){
    Produit.get(req, res);
  });
  app.delete('/api/Produit/:id', function (req, res){
    Produit.delete(req, res);
  });
  app.post('/api/Produit', function (req, res) {
    Produit.post(req, res);
  });
}
