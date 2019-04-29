import { gql } from 'apollo-boost'

export const conditionsFieldsFragment = gql`
  fragment conditionsFields on Conditions {
    sleep
    nutrition
    stress
    dayOfCycle
    selfAssessmentBefore
    selfAssessmentAfter
  }
`

export default gql`
  mutation updateConditions(
    $sleep: Int
    $nutrition: Int
    $stress: Int
    $dayOfCycle: Int
    $selfAssessmentBefore: Int
    $selfAssessmentAfter: Int
    $workoutId: ID!
  ) {
    updateConditions(
      sleep: $sleep
      nutrition: $nutrition
      stress: $stress
      dayOfCycle: $dayOfCycle
      selfAssessmentBefore: $selfAssessmentBefore
      selfAssessmentAfter: $selfAssessmentAfter
      workoutId: $workoutId
    ) {
      id
      conditions {
        ...conditionsFields
      }
    }
  }
  ${conditionsFieldsFragment}
`
