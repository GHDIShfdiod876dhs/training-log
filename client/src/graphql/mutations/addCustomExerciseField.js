import { gql } from 'apollo-boost'


const addCustomExerciseField = gql`
  mutation ($name: String!, $exerciseId: ID!) {
    addCustomExerciseField(name: $name, exerciseId: $exerciseId) {
      name
      exerciseId
    }
  }
`

export default addCustomExerciseField