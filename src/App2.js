import React, { useContext, useEffect, useState } from 'react';
import { firebaseAuth } from './provider/AuthProvider';
import useOnUserSnapshot from './hooks/useOnUserSnapshot';
import useGetShuffledCards from './hooks/useGetShuffledCards';
import { dbMethods } from './firebase/dbMethods';

import Container from './components/Container';
import Deck from './components/Deck';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';

const App2 = () => {
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [curSelectedDeck, setCurSelectedDeck] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [shuffledCards, setShuffledCards] = useState([]);

  const [isEditingCard, setIsEditingCard] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const { user } = useContext(firebaseAuth);
  const { userData, decks } = useOnUserSnapshot(user);
  const { cards } = useGetShuffledCards(user, selectedDecks);

  const test = e => {
    dbMethods.createDeck(user, "New");
    //dbMethods.deleteDeck(user, "BfAS4hAMTWJcLkUbJ5ni");
    //dbMethods.updateDeck(user, "fhh7LgsSTSqhxBhuGof2", "here");
  }

  // not ideal :(
  useEffect(() => {
    // Manually updated the 'shuffledCards' array whenever 'cards'
    // is updated via onSnapshot in firestore.
    let _cards = [];
    shuffledCards.forEach(card => {
      cards.forEach((updatedCard) => {
        if (updatedCard.id == card.id) {
          _cards.push(Object.assign({}, updatedCard)); 
        }
      })
    })

    setShuffledCards(_cards);
  }, [cards])

  const handleButtons = (event) => {
    console.log("Button clicked: ", event.target.name);

    switch (event.target.name) {
      case "add-card":
        setCurSelectedDeck(event.target.value);
        setIsAddingCard(true);
        //setIsShowingBack(false);
        setIsSidebarOpen(false);
        return;
      case "cancel":
        setIsEditingCard(false);

        if (isAddingCard) {
          setIsSidebarOpen(true);
          setIsAddingCard(false);
        }
        return;

      case "edit":
        setIsEditingCard(true);
        return;

      case "exit":
        setShuffledCards([]);
        setIsSidebarOpen(true);
        return;
      
      case "shuffle":
        if (selectedDecks.length === 0) return;
        // randomize cards
        setShuffledCards(cards);
        setIsSidebarOpen(false);
        return;
      
      case "toggle-sidebar":
        setIsSidebarOpen(prev => !prev);
        return;
      
      default:
        return;
    }
  }

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div className="app">
      <Nav onClick={handleButtons}/>
      {/* <button onClick={test}>Test</button> */}
      <main>
        <Sidebar
          isOpen={isSidebarOpen}
          onClick={handleButtons}
          decks={decks}
          selectedDecks={selectedDecks}
          setSelectedDecks={setSelectedDecks}
          isAddingCard={isAddingCard}
          handleButtons={handleButtons}
        />
        <Container>
          <Deck 
            shuffledCards={shuffledCards}
            onClick={handleButtons}
            isAddingCard={isAddingCard}
            isEditingCard={isEditingCard}
            curSelectedDeck={curSelectedDeck}
          />
        </Container>
      </main>
    </div>
  )
}

export default App2;