import { gql } from 'apollo-boost'

export const ADD_PROGRAM_TO_USER_MUTATION = gql`
  mutation ADD_PROGRAM_TO_USER_MUTATION($programId: ID!, $userId: ID!) {
    addToUserPrograms(programsProgramId: $programId, userUserId: $userId) {
      programsProgram {
        id
        name
        description
      }
    }
  }
`

export const CREATE_PROGRAM_MUTATION = gql`
  mutation CREATE_PROGRAM_MUTATION($name: String!, $description: String) {
    createProgram(name: $name, description: $description) {
      name
      description
      id
    }
  }
`
