import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions'
import { Redirect, withRouter } from 'react-router-dom'
import chart_icon from '../chart_icon.png'

class QuestionInfo extends Component {
  state = {
    answer: '',
  }

  handleSaveAnswer = (event) => {
    event.preventDefault()

    const { dispatch, authedUser, id  } = this.props
    const { answer } = this.state

    dispatch(handleAddAnswer({
      qid:id,
      authedUser,
      answer,
    }))
  }

  selectAnswer = (answer) => {
    this.setState((prevState) => ({
      answer,
    }))
  }

  render() {
    const { id, authedUser, users, questions } = this.props;
    const { answer } = this.state;

    const question = questions[id]
    const author = question ? users[question.author] : 'unknown author'
    const answered = question ?
      (question.optionOne.votes.indexOf(authedUser) > -1 ||
      question.optionTwo.votes.indexOf(authedUser) > -1)
      :
      false
    const optionOneV = (question && question.optionOne.votes) ?
      question.optionOne.votes.length : 0
    const optionTwoV = (question && question.optionTwo.votes) ?
      question.optionTwo.votes.length : 0
    const votesT = optionOneV + optionTwoV
    const optionOneP = ((optionOneV / votesT) * 100).toFixed(1)
    const optionTwoP = ((optionTwoV / votesT) * 100).toFixed(1)

    if (!question) {
      return <Redirect to="/not-found"/>
    }

    console.log('answer: ', answer);

    return (
      <div>
        <div key={question.id} className='player-list-item'>
          <img alt='avatar' className='avatar-large' src={author.avatarURL} />
          <div className='player-details'>
            <h3>{author.name}</h3>
            <p className='bold'>Would you rather?</p>
            <p>1: {question.optionOne.text}</p>
            <p> - OR - </p>
            <p>2: {question.optionTwo.text}</p>
            {!answered &&
              <div>
                <button
                  className={answer === 'optionOne' ? 'selector-active' : 'selector-inactive'}
                  onClick={() => this.selectAnswer('optionOne')}>
                  Option One
                </button>
                <button
                  className={answer === 'optionTwo' ? 'selector-active' : 'selector-inactive'}
                  onClick={() => this.selectAnswer('optionTwo')}>
                  Option Two
                </button>
                <button
                  className='btn'
                  disabled={answer === ''}
                  onClick={(event) => this.handleSaveAnswer(event)}>
                  Lock in
                </button>
              </div>
            }
          </div>
        </div>
        {answered &&
          <div key='statistics' className='player-list-item'>
            <img alt='avatar' className='avatar-large' src={chart_icon} />
            <div className='player-details'>
              <h3>Statistics</h3>
              <p className='bold'>You selected: {users[authedUser].answers[id]}</p>
              <p>Total votes: {votesT}</p>
              <p>Option 1: {optionOneV} {optionOneV > 1 ? 'votes' : 'vote'} ({optionOneP}%)</p>
              <p>Option 2: {optionTwoV} {optionTwoV > 1 ? 'votes' : 'vote'} ({optionTwoP}%)</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({authedUser, users, questions}, props) => {
  const { id } = props.match.params

  return {
    id,
    authedUser,
    users,
    questions,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionInfo))
