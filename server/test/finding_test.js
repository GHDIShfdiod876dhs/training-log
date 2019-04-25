const assert = require('assert')
const User = require('../models/user')

// Describe tests
describe('Finding records', () => {

  let user
  // Put a record in the database to test on
  beforeEach(done => {
    user = new User({ name: 'John Doe' })
    user.save(() => done())
  })

  // Create tests
  it('finds one user record from the database', done => {
    User
      .findOne({ name: 'John Doe' })
      .then(result => {
        assert(result.name === 'John Doe')
        done()
      })
  })

  it('finds one user record by ID from the database', done => { 
    User
      .findOne({ _id: user._id })
      .then(result => {
        assert(result._id.toString() === user._id.toString())
        done()
      })
  })
})
