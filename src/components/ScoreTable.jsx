
import PropTypes from "prop-types"


export default function ScoreTable({gamesPlayed, isVisible}){

  const tableRows = gamesPlayed.map((game, index)=>{
    return (
      <tr key={game.id}>
        <th scope="row">{index + 1}</th>
        <td>{game.displayedTime}</td>
        <td>{game.day}</td>
        <td>{game.time}</td>
      </tr>
    )
  })

  return (
    <section>
      
      <table className={`scores ${isVisible ? 'is-shown': ''}`}>
        <thead>
          <tr>
            <th scope="col">Game #</th>
            <th scope="col">Duration</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
        {tableRows}
        </tbody>
      </table>
    </section>
  )

}


ScoreTable.propTypes = {
    gamesPlayed: PropTypes.array.isRequired,
    isVisible: PropTypes.bool.isRequired
}
