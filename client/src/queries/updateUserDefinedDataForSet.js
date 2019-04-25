import { gql } from 'apollo-boost'


const updateUserDefinedDataForSet = gql`
  mutation ( $id: ID!, $userDefinedData: Array ) {
    updateUserDefinedDataForSet( id: $id, userDefinedData: $userDefinedData ) {
      id
      number
      reps
      weight
      time
      notes
      exercise {
        id
        name
        description
        customFields {
          id
          name
        }
      }
      userDefinedData {
        id
        name
        datum
      }
      completed
      workoutId
    }
  }
`

export default updateUserDefinedDataForSet