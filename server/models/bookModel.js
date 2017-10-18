let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookModel = new Schema({
  title: String,
  author: String,
  genre: String,
  bestSeller: { type: Boolean, default: false }
})

module.exports = mongoose.model('book', bookModel)
