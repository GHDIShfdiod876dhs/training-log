import React from 'react'

export default ({ newExercise, setDone }) => (
  <div className='container'>
    <p>Success!</p>
    <h4>{newExercise.name}</h4>
    <p>{newExercise.description}</p>
    <ul>
      {newExercise.fields.map(field => (
        <li key={field}>{field}</li>
      ))}
    </ul>
    <button onClick={() => setDone(true)}>Done</button>
  </div>
)
