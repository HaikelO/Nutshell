var User = require('./../_models/user');

module.exports = function UserCtrl (req, res) {
    return {
        get : function(req, res) {
            User.findOne({_id : req.params.id}, function (err, obj) {
                res.json(obj);
            });
        },
        delete : function(req, res) {
            User.remove({_id : req.params.id}, function (err){
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
                User.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name, password : req.body.password, date : req.body.date, mail : req.body.mail}, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
            else{
                var obj = new User();
                obj.id = req.body.id;
                obj.name = req.body.name;
                obj.password = req.body.password;
                obj.date = req.body.date;
                obj.mail = req.body.mail;
                obj.save();
                res.sendStatus(200);
            }
        }
    }
}