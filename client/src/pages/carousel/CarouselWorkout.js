import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'

import Modal from '../../components/Modal(improved)'
import Workout from '../display_workout/Workout'
import DropdownNotCompleted from './DropdownNotCompleted'
import DropdownCompleted from './DropdownCompleted'
import Datepicker from '../../components/Datepicker'

import deleteWorkout from '../../graphql/mutations/deleteWorkout'
import getUserById from '../../graphql/queries/getUserById'
import updateWorkoutDate from '../../graphql/mutations/updateWorkoutDate'

function WorkoutScheduled({
  workout,
  deleteWorkout,
  peers,
  setPeers,
  updateWorkoutDate,
}) {
  const [date, setDate] = useState(workout.date)
  const [updateDateMode, setUpdateDateMode] = useState(false)

  const removeWorkout = id => {
    deleteWorkout({
      variables: { id },
      refetchQueries: ['GET_USER_QUERY'],
    }).then(
      ({ data: { deleteWorkout } }) => {
        console.log('deleted:', deleteWorkout)
        setPeers(peers.filter(p => p.id !== deleteWorkout.id))
      },
      err => console.log(err)
    )
  }

  const changeWorkoutDate = (id, date) => {
    updateWorkoutDate({
      variables: {
        id,
        date,
      },
      refetchQueries: [{ query: getUserById }],
    }).then(
      res => {
        console.log(res)
        setDate(date)
        setUpdateDateMode(false)
        setPeers(peers.sort((p1, p2) => Number(p1.date) - Number(p2.date)))
        console.log(peers)
      },
      err => console.log(err)
    )
  }

  return (
    <div className='card grey lighten-3' key={workout.id}>
      <div className='card-content'>
        <div className='card-title'>
          {updateDateMode ? (
            <Datepicker inline setDate={date => changeWorkoutDate(workout.id, date)} />
          ) : (
            moment(Number(date)).format('LL')
          )}
          {workout.completed ? (
            <DropdownCompleted workout={workout} />
          ) : (
            <DropdownNotCompleted workout={workout} actions={{ setUpdateDateMode }} />
          )}
        </div>

        <p>{workout.description}</p>

        <Workout workoutId={workout.id} />
      </div>

      <Modal
        actions={{ proceed: () => removeWorkout(workout.id) }}
        content={`Are you sure you want to delete workout for ${moment(
          Number(date)
        ).format('LL')}? This cannot be undone.`}
        id={workout.id}
        labels={{ proceed: 'Delete', cancel: 'Cancel' }}
      />
    </div>
  )
}

export default compose(
  graphql(deleteWorkout, { name: 'deleteWorkout' }),
  graphql(updateWorkoutDate, { name: 'updateWorkoutDate' })
)(WorkoutScheduled)
