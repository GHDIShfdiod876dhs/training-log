import React from 'react'
import moment from 'moment'

import CalendarControls from './CalendarControls'
import CalendarCell from './CalendarCell'


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


export default ({ state: { month, year }, dispatch, workouts }) => {
  const firstDay = moment().year(year).month(month).date(1).day()
  const numDays = moment({ year, month }).daysInMonth()

  const getDates = () => {
    const dates = []
    for (let i = 0; i < numDays + firstDay || dates.length % 7 !== 0; i++) {
      dates[i] = { date: { date: i + 1 - firstDay, month, year }, workout: false }
      const workout = workouts.find(w =>
        moment(+w.date).date() === dates[i].date.date
      )
      if (workout) dates[i].workout = workout
    }
    return dates
  }

  return (
    <div className="z-depth-2" style={{ marginTop: '1rem'}}>
      
      <div className="grey darken-3 white-text">
        <CalendarControls state={{ month, year }} dispatch={dispatch} />

        <div style={{ display: 'flex' }}>{ 
          days.map(day =>
            <div key={day} style={{ flex: 'calc(100% / 7)' }}>{day}</div>
          )
        }</div>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{
        getDates().map(date => (
          <CalendarCell
            key={date.workout? date.workout.id : date.date.date}
            date={date}
            numDays={numDays}
          />
        ))
      }</div>

    </div>
  )
}
