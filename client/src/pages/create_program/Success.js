import React from 'react'

export default ({ newProgram, setDone }) => (
  <div className='container'>
    <p>Success!</p>
    <h4>{newProgram.name}</h4>
    <p>{newProgram.description}</p>

    <button onClick={() => setDone(true)}>Done</button>
  </div>
)
