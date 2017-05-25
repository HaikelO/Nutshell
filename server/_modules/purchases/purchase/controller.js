var Achat = require('./../_models/achat');

module.exports = function AchatCtrl () {
  return {
    get  : function (req, res) {
        Achat.findOne({_id : req.params.id}, function (err, obj) {
            res.json(obj);
            console.log(obj);
        });
    },
    delete : function (req, res) {
        Achat.remove({_id : req.params.id}, function (err){
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
            Achat.findByIdAndUpdate(req.body._id, {id : req.body.id, ref : req.body.ref, idFournisseur : req.body.idFournisseur, idProduit : req.body.idProduit, idMatiere : req.body.idMatiere, qtt : req.body.qtt, type : req.body.type, prix : req.body.prix, etat : req.body.etat }, function (err, tank) {
                if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
        else{
            var obj = new Achat();
            obj.id = req.body.id;
            obj.ref = req.body.ref;
            obj.idFournisseur = req.body.idFournisseur;
            obj.idProduit = req.body.idProduit;
            obj.idMatiere = req.body.idMatiere;
            obj.qtt = req.body.qtt;
            obj.type = req.body.type;
            obj.prix = req.body.prix;
            obj.etat = req.body.etat;
            obj.save();
            res.sendStatus(200);
        }
    }
  }   
}
  
