const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interiorSchema = new Schema({
  nameRu: String,
  typeRu: String,
  yearRu: String,
  descriptionRu: String,
  nameEn: String,
  typeEn: String,
  yearEn: String,
  descriptionEn: String,
  previewUrl: String,
  picturesUrl: [{ type: String }]
});

module.exports = mongoose.model('Interiors', interiorSchema, 'interiors');