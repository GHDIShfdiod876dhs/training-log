import { gql } from 'apollo-boost'

export const exerciseFieldsFragment = gql`
  fragment exerciseFields on Exercise {
    id
    name
    description
    customFields {
      id
      name
    }
  }
`

export default gql`
  query getExerciseQuery($id: ID) {
    exercise(id: $id) {
      ...exerciseFields
    }
  }
  ${exerciseFieldsFragment}
`
