import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter, Redirect } from 'react-router-dom'

// Components
import ExerciseDescription from '../components/ExerciseDescription'
import NumberInputField from '../components/NumberInputField'
import TextAreaField from '../components/TextAreaField'

// Queries
import addSet from '../graphql/mutations/addSet'
import addUserDefinedDataToSet from '../graphql/mutations/addUserDefinedDataToSet'

function CreateSet(props) {
  const [reps, setReps] = useState(null)
  const [weight, setWeight] = useState(null)
  const [time, setTime] = useState(null)
  const [notes, setNotes] = useState(null)
  const [customFieldVals, setCustomFieldVals] = useState(null /* todo */)
  const [numberOfSets, setNumberOfSets] = useState(1)
  const [done, setDone] = useState(false)
  const { exercise, setNumber, workout } = props.location.state

  if (done) {
    return (
      <Redirect
        to={{
          pathname: `/create/workout/${workout.id}`,
          state: { workout },
        }}
      />
    )
  }

  const customFields = () => {
    const fields = exercise.customFields
    if (fields) {
      return fields.map(({ name, id }) => {
        return (
          <NumberInputField
            key={id}
            id={`${name}-field`}
            label={`${name} (optional)`}
            onChange={e => {
              setCustomFieldVals({
                ...customFields,
                [name]: Number(e.target.value),
              })
            }}
          />
        )
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const ps = []
    for (let i = 0; i < numberOfSets; i++) {
      ps[i] = props
        .addSet({
          variables: {
            number: setNumber + i + 1,
            reps,
            weight,
            time,
            notes,
            exerciseId: exercise.id,
            workoutId: workout.id,
          },
        })
        .then(
          ({ data }) => {
            for (let customField in customFieldVals) {
              props.addUserDefinedData({
                variables: {
                  name: customField,
                  datum: customFieldVals[customField],
                  setId: data.addSet.id,
                },
              })
            }
          },
          err => console.log(err)
        )
    }

    Promise.all(ps).then(
      () => {
        setDone(true)
      },
      err => console.log(err)
    )
  }

  return (
    <div className='container'>
      <ExerciseDescription exerciseId={exercise.id} />

      <form className='container' onSubmit={handleSubmit}>
        {customFields()}

        <NumberInputField
          id='reps-field'
          label='Reps (optional)'
          onChange={e => setReps(+e.target.value)}
        />

        <NumberInputField
          id='weight-field'
          label='Weight (optional)'
          onChange={e => setWeight(+e.target.value)}
        />

        <NumberInputField
          id='time-field'
          label='Time (optional)'
          onChange={e => setTime(+e.target.value)}
        />

        <TextAreaField
          id='notes-field'
          label='Notes (optional)'
          onChange={e => setNotes(e.target.value)}
        />

        <div className='row valign-wrapper'>
          <div className='col s2 pull-s1'>
            <button>Create</button>
          </div>
          <div className='col s2 pull-s4'>
            <NumberInputField
              defaultValue={numberOfSets}
              id='number-of-sets-field'
              onChange={e => setNumberOfSets(e.target.value)}
            />
          </div>
        </div>
      </form>

      <button onClick={() => setDone(true)}>Cancel</button>
    </div>
  )
}

export default withRouter(
  compose(
    graphql(addSet, { name: 'addSet' }),
    graphql(addUserDefinedDataToSet, { name: 'addUserDefinedData' })
  )(CreateSet)
)
