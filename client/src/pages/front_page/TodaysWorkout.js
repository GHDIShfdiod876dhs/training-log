import React from 'react'
import { Link } from 'react-router-dom'


function TodaysWorkout({ workouts }) {

  const getWorkoutsForToday = workouts => {
    return workouts.filter(
      workout => isToday(workout.date) && !workout.completed
    )

    function isToday(someDate) {
      someDate = new Date(Number(someDate))
      const today = new Date()

      return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    }
  }

  const workoutsForToday = getWorkoutsForToday(workouts)
  const multiple = workoutsForToday.length > 1

  const todaysSets = (workoutForToday) => {
    let { sets } = workoutForToday
    if (sets) {
      return sets.map(set => (
        <li key={ set.id }>
          { set.exercise.name } { set.weight && set.weight } x { set.reps }
        </li>
      )
    )}
  }

  if (workoutsForToday.length) {
    return (
      <div className="container">
        <h1>Today's Workout{ multiple && 's' }:</h1>
        <div>{
          workoutsForToday.map(workout => (
            <div className="card grey lighten-3" key={workout.id}>
              <div className="card-content">
                <p>{ workout.description }</p>
                <ul>
                  { todaysSets(workout) }
                </ul>
              </div>
              <div className="card-action">
                <Link to={ `/workout/${workout.id}` }>
                  Let's go!
                </Link>
              </div>
            </div>           
          ))
        }</div>
      </div>
    )
  }
  else {
    return (
      <div className="card grey lighten-3">
        <div className="card-content">
          <h1 className="card-title">No workout scheduled today</h1>
        </div>
      </div>
    )
  }
}


export default TodaysWorkout
