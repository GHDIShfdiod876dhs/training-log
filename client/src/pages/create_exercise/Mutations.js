import { gql } from 'apollo-boost'

export default gql`
  mutation CREATE_EXERCISE_MUTATION(
    $name: String!
    $description: String
    $userId: ID
    $fields: [ExercisefieldsExerciseField!]
  ) {
    createExercise(
      name: $name
      description: $description
      userId: $userId
      fields: $fields
    ) {
      name
      description
      id
      fields {
        id
        name
      }
      user {
        id
      }
    }
  }
`
