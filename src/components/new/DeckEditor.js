import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faPlus } from '@fortawesome/free-solid-svg-icons';
import { firebaseAuth } from '../../provider/AuthProvider';
import { dbMethods } from '../../firebase/dbMethods';
import { useHistory } from 'react-router-dom';
import PageHeading from './PageHeading';
import Breadcrumb from './Breadcrumb';
import TextInput from '../TextInput';
import Accordion from './Accordion';
import CardCreator from './CardCreator';

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

  const updateDeck = (event) => {
    event.preventDefault();
    dbMethods.updateDeck(user, deckToEdit.id, title, !isPublic)
    setDeckToEdit({...deckToEdit, title, private: !isPublic});
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
          onChange={(event) => setIsPublic(!isPublic)}
        />
        <label htmlFor="public">
          <span></span>
          Is this deck public and shareable?
        </label>
        <button
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
      <section>
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
      </section>
      <section>
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
      </section>
    </>
  )
}

export default DeckEditor;