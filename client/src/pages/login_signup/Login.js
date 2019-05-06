import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { withApollo, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Form from './Form'
import Loader from '../../components/Loader'

const AUTHENTICATE_USER = gql`
  mutation authenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`

export default withApollo(({ client }) => {
  const emailInput = { type: 'email', node: null },
    passwordInput = { type: 'password', node: null }

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('id'))

  if (loggedIn) return <Redirect to='./' />

  return (
    <div className='container'>
      <Mutation mutation={AUTHENTICATE_USER}>
        {(authenticateUser, { loading }) => {
          const handleSubmit = e => {
            e.preventDefault()
            authenticateUser({
              variables: {
                email: emailInput.node.value,
                password: passwordInput.node.value,
              },
            }).then(
              ({ data: { authenticateUser } }) => {
                emailInput.node.value = passwordInput.node.value = null
                localStorage.setItem('id', authenticateUser.id)
                localStorage.setItem('token', authenticateUser.token)
                setLoggedIn(true)
              },
              err => console.log(err)
            )
          }
          if (loading) return <Loader />
          return (
            <div className='container'>
              <Form
                handleSubmit={handleSubmit}
                inputs={[emailInput, passwordInput]}
                buttonText='Sign in'
              />
              <p>
                Don't have an account yet?
                <Link className='btn-flat' to='./signup'>
                  Sign up here
                </Link>
              </p>
            </div>
          )
        }}
      </Mutation>
    </div>
  )
})
