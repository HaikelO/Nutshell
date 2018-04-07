var Repairs = require('./controller');
Repairs = new Repairs();

module.exports = function (app) {
    app.get('/api/repairs', function (req, res) {
        Repairs.handleGet(req, res);
    });
}