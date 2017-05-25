// app/models/machine.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');


    var Schema = mongoose.Schema;
    var MachineSchema = new Schema({
      id : Number,
      name : String,
      type : String
    });

    // Mongoose Model definition
    module.exports = mongoose.model('Machine', MachineSchema);
