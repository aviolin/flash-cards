import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Deck from './components/Deck';
import Home from './components/Home';
import Nav from './components/Nav';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route path="/deck/:deckId">
            <Deck />
          </Route>
          <Route path="/deck">
            <Deck />
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
