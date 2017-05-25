var Matiere = require('./../_models/matiere');

module.exports = function MatieresCtrl () {
    return {
        get : function (req, res) {
            Matiere.find({}, function (err, docs) {
              res.json(docs);
            });
        }
    }
}