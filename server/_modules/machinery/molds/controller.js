var Moule = require ('./../_models/moule');

module.exports = function MouleCtrl () {
    return {
        get : function (req, res) {
            Moule.find({}, function (err, docs) {
               res.send(docs);
            });
        }
    }
}