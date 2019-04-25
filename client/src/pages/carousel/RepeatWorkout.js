import React from 'react'
import { compose, graphql } from 'react-apollo'
import addWorkoutToUser from '../../queries/addWorkoutToUser'
import addSet from '../../queries/addSet'
import addUserDefinedDataToSet from '../../queries/addUserDefinedDataToSet'
import addUserDefinedDataToWorkout from '../../queries/addUserDefinedDataToWorkout'


const repeatWorkout = (
  { workout, history, addWorkoutToUser, addSet, addUserDefinedDataToSet }) => {
  let newWorkoutId
  const handleClick = () => {
    addWorkoutToUser({
      variables: {
        date: new Date(),
        description: workout.description,
        userId: workout.userId
      }
    })
    .then(
      ({ data }) => {
        newWorkoutId = data.addWorkoutToUser.id
        const ps = []
        for (let set of workout.sets) {
          ps.push(
            addSet({
              variables: {
                number: set.number,
                reps: set.reps,
                weight: set.weight,
                time: set.time,
                notes: set.notes,
                exerciseId: set.exercise.id,
                workoutId: newWorkoutId
              }
            })
            .then(
              res => copyCustomData(
                res, 'addSet', addUserDefinedDataToSet, set.userDefinedData
              )
            )
          )
        }
        return Promise.all(ps)
      }
    )
    .then(
      res => copyCustomData(
        res, 'addWorkoutToUser', addUserDefinedDataToWorkout, workout.userDefinedData
      )
    )
    .then(
      () => history.push(`/workout/${newWorkoutId}`),
      err => console.log(err)
    )
  }

  return <span onClick={handleClick}>Repeat this workout</span>
}


export default compose(
  graphql(addWorkoutToUser, { name: 'addWorkoutToUser' }),
  graphql(addSet, { name: 'addSet' }),
  graphql(addUserDefinedDataToSet, { name: 'addUserDefinedDataToSet' }),
  graphql(addUserDefinedDataToWorkout, { name: 'addUserDefinedDataToWorkout' })
)(repeatWorkout)


function copyCustomData({ data }, prevOp, nextOp, iterable) {
    const ps = []
    const { id } = data[prevOp]
    for (let field of iterable) {
      ps.push(
        nextOp({
          variables: {
            name: field.name,
            datum: field.datum,
            setId: id
          }
        })
      )
    }
    return Promise.all(ps)
}