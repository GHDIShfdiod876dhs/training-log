import React from 'react'

export default ({ newProgram, setDone }) => (
  <>
    <h4>{newProgram.name}</h4>
    <p>{newProgram.description}</p>
  </>
)
