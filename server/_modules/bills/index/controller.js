var bill = require('./../_models/bill');

module.exports = function BillsCtrl() {
    return {
        get: function (req, res) {
            bill.find({}, function (err, docs) {
                res.json(docs);
            });
        }
    }
}