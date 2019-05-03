import { gql } from 'apollo-boost'
import { exerciseFieldsFragment } from './getExercise'

export const setFieldsFragment = gql`
  fragment setFields on Set {
    id
    number
    data {
      id
      name
      value
    }
    notes
    exercise {
      ...exerciseFields
    }
    completed
    workout {
      id
    }
  }
  ${exerciseFieldsFragment}
`

export default gql`
  query GET_SET_QUERY($id: ID) {
    Set(id: $id) {
      ...setFields
    }
  }
  ${setFieldsFragment}
`
