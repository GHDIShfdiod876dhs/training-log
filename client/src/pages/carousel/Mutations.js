import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from '../../graphql/queries/getWorkoutById'

export default gql`
  mutation REPEAT_WORKOUT_MUTATION(
    $date: String!
    $description: String
    $userId: ID
    $programId: ID
    $data: [WorkoutdataWorkoutData!]
    $sets: [WorkoutsetsSet!]
  ) {
    createWorkout(
      date: $date
      description: $description
      userId: $userId
      programId: $programId
      sets: $sets
      data: $data
      conditions: {}
    ) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`
