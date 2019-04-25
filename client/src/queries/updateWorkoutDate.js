import { gql } from 'apollo-boost'


const updateWorkoutDate = gql`
  mutation ($id: ID!, $date: String!) {
    updateWorkoutDate(id: $id, date: $date) {
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

export default updateWorkoutDate