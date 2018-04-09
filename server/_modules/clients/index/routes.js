var Clients = require('./controller');

Clients = new Clients();

module.exports = function (app) {
  app.get('/api/clients', function (req, res) {
    Clients.handleGet(req, res);
  });
}