var Achat = require('./../_models/achat');

module.exports = function AchatsCtrl () {
  return {
    get  : function (req, res) {
       Achat.find({}, function (err, docs) {
         res.json(docs);
      });
    }
  }   
}
  
 

