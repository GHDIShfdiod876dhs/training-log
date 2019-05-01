import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { withApollo, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const AUTHENTICATE_USER = gql`
  mutation authenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`

export default withApollo(({ client }) => {
  let emailInput, passwordInput
  const [loggedIn, setLoggedIn] = useState(!!client.cache.USER_ID)

  if (loggedIn) return <Redirect to='./' />

  return (
    <div className='container'>
      <Mutation mutation={AUTHENTICATE_USER}>
        {(authenticateUser, { data }) => (
          <form
            onSubmit={e => {
              e.preventDefault()
              authenticateUser({
                variables: {
                  email: emailInput.value,
                  password: passwordInput.value,
                },
              }).then(
                ({ data: { authenticateUser } }) => {
                  emailInput.value = passwordInput.value = null
                  localStorage.setItem('id', authenticateUser.id)
                  localStorage.setItem('token', authenticateUser.token)
                  setLoggedIn(true)
                },
                err => console.log(err)
              )
            }}
          >
            <input
              type='email'
              placeholder='email'
              ref={node => {
                emailInput = node
              }}
            />
            <input
              type='password'
              placeholder='password'
              ref={node => {
                passwordInput = node
              }}
            />
            <button className='btn-flat' type='submit'>
              Sign in
            </button>
          </form>
        )}
      </Mutation>
      <p>
        Don't have an account yet?
        <Link className='btn-flat' to='./signup'>
          Sign up here
        </Link>
      </p>
    </div>
  )
})
