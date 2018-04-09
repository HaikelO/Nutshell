var Client = require('./../_models/client');

module.exports = function (app) {
    return {
        get: get,
        handleGet: handleGet
    }
}

function get(callback) {
    return Client.find({}, function (err, data) {
        if (err) {
            return callback({ 'ERROR': err });
        } else {
            return callback({ 'SUCCESS': data });
        }
    });
}
function handleGet(req, res) {
    get(function (clients) {
        res.json(clients);
    });
}