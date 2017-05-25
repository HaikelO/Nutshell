var Produit = require ('./../_models/produit');

module.exports = function ProduitCtrl () {
    return {
        get : function (req, res) {
            Produit.findOne({_id : req.params.id}, function (err, obj) {
               res.json(obj);
            });
        },
        delete : function (req, res) {
            Produit.remove({_id : req.params.id}, function (err){
                if(err){
                    console.error("Can't Find.!! Error");
                }
                else {
                    res.sendStatus(200);
                }
            });
        },
        post : function (req, res) {
            
            if(req.body._id)
            {
                Produit.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name, qtt : req.body.qtt,  nomenclature : req.body.nomenclature, stock : req.body.stock}, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
            else{
                var prod = new Produit();
                prod.id = req.body.id;
                prod.name = req.body.name;
                prod.qtt = req.body.qtt;
                prod.nomenclature = req.body.nomenclature;
                prod.stock = req.body.stock;
                prod.save();
                res.sendStatus(200);
                console.log(req.body);
            }
        }
    }
}