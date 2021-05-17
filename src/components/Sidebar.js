import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

import DeckCreator from './DeckCreator';
import DeckEditor from './DeckEditor';
import DeckList from './DeckList';
import Button from './Button';

import APIClass from '../API';
const API = new APIClass();

const Sidebar = ({
  isOpen,
  decks,
  onClick,
  selectedDecks,
  setSelectedDecks,
  handleButtons,
  update,
}) => {
  const [deckToEdit, setDeckToEdit] = useState(null);

  const deleteDeckWrapper = async (event) => {
    const res = await API.deleteDeck(event, deckToEdit.id);
    update(res.data)
    setDeckToEdit(null);
  }

  const updateDeckWrapper = async (event) => {
    const res = await API.updateDeck(event, deckToEdit.id, event.target.form.title.value);
    update(res.data)
    setDeckToEdit(null);
  }

  if (deckToEdit != null) {
    return (
      <div className={isOpen ? "sidebar open" : "sidebar"}>
        <DeckEditor 
          updateDeck={updateDeckWrapper}
          deleteDeck={deleteDeckWrapper}
          deckToEdit={deckToEdit}
          setDeckToEdit={setDeckToEdit}
        />
      </div>
    )
  }

  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      <div>
        <DeckCreator />
        <DeckList
          decks={decks}
          selectedDecks={selectedDecks}
          setSelectedDecks={setSelectedDecks}
          handleButtons={handleButtons}
          setDeckToEdit={setDeckToEdit}
        />
      </div>
      <Button
        type="shuffle"
        classes="btn-primary"
        onClick={onClick}
        view={<><FontAwesomeIcon icon={faRandom} /> Shuffle!</>}
      />
    </div>
  )
}

export default Sidebar;