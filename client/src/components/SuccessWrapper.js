import React from 'react'

export default props => (
  <div className='container'>
    <div className='card grey darken-3'>
      <div className='card-content white-text'>
        <span className='card-title'>Success!</span>
        {props.children}
      </div>
      <div className='card-action'>
        <button className='btn-flat white-text' onClick={props.setDone}>
          Done
        </button>
      </div>
    </div>
  </div>
)
