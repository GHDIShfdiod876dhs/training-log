import React, { useState } from 'react'
import { compose, graphql } from 'react-apollo'
import M from 'materialize-css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../../ListTransitions.css'

import Modal from '../../components/Modal(improved)'

import getUserById from '../../graphql/queries/getUserById'
import { DELETE_EXERCISE_MUTATION } from './Mutations'

function ExerciseList({ data, setExercise, deleteExercise }) {
  if (data.loading) {
    return <p className='container'>Loading...</p>
  }

  const [listVisible, setListVisible] = useState(true)

  const { exercises } = data.User

  const displayExercise = exercise => (
    <li className='collection-item' key={exercise.id}>
      <span onClick={() => setExercise(exercise)}>{exercise.name}</span>
      <i
        className='material-icons secondary-content grey-text modal-trigger'
        data-target={`delete-exercise-${exercise.id}-modal`}
      >
        remove
      </i>

      <Modal
        id={`delete-exercise-${exercise.id}-modal`}
        content={`Are you sure you want to delete "${
          exercise.name
        }?" This action will remove the exercise everywhere, and it cannot be undone.`}
        actions={{ proceed: () => handleRemove(exercise.id) }}
        labels={{ proceed: 'Delete', cancel: 'Cancel' }}
      />
    </li>
  )

  function handleRemove(id) {
    deleteExercise({
      variables: { id },
      refetchQueries: ['GET_USER_QUERY'],
    }).then(
      ({
        data: {
          deleteExercise: { name },
        },
      }) => M.toast({ html: `Successfully deleted exercise "${name}."` }),
      err => console.log(err)
    )
  }

  return (
    <>
      <ul className='collection with-header z-depth-1'>
        <li className='collection-header grey darken-3 white-text left-align'>
          Or Select an Exercise:
          <span
            className='secondary-content'
            onClick={() => setListVisible(!listVisible)}
          >
            {listVisible ? (
              <i className='material-icons white-text'>keyboard_arrow_up</i>
            ) : (
              <i className='material-icons white-text'>keyboard_arrow_down</i>
            )}
          </span>
        </li>
        <ReactCSSTransitionGroup
          transitionName='list-transition'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {listVisible && exercises.map(displayExercise)}
        </ReactCSSTransitionGroup>
      </ul>
    </>
  )
}

export default compose(
  graphql(DELETE_EXERCISE_MUTATION, { name: 'deleteExercise' }),
  graphql(getUserById, {
    options: props => {
      return {
        variables: {
          id: props.userId,
        },
      }
    },
  })
)(ExerciseList)
