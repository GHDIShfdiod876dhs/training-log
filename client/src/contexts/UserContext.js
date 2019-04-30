import React from 'react'

const userId = localStorage.getItem('USER_ID')

// const userId = '5c900180a63528674f785781'
const UserContext = React.createContext(userId)

export default UserContext
