import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './question'

class Dashboard extends Component {
  state = {
    showAnswered: null,
  }

  shouldShowAnswered = (showAnswered) => {
    this.setState(() => ({
      showAnswered,
    }))
  }

  render() {
    const { showAnswered } = this.state;
    const { questions, authedUser } = this.props
    const listOfQuestions = Object.values(questions)
    const answeredQuestions = listOfQuestions.filter(question =>
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    ).sort((a,b) => b.timestamp - a.timestamp)
    const unansweredQuestions = listOfQuestions.filter(question =>
      !question.optionOne.votes.includes(authedUser) &&
      !question.optionTwo.votes.includes(authedUser)
    ).sort((a,b) => b.timestamp - a.timestamp)

    return (
      <div>
        <div>
          <button
            className={showAnswered === false ? 'selector-active' : 'selector-inactive'}
            onClick={() => this.shouldShowAnswered(false)}>
              Unanswered Questions
          </button>
          <button
            className={showAnswered === true ? 'selector-active' : 'selector-inactive'}
            onClick={() => this.shouldShowAnswered(true)}>
              Answered Questions
          </button>
        </div>

        <ul className='player-list'>
          {
            showAnswered ? ( showAnswered === true &&
              answeredQuestions.map((question) => (
                <Link key={question.id} to={`question/${question.id}`} id={question.id}>
                  <Question id={question.id}/>
                </Link>
              ))
            ) : ( showAnswered === false &&
              unansweredQuestions.map((question) => (
                <Link key={question.id} to={`question/${question.id}`} id={question.id}>
                  <Question id={question.id}/>
                </Link>
              ))
            )
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ questions, authedUser }) => {
  return {
    authedUser,
    questions,
  }
}

export default connect(mapStateToProps)(Dashboard)
