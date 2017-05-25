var Annonce = require('./controller');

Annonce = new Annonce();

module.exports = function(app) {
  app.get('/api/Annonce', function (req, res){
    Annonce.post(req, res);
  });
};