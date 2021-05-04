import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Deck from './components/Deck';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';

import useFetch from './components/useFetch';

const App = () => {
  const { response, error, loading } = useFetch('http://localhost:5000/decks');

  //const [curDeckId, setCurDeckId] = useState(null);
  const [cache, setCache] = useState(null);
  const [selectedDecks, setSelectedDecks] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!response) return;

    setCache(response);
  }, [response])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const toggleDeck = (deck) => {
    console.log("TOGGLE")
    if (selectedDecks.includes(deck)) {
      /* setSelectedDecks(decks => {
        console.log("?", selectedDecks);
        return decks.splice(decks.indexOf(deck), 1);
      }) */
    } else {
      setSelectedDecks(decks => [...decks, deck]);
    }
  }

  useEffect(() => {
    console.log("Decks: ", selectedDecks);
  }, [selectedDecks])

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
            updateCache={setCache}
            toggleSidebar={toggleSidebar}
            toggleDeck={toggleDeck}
          />
          <Switch>
            <Route path="/:deckId?">
              <Deck 
                cache={cache}
                updateCache={setCache}
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
