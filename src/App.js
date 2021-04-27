import React from 'react';

import Deck from './components/Deck';
import Nav from './components/Nav';

const App = () => {
  return (
    <div className="app">
      <Nav />
      <Deck />
    </div>
  );
}

export default App;
