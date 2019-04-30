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
          <div>
            <form
              onSubmit={async e => {
                e.preventDefault()
                await authenticateUser({
                  variables: {
                    email: emailInput.value,
                    password: passwordInput.value,
                  },
                  update: (store, { data: { authenticateUser } }) => {
                    store.USER_ID = authenticateUser.id
                    store.USER_TOKEN = authenticateUser.token
                  },
                })
                emailInput.value = ''
                passwordInput.value = ''
                setLoggedIn(true)
              }}
            >
              <input
                placeholder='email'
                ref={node => {
                  emailInput = node
                }}
              />
              <input
                placeholder='password'
                ref={node => {
                  passwordInput = node
                }}
              />
              <button className='btn-flat' type='submit'>
                Sign in
              </button>
            </form>
          </div>
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
