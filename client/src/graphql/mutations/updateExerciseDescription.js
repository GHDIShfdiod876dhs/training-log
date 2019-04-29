import { gql } from 'apollo-boost'


const updateExerciseDescription = gql`
  mutation ($description: String!, $id: ID!) {
    updateExerciseDescription(description: $description, id: $id) {
      name
      id
      description
    }
  }
`

export default updateExerciseDescription