// app/models/moule.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');


    var Schema = mongoose.Schema;
    var MouleSchema = new Schema({
      id : Number,
      name : String,
      type : String,
      empreinte : Number,
      nombre_utilisation : Number,
      poid : Number,
      etat : String,
      description : String,
      fabricant : String,
      machines : [
                  { id : Number, name : String }
                ]
    });

    // Mongoose Model definition
    module.exports = mongoose.model('Moule', MouleSchema);
