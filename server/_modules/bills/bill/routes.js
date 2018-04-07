var bills = require('./controller');

bills = new bills();

module.exports = function (app) {
    app.get('/api/bill/:id', function (req, res) {
        bills.get(req, res);
    });
    app.post('/api/bill', function (req, res) {
        bills.post(req, res);
    });
}
