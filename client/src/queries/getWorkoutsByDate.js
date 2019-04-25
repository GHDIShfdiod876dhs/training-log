import { gql } from 'apollo-boost'


const getWorkoutsByDate = gql`
  query($userId: ID!, $startDateRange: String!, $endDateRange: String!) {
    workoutsByDate(
      userId: $userId,
      startDateRange: $startDateRange,
      endDateRange: $endDateRange
    ) {
      id
      date
      description
      userDefinedData {
        id
        name
        datum
      }
      conditions {
        sleep
        nutrition
        stress
        dayOfCycle
        selfAssessmentBefore
        selfAssessmentAfter
      }
      sets {
        id
        number
        reps
        weight
        time
        notes
        exercise {
          id
          name
          description
          customFields {
            id
            name
          }
        }
        userDefinedData {
          id
          name
          datum
        }
        completed
      }
      completed
      programId
    }
  }
`

export default getWorkoutsByDate