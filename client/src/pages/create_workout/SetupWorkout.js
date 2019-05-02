import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'

// Components
import Datepicker from '../../components/Datepicker'
import TextAreaField from '../../components/TextAreaField'

import {
  CREATE_WORKOUT_MUTATION,
  ADD_WORKOUT_TO_PROGRAM_MUTATION,
  ADD_WORKOUT_TO_USER_MUTATION,
} from './Mutations'

function SetupWorkout(props) {
  console.log(props)
  const [description, setDescription] = useState(null)
  const [date, setDate] = useState(String(Date.now()))
  const [canceled, setCanceled] = useState(false)
  const [workout, setWorkout] = useState(null)

  const { userId } = props
  const { programId } = props.location.state
  //console.log(props)

  const handleSubmit = e => {
    e.preventDefault()
    props
      .createWorkout({
        variables: {
          date,
          description,
        },
      })
      .then(({ data: { createWorkout: { id: workoutId } } }) => {
        console.log(workoutId)
        const addToUser = props.addWorkoutToUser({
          variables: {
            workoutId,
            userId,
          },
        })
        const addToProgram = props.addWorkoutToProgram({
          variables: {
            workoutId,
            programId,
          },
        })
        return programId ? Promise.all([addToUser, addToProgram]) : [addToUser]
      })
      .then(
        ([
          {
            data: {
              addToUserWorkouts: { workoutsWorkout: workout },
            },
          },
        ]) => {
          setWorkout(workout)
          console.log(workout)
        },
        err => console.log(err)
      )
  }

  if (canceled) {
    return <Redirect to='/create' />
  } else if (workout) {
    return (
      <Redirect
        to={{
          pathname: `/create/workout/${workout.id}`,
          state: { userId, workout },
        }}
      />
    )
  }
  return (
    <div className='container'>
      <form className='container' onSubmit={handleSubmit}>
        <p>{props.programId}</p>

        <Datepicker id='date' label='Date (defaults to today)' setDate={setDate} />

        <TextAreaField
          id='workout-description'
          label='Description (optional)'
          onChange={e => setDescription(e.target.value)}
        />

        <button className='btn red darken-3'>Let's Go!</button>
      </form>

      <div className='section'>
        <button className='btn grey' onClick={() => setCanceled(true)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default withRouter(
  compose(
    graphql(CREATE_WORKOUT_MUTATION, { name: 'createWorkout' }),
    graphql(ADD_WORKOUT_TO_PROGRAM_MUTATION, { name: 'addWorkoutToProgram' }),
    graphql(ADD_WORKOUT_TO_USER_MUTATION, { name: 'addWorkoutToUser' })
  )(SetupWorkout)
)
