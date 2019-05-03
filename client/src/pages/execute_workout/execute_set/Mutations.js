import { gql } from 'apollo-boost'

export const UPDATE_SET_DATA_FIELD_MUTATION = gql`
  mutation UPDATE_SET_DATA_FIELD_MUTATION($id: ID!, $value: Float) {
    updateSetDataField(id: $id, value: $value) {
      id
      name
      value
    }
  }
`

export const ADD_FIELD_TO_EXERCISE_MUTATION = gql`
  mutation ADD_FIELD_TO_EXERCISE_MUTATION($exerciseId: ID!, $name: String!) {
    createExerciseField(exerciseId: $exerciseId, name: $name) {
      id
      name
      exercise {
        id
      }
    }
  }
`

export const ADD_DATA_FIELD_TO_SET_MUTATION = gql`
  mutation ADD_DATA_FIELD_TO_SET_MUTATION($setId: ID!, $name: String!) {
    createSetDataField(setId: $setId, name: $name) {
      id
      name
      set {
        id
      }
    }
  }
`

export const UPDATE_SET_COMPLETED_MUTATION = gql`
  mutation UPDATE_SET_COMPLETED_MUTATION($id: ID!, $completed: Boolean) {
    updateSet(id: $id, completed: $completed) {
      id
      completed
    }
  }
`
