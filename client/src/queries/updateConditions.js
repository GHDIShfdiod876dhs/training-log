import { gql } from 'apollo-boost'


const updateConditions = gql`
  mutation (
    $sleep: Int,
    $nutrition: Int,
    $stress: Int,
    $dayOfCycle: Int,
    $selfAssessmentBefore: Int,
    $selfAssessmentAfter: Int,
    $workoutId: ID!
  ) {
    updateConditions(
      sleep: $sleep,
      nutrition: $nutrition,
      stress: $stress,
      dayOfCycle: $dayOfCycle,
      selfAssessmentBefore: $selfAssessmentBefore,
      selfAssessmentAfter: $selfAssessmentAfter,
      workoutId: $workoutId
    ) {
      id
      conditions {
        sleep
        nutrition
        stress
        dayOfCycle
        selfAssessmentBefore
        selfAssessmentAfter
      }
    }
  }
`

export default updateConditions