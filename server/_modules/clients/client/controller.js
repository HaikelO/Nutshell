var Client = require('./../_models/client');

module.exports = function ClientCtrl (){
    return {
        get : function(req, res){
            Client.findOne({_id : req.params.id}, function (err, obj) {
                res.json(obj);
            });
        },
        delete : function(req, res) {
            Client.remove({_id : req.params.id}, function (err){
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
                Client.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name, contact: req.body.contact}, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
            else{
                var obj = new Client();
                obj.id = req.body.id;
                obj.name = req.body.name;
                obj.contact = req.body.contact;
                obj.save();
                res.sendStatus(200);
            }
        }
    } 
}