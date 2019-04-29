import { gql } from 'apollo-boost'


const addWorkoutToProgram = gql`
  mutation ($date: String!, $description: String, $programId: ID!) {
    addWorkoutToProgram(date: $date, description: $description, programId: $programId) {
      id
      date
      description
      programId
    }
  }
`

export default addWorkoutToProgram