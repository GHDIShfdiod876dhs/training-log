import React from 'react'
import { Link } from 'react-router-dom'


function CreateSetButtonsPanel({ setNumber, workout, exercise, setExercise }) {
  return (
    <div className="card grey lighten-3">
      <div className="card-action">

        <Link to={{
          pathname: '/create/set',
          state: { exercise, setNumber, workout }
        }}>Create a set</Link>
        {/* <button
          // className="waves-effect waves-light btn-small grey darken-3"
          onClick={ () => setCreateSet(true) }
        >
          Create a set
        </button> */}
        <button 
          // className="waves-effect waves-light btn-small grey darken-3"
          onClick={ () => setExercise(null) }
        >
          Close description
        </button>
      </div>
    </div>
  )
}

export default CreateSetButtonsPanel