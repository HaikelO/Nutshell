var Achats = require('./controller');

Achats = new Achats();

module.exports = function(app) {
  app.get('/api/Achats', function (req, res) {
    Achats.get(req, res);
  });
}
