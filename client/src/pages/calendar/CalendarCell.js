import React from 'react'
import moment from 'moment'

import Modal from './CalendarModal'
import Workout from '../display_workout/Workout'

export default ({ date: { date, workout }, numDays }) => {
  const isValidDate = date.date > 0 && numDays >= date.date
  const currentMonth = moment().month()
  const currentYear = moment().year()
  const isPast =
    (date.date < moment().date() &&
      date.month <= currentMonth &&
      date.year <= currentYear) ||
    (date.month < currentMonth && date.year <= currentYear) ||
    date.year < currentYear

  return (
    <>
      <div
        data-target={workout.id}
        className={`left-align ${workout && 'modal-trigger'}`}
        style={{
          height: '6rem',
          border: isValidDate ? '1px solid #424242' : '1px solid #bdbdbd',
          borderRadius: '5%',
          padding: '0 0.25em',
          flex: 'calc(100% / 7)',
          backgroundColor: !workout
            ? 'none'
            : workout.completed
            ? '#a5d6a7'
            : isPast
            ? '#bdbdbd'
            : '#ef9a9a',
        }}
      >
        {isValidDate && date.date}
      </div>

      {workout && (
        <Modal
          id={workout.id}
          content={
            <>
              <div>{workout.description}</div>
              <Workout workoutId={workout.id} />
            </>
          }
          workout={workout}
        />
      )}
    </>
  )
}
