import { gql } from 'apollo-boost'


 const deleteCustomExerciseField = gql`
  mutation ($id: ID!) {
    deleteCustomExerciseField(id: $id) {
      id
      name
    }
  }
`

export default deleteCustomExerciseField