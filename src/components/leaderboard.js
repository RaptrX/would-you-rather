import React from 'react'
import { connect } from 'react-redux'

const Leaderboard = ({ users }) => {
  return(
    <ol className = 'player-list'>
      {users.map(user =>
        <li key={user.id} className='player-list-item'>
          <img alt='avatar' className='avatar-large' src={user.avatarURL} />
          <div className='player-details'>
            <h3>{user.name}</h3>
            <p>Asked Questions: {user.questions.length}</p>
            <p>Answered Questions: {Object.keys(user.answers).length}</p>
            <p>Total Score: {user.score}</p>
          </div>
        </li>
      )}
    </ol>
  )
}

const mapStateToProps = ({ users }) => {
  return{
    users: Object.keys(users).map(user => {
      return{
        ...users[user],
        score:(users[user].questions.length + Object.keys(users[user].answers).length)
      }
    }).sort((a,b) => b.score - a.score)
  }
}

export default connect(mapStateToProps)(Leaderboard)
