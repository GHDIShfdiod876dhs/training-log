import { gql } from 'apollo-boost'


const updateSetData = gql`
  mutation (
    $id: ID!,
    $reps: Int,
    $weight: Float,
    $time: Float,
    $notes: String
  ) {
    updateSetData(
      id: $id,
      reps: $reps,
      weight: $weight,
      time: $time,
      notes: $notes
    ) {
      id
      number
      reps
      weight
      time
      notes
      exercise {
        id
        name
        description
        customFields {
          id
          name
        }
      }
      userDefinedData {
        id
        name
        datum
      }
      completed
      workoutId
    }
  }
`

export default updateSetData