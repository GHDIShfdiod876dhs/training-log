import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import M from 'materialize-css'

// Components
import TextInputField from '../components/TextInputField'

// Queries
import addCustomExerciseField from '../graphql/mutations/addCustomExerciseField'
import deleteCustomExerciseField from '../graphql/mutations/deleteCustomExerciseField'
import getExercise from '../graphql/queries/getExercise'

// consider refactoring to use CustomExerciseFieldInput

function AddCustomExerciseFields(props) {
  const { loading, exercise } = props.getExercise
  if (loading) return <>Loading...</>

  const [newField, setNewField] = useState(null)

  const defaultFields = [
    { key: 0, name: 'Reps' },
    { key: 1, name: 'Weight' },
    { key: 2, name: 'Time' },
  ]

  const listFields = () => {
    let fieldsList = defaultFields
    let prevFields = exercise.customFields
    if (prevFields) {
      prevFields = prevFields.map((field, i) => {
        return { key: i + 3, name: field.name, id: field.id }
      })
      fieldsList = [...defaultFields, ...prevFields]
    }
    return fieldsList.map(field => (
      <li className='collection-item' key={field.key}>
        {field.name}
        {field.key > 2 && (
          <i
            className='material-icons secondary-content grey-text'
            onClick={() => handleRemove(field.id)}
          >
            remove
          </i>
        )}
      </li>
    ))
  }

  const handleSubmit = e => {
    e.preventDefault()
    props
      .addCustomExerciseField({
        variables: {
          name: newField,
          exerciseId: exercise.id,
        },
        refetchQueries: [{ query: getExercise }],
      })
      .then(
        ({
          data: {
            addCustomExerciseField: { name },
          },
        }) => {
          M.toast({
            html: `Successfully created field: "${name}!"`,
          })
          setNewField(null)
          props.getExercise.refetch()
          document.getElementById('field-name').value = null
        },
        err => {
          if (err.message.includes('REPEATED_FIELD_NAME_ERROR')) {
            M.toast({
              html: `A field named "${newField}" already exists on this exercise! Please give your new field a unique name.`,
            })
          }
          console.log(err.message)
        }
      )
  }

  const handleRemove = id => {
    props
      .deleteCustomExerciseField({
        variables: { id },
      })
      .then(
        ({
          data: {
            deleteCustomExerciseField: { name },
          },
        }) => {
          M.toast({
            html: `Successfully deleted field "${name}."`,
          })
          props.getExercise.refetch()
        },
        err => console.log(err)
      )
  }

  return (
    <div className='container'>
      <ul className='collection with-header'>
        <li className='collection-header'>Fields for "{exercise.name}":</li>
        {listFields()}
      </ul>

      <form onSubmit={handleSubmit}>
        <TextInputField
          id='field-name'
          label='Name'
          onChange={e => setNewField(e.target.value)}
        />

        {newField == null ? <button disabled>Save</button> : <button>Save</button>}
      </form>

      <p onClick={() => props.history.goBack()}>Exit</p>
    </div>
  )
}

export default withRouter(
  compose(
    graphql(addCustomExerciseField, { name: 'addCustomExerciseField' }),
    graphql(deleteCustomExerciseField, { name: 'deleteCustomExerciseField' }),
    graphql(getExercise, {
      options: props => {
        return {
          variables: {
            id: (props.exercise && props.exercise.id) || props.match.params.id,
          },
        }
      },
      name: 'getExercise',
    })
  )(AddCustomExerciseFields)
)
