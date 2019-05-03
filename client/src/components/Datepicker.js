import React, { useEffect } from 'react'
import M from 'materialize-css'

function Datepicker({ id, inline, label, setDate }) {
  useEffect(() => {
    //let elem = document.querySelector('.datepicker');
    const instance = M.Datepicker.init(document.querySelector('.datepicker'), {
      onSelect: newDate => setDate(String(newDate.getTime())),
      defaultDate: new Date(),
      setDefaultDate: true,
    })

    return () => instance.destroy()
  }, [])

  return (
    <>
      <div className='input-field' style={inline && { display: 'inline-block' }}>
        <i className='material-icons prefix'>calendar_today</i>
        <label htmlFor={id}>{label}</label>
        <input className='datepicker' id={id} type='text' />
      </div>
    </>
  )
}

export default Datepicker
