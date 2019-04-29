import { gql } from 'apollo-boost'
import { setFieldsFragment } from '../queries/getSetById'

export default gql`
  mutation updateSetDataMuation(
    $id: ID!
    $reps: Int
    $weight: Float
    $time: Float
    $notes: String
  ) {
    updateSetData(id: $id, reps: $reps, weight: $weight, time: $time, notes: $notes) {
      ...setFields
    }
  }
  ${setFieldsFragment}
`
