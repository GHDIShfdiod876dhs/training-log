import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { withRouter, Redirect } from 'react-router-dom'

// Components
import ExerciseDescription from '../ExerciseDescription'
import NumberInputField from '../../../components/NumberInputField'
import TextAreaField from '../../../components/TextAreaField'

import { CREATE_SET_MUTATION } from './Mutations'

function CreateSet(props) {
  const { exercise, setNumber, workout } = props.location.state

  const [notes, setNotes] = useState(null)
  const [fields, setFields] = useState(exercise.fields)
  const [numberOfSets, setNumberOfSets] = useState(1)
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <Redirect
        to={{
          pathname: `/create/workout/${workout.id}`,
          state: { workout },
        }}
      />
    )
  }

  function displayFields() {
    return fields.map(({ name, id }, idx) => (
      <div key={id}>
        <NumberInputField
          key={id}
          id={`${name}-field`}
          label={`${name} (optional)`}
          onChange={e => {
            const updatedFields = [...fields]
            updatedFields[idx].value = Number(e.target.value)
            setFields(updatedFields)
          }}
        />
      </div>
    ))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const ps = []
    const data = fields.map(({ name, value }) => {
      return { name, value }
    })
    for (let i = 0; i < numberOfSets; i++) {
      ps[i] = props.createSet({
        variables: {
          number: setNumber + i + 1,
          data,
          notes,
          exerciseId: exercise.id,
          workoutId: workout.id,
        },
      })
    }

    Promise.all(ps).then(() => setDone(true), err => console.log(err))
  }

  return (
    <div className='container'>
      <ExerciseDescription exerciseId={exercise.id} />

      <form className='container' onSubmit={handleSubmit}>
        {displayFields()}

        <TextAreaField
          id='notes-field'
          label='Notes (optional)'
          onChange={e => setNotes(e.target.value)}
        />

        <div className='row valign-wrapper'>
          <div className='col s2 pull-s1'>
            <button>Create</button>
          </div>
          <div className='col s2 pull-s4'>
            <NumberInputField
              defaultValue={numberOfSets}
              id='number-of-sets-field'
              onChange={e => setNumberOfSets(e.target.value)}
            />
          </div>
        </div>
      </form>

      <button onClick={() => setDone(true)}>Cancel</button>
    </div>
  )
}

export default withRouter(graphql(CREATE_SET_MUTATION, { name: 'createSet' })(CreateSet))
