// app/models/matiere.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');


    var Schema = mongoose.Schema;
    var MatiereSchema = new Schema({
      id : Number,
      name : String,
      qtt : Number,
      fournisseurs : [{ id : Number }],
      entrepot : [{ id : Number, qtt : Number }]
    });

    // Mongoose Model definition
    module.exports = mongoose.model('Martiere', MatiereSchema);
