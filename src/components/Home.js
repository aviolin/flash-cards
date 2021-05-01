import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';

import ButtonLink from './ButtonLink';

const Home = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [buttons, setButtons] = useState(null);

  

  useEffect(() => {
    if (isFetched) return;
    fetch('http://localhost:5000/decks/info')
      .then(res => res.json())
      .then((res) => setButtons(res.map(deck => {
        return (
          <ButtonLink 
            key={deck.id}
            title={deck.title}
            to={"/deck/" + deck.id}
          />
        )
      })));
    setIsFetched(true);

  }, [isFetched])

  return (
    <section>
      <header>
        <h2>Welcome back, John!</h2>
      </header>
      <div className="button-list">
        { isFetched ? buttons : "Loading.........."}
        <ButtonLink 
          title="New Deck"
          to="/new"
          accent={true}
        />
      </div>
    </section>
  )
}

export default Home;