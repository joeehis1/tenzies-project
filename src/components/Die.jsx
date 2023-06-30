import PropTypes from 'prop-types'

export default function Die({die, setHeld}){
  const numArray = ["one", "two", "three", "four", "five", "six"]

  const dieface = new Array(9).fill(null).map((n,index)=>{
    const key = (index + 0.2)*1.1
    return (<div key={key} className='face' />)
  })
  return (
    <button onClick={()=> setHeld(die.id)} className={`btn-dice ${numArray[die.number - 1]} ${die.isHeld ? `is-held` : ''}`}>{dieface}</button>
  )
}

Die.propTypes = {
    die: PropTypes.object.isRequired,
    setHeld: PropTypes.func.isRequired
}