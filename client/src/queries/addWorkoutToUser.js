import { gql } from 'apollo-boost'


const addWorkoutToUser = gql`
  mutation ($date: String!, $description: String, $userId: ID!) {
    addWorkoutToUser(date: $date, description: $description, userId: $userId) {
      id
      date
      description
      userId
    }
  }
`

export default addWorkoutToUser