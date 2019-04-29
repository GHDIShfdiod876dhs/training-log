import { gql } from 'apollo-boost'
import { exerciseFieldsFragment } from './getExercise'

export const setFieldsFragment = gql`
  fragment setFields on Set {
    id
    number
    reps
    weight
    time
    notes
    exercise {
      ...exerciseFields
    }
    userDefinedData {
      id
      name
      datum
    }
    completed
    workoutId
  }
  ${exerciseFieldsFragment}
`

export default gql`
  query getSetQuery($id: ID) {
    set(id: $id) {
      ...setFields
    }
  }
  ${setFieldsFragment}
`
