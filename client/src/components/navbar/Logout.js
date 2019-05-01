import React from 'react'
import { NavLink } from 'react-router-dom'

export default ({ sidenav }) => {
  const handleClick = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
  }
  return (
    <li onClick={handleClick}>
      <NavLink className={sidenav ? 'sidenav-close' : null} to={'/signin'}>
        Logout
      </NavLink>
    </li>
  )
}
