import React from 'react'
import { graphql } from 'react-apollo'

import { UPDATE_SET_COMPLETED_MUTATION } from './Mutations'

const checkboxStyles = {
  width: '1.5rem',
  height: '1.5rem',
  margin: '0.5rem',
}

const uncheckedStyles = {
  border: '1px solid #c62828',
  ...checkboxStyles,
}

const checkedStyles = {
  border: '1px solid #4caf50',
  ...checkboxStyles,
}

const checkmarkStyles = {
  fontSize: '3rem',
  position: 'relative',
  top: '-1.25rem',
  left: '-0.5rem',
}

const Checkbox = ({ set, completed, setCompleted, updateSetCompleted }) => {
  const { id } = set

  const handleClick = () => {
    updateSetCompleted({
      variables: {
        id,
        completed: !completed,
      },
    }).then(() => setCompleted(!completed), err => console.log(err))
  }

  return (
    <div
      className='checkbox z-depth-2'
      onClick={handleClick}
      style={completed ? checkedStyles : uncheckedStyles}
    >
      {completed && (
        <i className='material-icons green-text medium' style={checkmarkStyles}>
          check
        </i>
      )}
    </div>
  )
}

export default graphql(UPDATE_SET_COMPLETED_MUTATION, { name: 'updateSetCompleted' })(
  Checkbox
)
