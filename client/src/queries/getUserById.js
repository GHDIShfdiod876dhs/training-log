import { gql } from 'apollo-boost'


const getUserQuery = gql`
  query($id: ID) {
    user(id: $id) {
      id
      name
      preferences {
        trackCycle
      }
      programs {
        id
        name
        startDate
      }
      workouts {
        id
        date
        description
        conditions {
          sleep
          nutrition
          stress
          dayOfCycle
          selfAssessmentBefore
          selfAssessmentAfter
        }
        userDefinedData {
          id
          name
          datum
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
        userId
      }
      exercises {
        id
        name
        description
        customFields {
          id
          name
        }
      }
    }
  }
`

export default getUserQuery