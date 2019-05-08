import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

// Components
import ExecuteSetFields from './ExecuteSetFields'
import Checkbox from './Checkbox'

// Queries
import getSetById from '../../../graphql/queries/getSetById'

function ExecuteSet({ set, getSetById, number, skip }) {
  if (getSetById.loading) return null

  const [completed, setCompleted] = useState(getSetById.Set.completed)
  const [skipped, setSkipped] = useState(false)
  const [showExerciseDetails, setShowExerciseDetails] = useState(false)

  return (
    <li className='collection-item'>
      {skipped && (
        <div
          className='skipped-set grey-text text-darken-3'
          onClick={() => {
            setSkipped(false)
            skip(set)
          }}
        >
          -- Skipped --
        </div>
      )}

      <div className='row valign-wrapper'>
        <div className='col s2 pull-s1 l3'>
          <span className='row valign-wrapper'>
            <Checkbox set={set} completed={completed} setCompleted={setCompleted} />
            {number}
          </span>
        </div>

        <div className='col s9 l8 pull-l1'>
          <h6 onClick={() => setShowExerciseDetails(!showExerciseDetails)}>
            {set.exercise.name}
          </h6>
        </div>

        <div
          className='col s1'
          onClick={() => {
            setSkipped(true)
            skip(set)
          }}
        >
          {!skipped && <i className='material-icons grey-text'>close</i>}
        </div>
      </div>

      {showExerciseDetails && <div>{set.exercise.description}</div>}

      <div className='row'>
        <ExecuteSetFields set={set} />
      </div>
    </li>
  )
}

export default withRouter(
  graphql(getSetById, {
    options: props => {
      return {
        variables: {
          id: props.set.id,
        },
      }
    },
    name: 'getSetById',
  })(ExecuteSet)
)
