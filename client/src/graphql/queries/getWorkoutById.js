import { gql } from 'apollo-boost'
import { conditionsFieldsFragment } from '../mutations/updateConditions'
import { setFieldsFragment } from './getSetById'

export const workoutFieldsFragment = gql`
  fragment workoutFields on Workout {
    id
    date
    description
    # userDefinedData {
    #   id
    #   name
    #   datum
    # }
    conditions {
      ...conditionsFields
    }
    sets {
      ...setFields
    }
    completed
    # programId
    # userId
    program {
      id
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
    workout(id: $id) {
      ...workoutFields
    }
  }
  ${workoutFieldsFragment}
`
