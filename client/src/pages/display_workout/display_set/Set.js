import React from 'react'
import { graphql } from 'react-apollo'
import formatLabel from '../../../utils/formatInputLabel'

import deleteSet from '../../../graphql/mutations/deleteSet'

function Set({ editable, set, setNumber, deleteSet, numSets, setNumSets }) {
  const { data, notes } = set

  const removeSet = id => {
    deleteSet({
      variables: { id },
    }).then(() => setNumSets(numSets - 1), err => console.log(err))
  }

  const displayData = ({ id, name, value }) => {
    if (value) {
      return (
        <div key={id} style={{ margin: '1rem' }}>
          <p>{formatLabel(name)}:</p>
          <p>{value}</p>
        </div>
      )
    } else return null
  }

  return (
    <li className='collection-item'>
      <div className='row valign-wrapper'>
        <div className='col s1'>{setNumber}</div>
        <div className='col s10'>
          <h6>{set.exercise.name}</h6>
        </div>
        <div className='col s1'>
          {editable && (
            <i className='material-icons' onClick={() => removeSet(set.id)}>
              close
            </i>
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {data.map(displayData)}
      </div>
      <div className='row'>{notes && `Notes: ${notes}`}</div>
    </li>
  )
}

export default graphql(deleteSet, { name: 'deleteSet' })(Set)
