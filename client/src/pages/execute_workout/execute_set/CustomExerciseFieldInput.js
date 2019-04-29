import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import M from 'materialize-css'

// Components
import TextInputField from '../../../components/TextInputField'

// Queries
import addCustomExerciseField from '../../../graphql/mutations/addCustomExerciseField'
import getExercise from '../../../graphql/queries/getExercise'

function AddCustomExerciseFields(props) {
  const { loading, exercise } = props.getExercise
  if (loading) return <>Loading...</>

  const [newField, setNewField] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    props
      .addCustomExerciseField({
        variables: {
          name: newField,
          exerciseId: exercise.id,
        },
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

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        id='field-name'
        label='New field'
        onChange={e => setNewField(e.target.value)}
      />

      {newField == null ? <button disabled>Save</button> : <button>Save</button>}
    </form>
  )
}

export default withRouter(
  compose(
    graphql(addCustomExerciseField, { name: 'addCustomExerciseField' }),
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
