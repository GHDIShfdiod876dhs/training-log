import { gql } from 'apollo-boost'


const addUserDefinedDataToSet = gql`
  mutation ( $name: String!, $datum: Float!, $setId: ID! ) {
    addUserDefinedDataToSet( name: $name, datum: $datum, setId: $setId ) {
      id
      number
      reps
      weight
      time
      notes
      userDefinedData {
        id
        name
        datum
      }
      exerciseId
      workoutId
    }
  }
`

export default addUserDefinedDataToSet