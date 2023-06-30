import Die from "./Die";
import PropTypes from "prop-types";

export default function DiceComponent({setDiceCollection, diceCollection}){

  function setHeld(id){
      setDiceCollection(collection => {
          const returnedCollection = [...collection]
          const selectedDie = returnedCollection.find((die) =>{
              return die.id === id
          })
          selectedDie.isHeld = true
          return returnedCollection
      })
  }

  const diceButtons = diceCollection.map((die) => {
    return (
      <li key={die.id}>
        <Die die={die} setHeld={setHeld} />
      </li>
    )
  })
  return (
    <ul className="dice">
      {diceButtons}
    </ul>
  )
}

DiceComponent.propTypes = {
    setDiceCollection : PropTypes.func.isRequired,
    diceCollection: PropTypes.array.isRequired
}