import React, { useContext } from 'react'
import { Route } from 'react-router-dom'

// Components
import FrontPage from './pages/FrontPage(graphcool)'
import ExecuteWorkout from './pages/execute_workout/ExecuteWorkout'
import CreateProgram from './pages/CreateProgram'
import SetupWorkout from './pages/SetupWorkout'
import CreateWorkout from './pages/CreateWorkout'
import CreateExercise from './pages/CreateExercise'
import CreateSet from './pages/CreateSet'
import AllWorkouts from './pages/carousel/AllWorkouts'
import AddCustomExerciseFields from './pages/AddCustomExerciseFields'
import AllWorkoutsCalendar from './pages/calendar/AllWorkoutsCalendar'
import Signup from './pages/login_signup/Signup'
import Signin from './pages/login_signup/Signin'

import Test from './pages/Test'

// Contexts
import UserContext from './contexts/UserContext'

const Routes = () => {
  const userId = useContext(UserContext)
  return (
    <>
      <Route path='/test' render={() => <Test userId={userId} />} />

      <Route exact path='/' render={() => <FrontPage userId={userId} />} />

      <Route path='/workout/:id' component={ExecuteWorkout} />

      <Route path='/create/program' render={() => <CreateProgram userId={userId} />} />

      <Route path='/create/setup' render={() => <SetupWorkout userId={userId} />} />

      <Route
        path='/create/workout/:id'
        render={() => <CreateWorkout userId={userId} />}
      />

      <Route path='/create/exercise' render={() => <CreateExercise userId={userId} />} />

      <Route
        path='/customize_exercise/:id'
        render={() => <AddCustomExerciseFields userId={userId} />}
      />

      <Route path='/create/set' render={() => <CreateSet userId={userId} />} />

      <Route exact path='/workouts' render={() => <AllWorkouts userId={userId} />} />

      <Route
        path='/workouts/calendar'
        render={() => <AllWorkoutsCalendar userId={userId} />}
      />

      <Route path='/signup' component={Signup} />

      <Route path='/signin' component={Signin} />
    </>
  )
}

export default Routes
