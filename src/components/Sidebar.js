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
  handleButtons,
  update,
}) => {
  const [deckList, setDeckList] = useState(null);
  const [deckToEdit, setDeckToEdit] = useState(null);

  useEffect(() => {
    setDeckList(cache.map(deck => {
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
            setDeckToEdit={() => {
              setDeckToEdit({ id: deck._id, title: deck.title });
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
        <DeckCreator 
          createDeck={createDeckWrapper}
        />
        <DeckList>
          {deckList}
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