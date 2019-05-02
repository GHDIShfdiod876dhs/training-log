import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'

// Components
import TextInputField from '../../components/TextInputField'

// Queries
import addUserDefinedDataToWorkout from '../../graphql/mutations/addUserDefinedDataToWorkout'
import deleteUserDefinedDataFromWorkout from '../../graphql/mutations/deleteUserDefinedDataFromWorkout'
import getWorkoutById from '../../graphql/queries/getWorkoutById'

function AddCustomFieldsToWorkout(props) {
  const [newField, setNewField] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const { loading, Workout: workout } = props.getWorkoutById
  if (loading) {
    return <div>Loading...</div>
  }

  const fields = workout.userDefinedData

  const handleSubmit = e => {
    e.preventDefault()
    props
      .addUserDefinedDataToWorkout({
        variables: {
          name: newField,
          workoutId: workout.id,
        },
      })
      .then(
        ({ data }) => {
          props.getWorkoutById.refetch()
          document.getElementById('field-name').value = null
        },
        err => console.log(err)
      )
  }

  const handleRemove = e => {
    props
      .deleteUserDefinedDataFromWorkout({
        variables: {
          id: e.target.id,
        },
      })
      .then(
        res => {
          console.log('deleted:', res)
          props.getWorkoutById.refetch()
        },
        err => console.log(err)
      )
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
  graphql(addUserDefinedDataToWorkout, { name: 'addUserDefinedDataToWorkout' }),
  graphql(deleteUserDefinedDataFromWorkout, { name: 'deleteUserDefinedDataFromWorkout' }),
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
