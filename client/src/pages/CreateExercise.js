import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

// Components
import WhatAreCustomExerciseFields from './WhatAreCustomExerciseFields'
import TextInputField from '../components/TextInputField'
import TextAreaField from '../components/TextAreaField'
import ModalButton from '../components/ModalButton'

// Queries
import addExerciseMutation from '../queries/addExercise'
import getExercisesForUser from '../queries/getExercisesForUser'


function CreateExercise(props) {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [newExercise, setNewExercise] = useState(null)

  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addExercise({
      variables: {
        name,
        description,
        userId: props.userId
      },
      refetchQueries: [{ query: getExercisesForUser }]
    })
    .then(
      res => {
        setNewExercise(res.data.addExercise)
      },
      err => console.log(err)
    )
  }

  if (done) {
    props.history.goBack()
    return null
  }
  
  else if (!newExercise) {
    return (
      <>
        <form className="container" onSubmit={ handleSubmit }>

          <TextInputField
            id="exercise-name"
            label="Name"
            onChange={ (e) => setName(e.target.value) }
          />

          <TextAreaField
            id="exercise-description"
            label="Description (optional)"
            onChange={ (e) => setDescription(e.target.value) }
          />

          <button>Save</button>

        </form>

        <button onClick={ () => setDone(true) }>Cancel</button>
      </>
    )
  } else {
    return (
      <>
        <div>
          <p>Would you like to add custom fields to "{ name }"?</p>
          <button onClick={ () =>
              props.history.push(`/customize_exercise/${newExercise.id}`)
            }
          >
            Yes
          </button>
          <button onClick={ () => setDone(true) }>
            No
          </button>
        </div>

        <ModalButton
          buttonText="What's this?"
          content={ <WhatAreCustomExerciseFields /> }
          name="WhatAreCustomExerciseFields?"
        />
      </>
    )
  }
}


export default withRouter(graphql(addExerciseMutation, { name: 'addExercise' })(CreateExercise))