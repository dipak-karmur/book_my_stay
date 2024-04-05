import React from 'react'
import { Navigate, Outlet, Route, redirect, useNavigate } from 'react-router-dom'

const UsersPrivateRoute = ({isAuth}) => {
  console.log(isAuth)
  
  return <Outlet /> 
}

export default UsersPrivateRoute;