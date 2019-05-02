import React, { useState, useRef } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../../ListTransitions.css'

import Modal from '../../components/Modal(improved)'
import ModalContent from './CreateNewField'

export default ({ fields, setFields, defaultFields }) => {
  const [newField, setNewField] = useState(null)
  const modalInput = useRef(null)

  const removeField = e => {
    e.preventDefault()
    setFields(fields.filter(f => f !== e.target.previousElementSibling.textContent))
  }

  const addField = e => {
    e.preventDefault()
    setFields([...fields, newField])
    setNewField(null)
    modalInput.current.value = null
  }

  const resetFields = e => {
    e.preventDefault()
    setFields(defaultFields)
  }

  return (
    <div className='section'>
      <ul className='container'>
        <ReactCSSTransitionGroup
          transitionName='list-transition'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <li className='row flow-text'>Fields to track for this exercise:</li>
          {fields.map(field => (
            <li key={field} className='row valign-wrapper'>
              <span className='col s1'>-</span>
              <span className='col s10 left-align'>{field}</span>
              <i className='material-icons grey-text col s1' onClick={removeField}>
                remove_circle_outline
              </i>
            </li>
          ))}
        </ReactCSSTransitionGroup>
        <li className='row valign-wrapper'>
          <span className='col s1'>-</span>
          <span
            className='col s10 left-align btn-flat modal-trigger'
            data-target='new-field-modal'
          >
            Add custom field
          </span>
          <i className='material-icons grey-text col s1' onClick={resetFields}>
            undo
          </i>
          {/* <button className='btn-flat'>Reset defaults</button> */}
        </li>
      </ul>

      <Modal
        id='new-field-modal'
        actions={{ proceed: addField }}
        content={<ModalContent setNewField={setNewField} forwardedRef={modalInput} />}
        labels={{ proceed: 'Save', cancel: 'Cancel' }}
      />
    </div>
  )
}
