
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    const { question, author } = this.props;
    return (
      <div key={question.id} className='player-list-item'>
        <img alt='avatar' className='avatar-large' src={author.avatarURL} />
        <div className='player-details'>
          <h3>{author.name}</h3>
          <p className='bold'>Would you rather?</p>
          <p>{question.optionOne.text}</p>
          <p> - OR - </p>
          <p>{question.optionTwo.text}</p>
        </div>
        <button className='btn'>
          View Details
        </button>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : 'unknown author'

    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(Question)
