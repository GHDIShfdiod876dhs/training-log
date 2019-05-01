import React, { useState, useRef } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './ExerciseFields.css'

import Modal from '../../components/Modal(improved)'
import ModalContent from './CreateNewField'

export default ({ fields, setFields, defaultFields }) => {
  const [newField, setNewField] = useState(null)
  const modalInput = useRef(null)

  const removeField = e =>
    setFields(fields.filter(f => f !== e.target.previousElementSibling.textContent))

  const addField = () => {
    setFields([...fields, newField])
    setNewField(null)
    modalInput.current.value = null
  }

  const resetFields = () => setFields(defaultFields)

  return (
    <div className='section'>
      <ul className='collection container'>
        <ReactCSSTransitionGroup
          transitionName='list-transition'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <li className='collection-header flow-text'>
            Fields to track for this exercise:
          </li>
          {fields.map(field => (
            <li className='collection-item' key={field}>
              <span>{field}</span>
              <i
                className='material-icons grey-text secondary-content'
                onClick={removeField}
              >
                close
              </i>
            </li>
          ))}
        </ReactCSSTransitionGroup>
        <li className='collection-header'>
          <button className='btn-flat' onClick={resetFields}>
            Reset defaults
          </button>
          <button className='btn-flat modal-trigger' data-target='new-field-modal'>
            Add custom field
          </button>
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
