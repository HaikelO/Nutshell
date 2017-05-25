var Achat = require('./controller');

Achat = new Achat();

module.exports = function(app) {
  app.get('/api/Achat/:id', function (req, res){
    Achat.get(req, res);
  });
  app.delete('/api/Achat/:id', function (req, res){
    Achat.delete(req, res);
  });
  app.post('/api/Achat', function (req, res) {
    Achat.post(req, res);
  });
}
