import React, { useReducer } from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import Calendar from './Calendar'
import { calReducer, calInitState } from './CalendarControls'
import { buttonStyles } from '../carousel/AllWorkouts'

import getWorkoutsByDate from '../../queries/getWorkoutsByDate';


function AllWorkoutsCalendar({ history, userId }) {
  const [{ month, year }, dispatch] = useReducer(calReducer, calInitState)
  const startDateRange = moment([year, month, 1])
  const endDateRange = moment(
    [year, month, moment([year, month]).daysInMonth(), 23, 59, 59, 999]
  )

  return (
    <Query
      query={getWorkoutsByDate}
      variables={{ userId, startDateRange, endDateRange }}
    >
      {({ loading, error, data: { workoutsByDate } }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`

        return (
          <div className="container">

            <Calendar
              state={{ month, year }}
              dispatch={dispatch}
              workouts={workoutsByDate}
            />

            <button
              className="btn-floating red darken-3 z-depth-2"
              style={buttonStyles}
              onClick={ () => history.push('/workouts') }
            >
              <i className="material-icons">view_carousel</i>
            </button>

          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(AllWorkoutsCalendar)
