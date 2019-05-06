import { gql } from 'apollo-boost'

export const UPDATE_WORKOUT_COMPLETED_MUTATION = gql`
  mutation UPDATE_WORKOUT_COMPLETED_MUTATION($id: ID!, $completed: Boolean) {
    updateWorkout(id: $id, completed: $completed) {
      id
      completed
    }
  }
`

export const UPDATE_CONDITIONS_MUTATION = gql`
  mutation UPDATE_CONDITIONS_MUTATION(
    $id: ID!
    $sleep: Int
    $nutrition: Int
    $stress: Int
    $dayOfCycle: Int
    $selfAssessmentBefore: Int
    $selfAssessmentAfter: Int
  ) {
    updateConditions(
      id: $id
      sleep: $sleep
      nutrition: $nutrition
      stress: $stress
      dayOfCycle: $dayOfCycle
      selfAssessmentBefore: $selfAssessmentBefore
      selfAssessmentAfter: $selfAssessmentAfter
    ) {
      id
      sleep
      nutrition
      stress
      dayOfCycle
      selfAssessmentBefore
      selfAssessmentAfter
      workoutId {
        id
      }
    }
  }
`
