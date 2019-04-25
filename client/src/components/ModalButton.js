import React, { useEffect } from 'react'
import M from 'materialize-css'


function ModalButton({ buttonText, content, name}) {
  useEffect(() => {
    M.AutoInit()
  })

  return (
    <>
      <a 
        href={ `#${name}` }
        className="btn-flat waves-effect waves-red modal-trigger"
      >
        { buttonText }
      </a>

      <div className="modal" id={ name }>
        <div className="modal-content">
          { content }
          <div className="modal-footer">
            <button className="modal-close btn-small red darken-3">
              <i className="material-icons">close</i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


export default ModalButton