//app/models/vente.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');
    var Schema =  mongoose.Schema;

    var VenteSchema = new Schema({
      id : Number,
      idClient : Number,
      produits : [{id : Number, qtt : Number, prix : Number}]
    });

    // Mongoose Model definition
    module.exports = mongoose.model('Vente', VenteSchema);
