import React from 'react'
import { Link } from 'react-router-dom'

import Workout from '../display_workout/Workout'

export default ({ workouts }) => {
  const getWorkoutsForToday = workouts => {
    return workouts.filter(workout => isToday(workout.date) && !workout.completed)

    function isToday(date) {
      date = new Date(+date)
      const today = new Date()

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }
  }

  const workoutsForToday = getWorkoutsForToday(workouts)
  const multiple = workoutsForToday.length > 1

  return (
    <>
      {workoutsForToday.length ? (
        <h3>Today's Workout{multiple && 's'}:</h3>
      ) : (
        <h5>No workout scheduled today</h5>
      )}
      {workoutsForToday.map(workout => (
        <div className='card grey lighten-3' key={workout.id}>
          <div className='card-content'>
            <p>{workout.description}</p>
            <Workout workoutId={workout.id} />
          </div>
          <div className='card-action'>
            <Link to={`/workout/${workout.id}`}>Let's go!</Link>
          </div>
        </div>
      ))}
    </>
  )
}
