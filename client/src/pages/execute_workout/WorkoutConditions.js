import React, { useRef, useReducer } from 'react'
import { graphql, compose } from 'react-apollo'
import formatLabel from '../../utils/formatInputLabel'

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
  const fields = useRef([])

  const handleSubmit = e => {
    e.preventDefault()

    fields.current.forEach(field => {
      field.children[0].classList.remove('active')
      field.children[1].blur()
      field.children[1].value = ''
    })

    props
      .updateConditions({
        variables: {
          ...state,
          id: props.workout.conditions.id,
        },
        refetchQueries: ['GET_WORKOUT_QUERY'],
      })
      .then(res => console.log(res), err => console.log(err))
  }

  return (
    <li className='collection-header grey darken-3 white-text'>
      <form className='container' onSubmit={handleSubmit}>
        {conditions &&
          Object.keys(conditions)
            .filter(name => name[0] !== '_' && name !== 'id')
            .map((condition, i) => (
              <div
                key={i}
                ref={node => (fields.current[i] = node)}
                className='input-field'
              >
                <label htmlFor={condition}>
                  {formatLabel(condition)}
                  {conditions[condition] && (
                    <>
                      <span>: </span>
                      <span className='white-text'>{conditions[condition]}</span>
                    </>
                  )}
                </label>
                <input
                  type='number'
                  id={condition}
                  onChange={e =>
                    dispatch({
                      type: condition,
                      value: e.target.value,
                    })
                  }
                />
              </div>
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
