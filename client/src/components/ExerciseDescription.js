import React from 'react'
import { graphql, compose } from 'react-apollo'
import ContentEditable from 'react-contenteditable'

// Queries
import getExerciseQuery from '../queries/getExercise'
import updateExerciseName from '../queries/updateExerciseName'
import updateExerciseDescription from '../queries/updateExerciseDescription'
import getExercisesForUserQuery from '../queries/getExercisesForUser'


function ExerciseDescription(props) {
  const handleAsyncErr = err => console.log(err)
  
  const handleNameBlur = (e) => {
    props.updateExerciseName({
      variables: {
        name: e.target.textContent,
        id: props.exerciseId
      },
    refetchQueries: [{ query: getExercisesForUserQuery }]
    })
    .then(
      () => {},
      handleAsyncErr
    )
  }

  const handleDescriptionBlur = (e) => {
    props.updateExerciseDescription({
      variables: {
        description: e.target.textContent,
        id: props.exerciseId
      },
    refetchQueries: [{ query: getExercisesForUserQuery }]
    })
    .then(
      () => {},
      handleAsyncErr
    )
  }

  const { exercise } = props.data
  
  return (
    <div className="card grey lighten-3">
      <div className="card-content">
        { exercise ?
          (
            <>
              <ContentEditable
                className="card-title"
                onBlur={ handleNameBlur }
                html={ exercise.name }
              />
            
              <ContentEditable
                onBlur={ handleDescriptionBlur }
                html={ exercise.description || '' }
              />
            </>
          ) :
          <div className="card-title">Loading...</div>
        }
      </div>
    </div>
  )
}


export default compose(
  graphql(getExerciseQuery, {
    options: props => {
      return {
        variables: {
          id: props.exerciseId
        }
      }
    }
  }),
  graphql(updateExerciseName, { name: 'updateExerciseName' }),
  graphql(updateExerciseDescription, {name: 'updateExerciseDescription'})
)(ExerciseDescription)