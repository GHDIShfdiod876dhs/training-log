import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import M from 'materialize-css'

import WorkoutCreationLink from './WorkoutCreationLink'
import UserContext from '../../contexts/UserContext'


export default function NavBar() {
  const userId = useContext(UserContext)

  useEffect(() => {
    const instance = M.Sidenav.init(
      document.querySelector('.sidenav'),
      //{ draggable: false, preventScrolling: false, edge: 'right' }
    )
    return () => instance.destroy()
  })

  const links = [
    { to: '/create/program', text: 'Start a new Program' },
    { to: '/create/exercise', text: 'Create a new exercise' },
  ]

  const renderLinks = ({ sidenav }) => (
    links.map(
      (link, i) => (
        <li key={i}>
          <NavLink className={ sidenav ? 'sidenav-close' : null } to={link.to}> 
            {link.text}
          </NavLink>
        </li>
      )
    )
  )

  return (
    <>
      <nav
        className="nav-wrapper red darken-3 left-align"
      >
        <div className="container">
          <NavLink to="/" className="brand-logo">Training Log</NavLink>

          <a href="#!" data-target="mobile-nav" className="sidenav-trigger right">
            <i className="material-icons">menu</i>
          </a>

          <ul className="right hide-on-med-and-down">
            <WorkoutCreationLink userId={userId}/>
            { renderLinks({ sidenav: false })}
          </ul>
        </div>
        
      </nav>

      <ul className="sidenav grey lighten-3" id="mobile-nav">
        <li>
          <div className="user-view grey darken-3 white-text z-depth-3">
            <h4 className="center-align">Placeholder</h4>
          </div>
        </li>
        <WorkoutCreationLink sidenav userId={userId} />
        { renderLinks({ sidenav: true }) }
      </ul>
    </>
  )
}