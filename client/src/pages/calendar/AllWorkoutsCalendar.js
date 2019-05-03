import React, { useReducer } from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import getUTCDateRange from '../../utils/getStartAndEndOfMonthAsUTC'

import Calendar from './Calendar'
import Loader from '../../components/Loader'
import { calReducer, calInitState } from './CalendarControls'
import { buttonStyles } from '../carousel/AllWorkouts'

import getWorkoutsByDate from '../../graphql/queries/getWorkoutsByDate'

function AllWorkoutsCalendar({ history, userId }) {
  const [{ month, year }, dispatch] = useReducer(calReducer, calInitState)
  const [startDate, endDate] = getUTCDateRange({ month, year })

  return (
    <Query query={getWorkoutsByDate} variables={{ userId, startDate, endDate }}>
      {({ loading, error, data: { allWorkouts } }) => {
        if (loading) return <Loader />
        if (error) return `Error! ${error.message}`
        return (
          <div className='container'>
            <Calendar
              state={{ month, year }}
              dispatch={dispatch}
              workouts={allWorkouts}
            />

            <button
              className='btn-floating red darken-3 z-depth-2'
              style={buttonStyles}
              onClick={() => history.push('/workouts')}
            >
              <i className='material-icons'>view_carousel</i>
            </button>
          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(AllWorkoutsCalendar)
