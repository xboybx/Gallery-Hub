const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  width: Number,
  height: Number,
  url: String,
  download_url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Favourite', favouriteSchema);
