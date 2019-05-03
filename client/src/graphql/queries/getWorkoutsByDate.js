import { gql } from 'apollo-boost'
import { workoutFieldsFragment } from './getWorkoutById'

export default gql`
  query GET_WORKOUTS_BY_DATE_RANGE($userId: ID!, $startDate: String!, $endDate: String!) {
    allWorkouts(
      filter: {
        AND: [{ user: { id: $userId } }, { date_gte: $startDate }, { date_lte: $endDate }]
      }
    ) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`
