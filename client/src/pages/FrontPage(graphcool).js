import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import TodaysWorkout from './TodaysWorkout'

import GET_USER_QUERY from '../graphql/queries/getUserById'

export default () => {
  const id = localStorage.getItem('id')

  return (
    <Query query={GET_USER_QUERY} variables={{ id }}>
      {({ loading, data: { User } }) => {
        if (loading) return <span>loading....</span>

        if (!User) return <Redirect to='./signin' />

        return (
          <div className='container'>
            <h1>Welcome back, {User.name}!</h1>
            <TodaysWorkout workouts={User.workouts} />
          </div>
        )
      }}
    </Query>
  )
}
