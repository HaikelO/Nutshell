var Categorie = require('./../_models/categorie');


module.exports = function (app) {
    return {
        get: get,
        handleGet: handleGet
    }
}

function get(callback) {
    return Categorie.find({}, function (err, data) {
        if (err) {
            return callback({ 'ERROR': err });
        } else {
            return callback({ 'SUCCESS': data });
        }
    });
}
function handleGet(req, res) {
    get(function (categories) {
        res.json(categories);
    });
}