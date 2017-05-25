var Produit = require ('./../_models/produit');

module.exports = function ProduitsCtrl () {
    return {
        get : function (req, res) {
            Produit.find({}, function (err, docs) {
                res.json(docs);
            });
        }
    }
}