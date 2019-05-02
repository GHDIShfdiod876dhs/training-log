import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { Redirect } from 'react-router-dom'

// Components
import TextInputField from '../../components/TextInputField'
import TextAreaField from '../../components/TextAreaField'
import Loader from '../../components/Loader'
import Success from './Success'
import Wrapper from '../../components/SuccessWrapper'

// Queries
// import addProgram from '../../graphql/mutations/addProgram'
import { ADD_PROGRAM_TO_USER_MUTATION, CREATE_PROGRAM_MUTATION } from './Mutations'

function CreateProgram({ createProgram, addProgramToUser, userId }) {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [newProgram, setNewProgram] = useState(null)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    createProgram({
      variables: {
        name,
        description,
      },
    })
      .then(({ data: { createProgram: { id: programId } } }) => {
        // console.log(res)
        return addProgramToUser({
          variables: {
            userId,
            programId, //: res.data.createProgram.id,
          },
        })
      })
      .then(
        ({
          data: {
            addToUserPrograms: { programsProgram: newProgram },
          },
        }) => {
          console.log(newProgram)
          setLoading(false)
          setNewProgram(newProgram)
          setSuccess(true)
        },
        err => console.log(err)
      )
  }

  if (done) return <Redirect to='/' />
  if (loading) return <Loader />
  if (success)
    return (
      <Wrapper setDone={setDone}>
        <Success newProgram={newProgram} />
      </Wrapper>
    )
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <TextInputField
          id='program-name'
          label='Give your new program a name:'
          onChange={e => setName(e.target.value)}
        />

        <TextAreaField
          id='program-description'
          label='Describe your new program (optional):'
          onChange={e => setDescription(e.target.value)}
        />

        <button className='btn red darken-3'>Create!</button>
      </form>

      {/* <button onClick={() => setDone(true)}>Home</button> */}
    </div>
  )
}

export default compose(
  graphql(CREATE_PROGRAM_MUTATION, { name: 'createProgram' }),
  graphql(ADD_PROGRAM_TO_USER_MUTATION, { name: 'addProgramToUser' })
)(CreateProgram)
