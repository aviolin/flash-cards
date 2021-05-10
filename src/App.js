import React, { useEffect, useState } from 'react';
import Container from './components/Container';
import Deck from './components/Deck';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import useFetch from './components/useFetch';

const App = () => {
  const { response } = useFetch('http://localhost:5000/decks');

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
        return decks.filter(ele => ele !== deck)
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
        setIsSidebarOpen(false);
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
        return;
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

  if (!cache) {
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
        <Sidebar
          isOpen={isSidebarOpen}
          cache={cache}
          onClick={handleButtons}
          updateCache={setCache}
          toggleDeck={toggleDeck}
          selectedDecks={selectedDecks}
          isAddingCard={isAddingCard}
          handleButtons={handleButtons}
          update={update}
        />
        <Container
          cache={cache}
          update={update}
          shuffledCards={shuffledCards}
          onClick={handleButtons}
          isAddingCard={isAddingCard}
          isShowingBack={isShowingBack}
          isEditing={isEditing}
          cardId={cardId}
          curDeckId={curDeckId}
          updateShuffled={updateShuffled}
        />
          {/* <Deck 
            cache={cache}
            update={update}
            shuffledCards={shuffledCards}
            onClick={handleButtons}
            isAddingCard={isAddingCard}
            isShowingBack={isShowingBack}
            isEditing={isEditing}
            cardId={cardId}
            curDeckId={curDeckId}
            updateShuffled={updateShuffled}
          /> */}
      </main>
      </div>
  )
}

export default App;
