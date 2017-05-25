var Machine = require('./controller');

module.exports = function(app) {
  app.get('/api/Machine/:id', function (req, res){
    Machine.get(req, res);
  });
  app.delete('/api/Machine/:id', function (req, res){
    Machine.delete(req, res);
  });
  app.post('/api/Machine', function (req, res) {
    Machine.post(req, res);
  });
}
