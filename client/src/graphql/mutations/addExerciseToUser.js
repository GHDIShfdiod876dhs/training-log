import { gql } from 'apollo-boost'

export default gql`
  mutation ADD_EXERCISE_TO_USER_MUTATION($userId: ID!, $exerciseId: ID!) {
    addToUserExercises(exercisesExerciseId: $exerciseId, userUserId: $userId) {
      userUser {
        name
        id
      }
      exercisesExercise {
        name
        id
      }
    }
  }
`
