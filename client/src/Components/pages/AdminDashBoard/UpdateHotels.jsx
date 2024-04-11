import React, { useEffect, useState } from 'react'
import API from '../../../utils/Axios/api';
import UserRegister from '../Register/UserRegister';
import { useParams } from "react-router-dom";
import RegisterProperty from '../Register/RegisterProperty';

const UpdateHotel = () => {
    const params = useParams();
    const hotelId = params.hotelId
    const [hotelData, setHotelData] = useState({  });
  
    useEffect(() => {
     async function fetchData(){
        try {
            const {success,data,error} = await API.get(`/hotels/${hotelId}`);
           
            
                setHotelData(data);
                console.log('success')
            
           } catch (error) {
            console.log(error.message)
           }
     }
     fetchData()
      
    }, []);
   console.log(hotelData)
    return <RegisterProperty isFromAdmin={true} hotelData={hotelData} />;
}

export default UpdateHotel
