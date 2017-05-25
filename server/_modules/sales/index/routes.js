var Ventes = require('./controller');

Ventes = new Ventes();

module.exports = function(app) {
  app.get('/api/Ventes', function (req, res) {
    Ventes.get(req, res);
  });
}
