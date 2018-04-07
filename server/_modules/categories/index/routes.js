var Categories = require('./controller');
Categories = new Categories();

module.exports = function (app) {
    app.get('/api/categories', function (req, res) {
        Categories.handleGet(req, res);
    });
}