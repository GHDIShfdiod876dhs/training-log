import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

// Components
import ExecuteSet from './execute_set/ExecuteSet'
import WorkoutConditions from './WorkoutConditions'
import UserDefinedDataForWorkout from './UserDefinedDataForWorkout'
import Modal from '../../components/Modal(improved)'
import Collection from '../../components/Collection'

import getWorkoutById from '../../graphql/queries/getWorkoutById'
import { UPDATE_WORKOUT_COMPLETED_MUTATION } from './Mutations'

// Convert Conditions and UserDefinedData to be in drawers/tabs

function ExecuteWokout(props) {
  const { loading, Workout: workout } = props.getWorkoutById
  if (loading) {
    return <p>Loading...</p>
  }

  const userId = workout.user.id
  const [done, setDone] = useState(false)
  const { sets, conditions } = workout
  const [skippedSets, setSkippedSets] = useState([])
  const date = new Date()

  let modalText = null

  const nullConditions = conditions
    ? Object.keys(workout.conditions).filter(key => workout.conditions[key] === null)
    : []

  const incompleteSets = workout.sets
    .filter(set => !set.completed)
    .filter(set => skippedSets.findIndex(s => s.id === set.id) === -1)

  const [everythingComplete, setEverythingComplete] = useState(
    !nullConditions.length && !incompleteSets.length
  )

  if (!incompleteSets.length && !nullConditions.length) {
    if (!everythingComplete) {
      setEverythingComplete(true)
    }
  } else {
    let text = {}
    if (nullConditions.length) text.nullConditions = nullConditions
    if (incompleteSets.length) text.incompleteSets = incompleteSets
    if (everythingComplete) setEverythingComplete(false)
    modalText = formatModalText(text)
  }

  const updateSkippedSets = set => {
    if (skippedSets.some(s => s.id === set.id)) {
      setSkippedSets(skippedSets.filter(s => s.id !== set.id))
    } else {
      setSkippedSets([...skippedSets, set])
    }
  }

  const editWorkout = () => {
    props.history.push({
      pathname: `/create/workout/${workout.id}`,
      state: {
        userId,
        from: `/workout/${workout.id}`,
      },
    })
  }

  const completeWorkout = () => {
    props
      .updateWorkoutCompleted({
        variables: {
          id: workout.id,
          completed: true,
          date: String(date),
        },
      })
      .then(
        res => {
          setDone(true)
          console.log('result:', res)
          setTimeout(() => props.history.push('/workouts'), 750)
        },
        err => console.log(err)
      )
  }

  if (!sets || !sets.length) {
    return <div className='container'>There's nothing here!</div>
  }
  return (
    <div className='container execute-workout-container'>
      <Modal
        actions={{ proceed: completeWorkout }}
        content={modalText}
        id='modal'
        labels={{ proceed: 'Proceed', cancel: 'Cancel' }}
      />

      {done && (
        <div className='execute-workout-complete'>
          <i className='material-icons'>done_outline</i>
        </div>
      )}

      <Collection
        collapsible
        header='Conditions:'
        items={<WorkoutConditions workout={workout} />}
      />

      <Collection
        header={
          <>
            <p>{date.toLocaleDateString('en-US')}</p>
            <p>{workout.description}</p>
          </>
        }
        items={
          <>
            {sets.map((set, idx) => (
              <ExecuteSet
                key={set.id}
                number={idx + 1}
                set={set}
                skip={updateSkippedSets}
              />
            ))}
            <UserDefinedDataForWorkout workout={workout} />
          </>
        }
      />

      <button className='btn-flat' onClick={editWorkout}>
        Edit Workout
      </button>

      {everythingComplete ? (
        <button className='btn-flat' onClick={completeWorkout}>
          Complete Workout
        </button>
      ) : (
        <button className='modal-trigger btn-flat' data-target='modal'>
          Complete Workout
        </button>
      )}
    </div>
  )
}

export default withRouter(
  compose(
    graphql(getWorkoutById, {
      options: props => {
        return {
          variables: {
            id: props.match.params.id,
          },
        }
      },
      name: 'getWorkoutById',
    }),
    graphql(UPDATE_WORKOUT_COMPLETED_MUTATION, { name: 'updateWorkoutCompleted' })
  )(ExecuteWokout)
)

function formatModalText(modalText) {
  return (
    <div className='left-align'>
      {modalText.nullConditions && (
        <ul>
          You haven't entered data for these conditions:
          {modalText.nullConditions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}
      {modalText.incompleteSets && <p>Not all sets are complete!</p>}
      <p>Are you sure you want to continue?</p>
    </div>
  )
}
