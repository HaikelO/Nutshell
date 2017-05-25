var Fournisseur  = require('./controller');

Fournisseur = new Fournisseur();

module.exports = function(app) {
  app.get('/api/Fournisseur/:id', function (req, res){
    Fournisseur.get(req, res);
  });
  app.delete('/api/Fournisseur/:id', function (req, res){
    Fournisseur.delete(req, res);
  });
  app.post('/api/Fournisseur', function (req, res) {
    Fournisseur.post(req, res);
  });
}
