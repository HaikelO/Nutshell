var bill = require('./../_models/bill');

module.exports = function BillsCtrl() {
    return {
        get: function (req, res) {
            bill.findById(req.body._id, function (err, docs) {
                res.json(docs);
            });
        },
        post: function (req, res) {
            var obj = new bill(req.body);
            obj.save();
            res.sendStatus(200);
        },
        update: function (req, res) {
            if (req.body._id) {
                bill.findByIdAndUpdate(req.body._id, { id: req.body.id, name: req.body.name }, function (err, tank) {
                    if (err) return handleError(err);
                    res.send(tank);
                    console.log("update");
                });
            }
        }
    }
}