import React from 'react'

export default ({ buttonText, handleSubmit, inputs }) => (
  <form onSubmit={handleSubmit}>
    {inputs.map((i, idx) => (
      <div key={idx} className='input-field'>
        <label htmlFor={`input-${idx}`}>{i.label || i.type}</label>

        <input
          required
          id={`input-${idx}`}
          type={i.type}
          ref={node => (i.node = node)}
          autoComplete={
            i.type === 'email'
              ? 'username'
              : i.type === 'password' && i.new
              ? 'new-password'
              : i.type === 'password'
              ? 'current-password'
              : null
          }
        />
      </div>
    ))}

    <button className='btn red darken-3' type='submit'>
      {buttonText}
    </button>
  </form>
)
