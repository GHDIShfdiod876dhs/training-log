const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)


// Before tests run...
before(done => {
  // connect to mongoDB
  mongoose.connect('mongodb://localhost/testing')

  mongoose.connection.once('open', () => {
    console.log('You connected successfully. Now make fireworks...')
    done()
  }).on('error', error => {
    console.log('Connection error:', error)
  })
})


// Drop users collection in test database before each test
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => done())
})