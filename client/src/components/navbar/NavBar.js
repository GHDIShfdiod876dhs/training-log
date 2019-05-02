import React, { useEffect } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import M from 'materialize-css'
import './Navbar.css'

import WorkoutCreationLink from './WorkoutCreationLink'
import Logout from './Logout'

export default withRouter(props => {
  const id = localStorage.getItem('id')

  useEffect(() => {
    M.AutoInit()
  }, [props.location])

  const links = [
    { to: '/create/program', text: 'Start a new Program' },
    { to: '/create/exercise', text: 'Create a new exercise' },
  ]

  return (
    <nav className='nav-wrapper red darken-3 left-align'>
      <div className='container'>
        <NavLink to='/' className='brand-logo'>
          Training Log
        </NavLink>
        {id && (
          <>
            <a
              href='#!'
              data-target='mobile-nav'
              className='sidenav-trigger right show-on-large'
            >
              <i className='material-icons'>menu</i>
            </a>

            <ul className='sidenav grey lighten-3' id='mobile-nav'>
              <li>
                <div className='user-view grey darken-3 white-text z-depth-3'>
                  <h4 className='center-align'>Main Menu</h4>
                </div>
              </li>
              <WorkoutCreationLink userId={id} />
              {links.map((link, i) => (
                <li key={i} className='section'>
                  <NavLink className='sidenav-close' to={link.to}>
                    {link.text}
                  </NavLink>
                </li>
              ))}
              <Logout />
            </ul>
          </>
        )}
      </div>
    </nav>
  )
})
