import React, { useState, useEffect, useContext } from 'react';
import DeckCreator from './DeckCreator';
import DeckEditor from './new/DeckEditor';
import DeckList from './DeckList';
import Button from './Button';
import PageHeading from './new/PageHeading';
import Breadcrumb from './new/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Switch, Route } from 'react-router-dom';
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
        {/* <DeckEditor 
          deckToEdit={deckToEdit}
          setDeckToEdit={setDeckToEdit}
        /> */}
      </div>
    )
  }

  return (
    <div className="dashboard">
      <Switch>
        <Route path="/app/edit">
          <DeckEditor 
            selectedDecks={selectedDecks}
            setSelectedDecks={setSelectedDecks}
            cards={cards}
          />
        </Route>
        <Route path="/app/create">
          <Breadcrumb
            to="/app"
            name="Dashboard"
          />
          <PageHeading 
            title="New Deck!"
            subtitle="Create a new deck of flash cards. You can always come back and edit it at any time!"
          />
          <DeckCreator />
        </Route>
        <Route path="/app">
          <PageHeading 
            title="Dashboard."
            subtitle="Create and edit all your personal decks here."
          />
          <div>
            <Link 
              to="/app/create" 
              className="btn btn-tertiary highlighted"
            >
              Create a new deck
              <FontAwesomeIcon icon={faPlus} />
            </Link>
            <DeckList
              decks={decks}
              selectedDecks={selectedDecks}
              setSelectedDecks={setSelectedDecks}
              handleButtons={handleButtons}
              //setDeckToEdit={setDeckToEdit}
            />
          </div>
          <Button
            type="shuffle"
            classes="btn-primary"
            onClick={onClick}
            disabled={cards.length === 0 ? true : false}
            view={<><FontAwesomeIcon icon={faRandom} /> Shuffle!</>}
          />
        </Route>
      </Switch>
    </div>
  ) 
} 

export default Dashboard;