import { gql } from 'apollo-boost'


const getExerciseQuery = gql`
  query($id: ID) {
    exercise(id: $id) {
      id
      name
      description
      customFields {
        id
        name
      }
    }
  }
`

export default getExerciseQuery