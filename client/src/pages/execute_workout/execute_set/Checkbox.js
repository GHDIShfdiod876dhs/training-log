import React from 'react'
import { graphql } from 'react-apollo'
import updateSetCompletion from '../../../queries/updateSetCompletion'


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
  left: '-0.5rem'
}

const Checkbox = ({ set, completed, setCompleted, updateSetCompletion }) => {
  const { id } = set

  const handleClick = () => {
    updateSetCompletion({
      variables: {
        id,
        completed: !completed
      }
    })
    .then(
      () => setCompleted(!completed),
      err => console.log(err)
    )
  }
  
  return (
    <div
      className="checkbox z-depth-2"
      onClick={handleClick}
      style={ completed ? checkedStyles : uncheckedStyles}
    >
      { completed &&
        <i
          className="material-icons green-text medium"
          style={checkmarkStyles}
        >
          check
        </i>
      }
    </div>
  )
}


export default graphql(
  updateSetCompletion, { name: 'updateSetCompletion' }
)(Checkbox)