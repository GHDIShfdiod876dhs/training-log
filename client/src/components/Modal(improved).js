import React, { useEffect } from 'react'
import M from 'materialize-css'

export default function Modal({ actions, content, id, labels }) {
  useEffect(() => {
    M.AutoInit()
  }, [])

  return (
    <>
      <div className="modal" id={id}>
        <div className="modal-content">
          { content }
          <div className="modal-footer">
            <button
              className="modal-close btn-flat"
              onClick={ actions.proceed }
            >
              {labels.proceed}
            </button>
            <button className="modal-close btn-flat">{labels.cancel}</button>
          </div>
        </div>
      </div>
    </>
  )
}
