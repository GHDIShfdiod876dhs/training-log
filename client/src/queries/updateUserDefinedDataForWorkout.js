import { gql } from 'apollo-boost'


const updateUserDefinedDataForWorkout = gql`
  mutation ( $id: ID!, $datum: Float! ) {
    updateUserDefinedDataForWorkout( id: $id, datum: $datum ) {
      id
      name
      datum
    }
  }
`

export default updateUserDefinedDataForWorkout