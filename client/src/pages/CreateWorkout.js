import React, { useState, useContext } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter, Link, Redirect } from 'react-router-dom'

// Components
import ExerciseList from './ExerciseList'
import ExerciseDescription from '../components/ExerciseDescription'
import CreateSetButtonsPanel from '../components/CreateSetButtonsPanel'
import Workout from './Workout'

// Queries
import getUserById from '../graphql/queries/getUserById'
import getWorkoutById from '../graphql/queries/getWorkoutById'

// Contexts
import UserContext from '../contexts/UserContext'
import AddCustomFieldsToWorkout from './AddCustomFieldsToWorkout'

function CreateWorkout(props) {
  if (props.getUserById.loading || props.getWorkoutById.loading) {
    return null
  }

  const userId = useContext(UserContext)
  const [exercise, setExercise] = useState(props.location.state.exercise)
  const [done, setDone] = useState(false)
  const { workout } = props.getWorkoutById

  if (done) {
    if (props.location.state.from === `/workout/${workout.id}`) {
      return <Redirect to={`/workout/${workout.id}`} />
    }
    return <Redirect to='/workouts' />
  }
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
