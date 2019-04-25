import { gql } from 'apollo-boost'


const updateCustomSetData = gql`
  mutation ($id: ID!, $datum: Float!) {
    updateCustomSetData(id: $id, datum: $datum) {
      id
      name
      datum
      setId
    }
  }
`

export default updateCustomSetData