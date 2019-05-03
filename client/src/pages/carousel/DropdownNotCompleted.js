import React, { useEffect } from 'react'
import M from 'materialize-css'
import { withRouter } from 'react-router-dom'

const Dropdown = ({ workout, actions, history }) => {
  const { id } = workout
  const dropdownId = `dropdown-${id}`

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
        className='dropdown-trigger material-icons secondary-content grey-text'
        data-target={dropdownId}
      >
        arrow_drop_down_circle
      </i>

      <ul id={dropdownId} className='dropdown-content grey-text'>
        <li onClick={() => history.push(`/workout/${id}`)}>Let's do this</li>

        <li onClick={() => actions.setUpdateDateMode(true)}>Change date</li>

        <li className='divider' tabIndex='-1' />
        <li>Save as template (coming soon)</li>

        <li className='divider' tabIndex='-1' />
        <li>
          <i className='material-icons grey-text modal-trigger' data-target={id}>
            delete
          </i>
        </li>
      </ul>
    </>
  )
}

export default withRouter(Dropdown)
