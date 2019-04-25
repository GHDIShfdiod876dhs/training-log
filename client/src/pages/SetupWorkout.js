import React, { useState, useContext } from 'react'
import { graphql, compose } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'

// Components
import Datepicker from '../components/Datepicker'
import TextAreaField from '../components/TextAreaField'

// Queries
import addWorkoutToProgram from '../queries/addWorkoutToProgram'
import addWorkoutToUser from '../queries/addWorkoutToUser'

// Contexts
import UserContext from '../contexts/UserContext'


function SetupWorkout(props) {
  const userId = useContext(UserContext)
  const [description, setDescription] = useState(null)
  const [date, setDate] = useState(String(Date.now()))
  const [canceled, setCanceled] = useState(false)
  const [workout, setWorkout] = useState(null)

  const handleAsyncErr = err => console.log(err)

  //console.log(props)

  const handleSubmit = (e) => {
    if (props.programId) {
      e.preventDefault()
      props.addWorkoutToProgram({
        variables: {
          date,
          description,
          programId: props.programId
        }
      })
      .then(
        ({ data }) => {
          setWorkout(data.addWorkoutToProgram)
        },
        handleAsyncErr
      )
    }
    else {
      e.preventDefault()
      props.addWorkoutToUser({
        variables: {
          date,
          description,
          userId
        }
      })
      .then(
        ({ data }) => {
          setWorkout(data.addWorkoutToUser)
        },
        handleAsyncErr
      )
    }
  }

  if (canceled) {
    return <Redirect to="/create"/>
  }
  else if (workout) {
    return (
      <Redirect to={{
        pathname: `/create/workout/${workout.id}`,
        state: { userId, workout }
      }} />
    )
  }
  return (
    <div className="container">
      <form className="container" onSubmit={ handleSubmit }>
        <p>{props.programId}</p>

        <Datepicker
          id="date"
          label="Date (defaults to today)"
          setDate={ setDate }
        />

        <TextAreaField
          id="workout-description"
          label="Description (optional)"
          onChange={ (e) => setDescription(e.target.value) }
        />

        <button>Let's Go!</button>
      </form>

      <button onClick={ () => setCanceled(true) }>Cancel</button>
    </div>
  )
}


export default withRouter(compose(
  graphql(addWorkoutToProgram, { name: 'addWorkoutToProgram'}),
  graphql(addWorkoutToUser, { name: 'addWorkoutToUser'})
)(SetupWorkout))