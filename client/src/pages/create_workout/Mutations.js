import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from '../../graphql/queries/getWorkoutById'

export {
  default as DELETE_EXERCISE_MUTATION,
} from '../../graphql/mutations/deleteExercise'

export const CREATE_WORKOUT_MUTATION = gql`
  mutation CREATE_WORKOUT_MUTATION(
    $date: String!
    $description: String
    $userId: ID
    $programId: ID
  ) {
    createWorkout(
      date: $date
      description: $description
      userId: $userId
      programId: $programId
      conditions: {}
    ) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`

export const CREATE_WORKOUT_FIELD_MUTATION = gql`
  mutation CREATE_WORKOUT_FIELD_MUTATION($name: String!) {
    createWorkoutData(name: $name) {
      id
      name
      value
    }
  }
`

export const ADD_FIELD_TO_WORKOUT_MUTATION = gql`
  mutation ADD_FIELD_TO_WORKOUT_MUTATION($workoutId: ID!, $fieldId: ID!) {
    addToDataOnWorkout(dataWorkoutDataId: $fieldId, workoutWorkoutId: $workoutId) {
      workoutWorkout {
        id
        data {
          id
          name
          value
        }
      }
    }
  }
`

export const DELETE_WORKOUT_DATA_FIELD_MUTATION = gql`
  mutation DELETE_WORKOUT_DATA_FIELD_MUTATION($id: ID!) {
    deleteWorkoutData(id: $id) {
      id
      name
      value
    }
  }
`
