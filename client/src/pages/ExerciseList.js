import React, { useState, useEffect } from 'react'
import { compose, graphql } from 'react-apollo'
import M from 'materialize-css'

import Modal from '../components/Modal'

// Queries
import getUserById from '../graphql/queries/getUserById'
import deleteExercise from '../graphql/mutations/deleteExercise'

function ExerciseList({ data, setExercise, deleteExercise }) {
  if (data.loading) {
    return <p className='container'>Loading...</p>
  }

  const [listVisible, setListVisible] = useState(true)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalController, setModalController] = useState(null)
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    data.refetch()
  }, [])

  const { exercises } = data.User

  const displayExercise = exercise => (
    <li className='collection-item' key={exercise.id}>
      <span onClick={() => setExercise(exercise)}>{exercise.name}</span>
      <i
        className='material-icons secondary-content grey-text'
        onClick={() => {
          const newController = handleRemove(exercise)
          setModalController(newController)
          newController.next()
        }}
      >
        remove
      </i>
    </li>
  )

  async function* handleRemove(exercise) {
    let next

    setModalContent(
      `Are you sure you want to delete "${
        exercise.name
      }?" This action will remove the exercise everywhere, and it cannot be undone.`
    )

    setModalOpen(true)
    next = yield
    setModalOpen(false)

    if (next === 'PROCEED') {
      deleteExercise({
        variables: { id: exercise.id },
      }).then(
        ({
          data: {
            deleteExercise: { name },
          },
        }) => {
          data.refetch()
          M.toast({ html: `Successfully deleted exercise "${name}."` })
        },
        err => console.log(err)
      )
    }
  }

  return (
    <>
      {modalController && (
        <Modal
          content={modalContent}
          modalOpen={modalOpen}
          modalController={modalController}
          setModalController={setModalController}
        />
      )}

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
        {listVisible && exercises.map(displayExercise)}
      </ul>
    </>
  )
}

export default compose(
  graphql(deleteExercise, { name: 'deleteExercise' }),
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
