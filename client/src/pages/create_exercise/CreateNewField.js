import React from 'react'

export default ({ setNewField, forwardedRef }) => (
  <>
    <label htmlFor='name'>Name your custom field:</label>
    <input type='text' ref={forwardedRef} onChange={e => setNewField(e.target.value)} />
  </>
)
