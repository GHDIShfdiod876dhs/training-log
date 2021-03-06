import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'

// Components
import NavBar from './components/navbar/NavBar'
import Routes from './Routes'

// Set up Apollo client
const client = new ApolloClient({
  // graphcool server
  uri: 'https://api.graph.cool/simple/v1/cjv06d4h4017f0176envsbvmi',
  // express server and AtlasDB
  // uri: 'http://localhost:4000/graphql',
})

function App() {
  // const userId = useContext(UserContext)
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <UserContext.Provider value={userId}> */}

        <div id='main' className='App'>
          <NavBar />
          {/* Empty user 'Dave' userId="5c900180a63528674f785781" 
                User with data 'John' userId="5c7e9e91a6d95baac9aeadb4" */}
        </div>

        {/* <Routes userId={ userId } /> */}
        <Routes />

        {/* </UserContext.Provider> */}
      </Router>
    </ApolloProvider>
  )
}

export default App
