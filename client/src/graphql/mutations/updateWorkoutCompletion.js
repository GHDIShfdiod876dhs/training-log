import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from '../queries/getWorkoutById'

export default gql`
  mutation updateWorkoutCompletionMutation(
    $id: ID!
    $completed: Boolean!
    $date: String!
  ) {
    updateWorkoutCompletion(id: $id, completed: $completed, date: $date) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`
