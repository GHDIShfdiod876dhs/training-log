import { gql } from 'apollo-boost'


const addExerciseMutation = gql`
  mutation ($name: String!, $description: String, $userId: ID!) {
    addExercise(name: $name, description: $description, userId: $userId) {
      name
      description
      id
    }
  }
`

export default addExerciseMutation