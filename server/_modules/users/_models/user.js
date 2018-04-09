// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  id: Number,
  lastname: String,
  name: String,
  email: String,
  password: String,
  birthday: Date,
  phone: String,
  adress: String,
  zip: String,
  country: String,
  type: String,
  etat: Boolean
});
// Mongoose Model definition
module.exports = mongoose.model('User', UserSchema);
