import React, { useEffect } from 'react'
import M from 'materialize-css'

export default function Modal({ content, id, modalOpen, modalController, setModalController }) {
  
  useEffect(() => {
    const instance = M.Modal.init(
      document.querySelector('.modal'),
      { onCloseStart: cancel }
    )
    if (modalOpen) instance.open()
    return () => instance.destroy()
  }, [modalOpen])

  const cancel = () => {
    modalController.next()
    setModalController(null)
  }

  return (
    <>
      <div className="modal" id={id}>
        <div className="modal-content">
          { content }
          <div className="modal-footer">
            <button
              className="modal-close btn-flat"
              onClick={ () => {
                modalController.next('PROCEED')
                setModalController(null)
              } }
            >
              Proceed
            </button>
            <button 
              className="modal-close btn-flat"
              onClick={ cancel }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
