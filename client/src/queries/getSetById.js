import { gql } from 'apollo-boost'


const getSetById = gql`
  query($id: ID) {
    set(id: $id) {
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

export default getSetById