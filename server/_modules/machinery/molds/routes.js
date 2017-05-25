var Moules = require('./controller');

Moules = new Moules();

module.exports = function(app) {
  app.get('/api/Moules', function (req, res) {
    Moules.get(req, res);
  });
}
