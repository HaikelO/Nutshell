var Moule = require ('./../_models/moule');

module.exports = function MouleCtrl () {
    return {
        get : function (req, res) {
            Moule.findOne({_id : req.params.id}, function (err, obj) {
                res.json(obj);
            });
        },
        delete : function (req, res) {
            Moule.remove({_id : req.params.id}, function (err){
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
            Moule.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name, qtt : req.body.qtt, type : req.body.type, empreinte : req.body.empreinte, nombre_utilisation : req.body.nombre_utilisation, poid : req.body.poid, etat : req.body.etat, description : req.body.description, fabricant : req.body.fabricant, Machinery : req.body.Machinery}, function (err, tank) {
                if (err) return handleError(err);
                res.send(tank);
                console.log("update");
                });
            }
            else{
                var obj = new Moule();
                obj.id = req.body.id;
                obj.name = req.body.name;
                obj.type = req.body.type;
                obj.empreinte = req.body.empreinte;
                obj.nombre_utilisation = req.body.nombre_utilisation;
                obj.poid = req.body.poid;
                obj.etat = req.body.etat;
                obj.description = req.body.description;
                obj.fabricant = req.body.fabricant;
                obj.Machinery = req.body.Machinery;
                obj.save();
                res.sendStatus(200);
            }
        }
    }
}