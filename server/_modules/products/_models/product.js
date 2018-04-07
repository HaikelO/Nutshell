// app/models/produit.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');


    var Schema = mongoose.Schema;
    var ProductSchema = new Schema({
      id : Number,
      title : String,
      qtt : Number,
      stock : [
                { qtt : Number, location : Number}
              ],
      nomenclature : {
                       produits : [{ id : Number , qtt : Number }],
                       matieres : [{ id : Number,  qtt : Number }]
                     },
      moule : [
                { id : Number}
              ],
      fournisseurs : [{ id : Number}]
    });

    // Mongoose Model definition
    module.exports = mongoose.model('Product', ProductSchema);
