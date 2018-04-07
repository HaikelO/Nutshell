var bills = require('./controller');

bills = new bills();

module.exports = function(app) {
  app.get('/api/bills', function (req, res) {
    bills.get(req, res);
  });
  app.post('/api/bills', function (req, res){
    bills.post(req, res);
  });
}
