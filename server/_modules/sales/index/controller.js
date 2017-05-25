var Vente = require('./../_models/vente');

module.exports = function VentesCtrl (){
    return {
        get : function (req , res) {
            Vente.find({}, function (err, docs) {
               res.send(docs);
            });
        }
    }
}