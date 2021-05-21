import React, { useContext, useEffect, useState } from 'react';

import { firebaseAuth } from './provider/AuthProvider';
import useOnUserSnapshot from './hooks/useOnUserSnapshot';
import useGetShuffledCards from './hooks/useGetShuffledCards';

import Container from './components/Container';
import Deck from './components/Deck';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import Nav from './components/Nav';
import Signup from './components/Signup';
import MobileMenu from './components/MobileMenu';

import { Route, Switch, useHistory } from 'react-router-dom';

function fisherYatesShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = Object.assign({}, array[currentIndex]);
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const App = () => {
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [curSelectedDeck, setCurSelectedDeck] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  const [isEditingCard, setIsEditingCard] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const history = useHistory();
  const { user } = useContext(firebaseAuth);
  const { userData, decks } = useOnUserSnapshot(user);
  const { cards } = useGetShuffledCards(user, selectedDecks);

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
        history.push("/app/shuffle");
        return;
      case "cancel":
        setIsEditingCard(false);

        if (isAddingCard) {
          setIsAddingCard(false);
          history.push("/app");
        }
        return;

      case "edit":
        setIsEditingCard(true);
        return;

      case "exit":
        setShuffledCards([]);

        if (user) {
          history.push("/app");
          return;
        }
        history.push("/");
        return;
      
      case "shuffle":
        if (selectedDecks.length === 0) return;
        const randomized_cards = fisherYatesShuffle(cards);
        setShuffledCards(randomized_cards);

        history.push("/app/shuffle");
        return;
      
      case "toggle-menu":
        setIsMenuOpen(prev => !prev);
        return;

      case "update-card":
        setIsEditingCard(false);
        if (isAddingCard) {
          setIsAddingCard(false);
          history.push("/app");
        }
        return;

      case "delete-card":
        setIsEditingCard(false);
        return;

      default:
        return;
    }
  }

  return (
    <div className="app">
      <Nav onClick={handleButtons}/>
      <MobileMenu 
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      />
      <main>
        <Container>
          <Switch>
            <Route path="/log-in">
              <Login />
            </Route>
            <Route path="/sign-up">
              <Signup />
            </Route>
            <Route path="/my-account">
              <MyAccount />
            </Route>
            <Route path="/app/shuffle">
              <Deck 
                shuffledCards={shuffledCards}
                onClick={handleButtons}
                isAddingCard={isAddingCard}
                isEditingCard={isEditingCard}
                curSelectedDeck={curSelectedDeck}
              />
            </Route>
            <Route path="/app/:hash">
             <Deck 
                shuffledCards={shuffledCards}
                onClick={handleButtons}
                isAddingCard={isAddingCard}
                isEditingCard={isEditingCard}
                curSelectedDeck={curSelectedDeck}
              />
            </Route>
            <Route path="/app">
              <Dashboard 
                onClick={handleButtons}
                decks={decks}
                selectedDecks={selectedDecks}
                setSelectedDecks={setSelectedDecks}
                handleButtons={handleButtons}
              />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Container>
      </main>
    </div>
  )
}

export default App;