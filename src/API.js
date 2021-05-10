export default class APIClass {
  constructor() {
    this.baseRoute = 'http://localhost:5000/decks/';
  }

  createDeck = async (event) => {
    event.preventDefault();
    const URI = this.baseRoute;
    const json = JSON.stringify({ title: event.target.title.value });
    const response = await fetch(URI, {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }
  
  deleteDeck = async (event, deck) => {
    event.preventDefault();
    const URI = this.baseRoute + deck;
    let response = await fetch(URI, {
      method: 'DELETE',
    })
    return await response.json();
    /* if (res.data != undefined) {
      //props.updateShuffled({ id: props.cardId, front: frontText, back: backText, deckId: props.id}, true)
    } */
    
  }
  
  updateDeck = async (event, deck, title) => {
    event.preventDefault();
    const URI = this.baseRoute + deck;
  
    const json = JSON.stringify({ title });
    let response = await fetch(URI, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json"
      },
      body: json
    })
    return await response.json();
    /* if (res.data != undefined) {
      //props.updateShuffled({ id: props.cardId, front: frontText, back: backText, deckId: props.id}, true)
    }*/
  }
  
  saveCard = async (event, deck, card, data) => {
    event.preventDefault();
    let URI = this.baseRoute + deck + "/card/" + card;
  
    if (card === "") {
      URI = this.baseRoute + deck + "/add";
    }
  
    const json = JSON.stringify(data);
    let response = await fetch(URI, {
      method: 'PATCH',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json();
  }
  
  deleteCard = async (event, deck, card) => {
    event.preventDefault();
  
    const URI = this.baseRoute + deck + '/delete/' + card;
    let response = await fetch(URI, {
      method: 'PATCH',
    })
    return await response.json();
  }
}

