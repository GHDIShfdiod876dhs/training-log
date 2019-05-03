import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter, Link, Redirect } from 'react-router-dom'

// Components
import ExerciseList from './ExerciseList'
import ExerciseDescription from './ExerciseDescription'
import CreateSetButtonsPanel from './create_set/CreateSetButtonsPanel'
import Workout from '../display_workout/Workout'

import getUserById from '../../graphql/queries/getUserById'
import getWorkoutById from '../../graphql/queries/getWorkoutById'
import AddCustomFieldsToWorkout from './AddCustomDataToWorkout'

function CreateWorkout(props) {
  if (props.getUserById.loading || props.getWorkoutById.loading) {
    return null
  }

  //console.log(props)
  const [exercise, setExercise] = useState(props.location.state.exercise)
  const [done, setDone] = useState(false)
  const { Workout: workout } = props.getWorkoutById
  const { userId } = props

  if (done) {
    if (props.location.state.from === `/workout/${workout.id}`) {
      return <Redirect to={`/workout/${workout.id}`} />
    }
    return <Redirect to='/workouts' />
  }
  // return null
  return (
    <div className='container'>
      <Workout editable workoutId={workout.id} />

      {exercise && (
        <>
          <ExerciseDescription exerciseId={exercise.id} />
          <CreateSetButtonsPanel
            setExercise={setExercise}
            exercise={exercise}
            setNumber={workout.sets ? workout.sets.length : 0}
            workout={workout}
          />
        </>
      )}

      <ul className='collection with-header z-depth-1'>
        <li className='collection-header grey darken-3 white-text left-align'>
          <Link
            to={{
              pathname: '/create/exercise',
              state: { userId, workout },
            }}
          >
            Create a new exercise
          </Link>
          <span className='secondary-content'>
            <i className='material-icons white-text'>create</i>
          </span>
        </li>
      </ul>

      <ExerciseList userId={userId} setExercise={setExercise} />

      <AddCustomFieldsToWorkout workout={workout} />

      <button onClick={() => setDone(true)}>Done</button>
    </div>
  )
}

export default withRouter(
  compose(
    graphql(getUserById, {
      options: props => {
        return {
          variables: {
            id: props.location.state.userId,
          },
        }
      },
      name: 'getUserById',
    }),
    graphql(getWorkoutById, {
      options: props => {
        return {
          variables: {
            id: props.match.params.id,
          },
        }
      },
      name: 'getWorkoutById',
    })
  )(CreateWorkout)
)
