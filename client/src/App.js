import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import NavBar from './components/navbar/NavBar'
import Routes from './Routes'

// // Set up Apollo client
const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjv06d4h4017f0176envsbvmi',
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  },
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <LastLocationProvider>
          <div id='main' className='App'>
            <NavBar />
          </div>

          <Routes />
        </LastLocationProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
