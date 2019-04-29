import { gql } from 'apollo-boost'
import { setFieldsFragment } from '../queries/getSetById'

export default gql`
  mutation updateUserDefinedDataForSetMutation($id: ID!, $userDefinedData: Array) {
    updateUserDefinedDataForSet(id: $id, userDefinedData: $userDefinedData) {
      ...setFields
    }
  }
  ${setFieldsFragment}
`
