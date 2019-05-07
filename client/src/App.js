import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import NavBar from './components/navbar/NavBar'
import Routes from './Routes'
import ErrorBoundary from './components/ErrorBoundary'
import { graphcoolUri } from './keys'

// // Set up Apollo client
const client = new ApolloClient({
  uri: graphcoolUri,
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
          <ErrorBoundary>
            <div id='main' className='App'>
              <NavBar />
            </div>

            <Routes />
          </ErrorBoundary>
        </LastLocationProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
