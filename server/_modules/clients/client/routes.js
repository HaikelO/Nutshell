var Client = require('./controller');

Client = new Client();

module.exports = function (app) {
  app.post('/api/client/add', function (req, res) {
    Client.handlePost(req, res);
  });
  app.get('/api/client/detail/:id', function (req, res) {
    Client.handleGet(req, res);
  });
  app.delete('/api/client/:id', function (req, res) {
    Client.handleDelete(req, res);
  });
}   