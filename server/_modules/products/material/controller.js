var Matiere = require('./../_models/matiere');

module.exports = function MatiereCtrl () {
    return {
        get : function (req, res) {
            Matiere.findOne({_id : req.params.id}, function (err, obj) {
               res.json(obj);
            });
        },
        delete : function (req, res) {
            Matiere.remove({_id : req.params.id}, function (err){
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
                Matiere.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name, qtt : req.body.qtt, fournisseurs : req.body.fournisseurs}, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
            else{
                var obj = new Matiere();
                obj.id = req.body.id;
                obj.name = req.body.name;
                obj.qtt = req.body.qtt;
                obj.fournisseurs = req.body.fournisseurs;
                obj.save();
                res.sendStatus(200);
            }
        }
    }
}