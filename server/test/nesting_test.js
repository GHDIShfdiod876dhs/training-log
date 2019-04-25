const assert = require('assert')
const User = require('../models/user')


// Describe tests
describe('Nesting records', () => {

  let user
  // Put a record in the database to test on
  beforeEach(done => {
    user = new User({
      name: 'John Doe',
      exercises: [
        { name: 'Squat' }
      ]
    })
    user.save(() => done())      
  })

  // Create tests
  it('creates a user with exercises', done => {
    User
      .findOne({ name: 'John Doe' })
      .then(record => {
        assert(record.exercises.length === 1)
        done()
      })
  })

  it('adds an exercise to a user', done => {
    User
      .findOne({ name: 'John Doe' })
      .then(record => {
        record.exercises.push({ 
          name: 'Deadlift',
          description: 'Pick something heavy off the ground.' })
        record
          .save()
          .then(() => {
            User
              .findOne({ name: 'John Doe' })
              .then(record => {
                assert(record.exercises.length === 2)
                done()
              })
          })
      })
  })
})
