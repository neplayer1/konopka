const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
  name: String,
  type: String,
  year: Number,
  description: String,
});

module.exports = mongoose.model('Furniture', furnitureSchema, 'furniture');