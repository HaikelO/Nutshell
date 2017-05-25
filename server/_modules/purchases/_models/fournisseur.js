// app/models/fournisseur.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var FournisseurSchema = new Schema({
      id : Number,
      name : String,
      contact : [{adresse : String, name : String, phone : Number, mail : String}]
    });

    // Mongoose Model definition
    module.exports = mongoose.model('Fournisseur', FournisseurSchema);
