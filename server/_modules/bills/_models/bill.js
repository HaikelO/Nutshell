var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BillSchema = new Schema({
  id: Number,
  name: String,
  date: Date
});

// Mongoose Model definition
module.exports = mongoose.model('Bill', BillSchema);
