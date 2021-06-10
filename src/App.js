import React, { useContext, useEffect, useState } from 'react';

import { firebaseAuth } from './provider/AuthProvider';
import useOnUserSnapshot from './hooks/useOnUserSnapshot';
import useGetShuffledCards from './hooks/useGetShuffledCards';

import Deck from './components/Deck';
import Dashboard from './components/Dashboard';
import Landing from './components/new/Landing';
import Login from './components/Login';
import Logout from './components/Logout';
import MyAccount from './components/MyAccount';
import Nav from './components/Nav';
import Signup from './components/Signup';
import MobileMenu from './components/MobileMenu';
import Test from './components/new/Test';
import ResetPassword from './components/new/ResetPassword';
import Footer from './components/new/Footer';

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
      case "cancel":
        setIsEditingCard(false);
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
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/log-in">
          <main>
            <Login />
            <Footer />
          </main>
          </Route>
          <Route path="/log-out">
          <main>
            <Logout />
          </main>
          </Route>
          <Route path="/sign-up">
          <main>
            <Signup />
            <Footer />
          </main>
          </Route>
          <Route path="/reset-password">
            <main>
              <ResetPassword />
              <Footer />
            </main>
          </Route>
          <Route path="/my-account">
          <main>
            <MyAccount />
            <Footer />
          </main>
          </Route>
          <Route path="/app/shuffle">
            <Deck 
              shuffledCards={shuffledCards}
              onClick={handleButtons}
              isEditingCard={isEditingCard}
              curSelectedDeck={curSelectedDeck}
            />
          </Route>
          <Route path="/app/d/:hash">
            <Deck 
              shuffledCards={shuffledCards}
              onClick={handleButtons}
              isEditingCard={isEditingCard}
              curSelectedDeck={curSelectedDeck}
            />
          </Route>
          <Route path="/app">
          <main>
            <Dashboard 
              onClick={handleButtons}
              decks={decks}
              cards={cards}
              selectedDecks={selectedDecks}
              setSelectedDecks={setSelectedDecks}
              handleButtons={handleButtons}
            />
            <Footer />
          </main>
          </Route>
          <Route path="/">
          <main>
            <Landing />
            <Footer />
          </main>
          </Route>
        </Switch>
    </div>
  )
}

export default App;