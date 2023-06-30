import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { timerOutput } from '../timerOutput'

export default function Timer({count, setCount, gameEnded}){
  useEffect(()=>{
    const gameInterval = setInterval(()=>{
        setCount(count => count + 1)
      }, 1000)
    
      if(gameEnded){
        clearInterval(gameInterval)
      }
    
    
    return () => clearInterval(gameInterval)

  }, [gameEnded])
  return (
    <p className='timer'>{timerOutput(count)}</p>
  )
}

Timer.propTypes = {
    count: PropTypes.number.isRequired,
    setCount: PropTypes.func.isRequired,
    gameEnded: PropTypes.bool.isRequired
}