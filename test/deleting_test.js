const assert = require('assert')
const User = require('../models/user')

// Describe tests
describe('Deleting records', () => {

  let user
  // Put a record in the database to test on
  beforeEach(done => {
    user = new User({ name: 'John Doe' })
    user.save(() => done())
  })

  // Create tests
  it('deletes one record from the database', done => {
    User
      .findOneAndDelete({ name: 'John Doe' })
      .then(() => {
        User
          .findOne({ name: 'John Doe' })
          .then(result => {
            assert(result === null)
            done()
          })
      })
  })
})