import React from 'react'
import { Navigate, Route, redirect } from 'react-router-dom'

const PrivateRoute = ({children,path,isAuth,...rest}) => {
  return (
    
        <Route {...rest}>
      {isAuth ? children : <Navigate to="/login" />}
    </Route>
    
  )
}

export default PrivateRoute