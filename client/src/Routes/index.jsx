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
import HotelOwnerRegister from '../Components/pages/Register/HotelOwnerRegister';
import OwnerPrivateRoute from '../private-public-route/OwnerPrivateRoute';
import RegisterProperty from '../Components/pages/Register/RegisterProperty';
import OwnerProperties from '../Components/pages/OwnerProperties';
import OwnerDashboardBookings from '../Components/pages/OwnerDashboardBookings';
import AdminPrivateRoute from '../private-public-route/AdminPrivateRoute';
import Users from '../Components/pages/AdminDashBoard/Users';
import UpdateUser from '../Components/pages/AdminDashBoard/UpdateUser';
import Hotels from '../Components/pages/AdminDashBoard/Hotels';
import UpdateHotel from '../Components/pages/AdminDashBoard/UpdateHotels';
import HotelOwners from '../Components/pages/AdminDashBoard/HotelOwners';
import UpdateHotelOwner from '../Components/pages/AdminDashBoard/UpdateHotelOwner';
import OwnerAcceptedBookings from '../Components/pages/OwnerAcceptedBookings';
import RegisterCategories from '../Components/pages/Register/RegisterCategories';
import Categories from '../Components/pages/AdminDashBoard/Categories';
import UpdateCategories from '../Components/pages/AdminDashBoard/UpdateCategories'

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
                    path: '/ownerregister',
                    element: <HotelOwnerRegister/>
                    // element:<div> hello</div>
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
                    element: <OwnerPrivateRoute isAuth={role.hotelowner !== null ? true : false} />,
                    children:[
                        {
                            path: '/register-property',
                            element: <RegisterProperty />,
                        },
                        {
                            path: '/ownerproperties',
                            element: <OwnerProperties />,
                        },
                        {
                            path: '/acceptrejectbookings',
                            element: <OwnerDashboardBookings />,
                        },
                        {
                            path: '/accepted-bookings',
                            element: <OwnerAcceptedBookings />,
                        },
                        {
                            path: '/admin-update-hotels/:hotelId',
                            element: <UpdateHotel />,
                        },
                    ]
                },
                {
                    element: <AdminPrivateRoute isAuth={role.admin !== null ? true : false} />,
                    children:[
                        {
                            path: '/adminusersdashboard',
                            element: <Users />,
                        },
                        {
                            path: '/admin-update-users/:userId',
                            element: <UpdateUser />,
                        },
                        {
                            path: '/adminhotelsdashboard',
                            element: <Hotels/>,
                        },
                        {
                            path: '/admin-update-hotels/:hotelId',
                            element: <UpdateHotel />,
                        },
                        {
                            path: '/adminhotelownersdashboard',
                            element: <HotelOwners />,
                        },
                        {
                            path: '/admin-update-hotelowners/:ownerId',
                            element: <UpdateHotelOwner />,
                        },
                        {
                            path: '/admin-create-category',
                            element: <RegisterCategories />,
                        },
                        {
                            path: '/admin-update-category',
                            element: <Categories />,
                        },
                        {
                            path: '/admin-update-category/:categoryId',
                            element: <UpdateCategories />,
                        }
                       
                    ]
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ]
        }
    ]);
};
