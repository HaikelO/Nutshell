var User = require('./controller');
User = new User();

module.exports = function (app) {
  app.post('/api/user/add', function (req, res) {
    User.handlePost(req, res);
  });
  app.get('/api/user/detail/:id', function (req, res) {
    User.handleGet(req, res);
  });
  app.delete('/api/user/:id', function (req, res) {
    User.handleDelete(req, res);
  });
}   