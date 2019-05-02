import React from 'react'

export default props => (
  <div className='container'>
    <div className='card blue-grey darken-1'>
      <div className='card-content white-text'>
        <span className='card-title'>Success!</span>
        {props.children}
      </div>
      <div className='card-action'>
        <button className='btn-flat' onClick={props.setDone}>
          Done
        </button>
      </div>
    </div>
  </div>
)