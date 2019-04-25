import { gql } from 'apollo-boost'


 const deleteUserDefinedDataFromWorkout = gql`
  mutation ($id: ID!) {
    deleteUserDefinedDataFromWorkout(id: $id) {
      id
    }
  }
`

export default deleteUserDefinedDataFromWorkout