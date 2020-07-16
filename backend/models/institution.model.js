const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const institutionSchema = new Schema({
    name: { type: String, required: true},
    city: { type: String, required: true},
    country: { type: String, required: true},
});

const Institution = mongoose.model('Institution', institutionSchema);
module.exports = Institution;
