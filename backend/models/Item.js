const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Item', ItemSchema); 