import React from 'react'
import { Mutation } from 'react-apollo'
import moment from 'moment'

import REPEAT_WORKOUT_MUTATION from './Mutations'

export default ({ workout, history }) => {
  const date = moment()
    .valueOf()
    .toString()

  const clonedWorkoutData = workout.data.map(x => ({
    name: x.name,
    value: x.value,
    unit: x.unit,
  }))

  const clonedSets = workout.sets.map(x => ({
    number: x.number,
    notes: x.notes,
    completed: false,
    exerciseId: x.exercise.id,
    data: x.data.map(y => ({ name: y.name, value: y.value })),
  }))

  return (
    <Mutation mutation={REPEAT_WORKOUT_MUTATION}>
      {repeatWorkout => (
        <span
          onClick={() => {
            repeatWorkout({
              variables: {
                date,
                description: workout.description,
                userId: workout.user.id,
                programId: null, // get current program
                data: clonedWorkoutData,
                sets: clonedSets,
              },
            }).then(
              ({
                data: {
                  createWorkout: { id },
                },
              }) => history.push(`/workout/${id}`),
              err => console.log(err)
            )
          }}
        >
          Repeat this workout
        </span>
      )}
    </Mutation>
  )
}
