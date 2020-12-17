import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions){
  return{
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question){
  return{
    type: ADD_QUESTION,
    question,
  }
}

function addAnswer({ authedUser, answer, qid }) {
  return{
    type: ANSWER_QUESTION,
    authedUser,
    answer,
    qid,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText){
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((newQuestion) => {
      dispatch(addQuestion(newQuestion))
    }).catch((error) => {
      console.log('error', error)
      alert("There was an error adding your question to the database")
    })
  }
}

export function handleAddAnswer(aData){
  return (dispatch) => {
    dispatch(addAnswer(aData))
    return saveQuestionAnswer(aData).catch(() => {
      alert("There was an error saving your answer to the database")
    })
  }
}
