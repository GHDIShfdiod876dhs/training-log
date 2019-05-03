import React, { useReducer, useState } from 'react'
import { graphql, compose } from 'react-apollo'
import formatLabel from '../../../utils/formatInputLabel'

import NumberInputField from '../../../components/NumberInputField'
import CustomExerciseFieldInput from './CustomExerciseFieldInput'

import {
  UPDATE_SET_DATA_FIELD_MUTATION,
  // ADD_DATA_FIELD_TO_SET_MUTATION,
} from './Mutations'
// import GET_SET_QUERY from '../../../graphql/queries/getSetById'
import GET_EXERCISE_QUERY from './../../../graphql/queries/getExercise'

function reducer(fields, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...fields,
        [action.name]: { ...fields[action.name], value: Number(action.value) },
      }
    case 'NEW_FIELD':
      return {
        ...fields,
        [action.name]: { id: action.id, value: null },
      }
    default:
      throw new Error('invalid action type on execute set fields reducer')
  }
}

function ExecuteSetFields({ set, updateSetDataField, getExercise }) {
  if (getExercise.loading) return null

  const [showAddField, setShowAddField] = useState(false)
  const initialState = [...getExercise.Exercise.fields, ...set.data].reduce(
    (acc, field) => {
      return {
        ...acc,
        [field.name]: { id: field.id, value: field.value },
      }
    },
    {}
  )

  const [fields, dispatch] = useReducer(reducer, initialState)

  const handleBlur = (e, { name, id, value }) => {
    // gross, fix
    e.target.value = null
    e.target.previousSibling.classList.remove('active')

    updateSetDataField({
      variables: {
        id,
        value,
      },
    }).then(res => console.log(res), err => console.log(err))
  }

  return (
    <>
      {Object.entries(fields).map(([name, { id, value }]) => (
        <NumberInputField
          key={id}
          id={name}
          label={value ? `${formatLabel(name)}: ${value}` : formatLabel(name)}
          onChange={e => dispatch({ type: 'UPDATE_VALUE', name, value: e.target.value })}
          onBlur={e => handleBlur(e, { name, id, value })}
        />
      ))}
      {showAddField && <CustomExerciseFieldInput dispatch={dispatch} set={set} />}
      <i
        className='align-right material-icons grey-text'
        onClick={() => setShowAddField(!showAddField)}
      >
        {showAddField ? 'keyboard_arrow_up' : 'add'}
      </i>
    </>
  )
}

export default compose(
  graphql(GET_EXERCISE_QUERY, {
    name: 'getExercise',
    options: props => {
      return {
        variables: {
          id: props.set.exercise.id,
        },
      }
    },
  }),
  // graphql(GET_SET_QUERY, { name: 'get set' }),
  graphql(UPDATE_SET_DATA_FIELD_MUTATION, { name: 'updateSetDataField' })
  // graphql(ADD_DATA_FIELD_TO_SET_MUTATION, { name: 'addDataFieldToSet' })
)(ExecuteSetFields)
