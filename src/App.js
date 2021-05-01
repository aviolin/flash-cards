import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Deck from './components/Deck';
import DeckEditor from './components/DeckEditor';
import Home from './components/Home';
import Nav from './components/Nav';

import useFetch from './components/useFetch';

const App = () => {
  const { response, error, loading, cache } = useFetch('http://localhost:5000/decks');

  if (!cache) {
    return (
      <Router>
        <div className="app">
          Loading...
        </div>
      </Router>
    )
  }

  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route path="/deck/:deckId/update">
            <DeckEditor />
          </Route>
          <Route path="/deck/:deckId">
            <Deck />
          </Route>
          <Route path="/deck">
            <Deck />
          </Route>
          <Route path="/new">
            <DeckEditor />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
