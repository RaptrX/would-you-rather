import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser, logoutUser } from '../actions/authedUser'
import { Redirect, withRouter } from 'react-router-dom'

class Login extends Component {

  state = {
    toHome: false,
  }

  componentDidMount() {
		this.props.dispatch(logoutUser())
	}

  onLoginUser = (userID) => {
    const { dispatch } = this.props

    dispatch(setAuthedUser(userID))

    this.setState(() => ({
      toHome: true,
    }))
  }

  render(){
    const { userID, toHome } = this.state
		const { users } = this.props
		const { from } = this.props.location.state || { from: { pathname: '/'}}
		const selectedUser = userID ? userID : -1

		if(toHome) {
			return <Redirect to={from} />
		}

    return(
      <div>
        <h2>Please select a user</h2>
        <ol className = 'player-list'>
          {Object.keys(users).map(user =>
            <li
              key={users[user].id}
              className='player-list-item'>
              <img alt='avatar' className='avatar-medium' src={users[user].avatarURL} />
              <div className='player-details'>
                <h3>{users[user].name}</h3>
              </div>
              <button
                className='btn'
                disabled={userID === null}
                onClick={() => this.onLoginUser(users[user].id)}>
    					  Login
    				</button>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return{
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Login))
