import { gql } from 'apollo-boost'

export const CREATE_EXERCISE_MUTATION = gql`
  mutation CREATE_EXERCISE_MUTATION($name: String!, $description: String) {
    createExercise(name: $name, description: $description) {
      name
      description
      id
    }
  }
`

export const CREATE_EXERCISE_FIELD_MUTATION = gql`
  mutation CREATE_EXERCISE_FIELD_MUTATION($name: String!) {
    createExerciseField(name: $name) {
      name
      id
    }
  }
`

export const ADD_EXERCISE_TO_USER_MUTATION = gql`
  mutation ADD_EXERCISE_TO_USER_MUTATION($userId: ID!, $exerciseId: ID!) {
    addToUserExercises(exercisesExerciseId: $exerciseId, userUserId: $userId) {
      userUser {
        name
        id
      }
      exercisesExercise {
        name
        id
      }
    }
  }
`

export const ADD_FIELDS_TO_EXERCISE_MUTATION = gql`
  mutation ADD_FIELDS_TO_EXERCISE_MUTATION($fieldId: ID!, $exerciseId: ID!) {
    addToExerciseFieldsOnExercise(
      fieldsExerciseFieldId: $fieldId
      exerciseExerciseId: $exerciseId
    ) {
      exerciseExercise {
        name
        id
      }
      fieldsExerciseField {
        name
        id
      }
    }
  }
`
