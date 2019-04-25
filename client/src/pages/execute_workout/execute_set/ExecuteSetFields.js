import React, { useReducer } from 'react'
import { graphql, compose } from 'react-apollo'
import formatLabel from '../../../utils/formatInputLabel'

import NumberInputField from '../../../components/NumberInputField'

import updateSetData from '../../../queries/updateSetData'
import addUserDefinedDataToSet from '../../../queries/addUserDefinedDataToSet'
import updateCustomSetData from '../../../queries/updateCustomSetData'


function reducer(fields, action) {
  return {
    ...fields,
    [action.name]: { ...fields[action.name], value: Number(action.value) }
  }
}


function ExecuteSetFields({
  set,
  updateSetData,
  addUserDefinedDataToSet,
  updateCustomSetData
}) {
  
  const defaultFields = {
    weight: { value: set.weight },
    reps: { value: set.reps },
    time: { value: set.time },
    notes: { value: set.notes }
  }
  const customFields = set.exercise.customFields.map(field => {
    const value = set.userDefinedData.find(item => item.name ===field.name)
    return {
      [field.name]: {
        id: field.id,
        value: value ? Number(value.datum) : null
      }
    }
  })

  let initialState = {...defaultFields}
  customFields.forEach(field => initialState = {...initialState, ...field})

  const [fields, dispatch] = useReducer(reducer, initialState)

  const handleBlur = (name) => {
    if (name in defaultFields) {
      updateSetData({
        variables : {
          id: set.id,
          reps: fields.reps.value,
          weight: fields.weight.value,
          time: fields.time.value,
          notes: fields.notes.value
        }
      })
      .then(
        res => console.log(res),
        err => console.log(err)
      )
    }
    else {
      const prevVal = set.userDefinedData.find(item => item.name === name)
      if (prevVal) {
        updateCustomSetData({
          variables: {
            id: prevVal.id,
            datum: fields[name].value
          }
        })
        .then(
          res => console.log(res),
          err => console.log(err)
        )
      }
      else {
        addUserDefinedDataToSet({
          variables: {
            setId: set.id,
            name,
            datum: fields[name].value
          }
        })
        .then(
          res => console.log(res),
          err => console.log(err)
        )
      }
    }
  }

  return (
    <>
      { Object.keys(fields)
        .map(name =>
          <NumberInputField
            key={name}
            id={name}
            label={
              fields[name].value
                ? `${formatLabel(name)}: ${fields[name].value}`
                : formatLabel(name)
              }
            onChange={ e => dispatch({ name, value: e.target.value}) }
            onBlur={ () => handleBlur(name) }
          />
        )
      }
    </>
  )
}


export default compose(
  graphql(updateSetData, { name: 'updateSetData' }),
  graphql(addUserDefinedDataToSet, { name: 'addUserDefinedDataToSet' }),
  graphql(updateCustomSetData, { name: 'updateCustomSetData' })
)(ExecuteSetFields)