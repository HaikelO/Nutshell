var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorietSchema = new Schema({
    title: String
});

module.exports = mongoose.model('Categorie', CategorietSchema);
