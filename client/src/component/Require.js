import React from 'react'
import { useAuth } from '../component/authProvider'
import { Navigate, useLocation } from 'react-router-dom'

export function Require({children}) {
    // for redirecting back to the carts page after login even if the back button is pressed
    //state of path is passed to login
    const location = useLocation()

    const auth = useAuth()

    if(!auth.user) {
        return <Navigate to="/login" state={{path: location.pathname }}/>
    }
  return children
}

export default Require
