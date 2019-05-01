import { gql } from 'apollo-boost'

export default gql`
  mutation CREATE_EXERCISE_FIELD_MUTATION($name: String!) {
    createExerciseField(name: $name) {
      name
      id
    }
  }
`
