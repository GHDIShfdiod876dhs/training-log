import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'

import getUserById from '../../graphql/queries/getUserById'

import CarouselWorkout from './CarouselWorkout'
import Loader from '../../components/Loader'

const carouselStyles = {
  // scrollSnapType: 'mandatory',
  scrollSnapPointsY: 'repeat(100vw)',
  scrollSnapType: 'x mandatory',
  display: 'flex',
  overflowX: 'scroll',
}

const itemStyles = {
  padding: '1rem',
  minWidth: '100vw',
  //height: '100vh',
  scrollSnapAlign: 'start',
  textAlign: 'center',
  position: 'relative',
}

export const buttonStyles = {
  position: 'fixed',
  bottom: '1.5rem',
  right: '1.5rem',
}

function AllWorkouts({ getUserById, history }) {
  const { loading, User: user } = getUserById
  if (loading) return <Loader />

  const { workouts } = user
  //const workoutIds = workouts.map(workout => workout.id)
  const [ownChildren, setOwnChildren] = useState(workouts)

  useEffect(() => {
    getUserById.refetch()
  }, [ownChildren])

  return (
    <>
      <div style={carouselStyles}>
        {workouts.map(workout => (
          <div key={workout.id} style={itemStyles}>
            <CarouselWorkout
              workout={workout}
              peers={ownChildren}
              setPeers={setOwnChildren}
            />
          </div>
        ))}
      </div>

      <button
        className='btn-floating red darken-3 z-depth-2'
        style={buttonStyles}
        onClick={() => history.push('/workouts/calendar')}
      >
        <i className='material-icons'>calendar_today</i>
      </button>
    </>
  )
}

export default withRouter(
  graphql(getUserById, {
    options: props => {
      return {
        variables: {
          id: props.userId,
        },
      }
    },
    name: 'getUserById',
  })(AllWorkouts)
)
