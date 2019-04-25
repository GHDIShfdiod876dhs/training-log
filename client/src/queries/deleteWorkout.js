import { gql } from 'apollo-boost'


 const deleteWorkout = gql`
  mutation ($id: ID!) {
    deleteWorkout(id: $id) {
      id
    }
  }
`

export default deleteWorkout