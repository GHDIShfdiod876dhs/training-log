const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()


// allow cross-origin requests
app.use(cors())

// mongoose preferences
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)

// connect to mongoDB Atlas database
mongoose.connect('mongodb+srv://Chris:92DDTEtsqGjLiPc@traininglog0-k570t.mongodb.net/test?retryWrites=true')

mongoose.connection.once('open', () => {
  console.log('You are connected to the database')
})


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000')
})
