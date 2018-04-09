var Categorie = require('./controller');
Categorie = new Categorie();

module.exports = function (app) {
    app.post('/api/categorie/add', function (req, res) {
        Categorie.handlePost(req, res);
    });
    app.get('/api/categorie/detail/:id', function (req, res) {
        Categorie.handleGet(req, res);
    });
    app.delete('/api/categorie/:id', function (req, res) {
        Categorie.handleDelete(req, res);
    });
}   