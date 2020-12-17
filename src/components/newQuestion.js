import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleOptionOneChange = (event) => {
    const optionOneText = event.target.value

    this.setState(() => ({
      optionOneText: optionOneText,
    }))
  }

  handleOptionTwoChange = (event) => {
    const optionTwoText = event.target.value

    this.setState(() => ({
      optionTwoText: optionTwoText,
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }

  render(){
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true){
      return <Redirect to='/'/>
    }

    return(
      <div>
        <form>
          <h2>Would you rather?</h2>
          <div>
            <textarea
              value={optionOneText}
              className='textarea'
              placeholder="What is the first option"
              onChange={this.handleOptionOneChange}/>
          </div>
          <h3> - OR - </h3>
          <div>
            <textarea
              value={optionTwoText}
              className='textarea'
              placeholder="What is the second option"
              onChange={this.handleOptionTwoChange}/>
          </div>
        </form>
        <button
          type='submit'
          className='btn'
          disabled={optionOneText === '' || optionTwoText === ''}
          onClick={(event) => this.handleSubmit(event)}>
          SUBMIT
        </button>
      </div>
    )
  }
}

export default connect()(NewQuestion)
