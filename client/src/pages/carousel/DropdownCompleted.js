import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import M from 'materialize-css'
import RepeatWorkout from './RepeatWorkout'

export default withRouter(({ workout, history }) => {
  const dropdownId = `dropdown-${workout.id}`

  useEffect(() => {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger')
    const instances = M.Dropdown.init(dropdownTriggers, {
      coverTrigger: false,
      constrainWidth: false,
      closeOnClick: false,
    })
    return () => instances.forEach(i => i.destroy())
  }, [])

  return (
    <>
      <i
        className='dropdown-trigger material-icons secondary-content green-text'
        data-target={dropdownId}
      >
        check
      </i>

      <ul id={dropdownId} className='dropdown-content grey-text'>
        <RepeatWorkout workout={workout} history={history} />

        <li className='divider' tabIndex='-1' />
        <li>Save as template</li>
      </ul>
    </>
  )
})
