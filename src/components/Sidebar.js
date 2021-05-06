import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faChevronRight, faBolt } from '@fortawesome/free-solid-svg-icons';

import SelectableDeck from './SelectableDeck';

const Sidebar = (props) => {
  const [buttons, setButtons] = useState(null);
  const [title, setTitle] = useState("");

  const form = useRef(null);

  useEffect(() => {
    setButtons(props.cache.map(deck => {
        return (
          <SelectableDeck 
            key={deck._id}
            title={deck.title}
            toggleDeck={props.toggleDeck}
            id={deck._id}
            selectedDecks={props.selectedDecks}
            handleButtons={props.handleButtons}
            length={deck.cards.length}
          />
        )
      }
    ))
  }, [props.cache, props.selectedDecks])

  const createDeck = async event => {
    event.preventDefault();

    const method = 'POST';
    const URI = 'http://localhost:5000/decks/';
    if (form.current.deckId) {
      method = 'PATCH';
      URI += form.current.deckId;
    }

    const json = JSON.stringify(Object.fromEntries(new FormData(form.current)));
    const response = await fetch(URI, {
      method: method,
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res = await response.json();

    props.updateCache(res.data);
  }

  return (
    <div className={props.isOpen ? "sidebar open" : "sidebar"}>
      
      {/* <Header title="Welcome back, John!" /> */}
      <button 
        className="btn-sidebar"
        name="toggle-sidebar"
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
      <Link to="/" className="logo">Flash <FontAwesomeIcon icon={faBolt} /> Cards</Link>
      <form 
        ref={form}
        id="new-deck" 
        onSubmit={createDeck}
      >
        <label htmlFor="title">Create a new deck:</label>
        <div>
          <input 
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="New Deck TItle"
            autoComplete="off"
          />
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
      <label>My decks:</label>
      <ul className="button-list">
        {buttons}
      </ul>
      <button
        className="btn-primary"
        name="shuffle"
        onClick={props.onClick}
      >
        Shuffle!&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Sidebar;