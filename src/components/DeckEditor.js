import React, { useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const DeckEditor = (props) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('music');
  const form = useRef(null);
  const history = useHistory();
  const { deckId } = useParams();

  const handleInput = (event) => {
    if (event.target.name == "title") {
      setTitle(event.target.value);
      return;
    }
    console.log(event.target.value);
    setCategory(event.target.value);
  }


  const createDeck = async event => {
    event.preventDefault();

    const method = 'POST';
    const URI = 'http://localhost:5000/decks/';
    if (deckId) {
      method = 'PATCH';
      URI += deckId;
    }

    const json = JSON.stringify(Object.fromEntries(new FormData(form.current)));
    const res = await fetch(URI, {
      method: method,
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    history.push('/');
  }

  return (
    <section>
      <header>
        <h2>Create a New Deck</h2>
      </header>
      <form ref={form} onSubmit={createDeck} className="form-deck">
        <label htmlFor='title'>Name your deck:</label>
        <input 
          autoComplete="off"
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={handleInput}
          placeholder="My First Deck"
        />
        <label htmlFor='category'>Select a category:</label>
        <div className="categories">
          <div>
            <input
              type="radio" 
              id="music" 
              name="category" 
              value="music" 
              checked={category === "music"}
              onChange={handleInput}
            />
            <label htmlFor="music" onClick={handleInput}>
              <span>
                <FontAwesomeIcon icon={faMusic} />
              </span>
            </label>
          </div>
          <div>
            <input
              type="radio" 
              id="math" 
              name="category" 
              value="math" 
              checked={category === "math"}
              onChange={handleInput}
            />
            <label htmlFor="math" onClick={handleInput}>
              <span>
                <FontAwesomeIcon icon={faCalculator} />
              </span>
            </label>
          </div>
          <div>
            <input
              type="radio" 
              id="cats" 
              name="category" 
              value="cats" 
              checked={category === "cats"}
              onChange={handleInput}
            />
            <label htmlFor="cats" onClick={handleInput}>
              <span>
                <FontAwesomeIcon icon={faCat} />
              </span>
            </label>
          </div>
          <div>
            <input
              type="radio" 
              id="code" 
              name="category" 
              value="code" 
              checked={category === "code"}
              onChange={handleInput}
            />
            <label htmlFor="code" onClick={handleInput}>
              <span>
                <FontAwesomeIcon icon={faCode} />
              </span>
            </label>
          </div>
        </div>
        <button>Create!</button>
      </form>
      
    </section>
  )
}

export default DeckEditor;