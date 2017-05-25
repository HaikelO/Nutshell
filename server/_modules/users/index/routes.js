var Users = require('./controller');

Users = new Users();

module.exports = function(app) {
  app.get('/api/Users',function (req, res) {
    Users.get(req, res);
  });
}
