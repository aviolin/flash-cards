const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');

router.get('/', async (req, res) => {
  console.log(req.body);
  const deck = new Deck({
    cards: [
      {
        id: 0,
        front: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, distinctio odio natus quis sapiente ullam unde fuga ipsam rem quibusdam exercitationem, optio officiis esse nobis sequi perferendis dolor corrupti dolore asperiores laborum! Pariatur, ipsa dicta error repellendus ad molestiae laboriosam aspernatur architecto vero nulla sed hic repellat iste cupiditate aperiam odit corporis, illo magnam, voluptatum fuga. Autem dolores obcaecati consequatur!",
        back: "Itatum fuga. Autem dolores obcaecati consequatur! Quae, distinctio odio natus quis sapiente ullam unde fuga ipsam rem quibusdam exercitationem, optio officiis esse nobis sequi perferendis dolor corrupti dolore asperiores laborum! Pariatur, ipsa dicta error repellendus ad molestiae laboriosam aspernatur architecto vero nulla sed hic repellat iste cupiditate aperiam odit corporis, illo magnam, voluptatum fuga. Autem dolores obcaecati consequatur! Quae, distinctio odio natus quis sapiente ullam unde fuga ipsam rem quibusdam exercitationem, optio officiis esse nobis sequi perferendis dolor corrupti dolore asperiores laborum! Pariatur, ipsa dicta error repellendus ad molestiae laboriosam aspernatur architecto vero nulla sed hic repellat iste cupiditate aperiam odit corporis, illo magnam, voluptatum fuga. Autem dolores obcaecati consequatur!",
      },
      {
        id: 1,
        front: "Testing njdfkjadthe front",
        back: "The baack!",
      },
      {
        id: 2,
        front: "Tasdfesting the front",
        back: "Thesdf back!",
      },
    ],
    title: "Historical Facts",
  });

  /* try {
    const savedDeck = await deck.save();
    res.json(savedDeck);
  } catch (err) {
    res.json({ message: err });
  } */
  try {
    const decks = await Deck.find();
    res.json(decks);
  } catch (err) {
    res.json({ message: err });
  }
  
  //res.send("Decks!");
})

router.get('/info', async(req, res) => {

  try {
    const decks = await Deck.find();

    const deckTitles = decks.map(deck => {
      return {
        title: deck.title,
        id: deck._id
      }
    })
    console.log(deckTitles);
    res.json(deckTitles);


  } catch (err) {
    console.log("here")
    res.json({ message: err });
  }

})

router.get('/:deckId', async (req, res) => {
  console.log(req.params.deckId);
  try {
    const deck = await Deck.findById(req.params.deckId);
    res.json(deck);
  } catch (err) {
    res.json({ message: err });
  }
})


router.patch('/:deckId', async (req, res) => {
  var index = req.body.cardId;
  var setValue = {};
  setValue['cards.' + index] = { 
    id: +req.body.cardId,
    front: req.body.front,
    back: req.body.back,
  }

  try {
    const updatedDeck = await Deck.updateOne({ _id: req.params.deckId },
      { $set: setValue }
    )
    console.log(updatedDeck);
    res.json(updatedDeck);
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;