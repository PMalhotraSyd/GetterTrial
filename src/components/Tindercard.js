import React, { useState, useMemo } from 'react'
import ProductCard from 'react-tinder-card'
import '../styles/App.css';
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

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Tindercard () {
  //State for all cards
  const [characters, setCharacters] = useState(db)
  //State for last direction
  const [lastDirection, setLastDirection] = useState()
  let audiolike = new Audio("./sounds/Like.wav");
  let audiodislike = new Audio("./sounds/Dislike.wav");
  const childRefs = useMemo(() => Array(db.length).fill(0).map(() => React.createRef()), [])

  //Swipe Cards
  const swiped = (direction, nameToDelete) => {
    configswipe(direction,nameToDelete);
  }

  //Update Cards state
  const outOfFrame = (name) => {
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  // Commom functionality to be done on button click and swiping cards
  function configswipe(dir,toBeRemoved)
  {
    if(dir==="right"){audiolike.play();}else{audiodislike.play();}
    setLastDirection(dir);
    alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
   
  }

  // Click Buttons functionality
  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      configswipe(dir,toBeRemoved);
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div>
     
      <h1>Getter Products</h1>
      <div className='cardContainer'>
        {characters.map((character, index) =>
          <ProductCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </ProductCard>
        )}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}>No!</button>
        <button onClick={() => swipe('right')}>Yes!</button>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
    </div>
  )
}

export default Tindercard;
