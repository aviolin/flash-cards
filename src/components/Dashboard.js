import React, { useState, useEffect } from 'react';
import DeckCreator from './DeckCreator';
import DeckEditor from './DeckEditor';
import DeckList from './DeckList';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { authMethods } from '../firebase/authMethods';
import { useHistory } from 'react-router-dom';

const Dashboard = ({
  onClick,
  decks,
  selectedDecks,
  setSelectedDecks,
  handleButtons,
}) => {
  const [deckToEdit, setDeckToEdit] = useState(null);
  const history = useHistory();

  if (deckToEdit != null) {
    return (
      <div className="dashboard">
        <DeckEditor 
          deckToEdit={deckToEdit}
          setDeckToEdit={setDeckToEdit}
        />
      </div>
    )
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
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
        disabled={selectedDecks.length === 0 ? true : false}
        view={<><FontAwesomeIcon icon={faRandom} /> Shuffle!</>}
      />
    </div>
  ) 
} 

export default Dashboard;