/**
 * Main wrapper for the app, containing the shuffle functionality
 * used by Deck and Dashboard components.
 */

import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { firebaseAuth } from './provider/AuthProvider';
import useOnDecksSnapshot from './hooks/useOnDecksSnapshot';
import useGetShuffledCards from './hooks/useGetShuffledCards';

import Deck from './components/decks-and-cards/Deck';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Login from './components/account-management/Login';
import Logout from './components/account-management/Logout';
import MyAccount from './components/account-management/MyAccount';
import Nav from './components/Nav';
import Signup from './components/account-management/Signup';
import MobileMenu from './components/MobileMenu';
import ResetPassword from './components/account-management/ResetPassword';
import Footer from './components/Footer';

const fisherYatesShuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = Object.assign({}, array[currentIndex]);
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const App = () => {
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  const history = useHistory();
  const { user } = useContext(firebaseAuth);
  const { decks } = useOnDecksSnapshot(user);
  const { cards } = useGetShuffledCards(user, selectedDecks);

   /* Update the 'shuffledCards' array whenever 'cards'
      is updated via onSnapshot in firestore. */
  useEffect(() => {
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
    switch (event.target.name) {
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
          />
        </Route>
        <Route path="/app/d/:hash">
          <Deck 
            shuffledCards={shuffledCards}
            onClick={handleButtons}
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
  );
}

export default App;