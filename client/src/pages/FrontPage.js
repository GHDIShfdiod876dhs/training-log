import React from 'react'
import { graphql } from 'react-apollo'

// Components
import TodaysWorkout from './TodaysWorkout'

// Queries
import getUserById from '../queries/getUserById'


function FrontPage({ data: { loading, user } }) {
  if (loading) {
    return ( <div>Loading...</div> )
  }

  return (
    <div className="container">
      <TodaysWorkout workouts={ user.workouts } />
    </div>
  )
}


export default graphql(getUserById, {
  options: props => {
    return {
      variables: {
        id: props.userId
      }
    }
  }
})(FrontPage)