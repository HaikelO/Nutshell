var Clients = require('./controller');

Clients = new Clients();

module.exports = function(app) {
  app.get('/api/Clients', function (req, res) {
    Clients.get(req, res);
  });
}
