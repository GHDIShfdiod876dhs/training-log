import { gql } from 'apollo-boost'

export default gql`
  mutation CREATE_PROGRAM_MUTATION($name: String!, $description: String, $userId: ID) {
    createProgram(name: $name, description: $description, userId: $userId) {
      name
      description
      id
    }
  }
`
