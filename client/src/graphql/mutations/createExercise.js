import { gql } from 'apollo-boost'

export default gql`
  mutation CREATE_EXERCISE_MUTATION($name: String!, $description: String) {
    createExercise(name: $name, description: $description) {
      name
      description
      id
    }
  }
`
