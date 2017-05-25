var Fournisseur = require('./../_models/fournisseur');

module.exports = function FournisseursCtrl (){
    return {
        get : function(req, res) {
            Fournisseur.find({}, function (err, docs) {
             res.send(docs);
            });
        }
    }
}