var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RepairSchema = new Schema({
    ref: String,
    title: String,
    client: String,
    etat: Boolean,
    date: Date,
    description: String,
    type: String,
    refproduit: String
});

module.exports = mongoose.model('Repair', RepairSchema);
