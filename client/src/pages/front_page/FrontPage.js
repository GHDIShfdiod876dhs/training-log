import React from 'react'
import { Query } from 'react-apollo'
import { useLastLocation } from 'react-router-last-location'

import TodaysWorkout from './TodaysWorkout'
import Loader from '../../components/Loader'

import GET_USER_QUERY from '../../graphql/queries/getUserById'

export default ({ userId: id }) => {
  const lastLocation = useLastLocation()

  return (
    <Query query={GET_USER_QUERY} variables={{ id }}>
      {({ loading, data: { User } }) => {
        if (loading) return <Loader />
        return (
          <div className='container'>
            <h1>
              Welcome
              {lastLocation && lastLocation.pathname === '/signup' ? ', ' : ' back, '}
              {User.name}!
            </h1>
            <TodaysWorkout workouts={User.workouts || []} />
          </div>
        )
      }}
    </Query>
  )
}
