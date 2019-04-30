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
    <Mutation mutation={SIGNUP_USER}>
      {(signupUser, { data }) => (
        <form
          className='container'
          onSubmit={e => {
            e.preventDefault()
            signupUser({
              variables: {
                email: emailInput.value,
                name: nameInput.value,
                password: passwordInput.value,
              },
            }).then(
              ({ data: { signupUser } }) => {
                emailInput.value = nameInput.value = passwordInput.value = null
                localStorage.setItem('id', signupUser.id)
                localStorage.setItem('token', signupUser.token)
                setLoggedIn(true)
              },
              err => console.log(err)
            )
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
      )}
    </Mutation>
  )
})
