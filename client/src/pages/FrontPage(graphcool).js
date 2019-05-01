import React from 'react'
import { Query } from 'react-apollo'

import TodaysWorkout from './TodaysWorkout'

import GET_USER_QUERY from '../graphql/queries/getUserById'

export default ({ userId: id }) => (
  <Query query={GET_USER_QUERY} variables={{ id }}>
    {({ loading, data: { User } }) => {
      if (loading) return <span>loading....</span>

      return (
        <div className='container'>
          <h1>Welcome back, {User.name}!</h1>
          <TodaysWorkout workouts={User.workouts} />
        </div>
      )
    }}
  </Query>
)
