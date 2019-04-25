import { gql } from 'apollo-boost'


const addProgramMutation = gql`
  mutation ($name: String!, $description: String, $startDate: String! $userId: ID!) {
    addProgram(name: $name, description: $description, startDate: $startDate userId: $userId) {
      name
      description
      id
    }
  }
`

export default addProgramMutation