var Fournisseurs = require('./controller');

Fournisseurs = new Fournisseurs();

module.exports = function(app) {
  app.get('/api/Fournisseurs', function (req, res) {
    Fournisseurs.get(req, res);
  });
}
