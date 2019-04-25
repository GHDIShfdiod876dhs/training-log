import { gql } from 'apollo-boost'


const updateSetCompletion = gql`
  mutation ($id: ID!, $completed: Boolean!) {
    updateSetCompletion(id: $id, completed: $completed) {
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

export default updateSetCompletion