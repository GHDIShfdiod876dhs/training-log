import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from '../queries/getWorkoutById'

export default gql`
  mutation UPDATE_WORKOUT_DATE_MUTATION($id: ID!, $date: String!) {
    updateWorkout(id: $id, date: $date) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`
