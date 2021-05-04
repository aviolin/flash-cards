import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import ButtonLink from './ButtonLink';

const Sidebar = (props) => {
  const [buttons, setButtons] = useState(null);
  const [title, setTitle] = useState("");

  const form = useRef(null);

  useEffect(() => {
    console.log(props.cache);

    setButtons(props.cache.map(deck => {
        return (
          <ButtonLink 
            key={deck._id}
            title={deck.title}
            to={"/" + deck._id}
            category={deck.category}
            toggleDeck={props.toggleDeck}
            id={deck._id}
          />
        )
      }
    ))
  }, [props.cache])

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
        onClick={props.toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
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
    </div>
  )
}

export default Sidebar;