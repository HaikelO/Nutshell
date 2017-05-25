var Machine = require('./../_models/machine');

module.exports = function MachinesCtrl (){
    return {
        get : function (req, res){
            Machine.find({}, function (err, docs) {
                res.send(docs);
            });
        }
    }
}