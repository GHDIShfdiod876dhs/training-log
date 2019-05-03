import React from 'react'
import { compose, graphql } from 'react-apollo'
import formatLabel from '../../../utils/formatInputLabel'

import Loader from '../../../components/Loader'

import GET_SET_QUERY from '../../../graphql/queries/getSetById'
import deleteSet from '../../../graphql/mutations/deleteSet'

function Set({ editable, getSet, deleteSet, numSets, setNumSets }) {
  if (getSet.loading) return <Loader />

  const { Set: set } = getSet
  console.log(set)
  const removeSet = id => {
    deleteSet({
      variables: { id },
    }).then(() => setNumSets(numSets - 1), err => console.log(err))
  }

  const displayData = ({ id, name, datum }) => {
    if (datum) {
      return (
        <div className='col s4 l2' key={id}>
          <p>{formatLabel(name)}:</p>
          <p>{datum}</p>
        </div>
      )
    } else return null
  }

  const fields = [
    //...set.data,
    { id: 3, name: 'notes', datum: set.notes },
  ]

  return (
    <li className='collection-item'>
      <div className='row valign-wrapper'>
        <div className='col s1'>{set.number}</div>
        <div className='col s10'>{/* <h6>{set.exercise.name}</h6> */}</div>
        <div className='col s1'>
          {editable && (
            <i className='material-icons' onClick={() => removeSet(set.id)}>
              close
            </i>
          )}
        </div>
      </div>
      <div className='row'>{fields.map(displayData)}</div>
    </li>
  )
}

export default compose(
  graphql(deleteSet, { name: 'deleteSet' }),
  graphql(GET_SET_QUERY, {
    options: props => {
      return {
        variables: {
          id: props.setId,
        },
      }
    },
    name: 'getSet',
  })
)(Set)
