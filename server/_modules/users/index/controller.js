var User = require('./../_models/user');

module.exports = function (app) {
    return {
        get: get,
        handleGet: handleGet
    }
}

function get(callback) {
    return User.find({}, function (err, data) {
        if (err) {
            return callback({ 'ERROR': err });
        } else {
            return callback({ 'SUCCESS': data });
        }
    });
}
function handleGet(req, res) {
    get(function (user) {
        res.json(user);
    });
}