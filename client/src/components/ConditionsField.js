import React from 'react'


function ConditionsField({ id, label, value, onChange }) {
  return (
    <div className="input-field conditions-field">
      <label htmlFor={ id }><span>{ label } { value }</span></label>
      <input
        type="number"
        id={ id }
        onChange={ onChange }
      >
      </input>
    </div>
  )
}


export default ConditionsField