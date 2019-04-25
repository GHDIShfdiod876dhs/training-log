import React from 'react'
import { graphql } from 'react-apollo'
import formatLabel from '../utils/formatInputLabel'

// Queries
import deleteSet from '../queries/deleteSet'


function Set({ editable, set, deleteSet, numSets, setNumSets }) {

  const removeSet = id => {
    deleteSet({
      variables: { id }
    })
    .then(
      () => setNumSets(numSets - 1),
      err => console.log(err))
  }

  const displayData = ({ id, name, datum }) => {
    if (datum) {
      return (
        <div className="col s4 l2" key={id}>
          <p>{ formatLabel(name) }:</p>
          <p>{datum}</p>
        </div>
      )
    }
    else return null
  }

  const fields = [
    ...set.userDefinedData,
    { id: 0, name: 'weight', datum: set.weight },
    { id: 1, name: 'reps', datum: set.reps },
    { id: 2, name: 'time', datum: set.time },
    { id: 3, name: 'notes', datum: set.notes },
  ]

  return (
    <li className="collection-item">
      <div className="row valign-wrapper">
        <div className="col s1">{ set.number }</div>
        <div className="col s10"><h6>{ set.exercise.name }</h6></div>
        <div className="col s1">
          { editable && 
            <i className="material-icons" onClick={ () => removeSet(set.id) }>
              close
            </i>
          }
        </div>      
      </div>
      <div className="row">
        { fields.map(displayData) }
      </div>
    </li>
  )
}


export default graphql(deleteSet, { name: 'deleteSet' })(Set)