import React from 'react'
import { graphql, compose } from 'react-apollo'
import ContentEditable from 'react-contenteditable'
import Loader from './Loader'

// Queries
import getExerciseQuery from '../graphql/queries/getExercise'
import updateExerciseName from '../graphql/mutations/updateExerciseName'
import updateExerciseDescription from '../graphql/mutations/updateExerciseDescription'
import getExercisesForUserQuery from '../graphql/queries/getExercisesForUser'

function ExerciseDescription(props) {
  const { loading, Exercise: exercise } = props.data
  if (loading) return <Loader />

  const handleNameBlur = e => {
    props
      .updateExerciseName({
        variables: {
          name: e.target.textContent,
          id: props.exerciseId,
        },
        refetchQueries: ['GET_USER_QUERY'],
      })
      .catch(err => console.log(err))
  }

  const handleDescriptionBlur = e => {
    props
      .updateExerciseDescription({
        variables: {
          description: e.target.textContent,
          id: props.exerciseId,
        },
        refetchQueries: [{ query: getExercisesForUserQuery }],
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='card grey lighten-3'>
      <div className='card-content'>
        {exercise ? (
          <>
            <ContentEditable
              className='card-title'
              onBlur={handleNameBlur}
              html={exercise.name}
            />

            <ContentEditable
              onBlur={handleDescriptionBlur}
              html={exercise.description || ''}
            />
          </>
        ) : (
          <div className='card-title'>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default compose(
  graphql(getExerciseQuery, {
    options: props => {
      return {
        variables: {
          id: props.exerciseId,
        },
      }
    },
  }),
  graphql(updateExerciseName, { name: 'updateExerciseName' }),
  graphql(updateExerciseDescription, { name: 'updateExerciseDescription' })
)(ExerciseDescription)
