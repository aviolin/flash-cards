/**
 * Displays the deck editor, and renders the card
 * editor accordion component.
 */

import React, { useState, useContext } from 'react';
import { firebaseAuth } from '../../provider/AuthProvider';
import { dbMethods } from '../../firebase/dbMethods';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/free-solid-svg-icons';

import Accordion from '../Accordion';
import Breadcrumb from '../Breadcrumb';
import CardCreator from './CardCreator';
import PageHeading from '../PageHeading';
import TextInput from '../TextInput';

const DeckEditor = ({
  selectedDecks,
  deckToEdit,
  setDeckToEdit,
  cards
}) => {
  const { user } = useContext(firebaseAuth);
  const history = useHistory();
  const [title, setTitle] = useState(deckToEdit.title);
  const [isPublic, setIsPublic] = useState(!deckToEdit.private);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const updateDeck = (event) => {
    event.preventDefault();
    dbMethods.updateDeck(user, deckToEdit.id, title, !isPublic)
    setDeckToEdit({...deckToEdit, title, private: !isPublic});
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  }

  const deleteDeck = (event) => {
    event.preventDefault();
    dbMethods.deleteDeck(user, deckToEdit.id);
    history.push('/app');
    setDeckToEdit(null);
  }

  return (
    <>
      <Breadcrumb 
        to="/app"
        name="Dashboard"
      />
      <PageHeading
        title="Edit deck."
        subtitle="Update the title and privacy status of your deck."
      />
      <form onSubmit={updateDeck}>
        <TextInput 
          labelText="Title"
          icon={<FontAwesomeIcon icon={faHeading} />}
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New Deck"
          autocomplete="off"
        />
        <input
          id="public"
          name="public"
          type="checkbox"
          checked={isPublic ? true : false}
          onChange={() => setIsPublic(!isPublic)}
        />
        <label htmlFor="public">
          <span></span>
          Is this deck public and shareable?
        </label>
        <button
          className="btn btn-primary"
        >
          {updateSuccess ? "Success!" : "Update" }
        </button>
      </form>
      <div>
        <PageHeading 
          title="Cards."
          subtitle="Add, edit, and remove cards from this deck."
          heading="h2"
        />
        <Accordion
          deckId={selectedDecks[0]}
          cards={cards}
        />
        <CardCreator 
          deckId={selectedDecks[0]}
        />
      </div>
      <div>
        <PageHeading 
          title="Delete deck."
          subtitle="Permanently delete this deck and all its cards."
          heading="h2"
        />
        <form onSubmit={deleteDeck}>
          <button
            className="btn btn-warning"
          >Delete</button>
        </form>
      </div>
    </>
  );
}

export default DeckEditor;