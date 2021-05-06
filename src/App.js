import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Deck from './components/Deck';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';

import useFetch from './components/useFetch';

const App = () => {
  const { response, error, loading } = useFetch('http://localhost:5000/decks');

  const [curDeckId, setCurDeckId] = useState(null);
  const [cache, setCache] = useState(null);
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isShowingBack, setIsShowingBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardId, setCardId] = useState(0);


  useEffect(() => {
    if (!response) return;

    setCache(response);
  }, [response])

  const toggleDeck = (event, deck) => {
    setSelectedDecks(decks => {
      if (decks.includes(deck)) {
        return decks.filter(ele => ele != deck)
      } else {
        return [...decks, deck];
      }
    })
  }

  const handleButtons = (event) => {
    console.log(event.target.name)
    switch (event.target.name) {
      case "previous":
        setIsShowingBack(false);
        setCardId(cardId <= 0 ? shuffledCards.length - 1 : cardId - 1);
        return;
      case "next":
        setIsShowingBack(false);
        setCardId(cardId >= shuffledCards.length - 1 ? 0 : cardId + 1);
        return;
      case "edit":
        setIsEditing(true);
        return;
      case "cancel":
        setIsEditing(false);
        setIsAddingCard(false);
        return;
      case "toggle":
        setIsShowingBack(!isShowingBack);
        return;
      case "add-card":
        setCurDeckId(event.target.value);
        setIsAddingCard(true);
        return;
      case "shuffle":
        let decks = cache.filter(deck => selectedDecks.includes(deck._id) )
        let cards = [];
        decks.forEach(deck => cards = [...cards, ...deck.cards])
        setShuffledCards(cards);
        setCardId(0);
        setIsSidebarOpen(false);
        return;
      case "toggle-sidebar":
        setIsSidebarOpen(!isSidebarOpen);
        return;
      case "exit":
        setShuffledCards([]);
        setIsSidebarOpen(true);
      default: 
        return;
    }
  }

  const update = (data = null) => {
    if (data) 
      setCache(data);

    setCardId(0); // hacky
    setIsEditing(false);
    setIsAddingCard(false);
  }

  const updateShuffled = (newCard) => {
    setShuffledCards(cards => {
      return cards.map(card => {
        if (card.id == newCard.id) return newCard;
        else return card;
      })
    })
  }

  if (!cache) {
    return (
      <Router>
        <div className="app">
          <Nav />
          <Loader />
        </div>
      </Router>
    )
  }

  return (
    <Router>
      <div className="app">
        <Nav />
        <main>
          <Sidebar
            isOpen={isSidebarOpen}
            cache={cache}
            onClick={handleButtons}
            updateCache={setCache}
            toggleDeck={toggleDeck}
            selectedDecks={selectedDecks}
            isAddingCard={isAddingCard}
            handleButtons={handleButtons}
          />
          <Switch>
            <Route path="/:deckId?">
              <Deck 
                cache={cache}
                update={update}
                shuffledCards={shuffledCards}
                handleButtons={handleButtons}
                isAddingCard={isAddingCard}
                isShowingBack={isShowingBack}
                isEditing={isEditing}
                cardId={cardId}
                curDeckId={curDeckId}
                updateShuffled={updateShuffled}
              />
            </Route>
            <Route path="/">
              <section class="landing">
                <p>Select or create a deck to get started.</p>
              </section>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App;
