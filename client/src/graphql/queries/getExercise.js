import { gql } from 'apollo-boost'

export const exerciseFieldsFragment = gql`
  fragment exerciseFields on Exercise {
    id
    name
    description
    fields {
      id
      name
    }
  }
`

export default gql`
  query GET_EXERCISE_QUERY($id: ID) {
    Exercise(id: $id) {
      ...exerciseFields
    }
  }
  ${exerciseFieldsFragment}
`
