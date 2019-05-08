import React from 'react'

export default ({ newExercise }) => (
  <>
    <h4>{newExercise.name}</h4>
    <p>{newExercise.description}</p>
    <ul>
      {newExercise.fields.map((field, idx) => (
        <li key={idx}>{field.name}</li>
      ))}
    </ul>
  </>
)
