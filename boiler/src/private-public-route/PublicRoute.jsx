import React from 'react'
import { Navigate, Route, redirect } from 'react-router-dom'

const PublicRoute = ({children,path,isAuth}) => {
  return (
    
     <Route {...rest}>
      {isAuth ? <Navigate to="/" /> : children}
    </Route>
        
    
  )
}

export default PublicRoute
