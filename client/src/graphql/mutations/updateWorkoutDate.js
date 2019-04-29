import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from '../queries/getWorkoutById'

export default gql`
  mutation updateWorkoutDateMutation($id: ID!, $date: String!) {
    updateWorkoutDate(id: $id, date: $date) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`
