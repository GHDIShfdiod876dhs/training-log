const graphql = require('graphql')
const User = require('../models/user')
const Exercise = require('../models/exercise')
const Program = require('../models/program')
const WorkoutSet = require('../models/set')
const Workout = require('../models/workout')
const CustomWorkoutField = require('../models/customWorkoutField')
const CustomExerciseField = require('../models/customExerciseField')
const CustomWorkoutData = require('../models/customWorkoutData')
const CustomSetData = require('../models/customSetData')

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    passwordHash: { type: GraphQLString },
    preferences: { type: PreferencesType },
    exercises: { 
      type: new GraphQLList(ExerciseType),
      resolve(parent, args) {
        return Exercise.find({ userId: parent.id })
      }
    },
    programs: {
      type: new GraphQLList(ProgramType),
      resolve(parent, args) {
        return Program.find({ userId: parent.id })
      }
    },
    workouts: {
      type: new GraphQLList(WorkoutType),
      resolve(parent, args) {
        return Workout.find({ userId: parent.id }).sort({ date: 1 })
      }
    },
    customFields: { 
      type: new GraphQLList(CustomWorkoutFieldType),
      resolve(parent, args) {
        return CustomWorkoutField.find({ userId: parent.id })
      }
    },
  })
})

const PreferencesType = new GraphQLObjectType({
  name: 'Preferences',
  fields: () => ({
    trackCycle: { type: GraphQLBoolean },
    userId: { type: GraphQLID }
  })
})

const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    customFields: { 
      type: new GraphQLList(CustomExerciseFieldType),
      resolve(parent, args) {
        return CustomExerciseField.find({ exerciseId: parent.id })
      }
    },
    userId: { type: GraphQLID }
  })
})

const ProgramType = new GraphQLObjectType({
  name: 'Program',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    startDate: { type: GraphQLInt },
    workouts: { 
      type: new GraphQLList(WorkoutType),
      resolve(parent, args) {
        return Workout.find({ programId: parent.id })
      }
    },
    userId: { type: GraphQLID }
  })
})

const ConditionsType = new GraphQLObjectType({
  name: 'Conditions',
  fields: () => ({
    sleep: { type: GraphQLInt },
    nutrition: { type: GraphQLInt },
    stress: { type: GraphQLInt },
    dayOfCycle: { type: GraphQLInt },
    selfAssessmentBefore: { type: GraphQLInt },
    selfAssessmentAfter: { type: GraphQLInt },
    workoutId: { type: GraphQLID }
  })
})

const WorkoutType = new GraphQLObjectType({
  name: 'Workout',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    conditions: { type: ConditionsType },
    userDefinedData: { 
      type: new GraphQLList(CustomWorkoutDataType),
      resolve(parent, args) {
        return CustomWorkoutData.find({ workoutId: parent.id })
      }
    },
    sets: { 
      type: new GraphQLList(SetType),
      resolve(parent, args) {
        return WorkoutSet.find({ workoutId: parent.id }).sort({ number: 1 })
      }
    },
    completed: { type: GraphQLBoolean },
    programId: { type: GraphQLID },
    userId: { type: GraphQLID }
  })
})

const SetType = new GraphQLObjectType({
  name: 'Set',
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: GraphQLInt },
    reps: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    time: { type: GraphQLInt },
    notes: { type: GraphQLString },
    exerciseId: { type: GraphQLID },
    exercise: {
      type: ExerciseType,
      resolve(parent, args) {
        return Exercise.findById(parent.exerciseId)
      }
    },
    userDefinedData: { 
      type: new GraphQLList(CustomSetDataType),
      resolve(parent, args) {
        return CustomSetData.find({ setId: parent.id })
      }
    },
    completed: { type: GraphQLBoolean },
    workoutId: { type: GraphQLID }
  })
})

const CustomSetDataType = new GraphQLObjectType({
  name: 'CustomSetData',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    datum: { type: GraphQLFloat },
    setId: { type: GraphQLID },
  })
})

const CustomExerciseFieldType = new GraphQLObjectType({
  name: 'CustomExerciseField',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    //datum: { type: GraphQLFloat },
    exerciseId: { type: GraphQLID },
  })
})

