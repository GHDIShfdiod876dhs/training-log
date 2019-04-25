import React, { useState, useEffect } from 'react'
import { graphql, compose } from 'react-apollo'

// Components
import Set from './Set'

// Queries
import getWorkout from '../queries/getWorkoutById'
import deleteSet from '../queries/deleteSet'


function Workout(props) {
  if (props.data.loading) {
    return <p>Loading...</p>
  }

  const [collapsed, setCollapsed] = useState(true)
  const { sets } = props.data.workout
  const [numSets, setNumSets] = useState(sets.length)
  
  useEffect(() => {
    props.data.refetch()
    .catch(err => console.log(err))
  }, [numSets])

  if (!sets || sets.length === 0) {
    return (
      <ul className="collection with-header z-depth-1">
        <li className="collection-header grey darken-3 white-text">
          No Sets Yet
        </li>
      </ul>
    )
  }
  
  return (
    <ul className="collection with-header z-depth-1">
      <li className="collection-header grey darken-3 white-text left-align">
        Workout:
        { sets.length > 1 && props.collapsible &&
          <span
            className="secondary-content"
            onClick={ () => setCollapsed(!collapsed) }
          >
            { collapsed ? 
              <i className="material-icons white-text">keyboard_arrow_down</i> :
              <i className="material-icons white-text">keyboard_arrow_up</i>
            }
          </span>
        }
      </li>
      { props.collapsible && collapsed ?
        <Set
          editable={props.editable}
          key={ sets[sets.length - 1].id }
          set={ sets[sets.length - 1] }
          numSets={ numSets }
          setNumSets={ setNumSets }
        /> :
        sets.map(set => (
          <Set
            editable={props.editable}
            key={set.id}
            set={set}
            numSets={numSets}
            setNumSets={setNumSets}
          />
        ))
      }
    </ul>
  )
}


export default compose(
  graphql(getWorkout, {
    options: props => {
      return {
        variables: {
          id: props.workoutId
        }
      }
    }
  }),
  graphql(deleteSet, { name: 'deleteSet' })
)(Workout)