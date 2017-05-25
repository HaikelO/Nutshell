var Matiere = require('./controller');

Matiere = new Matiere();

module.exports = function(app) {
  app.get('/api/Matiere/:id', function (req, res){
    Matiere.get(req, res);
  });
  app.delete('/api/Matiere/:id', function (req, res){
    Matiere.delete(req, res);
  });
  app.post('/api/Matiere', function (req, res) {
    Matiere.post(req, res);
  });
}
