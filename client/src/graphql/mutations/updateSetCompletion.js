import { gql } from 'apollo-boost'
import { setFieldsFragment } from '../queries/getSetById'

export default gql`
  mutation updateSetCompletionMutation($id: ID!, $completed: Boolean!) {
    updateSetCompletion(id: $id, completed: $completed) {
      ...setFields
    }
  }
  ${setFieldsFragment}
`
