import React, { useState } from 'react'
import { graphql } from 'react-apollo'

// Components
import Set from './display_set/Set'
import Loader from '../../components/Loader'

import GET_WORKOUT_QUERY from '../../graphql/queries/getWorkoutById'

function Workout(props) {
  if (props.data.loading) return <Loader />

  const { sets } = props.data.Workout
  const [numSets, setNumSets] = useState(sets.length)

  return (
    <ul className='collection with-header z-depth-1'>
      <li className='collection-header grey darken-3 white-text left-align'>
        {!sets || sets.length === 0 ? 'No Sets Yet' : 'Workout:'}
      </li>

      {sets.map((set, idx) => (
        <Set
          editable={props.editable}
          key={set.id}
          set={set}
          setNumber={idx + 1}
          numSets={numSets}
          setNumSets={setNumSets}
        />
      ))}
    </ul>
  )
}

export default graphql(GET_WORKOUT_QUERY, {
  options: props => {
    return {
      variables: {
        id: props.workoutId,
      },
    }
  },
})(Workout)
