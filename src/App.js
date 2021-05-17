import React, { useEffect, useState, useContext } from 'react';
import Container from './components/Container';
import Deck from './components/Deck';
import Loader from './components/Loader';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';

import Test from './components/Test';
import useOnSnapshot from './hooks/useOnSnapshot';
import { firebaseAuth } from './provider/AuthProvider';

const App = () => {
  const { user } = useContext(firebaseAuth);
  const { data: cache } = useOnSnapshot('users', user.uid);
  const { data: deckData } = useOnSnapshot('decks');
  const [userdecks, setUserDecks] = useState([]);

  const [curDeckId, setCurDeckId] = useState(null);
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShowingBack, setIsShowingBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const toggleDeck = (event, deck) => {
    setSelectedDecks(decks => {
      if (decks.includes(deck)) {
        return decks.filter(ele => ele !== deck)
      } else {
        return [...decks, deck];
      }
    })
  }

  const handleButtons = (event) => {
    console.log(event.target.name)
    switch (event.target.name) {
      case "edit":
        setIsEditing(true);
        return;
      case "cancel":
        setIsEditing(false);

        if (isAddingCard) {
          setIsSidebarOpen(true);
          setIsAddingCard(false);
        }
        return;
      case "toggle":
        setIsShowingBack(!isShowingBack);
        return;
      case "add-card":
        setCurDeckId(event.target.value);
        setIsAddingCard(true);
        setIsShowingBack(false);
        setIsSidebarOpen(false);
        return;
      case "shuffle":
        let decks = cache.filter(deck => selectedDecks.includes(deck._id) )
        let cards = [];
        decks.forEach(deck => cards = [...cards, ...deck.cards])
        setShuffledCards(cards);
        setIsSidebarOpen(false);
        return;
      case "toggle-sidebar":
        setIsSidebarOpen(!isSidebarOpen);
        return;
      case "exit":
        setShuffledCards([]);
        setIsSidebarOpen(true);
        return;
      default: 
        return;
    }
  }

  const update = (data = null) => {
    console.log("UPDATE");
    if (data) {
      //setCache(data);
      setIsEditing(false);
      setIsAddingCard(false);
    }
  }

  const updateShuffled = (newCard, del=false) => {
    if (del) {
      setShuffledCards(cards => {
        return cards.filter(card => card.id !== newCard.id);
      })
      return;
    }
    setShuffledCards(cards => {
      return cards.map(card => {
        if (card.id === newCard.id) return newCard;
        else return card;
      })
    })
  }

  const slideCallback = (index) => {
    setIsShowingBack(false);
  }

  if (!cache) {
    console.log(cache);
    return (
      <div className="app">
        <Nav />
        <Loader />
      </div>
    )
  }

  return (
    <div className="app">
      <Nav onClick={handleButtons}/>
      <main>
        {/* <Sidebar
          isOpen={isSidebarOpen}
          cache={cache}
          onClick={handleButtons}
          updateCache={setCache}
          toggleDeck={toggleDeck}
          selectedDecks={selectedDecks}
          isAddingCard={isAddingCard}
          handleButtons={handleButtons}
          update={update}
        /> */}
        <Container>
          {/* <Test /> */}
          {/* <Signup 
          
          /> */}
          {/* <Deck 
            cache={cache}
            update={update}
            shuffledCards={shuffledCards}
            onClick={handleButtons}
            isAddingCard={isAddingCard}
            isShowingBack={isShowingBack}
            isEditing={isEditing}
            curDeckId={curDeckId}
            updateShuffled={updateShuffled}
            slideCallback={slideCallback}
          /> */}
        </Container>
      </main>
    </div>
  )
}

export default App;
