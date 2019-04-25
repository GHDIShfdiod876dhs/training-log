import React from 'react'


function TextInputField({ icon, id, label, onChange }) {
  
  return (
    <div className="input-field">
      { 
        icon &&
        <i className="material-icons prefix">{ icon }</i>
      }

      <label htmlFor={ id }>{ label }</label>
      
      <input
        id={ id }
        type="text"
        onChange={ onChange }
      >
      </input>
    </div>
  )
}


export default TextInputField