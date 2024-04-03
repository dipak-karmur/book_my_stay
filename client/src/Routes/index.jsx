import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Components/layout/Layout'
import Home from '../Components/Home'
import UserRegister from '../Components/pages/Register/UserRegister'
import Login from '../Components/pages/Login'
import ErrorPage from '../Components/pages/ErrorPage'

export const Router = () =>{

    return createBrowserRouter([
        {
            element: <Layout/>,
            children:[
                {
                    path:'/',
                    element:<Home/>
                },
                {
                    path:'/login',
                    element:<Login />
                },
                {
                    path:'/register',
                    element:<UserRegister/>
                },
                
            ],
            
        },
        {
            path: "*",
            element: <ErrorPage />,
        },
    ])
}