import React from 'react'

function TextInputField({ icon, id, label, onChange, required }) {
  return (
    <div className='input-field'>
      {icon && <i className='material-icons prefix'>{icon}</i>}

      <label htmlFor={id}>{label}</label>

      <input required={required} id={id} type='text' onChange={onChange} />
    </div>
  )
}

export default TextInputField
