var Moule = require('./controller');

Moule = new Moule();

module.exports = function(app) {
  app.get('/api/Moule/:id', function (req, res){
    Moule.get(req, res);
  });
  app.delete('/api/Moule/:id', function (req, res){
    Moule.delete(req, res);
  });
  app.post('/api/Moule', function (req, res) {
    Moule.post(req, res);
  });
}
