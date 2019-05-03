import React, { useEffect, useReducer } from 'react'
import { graphql, compose } from 'react-apollo'

// Components
import NumberInputField from '../../components/NumberInputField'

// Queries
import getWorkoutById from '../../graphql/queries/getWorkoutById'
import updateUserDefinedDataForWorkout from '../../graphql/mutations/updateUserDefinedDataForWorkout'

function reducer(state, action) {
  return {
    ...state,
    [action.id]: { name: action.name, datum: Number(action.datum) },
  }
}

function UserDefinedDataForWorkout(props) {
  const { loading, Workout: workout } = props.getWorkoutById
  if (loading) return <p>Loading...</p>

  const { data } = workout
  const initialState = data.reduce(
    (a, v) => ({ ...a, [v.id]: { name: v.name, datum: v.datum } }),
    {}
  )
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    props.getWorkoutById.refetch().catch(err => console.log(err))
  }, [])

  const handleSubmit = (e, id) => {
    e.preventDefault()
    props
      .updateUserDefinedDataForWorkout({
        variables: {
          id,
          datum: state[id].datum,
        },
      })
      .then(res => console.log(res), err => console.log(err))
  }

  return (
    <li className='collection-header grey darken-3 white-text'>
      {data.length ? 'Custom Fields:' : 'No custom fields'}

      {!!data.length &&
        data
          .filter(name => name[0] !== '_')
          .map(({ id, name, datum }) => (
            <form className='container' onSubmit={e => handleSubmit(e, id)} key={id}>
              <div className='row valign-wrapper'>
                <div className='col s9 pull-s1'>
                  <NumberInputField
                    label={datum ? `${name}: ${datum}` : name}
                    id={id}
                    onChange={e =>
                      dispatch({
                        id,
                        name,
                        datum: e.target.value,
                      })
                    }
                  />
                </div>
                <button className='white-text secondary-content'>Save</button>
              </div>
            </form>
          ))}
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
  graphql(updateUserDefinedDataForWorkout, { name: 'updateUserDefinedDataForWorkout' })
)(UserDefinedDataForWorkout)
