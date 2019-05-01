import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

// Components
import TextInputField from '../../components/TextInputField'
import TextAreaField from '../../components/TextAreaField'
import ExerciseFields from './ExerciseFields'
import Loader from '../../components/Loader'
import Success from './Success'

// Queries
import CREATE_EXERCISE_MUTATION from '../../graphql/mutations/createExercise'
import CREATE_EXERCISE_FIELD_MUTATION from '../../graphql/mutations/createExerciseField'
import ADD_EXERCISE_TO_USER_MUTATION from '../../graphql/mutations/addExerciseToUser'
import ADD_FIELDS_TO_EXERCISE_MUTATION from '../../graphql/mutations/addFieldsToExercise'
// import getExercisesForUser from '../../graphql/queries/getExercisesForUser'

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
    const createdExercise = props.createExercise({
      variables: {
        name,
        description,
      },
    })

    const createdFields = fields.map(field =>
      props.createField({
        variables: {
          name: field,
        },
      })
    )

    Promise.all([createdExercise, ...createdFields])
      .then(
        // link fields to exercise && link exercise to user
        ([
          {
            data: { createExercise: exercise },
          },
          ...fields
        ]) => {
          setNewExercise({
            name: exercise.name,
            description: exercise.description,
            fields: fields.map(f => f.data.createExerciseField.name),
          })
          return Promise.all([
            props.addExerciseToUser({
              variables: {
                exerciseId: exercise.id,
                userid: props.userId,
              },
            }),
            ...fields.map(({ data: { createExerciseField: field } }) =>
              props.addFieldsToExercise({
                variables: {
                  fieldId: field.id,
                  exerciseId: exercise.id,
                },
              })
            ),
          ])
        }
      )
      .then(
        res => {
          setLoading(false)
          setSuccess(true)
          console.log(newExercise)
        },
        err => console.log(err)
      )
  }
  //   props
  //     .addExercise({
  //       variables: {
  //         name,
  //         description,
  //         userId: props.userId,
  //       },
  //       refetchQueries: [{ query: getExercisesForUser }],
  //     })
  //     .then(
  //       res => {
  //         setNewExercise(res.data.addExercise)
  //       },
  //       err => console.log(err)
  //     )
  // }

  if (done) {
    props.history.goBack()
    return null
  }
  if (loading) return <Loader />
  if (success) return <Success newExercise={newExercise} setDone={setDone} />
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
          <button className='btn red darken-3'>Save</button>
        </form>

        <button className='btn grey' onClick={() => setDone(true)}>
          Cancel
        </button>
      </>
    )
  }
}

export default withRouter(
  compose(
    graphql(CREATE_EXERCISE_MUTATION, { name: 'createExercise' }),
    graphql(CREATE_EXERCISE_FIELD_MUTATION, { name: 'createField' }),
    graphql(ADD_EXERCISE_TO_USER_MUTATION, { name: 'addExerciseToUser' }),
    graphql(ADD_FIELDS_TO_EXERCISE_MUTATION, { name: 'addFieldsToExercise' })
  )(CreateExercise)
)
