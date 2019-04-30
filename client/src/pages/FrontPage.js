import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { Redirect } from 'react-router-dom'

// Components
import TodaysWorkout from './TodaysWorkout'

// Queries
import getUserById from '../graphql/queries/getUserById'

function FrontPage({ data: { loading, user } }) {
  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) return <Redirect to='./signin' />

  return (
    <div className='container'>
      <TodaysWorkout workouts={user.workouts} />
    </div>
  )
}

export default withApollo(
  graphql(getUserById, {
    options: ({ client }) => {
      // const id = client.cache.USER_ID
      // console.log(id)
      return {
        variables: {
          id: client.store.USER_ID, //props.userId,
        },
      }
    },
  })(FrontPage)
)
