import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'

// Components
import TextInputField from '../../components/TextInputField'
import Loader from '../../components/Loader'

// Queries
import {
  CREATE_WORKOUT_FIELD_MUTATION,
  ADD_FIELD_TO_WORKOUT_MUTATION,
  DELETE_WORKOUT_DATA_FIELD_MUTATION,
} from './Mutations'
import getWorkoutById from '../../graphql/queries/getWorkoutById'

function AddCustomFieldsToWorkout(props) {
  const [newField, setNewField] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const { loading, Workout: workout } = props.getWorkoutById
  if (loading) {
    return <Loader />
  }
  const fields = workout.data

  const handleSubmit = e => {
    e.preventDefault()
    props
      .createField({
        variables: {
          name: newField,
        },
      })
      .then(res => {
        console.log(res)
        return props.addFieldToWorkout({
          variables: {
            fieldId: res.data.createWorkoutData.id,
            workoutId: workout.id,
          },
          refetchQueries: ['GET_WORKOUT_QUERY'],
        })
      })
      .then(
        res => {
          console.log(res)
          document.getElementById('field-name').value = null
        },
        err => console.log(err)
      )
  }

  const handleRemove = e => {
    props
      .deleteField({
        variables: {
          id: e.target.id,
        },
        refetchQueries: ['GET_WORKOUT_QUERY'],
      })
      .then(res => console.log('deleted:', res), err => console.log(err))
  }

  return (
    <>
      <ul className='collection with-header z-depth-1'>
        <li className='collection-header grey darken-3 white-text left-align'>
          {fields && fields.length
            ? 'Custom fields for this workout:'
            : 'No custom fields for this workout'}

          <i
            className='material-icons secondary-content white-text'
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'keyboard_arrow_up' : 'add'}
          </i>

          {showForm && (
            <>
              <form onSubmit={handleSubmit}>
                <TextInputField
                  id='field-name'
                  label='Name'
                  onChange={e => setNewField(e.target.value)}
                />

                <button className='btn-flat white-text'>Save</button>
              </form>
            </>
          )}
        </li>

        {fields &&
          fields.map(field => (
            <li className='collection-item' key={field.id}>
              {field.name}
              <i
                id={field.id}
                className='material-icons secondary-content grey-text'
                onClick={handleRemove}
              >
                remove
              </i>
            </li>
          ))}
      </ul>
    </>
  )
}

export default compose(
  graphql(CREATE_WORKOUT_FIELD_MUTATION, { name: 'createField' }),
  graphql(ADD_FIELD_TO_WORKOUT_MUTATION, { name: 'addFieldToWorkout' }),
  graphql(DELETE_WORKOUT_DATA_FIELD_MUTATION, { name: 'deleteField' }),
  graphql(getWorkoutById, {
    options: props => {
      return {
        variables: {
          id: props.workout.id,
        },
      }
    },
    name: 'getWorkoutById',
  })
)(AddCustomFieldsToWorkout)