const CustomWorkoutDataType = new GraphQLObjectType({
  name: 'CustomWorkoutData',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    datum: { type: GraphQLFloat },
    workoutId: { type: GraphQLID },
  })
})

const CustomWorkoutFieldType = new GraphQLObjectType({
  name: 'CustomWorkoutField',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    datum: { type: GraphQLFloat },
    userId: { type: GraphQLID },
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    exercise: {
      type: ExerciseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Exercise.findById(args.id)
      }
    },
    workout: {
      type: WorkoutType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Workout.findById(args.id)
      }
    },
    workoutsByDate: {
      type: GraphQLList(WorkoutType),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        startDateRange: { type: new GraphQLNonNull(GraphQLString) },
        endDateRange: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, { userId, startDateRange, endDateRange }) {
        //console.log('finding workouts by date')
        return Workout
          .find({
            userId,
            date: { $gte: startDateRange, $lte: endDateRange }
          })
          .sort({ date: ascending })
      }
    },
    set: {
      type: SetType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return WorkoutSet.findById(args.id)
      }
    }
  }
})


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        passwordHash: { type: new GraphQLNonNull(GraphQLString) },
        // preferences: { type: PreferencesType }
      },
      resolve(parent, args) {
        return new User({
          name: args.name,
          passwordHash: args.passwordHash,
          preferences: args.preferences
        }).save()
      }
    },
    updatePreferences: {
      type: UserType,
      args: {
        trackCycle: { type: GraphQLBoolean },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        // preferences: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return User.findOneAndUpdate(
          { _id: args.userId },
          { preferences: {
              trackCycle: args.trackCycle
            }
          },
          () => {}
        )
      }
    },
    addExercise: {
      type: ExerciseType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return new Exercise({
          name: args.name,
          description: args.description,
          userId: args.userId
        }).save()
      }
    },
    deleteExercise: {
      type: ExerciseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return Exercise.findOneAndDelete({ _id: args.id })
      }
    },
    updateExerciseName: {
      type: ExerciseType,
      args: {
        name: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return Exercise.findOneAndUpdate(
          { _id: args.id },
          { name: args.name},
          () => {}
        )
      }
    },
    updateExerciseDescription: {
      type: ExerciseType,
      args: {
        description: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Exercise.findOneAndUpdate(
          { _id: args.id },
          { description: args.description},
          () => {}
        )
      }
    },
    addProgram: {
      type: ProgramType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        startDate: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return new Program({
          name: args.name,
          description: args.description,
          startDate: args.startDate,
          userId: args.userId
        }).save()
      }
    },
    addWorkoutToProgram: {
      type: WorkoutType,
      args: {
        date: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        programId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return new Workout({
          date: args.date,
          description: args.description,
          programId: args.programId,
          userId: args.userId
        }).save()
      }
    },
    addWorkoutToUser: {
      type: WorkoutType,
      args: {
        date: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return new Workout({
          date: args.date,
          description: args.description,
          userId: args.userId
        }).save()
      }
    },
    updateConditions: {
      type: WorkoutType,
      args: {
        sleep: { type: GraphQLInt },
        nutrition: { type: GraphQLInt },
        stress: { type: GraphQLInt },
        dayOfCycle: { type: GraphQLInt },
        selfAssessmentBefore: { type: GraphQLInt },
        selfAssessmentAfter: { type: GraphQLInt },
        workoutId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return Workout.findOneAndUpdate(
          { _id: args.workoutId },
          { conditions: {
              sleep: args.sleep,
              nutrition: args.nutrition,
              stress: args.stress,
              dayOfCycle: args.dayOfCycle,
              selfAssessmentBefore: args.selfAssessmentBefore,
              selfAssessmentAfter: args.selfAssessmentAfter,
            }
          },
          () => {}
        )
      }
    },
    updateWorkoutCompletion: {
      type: WorkoutType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) },
        date: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Workout.findOneAndUpdate(
          { _id: args.id },
          { completed: args.completed, date: args.date },
          () => {}
        )
      }
    },
    updateWorkoutDate: {
      type: WorkoutType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, args) {
        return Workout.findOneAndUpdate(
          { _id: args.id },
          { date: args.date },
        )
      }
    },
    addSet: {
      type: SetType,
      args: {
        number: { type: new GraphQLNonNull(GraphQLInt) },
        reps: { type: GraphQLInt },
        weight: { type: GraphQLFloat },
        time: { type: GraphQLFloat },
        notes: { type: GraphQLString },
        exerciseId: { type: new GraphQLNonNull(GraphQLID) },
        workoutId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return new WorkoutSet({
          number: args.number,
          reps: args.reps,
          weight: args.weight,
          time: args.time,
          notes: args.notes,
          exerciseId: args.exerciseId,
          workoutId: args.workoutId
        }).save()
      }
    },
    updateSetCompletion: {
      type: SetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(_, args) {
        return WorkoutSet.findOneAndUpdate(
          { _id: args.id },
          { completed: args.completed},
          () => {}
        )
      }
    },
    updateSetData: {
      type: SetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        reps: { type: GraphQLInt },
        weight: { type: GraphQLFloat },
        time: { type: GraphQLFloat },
        notes: { type: GraphQLString },
      },
      resolve(_, args) {
        return WorkoutSet.findOneAndUpdate(
          { _id: args.id },
          { reps: args.reps,
            weight: args.weight,
            time: args.time,
            notes: args.notes
          },
        )
      }
    },
    deleteSet: {
      type: SetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return WorkoutSet.findOneAndDelete({ _id: args.id })
      }
    },
    deleteWorkout: {
      type: WorkoutType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return Workout.findOneAndDelete({ _id: args.id })
      }
    },
    addUserDefinedDataToWorkout: {
      type: WorkoutType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        datum: { type: GraphQLFloat },
        workoutId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        let newData = new CustomWorkoutData({
          name: args.name,
          datum: args.datum,
          workoutId: args.workoutId
        })
        newData.save()
        return Workout.findOneAndUpdate(
          { _id: args.workoutId },
          { $push: { userDefinedData: newData } },
        )
      }
    },
    deleteUserDefinedDataFromWorkout: {
      type: CustomWorkoutDataType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return CustomWorkoutData.findOneAndDelete({ _id: args.id })
      }
    },
    updateUserDefinedDataForWorkout: {
      type: CustomWorkoutDataType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        datum: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve(_, args) {
        return CustomWorkoutData.findOneAndUpdate(
          { _id: args.id },
          { datum: args.datum }
        )
      }
    },
    addUserDefinedDataToSet: {
      type: SetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        datum: { type: new GraphQLNonNull(GraphQLFloat) },
        setId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let newData = new CustomSetData({
          name: args.name,
          datum: args.datum,
          setId: args.setId
        })
        newData.save()
        return WorkoutSet.findOneAndUpdate(
          { _id: args.setId },
          { $push: { userDefinedData: newData } },
        )
      }
    },
    updateCustomSetData: {
      type: CustomSetDataType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        datum: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve(_, args) {
        return CustomSetData.findOneAndUpdate(
          { _id: args.id },
          { datum: args.datum }
        )
      }
    },
    addCustomWorkoutField: {
      type: CustomWorkoutFieldType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return new CustomWorkoutField({
          name: args.name,
          userId: args.userId
        }).save()
      }
    },
    addCustomExerciseField: {
      type: CustomExerciseFieldType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        exerciseId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const prevField = await CustomExerciseField.findOne({
          name: args.name,
          exerciseId: args.exerciseId
        })
        if (prevField) throw 'REPEATED_FIELD_NAME_ERROR'
        const newField = await new CustomExerciseField({
          name: args.name,
          exerciseId: args.exerciseId
        }).save()
        await Exercise.findOneAndUpdate(
          { _id: args.exerciseId },
          { $push: { customFields: newField } },
        )
        return newField
      }
    },
    deleteCustomExerciseField: {
      type: CustomExerciseFieldType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return CustomExerciseField.findOneAndDelete({ _id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})