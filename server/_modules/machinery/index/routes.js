var Machines = require('./controller');

Machines = new Machines();

module.exports = function(app) {
  app.get('/api/Machines', function (req, res) {
    Machines.get(req, res);
  });
}
