import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from './getWorkoutById'

const getWorkoutsByDate = gql`
  query($userId: ID!, $startDateRange: String!, $endDateRange: String!) {
    workoutsByDate(
      userId: $userId
      startDateRange: $startDateRange
      endDateRange: $endDateRange
    ) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`

export default getWorkoutsByDate
