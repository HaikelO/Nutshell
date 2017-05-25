var Machine = require('./../_models/machine');

module.exports = function MachineCtrl (){
    return {
        get : function (req, res) {
            Machine.findOne({_id : req.params.id}, function (err, obj) {
              res.json(obj);
            });
        },
        delete : function (req, res) {
            Machine.remove({_id : req.params.id}, function (err){
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
                Machine.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name}, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
            else{
                var prod = new Machine();
                prod.id = req.body.id;
                prod.name = req.body.name;
                prod.save();
                res.sendStatus(200);
            }
        }
    }
}