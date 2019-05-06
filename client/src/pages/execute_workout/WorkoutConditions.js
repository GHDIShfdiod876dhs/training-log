import React, { useEffect, useReducer } from 'react'
import { graphql, compose } from 'react-apollo'
import formatLabel from '../../utils/formatInputLabel'

// Components
import NumberInputField from '../../components/NumberInputField'

// Queries
import getWorkoutById from '../../graphql/queries/getWorkoutById'
import { UPDATE_CONDITIONS_MUTATION } from './Mutations'

function reducer(state, action) {
  return {
    ...state,
    [action.type]: Number(action.value),
  }
}

function WorkoutConditions(props) {
  const { loading } = props.getWorkoutById
  if (loading) {
    return <p>Loading...</p>
  }

  const { conditions } = props.getWorkoutById.Workout
  const initialState = conditions
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = e => {
    e.preventDefault()
    e.target.value = null
    Array.from(e.target.children).forEach(child => {
      const label = child.firstChild
      const field = label.nextSibling
      if (label && label.nodeName === 'LABEL') {
        label.classList.remove('active')
        field.blur()
        field.value = null
      }
    })
    props
      .updateConditions({
        variables: {
          ...state,
          id: props.workout.conditions.id,
        },
        refetchQueries: ['GET_WORKOUT_QUERY'],
      })
      .then(
        res => {
          console.log(res)
        }, //props.setConditionsVisible(false),
        err => console.log(err)
      )
  }

  return (
    <li className='collection-header grey darken-3 white-text'>
      <form className='container' onSubmit={handleSubmit}>
        {conditions &&
          Object.keys(conditions)
            .filter(name => name[0] !== '_' && name !== 'id')
            .map((condition, i) => (
              <NumberInputField
                key={i}
                label={
                  conditions[condition]
                    ? `${formatLabel(condition)}: ${conditions[condition]}`
                    : formatLabel(condition)
                }
                id={condition}
                onChange={e =>
                  dispatch({
                    type: condition,
                    value: e.target.value,
                  })
                }
              />
            ))}

        <button className='white-text'>Save</button>
      </form>
    </li>
  )
}

export default compose(
  graphql(getWorkoutById, {
    options: props => {
      return {
        variables: {
          id: props.workout.id,
        },
      }
    },
    name: 'getWorkoutById',
  }),
  graphql(UPDATE_CONDITIONS_MUTATION, { name: 'updateConditions' })
)(WorkoutConditions)
