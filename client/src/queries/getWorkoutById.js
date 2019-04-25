import { gql } from 'apollo-boost'


const getWorkout = gql`
  query($id: ID) {
    workout(id: $id) {
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
      userId
    }
  }
`

export default getWorkout