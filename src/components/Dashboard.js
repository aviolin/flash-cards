import React, { useState, useEffect, useContext } from 'react';
import DeckCreator from './DeckCreator';
import DeckEditor from './DeckEditor';
import DeckList from './DeckList';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

const Dashboard = ({
  onClick,
  decks,
  cards,
  selectedDecks,
  setSelectedDecks,
  handleButtons,
}) => {
  const [deckToEdit, setDeckToEdit] = useState(null);
  const { user } = useContext(firebaseAuth);
  const history = useHistory();

  if (!user) {
    return (
      <div className="dashboard">
        <p>You are not logged in. To view your dashboard, log in or sign up here:</p>
        <Link to="/">Home</Link>
      </div>
    )
  }

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
        disabled={cards.length === 0 ? true : false}
        view={<><FontAwesomeIcon icon={faRandom} /> Shuffle!</>}
      />
    </div>
  ) 
} 

export default Dashboard;