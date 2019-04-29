import { gql } from 'apollo-boost'


 const deleteExercise = gql`
  mutation ($id: ID!) {
    deleteExercise(id: $id) {
      id
      name
    }
  }
`

export default deleteExercise