import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { setAuthedUser, logoutUser } from '../actions/authedUser'

const Nav = ({ dispatch, authedUser, users }) => {
  return(
    <div>
        <li className='login-tile'>
          <img alt='avatar' className='avatar-small' src={users[authedUser].avatarURL} />
          <div className='login-tile-details'>
            <p>{users[authedUser].name}</p>
            <Link
              to='/'
              onClick={() => {dispatch(logoutUser())}}
              className='Nav_link'>
              Log Out
            </Link>
          </div>
        </li>

        <ul id='Nav_menu'>
          <li>
            <NavLink
              to='/'
              className='Nav_link'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/leaderboard'
              className='Nav_link'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/add'
              className='Nav_link'>
              Add New Question
            </NavLink>
          </li>
        </ul>

    </div>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser,
        users
    }
};

export default connect(mapStateToProps)(Nav)
