import React from 'react'


function NumberInputField({ defaultValue, icon, id, label, onChange, onBlur }) {
  return (
    <div className="input-field">
      {
        icon &&
        <i className="material-icons prefix">{ icon }</i>
      }
      
      <label htmlFor={ id }>{ label }</label>
      <input
        defaultValue={defaultValue}
        type="number"
        id={ id }
        onChange={onChange}
        onBlur={onBlur}
      >
      </input>
    </div>
  )
}


export default NumberInputField