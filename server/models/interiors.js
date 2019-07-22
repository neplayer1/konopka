const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interiorSchema = new Schema({
  name: String,
  type: String,
  year: Number,
  description: String
});

module.exports = mongoose.model('Interiors', interiorSchema, 'interiors');