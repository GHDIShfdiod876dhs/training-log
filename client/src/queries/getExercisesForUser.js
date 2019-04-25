import { gql } from 'apollo-boost'


const getExercisesForUserQuery = gql`
  query($id: ID) {
    user(id: $id) {
      exercises {
        id
        name
        description
        customFields {
          id
          name
        }
      }
    }
  }
`

export default getExercisesForUserQuery