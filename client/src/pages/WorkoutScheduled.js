import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'

import SetScheduled from './SetScheduled'
import Modal from '../components/Modal'

import deleteWorkout from '../queries/deleteWorkout'
import getUserById from '../queries/getUserById'


function WorkoutScheduled({ workout, deleteWorkout, peers, setPeers }) {
  let { sets } = workout

  const startOfDayToday = moment(new Date()).startOf('day')
  const pastWorkout = workout.date < startOfDayToday

  const [modalOpen, setModalOpen] = useState(false)
  const [modalController, setModalController] = useState(null)

  function* trashWorkout(workout) {
    setModalOpen(true)
    let next = yield
    setModalOpen(false)

    if (next === 'PROCEED') {
      deleteWorkout({
        variables: {
          id: workout.id
        },
        refetchQueries: [{ query: getUserById }]
      }).then(
        ({ data: { deleteWorkout } }) => {
          console.log('deleted:', deleteWorkout)
          setPeers(peers.filter(p => p !== deleteWorkout.id))
        },
        err => console.log(err)
      )
    } 
  }
  
  if (pastWorkout || workout.completed) {
    sets = sets.filter(set => set.completed)
    if (!workout.completed || !sets.length) return null
  }

  return (
    <div className="card grey lighten-3" key={workout.id}>
      <div className="card-content">

        <div className="card-title">
          { moment(Number(workout.date)).format('LL') }
          { !pastWorkout && !workout.completed &&
            <i
              className="material-icons secondary-content"
              onClick={ () => {
                const modalController = trashWorkout(workout)
                setModalController(modalController)
                modalController.next()
              } }
            >
              delete
            </i>
          }
        </div>

        <p>{workout.description}</p>

        <ol>
          { sets.map(set => <li key={set.id}><SetScheduled set={set} /></li>) }
        </ol>

      </div>

      { modalController &&
        <Modal
          key={workout.id}
          content={`Are you sure you want to delete workout for ${moment(Number(workout.date)).format('LL')}? This cannot be undone.`}
          modalOpen={modalOpen}
          modalController={modalController}
          setModalController={setModalController}
        />
      }
    </div>
  )
}

export default graphql(
  deleteWorkout, { name: 'deleteWorkout' }
)(WorkoutScheduled)