import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

// Components
import TextInputField from '../../components/TextInputField'
import TextAreaField from '../../components/TextAreaField'
import ExerciseFields from './ExerciseFields'
import Loader from '../../components/Loader'
import Success from './Success'
import Wrapper from '../../components/SuccessWrapper'

import CREATE_EXERCISE_MUTATION from './Mutations'

function CreateExercise(props) {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [newExercise, setNewExercise] = useState(null)
  const defaultFields = ['Reps', 'Weight', 'Time']
  const [fields, setFields] = useState(defaultFields)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // create new exercise && create new exercise fields
    props
      .createExercise({
        variables: {
          name,
          description,
          userId: props.userId,
          fields: fields.map(field => ({ name: field })),
        },
      })
      .then(
        ({
          data: {
            createExercise: { name, description, fields },
          },
        }) => {
          setNewExercise({
            name,
            description,
            fields,
          })
          setLoading(false)
          setSuccess(true)
          console.log(newExercise)
        },
        err => console.log(err)
      )
  }

  if (done) {
    props.history.goBack()
    return null
  }
  if (loading) return <Loader />
  if (success)
    return (
      <Wrapper setDone={setDone}>
        <Success newExercise={newExercise} />
      </Wrapper>
    )
  else {
    return (
      <>
        <form className='container' onSubmit={handleSubmit}>
          <TextInputField
            id='exercise-name'
            label='Name'
            onChange={e => setName(e.target.value)}
          />

          <TextAreaField
            id='exercise-description'
            label='Description (optional)'
            onChange={e => setDescription(e.target.value)}
          />

          <ExerciseFields
            fields={fields}
            setFields={setFields}
            defaultFields={defaultFields}
          />
          <button type='submit' className='btn red darken-3'>
            Save
          </button>
        </form>

        <div className='section'>
          <button className='btn grey' onClick={() => setDone(true)}>
            Cancel
          </button>
        </div>
      </>
    )
  }
}

export default withRouter(
  graphql(CREATE_EXERCISE_MUTATION, { name: 'createExercise' })(CreateExercise)
)
