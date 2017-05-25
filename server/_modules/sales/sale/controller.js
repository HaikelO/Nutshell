var Vente = require('./../_models/vente');

module.exports = function VenteCtrl (){
    return {
        get : function (req , res) {
            Vente.findOne({_id : req.params.id}, function (err, obj) {
                res.json(obj);
            });
        },
        delete : function (req , res) {
            Vente.remove({_id : req.params.id}, function (err){
                if(err){
                    console.error("Can't Find.!! Error");
                }
                else {
                    res.sendStatus(200);
                }
            });
        },
        post : function (req , res) {
            
            if(req.body._id)
            {
                Vente.findByIdAndUpdate(req.body._id, {id : req.body.id, idClient : req.body.idClient, produits : req.body.produits}, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
            else{
                var prod = new Vente();
                prod.id = req.body.id;
                prod.idClient = req.body.idClient;
                prod.produits = req.body.produits;
                prod.save();
                res.sendStatus(200);
            }
        }
    }
}