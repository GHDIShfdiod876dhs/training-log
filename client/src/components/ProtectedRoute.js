import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const userId = localStorage.getItem('id')
      return userId ? <Component {...props} userId={userId} /> : <Redirect to='/signin' />
    }}
  />
)
