import { gql } from 'apollo-boost'

export const CREATE_SET_MUTATION = gql`
  mutation CREATE_SET_MUTATION(
    $number: Int!
    $data: [SetdataSetDataField!]
    $notes: String
    $exerciseId: ID!
    $workoutId: ID!
  ) {
    createSet(
      number: $number
      notes: $notes
      exerciseId: $exerciseId
      workoutId: $workoutId
      data: $data
    ) {
      id
      data {
        id
        name
        value
      }
      number
      notes
      workout {
        id
      }
      exercise {
        id
      }
    }
  }
`
