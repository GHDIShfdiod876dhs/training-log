const assert = require('assert')
const User = require('../models/user')

// Describe tests
describe('Updating records', () => {

  let user
  // Put a record in the database to test on
  beforeEach(done => {
    user = new User({
      name: 'John Doe',
      preferences: {}
    })
    user.save(() => done())      
  })

  // Create tests
  it('updates one record in the database', done => {
    User
      .findOneAndUpdate({ name: 'John Doe' }, { name: 'Jane Doe' })
      .then(() => {
        User
          .findOne({ _id: user._id })
          .then(record => {
            assert(record.name === 'Jane Doe')
            done()
          })
      })
  })

  it('adds a preference to the user.preferences object', done => {
    User
      .updateMany({}, { $set: { preferences: { trackCycle: true } } })
      .then(() => {
        User
          .findOne({ _id: user._id })
          .then(record => {
            assert(record.preferences.trackCycle === true)
            done()
          })
      })
  })
})
