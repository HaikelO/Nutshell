// app/models/personnel.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');


    var Schema = mongoose.Schema;
    var PersonnelSchema = new Schema({
      id : Number,
      name : String,
      birthday : Date,
      address : String,
      phone : Number,
      mail : String
    });

    // Mongoose Model definition
    module.exports = mongoose.model('Personnel', PersonnelSchema);
