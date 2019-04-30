import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Mutation, withApollo } from 'react-apollo'
import { Redirect } from 'react-router-dom'

const SIGNUP_USER = gql`
  mutation signupUserMutation($email: String!, $name: String!, $password: String!) {
    signupUser(email: $email, name: $name, password: $password) {
      id
      token
    }
  }
`

export default withApollo(({ client }) => {
  let emailInput, nameInput, passwordInput
  const [loggedIn, setLoggedIn] = useState(!!client.cache.USER_ID)

  if (loggedIn) return <Redirect to='./' />

  return (
    <div className='container'>
      <Mutation mutation={SIGNUP_USER}>
        {(signupUser, { data }) => (
          <div>
            <form
              onSubmit={async e => {
                e.preventDefault()
                await signupUser({
                  variables: {
                    email: emailInput.value,
                    name: nameInput.value,
                    password: passwordInput.value,
                  },
                  update: (store, { data: { signupUser } }) => {
                    store.USER_ID = signupUser.id
                    store.USER_TOKEN = signupUser.token
                  },
                })
                emailInput.value = ''
                nameInput.value = ''
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
                placeholder='name'
                ref={node => {
                  nameInput = node
                }}
              />
              <input
                placeholder='password'
                ref={node => {
                  passwordInput = node
                }}
              />
              <button type='submit'>Sign up</button>
            </form>
          </div>
        )}
      </Mutation>
    </div>
  )
})
