import React, { useState } from 'react'


export default ({ collapsible, header, items }) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <ul className="collection with-header z-depth-1">
      <li className="collection-header grey darken-3 white-text left-align">

        {header}

        { collapsible && 
          <i
            className="material-icons secondary-content white-text"
            onClick={ () => setCollapsed(!collapsed) }
          >

            { collapsed
              ? <i className="material-icons">keyboard_arrow_up</i>
              : <i className="material-icons">keyboard_arrow_down</i>
            }

          </i>
        }

      </li>

      { collapsible
        ? collapsed
          ? null
          : items
        : items
      }  

    </ul>
  )
}