import React from 'react'

export default ({ newExercise }) => (
  <>
    <h4>{newExercise.name}</h4>
    <p>{newExercise.description}</p>
    <ul>
      {newExercise.fields.map(field => (
        <li key={field}>{field}</li>
      ))}
    </ul>
  </>
)
