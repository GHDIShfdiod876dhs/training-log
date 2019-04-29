import { gql } from 'apollo-boost'


const addUserDefinedDataToWorkout = gql`
  mutation ( $name: String!, $datum: Float, $workoutId: ID! ) {
    addUserDefinedDataToWorkout(
      name: $name,
      datum: $datum,
      workoutId: $workoutId
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

export default addUserDefinedDataToWorkout