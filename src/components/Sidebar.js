import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

import SelectableDeck from './SelectableDeck';
import DeckCreator from './DeckCreator';
import DeckEditor from './DeckEditor';
import DeckList from './DeckList';
import Button from './Button';

import APIClass from '../API';
const API = new APIClass();

const Sidebar = ({
  isOpen,
  cache,
  onClick,
  updateCache,
  toggleDeck,
  selectedDecks,
  isAddingCard,
  handleButtons,
  update,
}) => {
  const [buttons, setButtons] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    setButtons(cache.map(deck => {
        return (
          <SelectableDeck 
            key={deck._id}
            title={deck.title}
            toggleDeck={toggleDeck}
            id={deck._id}
            selectedDecks={selectedDecks}
            handleButtons={handleButtons}
            length={deck.cards.length}
            update={update}
            setIsEditing={() => {
              setIsEditing(deck._id);
            }}
          />
        )
      }
    ))
  }, [cache, selectedDecks, handleButtons, toggleDeck, update])

  const createDeckWrapper = async (event) => {
    event.preventDefault();
    const res = await API.createDeck(event);
    updateCache(res.data);
  }

  const deleteDeckWrapper = async (event) => {
    const res = await API.deleteDeck(event, isEditing);
    update(res.data)
    setIsEditing(null);
  }

  const updateDeckWrapper = async (event) => {
    const res = await API.updateDeck(event, isEditing, event.target.form.title.value);
    update(res.data)
    setIsEditing(null);
  }

  if (isEditing != null) {
    return (
      <div className={isOpen ? "sidebar open" : "sidebar"}>
        <DeckEditor 
          updateDeck={updateDeckWrapper}
          deleteDeck={deleteDeckWrapper}
          setIsEditing={setIsEditing}
        />
      </div>
    )
  }

  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      <div>
        <DeckCreator 
          createDeck={createDeckWrapper}
        />
        <DeckList>
          {buttons}
        </DeckList>
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