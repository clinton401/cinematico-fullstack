
const mongoose = require('mongoose');
const FavoriteItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, { _id: false }); // Disable automatic _id field for subdocuments

module.exports = FavoriteItemSchema;
