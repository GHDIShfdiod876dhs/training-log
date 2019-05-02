import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from './getWorkoutById'
import { exerciseFieldsFragment } from './getExercise'

export default gql`
  query GET_USER_QUERY($id: ID) {
    User(id: $id) {
      id
      name
      # preferences {
      #   trackCycle
      # }
      programs {
        id
        name
        # startDate
      }
      workouts {
        ...workoutFields
      }
      exercises {
        ...exerciseFields
      }
    }
  }
  ${workoutFieldsFragment}
  ${exerciseFieldsFragment}
`
