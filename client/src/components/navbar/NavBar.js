import React, { useEffect } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import M from 'materialize-css'

import WorkoutCreationLink from './WorkoutCreationLink'
import Logout from './Logout'

export default withRouter(props => {
  const id = localStorage.getItem('id')
  console.log(id)

  useEffect(() => {
    const instance = M.Sidenav.init(
      document.querySelector('.sidenav')
      //{ draggable: false, preventScrolling: false, edge: 'right' }
    )
    return () => instance && instance.destroy()
  })

  const links = [
    { to: '/create/program', text: 'Start a new Program' },
    { to: '/create/exercise', text: 'Create a new exercise' },
  ]

  const renderLinks = ({ sidenav }) =>
    links.map((link, i) => (
      <li key={i}>
        <NavLink className={sidenav ? 'sidenav-close' : null} to={link.to}>
          {link.text}
        </NavLink>
      </li>
    ))

  return (
    <>
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
              {/* <ul className='right hide-on-med-and-down'>
                <WorkoutCreationLink userId={id} />
                {renderLinks({ sidenav: false })}
                <Logout />
              </ul> */}
            </>
          )}
        </div>
      </nav>
      {id && (
        <ul className='sidenav grey lighten-3' id='mobile-nav'>
          <li>
            <div className='user-view grey darken-3 white-text z-depth-3'>
              <h4 className='center-align'>Placeholder</h4>
            </div>
          </li>
          <WorkoutCreationLink sidenav userId={id} />
          {renderLinks({ sidenav: true })}
          <Logout sidenav />
        </ul>
      )}
    </>
  )
})
