var Personnel = require('./../_models/personnel');

module.exports = function(app) {

  app.get('/api/Personnel', function (req, res) {
    Personnel.find({}, function (err, docs) {
      res.send(docs);
    });
  });
  app.get('/api/Employe/:id', function (req, res){
    Personnel.findOne({_id : req.params.id}, function (err, obj) {
      res.json(obj);
    });
  });
  app.delete('/api/Employe/:id', function (req, res){
    Personnel.remove({_id : req.params.id}, function (err){
      if(err){
        console.error("Can't Find.!! Error");
      }
      else {
        res.sendStatus(200);
      }
    });
  });
  app.post('/api/Personnel', function (req, res) {
    var obj = new Personnel();
    if(req.body._id)
    {
      Personnel.findByIdAndUpdate(req.body._id, {id : req.body.id, name : req.body.name, mail : req.body.mail, phone : req.body.phone, address : req.body.address, birthday : req.body.birthday }, function (err, tank) {
        if (err) return handleError(err);
        res.send(tank);
        console.log("update");
      });
    }
    else{
      obj.id = req.body.id;
      obj.name = req.body.name;
      obj.mail = req.body.mail;
      obj.phone = req.body.phone;
      obj.address = req.body.address;
      obj.birthday = req.body.birthday;
      obj.save();
      res.sendStatus(200);
    }
  });
}
