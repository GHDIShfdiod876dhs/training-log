import React, { useEffect } from 'react'
import M from 'materialize-css'
import { withRouter } from 'react-router-dom'

import RepeatWorkout from '../carousel/RepeatWorkout'

const CalendarModal = ({ content, history, id, workout }) => {
  useEffect(() => {
    M.AutoInit()
  }, [])

  return (
    <>
      <div className='modal' id={id}>
        <div className='modal-content'>
          {content}
          <div className='modal-footer'>
            <button className='modal-close btn-flat'>
              {workout.completed ? (
                <RepeatWorkout workout={workout} history={history} />
              ) : (
                <span onClick={() => history.push(`/workout/${id}`)}>
                  'Let\'s do this'
                </span>
              )}
            </button>
            <button className='modal-close btn-flat'>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(CalendarModal)
