var Repair = require('./../_models/repair');


module.exports = function (app) {
    return {
        get: get,
        handleGet: handleGet
    }
}

function get(callback) {
    return Repair.find({}, function (err, data) {
        if (err) {
            return callback({ 'ERROR': err });
        } else {
            return callback({ 'SUCCESS': data });
        }
    });
}
function handleGet(req, res) {
    get(function (repairs) {
        res.json(repairs);
    });
}