const assert = require('assert')
const User = require('../models/user')

// Describe tests
describe('Saving records', () => {

  // Create tests
  it('saves a record to the database', done => {
    
    let char = new User({ name: 'John Doe' })

    char
      .save()
      .then(() => {
        assert(char.isNew === false)
        done()
      })
  })
})