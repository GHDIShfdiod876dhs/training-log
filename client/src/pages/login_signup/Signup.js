import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Mutation, withApollo } from 'react-apollo'
import { Redirect, Link } from 'react-router-dom'
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
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState(null)
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('id'))

  if (loggedIn) return <Redirect to='./' />

  return (
    <Mutation mutation={SIGNUP_USER}>
      {(signupUser, { loading }) => {
        const handleSubmit = e => {
          e.preventDefault()
          if (password !== confirmPassword) {
            setError("Passwords don't match!")
            return
          }
          signupUser({
            variables: {
              email,
              name,
              password,
            },
          }).then(
            ({ data: { signupUser } }) => {
              setEmail('')
              setName('')
              setPassword('')
              setConfirmPassword('')
              localStorage.setItem('id', signupUser.id)
              localStorage.setItem('token', signupUser.token)
              setLoggedIn(true)
            },
            err => {
              console.log(err.message)
              if (err.message.includes('Email already in use')) {
                setError('Email already in use')
              }
            }
          )
        }
        if (loading) return <Loader />
        return (
          <div className='container'>
            {error && <h5>{error}</h5>}
            <form onSubmit={handleSubmit}>
              <div className='input-field'>
                <label htmlFor='email' className={email && 'active'}>
                  Email
                </label>
                <input
                  required
                  id='email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete='username'
                />
              </div>

              <div className='input-field'>
                <label htmlFor='name' className={name && 'active'}>
                  Name
                </label>
                <input
                  required
                  id='name'
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className='input-field'>
                <label htmlFor='password' className={password && 'active'}>
                  Password
                </label>
                <input
                  required
                  id='password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete='new-password'
                />
              </div>

              <div className='input-field'>
                <label htmlFor='confirm' className={confirmPassword && 'active'}>
                  Confirm password
                </label>
                <input
                  required
                  id='confirm'
                  type='password'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  autoComplete='new-password'
                />
              </div>
              <button className='btn red darken-3' type='submit'>
                Submit
              </button>
            </form>
            <p>
              Already have an account?
              <Link className='btn-flat' to='./signin'>
                Log in here
              </Link>
            </p>
          </div>
        )
      }}
    </Mutation>
  )
})
