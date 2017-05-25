// app/models/achat.js

  var mongoose = require ('mongoose');
  var Schema = mongoose.Schema ;
  var AchatSchema = new Schema ({
    id : Number,
    ref : Number,
    idFournisseur : Number,
    idProduit : Number,
    idMatiere : Number,
    qtt : Number,
    type : String,
    prix : Number,
    etat : Number
  });
  // Mongoose Model definition
  module.exports = mongoose.model ('Achat' , AchatSchema);
