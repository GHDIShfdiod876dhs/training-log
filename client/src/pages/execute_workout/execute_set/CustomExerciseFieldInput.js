import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import M from 'materialize-css'

// Components
import TextInputField from '../../../components/TextInputField'
import Loader from '../../../components/Loader'

// Queries
import {
  ADD_FIELD_TO_EXERCISE_MUTATION,
  ADD_DATA_FIELD_TO_SET_MUTATION,
} from './Mutations'
import getExercise from '../../../graphql/queries/getExercise'
import GET_SET_QUERY from '../../../graphql/queries/getSetById'

function AddCustomExerciseFields(props) {
  const { loading, Exercise: exercise } = props.getExercise
  if (loading) return <Loader />

  const [newField, setNewField] = useState(null)
  console.log('fields from CustomExerciseInput:', exercise.fields)
  console.log('set from CustomExerciseInput:', props.set)

  const handleSubmit = e => {
    e.preventDefault()
    // check for name duplication
    if (exercise.fields.find(elem => elem.name === newField)) {
      return M.toast({
        html: `A field named "${newField}" already exists on this exercise! Please give your new field a unique name.`,
      })
    }
    Promise.all([
      props.addFieldToExercise({
        variables: {
          name: newField,
          exerciseId: exercise.id,
        },
        refetchQueries: [{ query: getExercise, variables: { id: exercise.id } }],
      }),
      props.addFieldToSet({
        variables: {
          name: newField,
          setId: props.set.id,
        },
        refetchQueries: [{ query: GET_SET_QUERY, variables: { id: props.set.id } }],
      }),
    ]).then(
      ([
        ,
        {
          data: {
            createSetDataField: { name, id },
          },
        },
      ]) => {
        M.toast({
          html: `Successfully created field: "${name}!"`,
        })
        setNewField(null)
        props.dispatch({ type: 'NEW_FIELD', name, id })
        document.getElementById('field-name').value = null
      },
      err => console.log(err)
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
    graphql(ADD_FIELD_TO_EXERCISE_MUTATION, { name: 'addFieldToExercise' }),
    graphql(ADD_DATA_FIELD_TO_SET_MUTATION, { name: 'addFieldToSet' }),
    graphql(getExercise, {
      options: props => {
        return {
          variables: {
            id: props.set.exercise.id,
          },
        }
      },
      name: 'getExercise',
    })
  )(AddCustomExerciseFields)
)
