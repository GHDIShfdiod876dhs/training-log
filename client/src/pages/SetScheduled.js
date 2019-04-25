import React, { useState } from 'react'


export default function({ set }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <div className="flow-text">
        {set.exercise.name}
        <i 
          className="material-icons secondary-content black-text"
          onClick={ () => setShowAll(!showAll) }
        >
          { showAll? 'arrow_drop_up' : 'arrow_drop_down' }
        </i>
      </div>

      <div className="main-data">
        { set.reps &&
          <div>
            <div>Reps</div>
            <div>{set.reps}</div>
          </div>
        }

        { set.weight &&
          <div>
            <div>Weight</div>
            <div>{set.weight}</div>
          </div>
        }

        { set.time &&
          <div>
            <div>Time</div>
            <div>{set.time}</div>
          </div>
        }
      </div>

      { showAll &&
        <>
          <ul>
            { set.userDefinedData.map(
                field => (
                  <li key={field.id}>
                    <div>{field.name}</div>
                    <div>{field.datum}</div>
                  </li>
                )
              )
            }
          </ul>

          <div>
            <div>{set.notes}</div>
          </div>
        </>
      }
    </>
  )
}
