var Fournisseur = require('./../_models/fournisseur');

module.exports = function FournisseurCtrl (){
    return {
        get : function(req, res) {
            Fournisseur.findOne({_id : req.params.id}, function (err, obj) {
                res.json(obj);
            });
        },
        delete : function(req, res) {
            Fournisseur.remove({_id : req.params.id}, function (err){
                if(err){
                    console.error("Can't Find.!! Error");
                }
                else {
                    res.sendStatus(200);
                }
            });
        },
        post : function(req, res) {
            
            if(req.body._id)
            {
                Fournisseur.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name, contact : req.body.contact}, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
            else{
                var prod = new Fournisseur();
                prod.id = req.body.id;
                prod.name = req.body.name;
                prod.contact = req.body.contact;
                prod.save();
                res.sendStatus(200);
            }
        }
    }
}