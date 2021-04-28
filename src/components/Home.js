import React, { useState, useEffect } from 'react';

import DeckThumbnail from './DeckThumbnail';

const Home = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [deckElements, setDeckElements] = useState(null);


  useEffect(() => {
    if (isFetched) return;
    fetch('http://localhost:5000/decks/info')
      .then(res => res.json())
      .then((res) => setDeckElements(res.map(deck => {
        return (
          <DeckThumbnail 
            title={deck.title}
            id={deck.id}
          />
        )
      })));
    setIsFetched(true);

  }, [isFetched])

  return (
    <section>{deckElements}</section>
  )
}

export default Home;