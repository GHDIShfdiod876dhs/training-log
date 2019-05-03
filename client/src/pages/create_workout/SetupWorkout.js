import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'

// Components
import Datepicker from '../../components/Datepicker'
import TextAreaField from '../../components/TextAreaField'

import { CREATE_WORKOUT_MUTATION } from './Mutations'

function SetupWorkout(props) {
  const [description, setDescription] = useState(null)
  const [date, setDate] = useState(String(Date.now()))
  const [canceled, setCanceled] = useState(false)
  const [workout, setWorkout] = useState(null)

  const { userId } = props
  const { programId } = props.location.state

  const handleSubmit = e => {
    e.preventDefault()
    props
      .createWorkout({
        variables: {
          date,
          description,
          userId,
          programId: programId || null,
        },
      })
      .then(
        ({ data: { createWorkout: workout } }) => {
          console.log(workout)
          setWorkout(workout)
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
  graphql(CREATE_WORKOUT_MUTATION, { name: 'createWorkout' })(SetupWorkout)
)
