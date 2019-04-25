import React from 'react'


function TextAreaField({ icon, id, label, onChange }) {
  
  return (
    <div className="input-field">
      <i className="material-icons prefix">{ icon || 'notes' }</i>
      <label htmlFor={ id }>{ label }</label>
      <textarea
        className="materialize-textarea"
        id={ id }
        onChange={ onChange }
      >
      </textarea>
    </div>
  )
}


export default TextAreaField