import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PRoute from './components/ProtectedRoute'

// Components
import FrontPage from './pages/front_page/FrontPage'
import ExecuteWorkout from './pages/execute_workout/ExecuteWorkout'
import CreateProgram from './pages/create_program/CreateProgram'
import SetupWorkout from './pages/create_workout/SetupWorkout'
import CreateWorkout from './pages/create_workout/CreateWorkout'
import CreateExercise from './pages/create_exercise/CreateExercise'
import CreateSet from './pages/create_workout/create_set/CreateSet'
import AllWorkouts from './pages/carousel/AllWorkouts'
import AllWorkoutsCalendar from './pages/calendar/AllWorkoutsCalendar'
import Signup from './pages/login_signup/Signup'
import Signin from './pages/login_signup/Login'

// import Test from './pages/Test'

export default () => (
  <Switch>
    {/* <Route path='/test' component={Test} /> */}

    <Route path='/signup' component={Signup} />
    <Route path='/signin' component={Signin} />

    <PRoute exact path='/' component={FrontPage} />
    <PRoute path='/workout/:id' component={ExecuteWorkout} />
    <PRoute path='/create/program' component={CreateProgram} />
    <PRoute path='/create/setup' component={SetupWorkout} />
    <PRoute path='/create/workout/:id' component={CreateWorkout} />
    <PRoute path='/create/exercise' component={CreateExercise} />
    <PRoute path='/create/set' component={CreateSet} />
    <PRoute exact path='/workouts' component={AllWorkouts} />
    <PRoute path='/workouts/calendar' component={AllWorkoutsCalendar} />
    <PRoute component={FrontPage} />
  </Switch>
)
