import { gql } from 'apollo-boost'

export const UPDATE_WORKOUT_COMPLETED_MUTATION = gql`
  mutation UPDATE_WORKOUT_COMPLETED_MUTATION($id: ID!, $completed: Boolean) {
    updateWorkout(id: $id, completed: $completed) {
      id
      completed
    }
  }
`
