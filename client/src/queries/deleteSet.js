import { gql } from 'apollo-boost'


 const deleteSet = gql`
  mutation ($id: ID!) {
    deleteSet(id: $id) {
      id
    }
  }
`

export default deleteSet