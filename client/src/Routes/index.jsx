// import React from 'react'
// import { createBrowserRouter } from 'react-router-dom'
// import Layout from '../Components/layout/Layout'
// import Home from '../Components/pages/Home'
// import UserRegister from '../Components/pages/Register/UserRegister'
// import Login from '../Components/pages/Login'
// import ErrorPage from '../Components/pages/ErrorPage'
// import UsersPrivateRoute from '../private-public-route/UsersPrivateRoute'
// import { useSelector } from 'react-redux'
// import HotelListing from '../Components/pages/HotelListing'


// export const Router = () =>{

//     const role = useSelector((state)=> state.role);
//     return createBrowserRouter([
//         {
//             element: <Layout/>,
//             children:[
//                 {
//                     path:'/',
//                     element:<Home/>
//                 },
//                 {
//                     path:'/login',
//                     element:<Login />
//                 },
//                 {
//                     path:'/register',
//                     element:<UserRegister/>
//                 },
//                 {
//                     element: <UsersPrivateRoute isAuth={role.user !== null ? true : false} />,
// 					children: [
						
// 						{
// 							path: "/hotels",
// 							element: <HotelListing />,
// 						},
						
// 						// {
// 						// 	path: "/saved",
// 						// 	element: < />,
// 						// },
// 					],
				
//                 },
//             ],
            
            
//         },
//         {
//             path: "*",
//             element: <ErrorPage />,
//         },
//     ])
// }


import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Lazy load your components
const Layout = React.lazy(() => import('../Components/layout/Layout'));
const Home = React.lazy(() => import('../Components/pages/Home'));
const UserRegister = React.lazy(() => import('../Components/pages/Register/UserRegister'));
const Login = React.lazy(() => import('../Components/pages/Login'));
const ErrorPage = React.lazy(() => import('../Components/pages/ErrorPage'));
const UsersPrivateRoute = React.lazy(() => import('../private-public-route/UsersPrivateRoute'));
const HotelListing = React.lazy(() => import('../Components/pages/HotelListing'));
import { useSelector } from 'react-redux';
import SavedHotels from '../Components/pages/SavedHotels';
import HotelViewDetails from '../Components/pages/HotelViewDetails';
import UserDetails from '../Components/pages/UserDetails';
import UserBookings from '../Components/pages/UserBookings';

export const Router = () => {
    const role = useSelector((state)=> state.role);

    return createBrowserRouter([
        {
            
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <UserRegister/>
                },
                {
                  
                    element: <UsersPrivateRoute isAuth={role.user !== null ? true : false} />,
                    children: [
                        {
                            path: '/hotels',
                            element: <HotelListing />,
                            // element:<div>hotels list</div>
                        },
                        {
                            path:'/savedhotels',
                            element: <SavedHotels/>
                        },
                        {
                            path:'/hotels/:hotelId',
                            element: <HotelViewDetails/>
                        },
                        {
                            path:'/userdetails',
                            element: <UserDetails/>
                        },
                        {
                            path:'/userbookings',
                            element:<UserBookings/>
                        }
                        // Add more private routes here
                    ],
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ]
        }
    ]);
};
