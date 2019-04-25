const assert = require('assert')
const User = require('../models/user')


// Describe tests
describe('Querying records', () => {

  let user
  // Put a record in the database to test on
  beforeEach(done => {
    user = new User({
      name: 'John Doe',
      programs: [
        { 
          name: 'First Program',
          startDate: new Date('December 17, 2017 03:24:00')
        },
        {
          name: 'Second Program',
          startDate: new Date('December 17, 2018 03:24:00')
        }
      ]
    })
    user.save(() => done())      
  })

  // Create tests
  it('finds the current program for a user', done => {
    User
      .findOne({ name: 'John Doe' })
      .then(record => {
        let currentProgram = record.programs
          .reduce((a, v) => a.startDate > v.startDate ? a : v)
        assert(currentProgram.name === 'Second Program')
        done()
      })
  })
})
