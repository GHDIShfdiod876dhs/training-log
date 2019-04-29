import { gql } from 'apollo-boost'
import { exerciseFieldsFragment } from './getExercise'

export default gql`
  query getExercisesQuery($id: ID) {
    user(id: $id) {
      exercises {
        ...exerciseFields
      }
    }
  }
  ${exerciseFieldsFragment}
`
