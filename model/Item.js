const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  startDateTime: {
    type: Date,
    default: Date.now()
  },
  expireDateTime: {
    type: Date,
    default: Date.now()
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Item = mongoose.model('items', ItemSchema);
