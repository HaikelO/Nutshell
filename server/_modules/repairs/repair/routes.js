var Repair = require('./controller');
Repair = new Repair();

module.exports = function (app) {
    app.post('/api/repair/add', function (req, res) {
        console.log(req.body);
        Repair.handlePost(req, res);
    });
    app.get('/api/repair/:id', function (req, res) {
        console.log(req);
        Repair.handleGet(req, res);
    });
    app.delete('/api/repair/:id', function (req, res) {
        Repair.handleDelete(req, res);
    });
}   