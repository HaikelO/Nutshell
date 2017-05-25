// app/models/user.js

  var mongoose = require ('mongoose');
  var Schema = mongoose.Schema ;
  var UserSchema = new Schema ({
    id : Number,
    name : String,
    mail : String,
    password : String,
    birthday : Date
  });
  // Mongoose Model definition
  module.exports = mongoose.model ('User' , UserSchema);
