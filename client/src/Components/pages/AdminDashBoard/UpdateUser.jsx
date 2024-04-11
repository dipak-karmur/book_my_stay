import React, { useEffect, useState } from 'react'
import API from '../../../utils/Axios/api';
import UserRegister from '../Register/UserRegister';
import { useParams } from "react-router-dom";

const UpdateUser = () => {
    const params = useParams();
    const userId = params.userId
    const [userData, setUserData] = useState({ name: "" });
  
    useEffect(() => {
     async function fetchData(){
        try {
            const {success,data,error} = await API.get(`/users/${userId}`);
           
            
                setUserData(data);
                console.log('success')
            
           } catch (error) {
            console.log(error.message)
           }
     }
     fetchData()
      
    }, []);
   console.log(userData)
    return <UserRegister isFromAdmin={true} userData={userData} />;
}

export default UpdateUser
