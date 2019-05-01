import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Mutation, withApollo } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import Form from './Form'
import Loader from '../../components/Loader'

const SIGNUP_USER = gql`
  mutation signupUserMutation($email: String!, $name: String!, $password: String!) {
    signupUser(email: $email, name: $name, password: $password) {
      id
      token
    }
  }
`

export default withApollo(({ client }) => {
  const emailInput = { type: 'email' },
    nameInput = { type: 'text', label: 'name' },
    passwordInput = { type: 'password', new: true },
    confirmPasswordInput = {
      type: 'password',
      label: 'confirm password',
      new: true,
    }

  const [error, setError] = useState(null)
  const [loggedIn, setLoggedIn] = useState(!!client.cache.USER_ID)

  if (loggedIn) return <Redirect to='./' />

  return (
    <Mutation mutation={SIGNUP_USER}>
      {(signupUser, { loading }) => {
        const handleSubmit = e => {
          e.preventDefault()
          if (passwordInput.value !== confirmPasswordInput.value) {
            setError("Passwords don't match!")
            return
          }
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
        }
        if (loading) return <Loader />
        return (
          <div className='container'>
            {error && <h3>{error}</h3>}
            <Form
              handleSubmit={handleSubmit}
              inputs={[emailInput, nameInput, passwordInput, confirmPasswordInput]}
              buttonText='Sign up'
            />
          </div>
        )
      }}
    </Mutation>
  )
})
