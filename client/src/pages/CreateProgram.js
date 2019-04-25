import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'

// Components
import TextInputField from '../components/TextInputField'
import TextAreaField from '../components/TextAreaField'

// Queries
import addProgram from '../queries/addProgram'


function CreateProgram({ addProgram, userId }) {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    addProgram({
      variables: {
        name,
        description,
        startDate: String(Date.now()),
        userId
      }
    })
    .then(
      () => {
        setDone(true)
      },
      err => console.log(err)
    )
  }

  if (done) {
    return <Redirect to='/create'/>
  }
  return (
    <div className="container">
      <p>Creating a new program for { userId }</p>
      <form onSubmit={ handleSubmit }>

        <TextInputField
          id="program-name"
          label="Give your new program a name:"
          onChange={ (e) => setName(e.target.value) }
        />

        <TextAreaField
          id="program-description"
          label="Describe your new program (optional):"
          onChange={ (e) => setDescription(e.target.value) }
        />

        <button>Create!</button>
      </form>
      
      <button onClick={ () => setDone(true) }>Back</button>
    </div>
  )
}


export default withRouter(
  graphql(addProgram, { name: 'addProgram' })(CreateProgram))
