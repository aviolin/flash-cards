import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faPlus } from '@fortawesome/free-solid-svg-icons';
import PageHeading from './PageHeading';
import Breadcrumb from './Breadcrumb';
import TextInput from '../TextInput';
import Accordion from './Accordion';

const DeckEditor = ({
  selectedDecks,
  cards
}) => {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);

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
      <form>
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
        <button className="btn btn-tertiary highlighted">
          Add card <FontAwesomeIcon icon={faPlus} />
        </button>
      </section>
      <section>
        <PageHeading 
          title="Remove deck."
          subtitle="Permanently delete this deck and all its cards."
          heading="h2"
        />
        <form>
          <button
            className="btn btn-warning"
          >Delete</button>
        </form>
      </section>
    </>
  )
}

export default DeckEditor;