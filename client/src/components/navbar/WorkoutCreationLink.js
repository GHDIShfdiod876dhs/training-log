import React, { useEffect } from 'react'
import { graphql } from 'react-apollo'
import { NavLink } from 'react-router-dom'

// Queries
import getUserById from '../../queries/getUserById'


function MainMenu({ data, sidenav }) {
  const { loading, user } = data

  if (loading) return <div>Loading...</div>

  useEffect(() => {
    data.refetch()
  }, [])

  const currentProgram = user.programs[user.programs.length - 1]

  return (
    <>
      { currentProgram
        ? <li><NavLink 
            className={ sidenav ? 'sidenav-close' : null }
            to={{
              pathname: '/create/setup',
              state: { user, programId: currentProgram.id }
            }}
          >
            Add a new workout to your current program "{currentProgram.name}"
          </NavLink></li>
          
        : <>
            <li className='subheader'>
              Looks like you don't have any programs yet.
            </li>
            <li><NavLink
              className={ sidenav ? 'sidenav-close' : null }
              to={{
                pathname: '/create/setup',
                state: { user }
              }}
            >
              Create a standalone workout?
            </NavLink></li>
          </>
      }
    </>
  )
}


export default graphql(getUserById, {
  options: props => {
    return {
      variables: {
        id: props.userId
      }
    }
  }
})(MainMenu)