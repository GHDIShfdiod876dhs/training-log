import { gql } from 'apollo-boost'


const addSet = gql`
  mutation (
    $number: Int!,
    $reps: Int,
    $weight: Float,
    $time: Float,
    $notes: String,
    $exerciseId: ID!,
    $workoutId: ID!
  ) {
    addSet(
      number: $number,
      reps: $reps,
      weight: $weight,
      time: $time,
      notes: $notes,
      exerciseId: $exerciseId,
      workoutId: $workoutId
    ) {
      id
      number
      reps
      weight
      time
      notes
      exerciseId
      workoutId
    }
  }
`

export default addSet