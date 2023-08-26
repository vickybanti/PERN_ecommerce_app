import React,{useState} from 'react'

function useAuth(boolean) {

    const [isAuthenticated, setAuthenticated] = useState(false)
  
    const setAuth = () =>{
      setAuthenticated(boolean)
    }
}

export default useAuth
