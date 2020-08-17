const mongoose = require('mongoose')

const schema = mongoose.Schema({
  nom: String,
  isok: String,
  date: String,
  isdel: String
}, {timestamps: true})

module.exports = mongoose.model('tacos', schema)