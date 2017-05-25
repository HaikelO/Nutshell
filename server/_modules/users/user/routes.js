var User = require('./controller');

User = new User();

module.exports = function(app) {
  app.get('/api/User/:id', function (req, res){
    User.get(req, res);
  });
  app.delete('/api/User/:id', function (req, res){
    User.delete(req, res);
  });
  app.post('/api/User', function (req, res) {
    User.post(req, res);
  });
}
