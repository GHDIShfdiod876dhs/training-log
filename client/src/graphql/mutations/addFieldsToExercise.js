import { gql } from 'apollo-boost'

export default gql`
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
