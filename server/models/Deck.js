const mongoose = require('mongoose');

const DeckSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  cards: [],
})

module.exports = mongoose.model('Decks', DeckSchema);