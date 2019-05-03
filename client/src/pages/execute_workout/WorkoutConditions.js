import React, { useEffect, useReducer } from 'react'
import { graphql, compose } from 'react-apollo'
import formatLabel from '../../utils/formatInputLabel'

// Components
import NumberInputField from '../../components/NumberInputField'

// Queries
import getWorkoutById from '../../graphql/queries/getWorkoutById'
import updateConditions from '../../graphql/mutations/updateConditions'

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

  useEffect(() => {
    props.getWorkoutById.refetch().catch(err => console.log(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    props
      .updateConditions({
        variables: {
          ...state,
          workoutId: props.workout.id,
        },
      })
      .then(
        () => {}, //props.setConditionsVisible(false),
        err => console.log(err)
      )
  }

  return (
    <li className='collection-header grey darken-3 white-text'>
      <form className='container' onSubmit={handleSubmit}>
        {conditions &&
          Object.keys(conditions)
            .filter(name => name[0] !== '_')
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
  graphql(updateConditions, { name: 'updateConditions' })
)(WorkoutConditions)
