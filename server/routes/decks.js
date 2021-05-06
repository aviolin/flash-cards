const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');
const ObjectId = require('mongodb').ObjectID;


// GET ALL DECK TITLES AND IDS
/* router.get('/info', async(req, res) => {
  try {
    const decks = await Deck.find();
    const deckTitles = decks.map(deck => {
      return {
        title: deck.title,
        category: deck.category,
        id: deck._id
      }
    })
    console.log(deckTitles);
    res.json(deckTitles);
  } catch (err) {
    res.json({ message: err });
  }
})
 */

// GET A DECK BY ID
router.get('/:deckId', async (req, res) => {
  console.log(req.params.deckId);
  try {
    const deck = await Deck.findById(req.params.deckId);
    res.json(deck);
  } catch (err) {
    res.json({ message: err });
  }
})


// GET ALL DECKS
router.get('/', async (req, res) => {
  console.log(req.body);
  console.log(new ObjectId());
  try {
    const decks = await Deck.find();
    res.json(decks);
  } catch (err) {
    res.json({ message: err });
  }
})


// CREATE A DECK
router.post('/', async (req, res) => {
  try {
    const deck = new Deck({
      title: req.body.title,
      category: req.body.category
    });
    const savedDeck = deck.save();
    const updatedData = await Deck.find();
    res.json({ response: savedDeck, data: updatedData });
  } catch (err) {
    res.json({ message: err });
  }
})


// ADD CARD TO DECK
router.patch('/:deckId/add', async (req, res) => {
  try {
    const query = { _id: req.params.deckId };
    const updateDocument = {
      $push: { 
        cards: {
          id: new ObjectId(),
          front: req.body.front,
          back: req.body.back,
          deckId: req.params.deckId
        } 
      }
    }
    const updatedDeck = await Deck.updateOne(query, updateDocument);
    const updatedData = await Deck.find();
    res.json({ response: updatedDeck, data: updatedData });
  } catch (err) {
    res.json({ message: err });
  }
})

// DELETE CARD FROM DECK
router.patch('/:deckId/delete/:cardId', async (req, res) => {
  try {
    const query = { _id: req.params.deckId }

    const updateDocument = {
      $pull: {
        'cards': { 'id': ObjectId(req.params.cardId) }
      }
    }
    const updatedDeck = await Deck.updateOne(query, updateDocument);
    const updatedData = await Deck.find();
    res.json({ response: updatedDeck, data: updatedData });
    console.log("Removed card: ", req.params.cardId);
  } catch (err) {
    res.json({ message: err });
  }
})


// UPDATE A CARD IN A DECK
router.patch('/:deckId/card/:cardId', async (req, res) => {
  try {
    const query = { _id: req.params.deckId, "cards.id": ObjectId(req.params.cardId) };
    const updateDocument = {
      $set: { "cards.$.front": req.body.front, "cards.$.back": req.body.back }
    }
    const updatedDeck = await Deck.updateOne(query, updateDocument);
    const updatedData = await Deck.find();
    res.json({ response: updatedDeck, data: updatedData });
    console.log("Updated deck with ID: ", req.params.deckId);
  } catch (err) {
    res.json({ message: err });
  }
})


// UPDATE A DECK
router.patch('/:deckId', async (req, res) => {
  try {
    const updatedDeck = await Deck.updateOne({ _id: req.params.deckId },
      { $set: { title: req.body.title, category: req.body.category } }
    )
    const updatedData = await Deck.find();
    res.json({ response: updatedDeck, data: updatedData });
  } catch (err) {
    res.json({ message: err });
  }
})


// DELETE DECK
router.delete('/:deckId', async (req, res) => {
  try {
    const deletedDeck = await Deck.deleteOne({ _id: req.params.deckId });
    const updatedData = await Deck.find();
    res.json({ response: deletedDeck, data: updatedData });
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;