import React, { Component } from 'react'
import NewQuestion from './newQuestion'
import Leaderboard from './leaderboard'
import Login from './login'
import ErrorPNF from './errorPNF';
import { handleInitialData } from '../actions/shared'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from "react-redux"
import Nav from './nav'
import QuestionInfo from './questionInfo'
import '../App.css';
import Dashboard from './dashboard'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser } = this.props
      return (
      <Router>
        <div className="App">
          <header>
            <h1 className="App-title">Would You Rather</h1>
          </header>
            {!authedUser && <Login/>}
            {authedUser && <Nav/>}
          <Route exact path='/' render={() => (authedUser &&
              <Dashboard/>
          )} />
          <Route path='/question/:id'  render={() => (authedUser &&
            <QuestionInfo/>
          )} />
          <Route path='/leaderboard' render={() => (authedUser && <Leaderboard/>)} />
          <Route path='/add' render={() => (authedUser && <NewQuestion/>)} />
          <Route path='/404' render={() => (authedUser && <ErrorPNF/>)} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser: users[authedUser] ? users[authedUser] : null
  }
};

export default connect(mapStateToProps)(App)
