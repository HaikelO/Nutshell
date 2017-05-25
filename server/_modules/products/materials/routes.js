var Matieres = require('./controller');

Matieres = new Matieres();

module.exports = function(app) {
  app.get('/api/Matieres', function (req, res) {
    Matieres.get(req, res);
  }); 
}
