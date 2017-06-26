var Machinery = require('./controller');

Machinery = new Machinery();

module.exports = function(app) {
  app.get('/api/Machinery', function (req, res) {
    Machinery.get(req, res);
  });
}
