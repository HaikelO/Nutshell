var Users = require('./controller');

Users = new Users();

module.exports = function (app) {
  app.get('/api/users', function (req, res) {
    console.log("USERS");
    Users.handleGet(req, res);
  });
}