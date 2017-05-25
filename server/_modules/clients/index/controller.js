var Client = require('./../_models/client');

module.exports = function ClientsCtrl() {
    return {
        get : function (req, res){
            Client.find({}, function (err, docs) {
                res.send(docs);
            });
        }
    }
}