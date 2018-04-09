// app/models/client.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClientSchema = new Schema({
  id: Number,
  lastname: String,
  name: String,
  email: String,
  phone: String,
  adress: String,
  zip: String,
  country: String,
  type:String
});

// Mongoose Model definition
module.exports = mongoose.model('Client', ClientSchema);
