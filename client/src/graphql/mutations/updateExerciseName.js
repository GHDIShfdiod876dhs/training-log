import { gql } from 'apollo-boost'


const updateExerciseName = gql`
  mutation ($name: String!, $id: ID!) {
    updateExerciseName(name: $name, id: $id) {
      name
      id
      description
    }
  }
`

export default updateExerciseName