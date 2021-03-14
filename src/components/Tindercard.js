import React, { useState, useMemo } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import '../styles/App.css';

//Data Store to display cards
const db = [
  {
    name: 'White Pipe',
    url: './img/pipe.jpg'
  },
  {
    name: 'Black Pipe',
    url: './img/blackpipe.jpg'
  },
  {
    name: 'Coil',
    url: './img/coil.jpg'
  },
  {
    name: 'Adapter',
    url: './img/adapter.jpg'
  },
  {
    name: 'Elbow',
    url: './img/elbow.jpg'
  }
]

// array to maintain list of removed items
const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Tindercard () {
  //List of characters in state
  const [characters, setCharacters] = useState(db)
  //Last direction in state
  const [lastDirection, setLastDirection] = useState()

  var audiolike = new Audio("./sounds/Like.wav");
  var audiodislike = new Audio("./sounds/Dislike.wav");
  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    
    console.log('removing: ' + nameToDelete);
    configureswipe(direction,nameToDelete);
    
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  
  const swipe = (dir) => {
    //Filter the name to removed from stack of cards
    const cardsLeft = characters.filter(product => !alreadyRemoved.includes(product.name))
    if (cardsLeft.length) {
     
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      configureswipe(dir,toBeRemoved);
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  function configureswipe(dir,toBeRemoved)
  {

  // Play like or dislike sound on basis of user selection
    if(dir==="right"){audiolike.play();}else{audiodislike.play();}
    //set last direction in state
    setLastDirection(dir);
   // Make sure the next card gets removed next time if this card do not have time to exit the screen
   alreadyRemoved.push(toBeRemoved) 
  }
  return (
    <div>
     
      <h1>Getter Products</h1>
      <div className='cardContainer'>
        {characters.map((character, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}>No! </button>
        <button onClick={() => swipe('right')}>Yes! </button>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
    </div>
  )
}

export default Tindercard;
