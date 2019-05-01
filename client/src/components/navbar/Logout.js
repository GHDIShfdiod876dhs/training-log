import React from 'react'
import { NavLink } from 'react-router-dom'

export default () => {
  const handleClick = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
  }
  return (
    <li onClick={handleClick}>
      <NavLink className='sidenav-close' to={'/signin'}>
        Logout
      </NavLink>
    </li>
  )
}
