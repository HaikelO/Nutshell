var Vente = require('./controller');

Vente = new Vente();


module.exports = function(app) {
  app.get('/api/Vente/:id', function (req, res){
    Vente.get(req, res);
  });
  app.delete('/api/Vente/:id', function (req, res){
    Vente.delete(req, res);
  });
  app.post('/api/Vente', function (req, res) {
    Vente.post(req, res);
  });
}
