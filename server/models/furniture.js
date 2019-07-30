const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
  nameRu: String,
  typeRu: String,
  yearRu: String,
  descriptionRu: String,
  nameEn: String,
  typeEn: String,
  yearEn: String,
  descriptionEn: String,
});

module.exports = mongoose.model('Furniture', furnitureSchema, 'furniture');