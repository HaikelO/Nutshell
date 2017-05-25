var User = require('./../_models/user');

module.exports = function UsersCtrl (req, res) {
    return {
        get : function (req, res) {
            User.find({}, function (err, docs) {
                res.send(docs);
            });
        }
    }
}