var Client  = require('./controller');

Client = new Client();

module.exports = function(app) {
  app.get('/api/Client/:id', function (req, res){
    Client.get(req, res);
  });
  app.delete('/api/Client/:id', function (req, res){
    Client.delete(req, res);
  });
  app.post('/api/Client', function (req, res) {
    Client.post(req, res);
  });
}
