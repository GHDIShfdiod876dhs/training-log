import { gql } from 'apollo-boost'
import { conditionsFieldsFragment } from '../mutations/updateConditions'
import { setFieldsFragment } from './getSetById'

export const workoutFieldsFragment = gql`
  fragment workoutFields on Workout {
    completed
    conditions {
      ...conditionsFields
    }
    date
    description
    id
    program {
      id
    }
    sets {
      ...setFields
    }
    user {
      id
    }
  }
  ${conditionsFieldsFragment}
  ${setFieldsFragment}
`

export default gql`
  query getWorkoutQuery($id: ID) {
    Workout(id: $id) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`
