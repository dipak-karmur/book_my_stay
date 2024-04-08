import React, { useEffect, useState } from 'react'
import { getBookings, getHotels } from '../../utils/Axios/RequestBuilder';
import { useSelector } from "react-redux";
import HotelCard from '../Common/HotelCard';

const UserBookings = () => {
    const [bookings,setBookings] = useState([]);
    const [hotelData,setHotelData] = useState([])

    const user = useSelector((state)=> state.role.user)
    useEffect(()=>{
        async function fetchBooking(){
            try {
                const {success,data,error} = await getBookings();
                setBookings(data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchBooking()
    },[])
    
    const userBooking = bookings.filter((booking)=> booking.userId === user.id );
    console.log(userBooking);

    
    async function fetchHotels(){
        try {
            const {success,data,error} = await getHotels();
            setHotelData(data)
        } catch (error) {
            console.log(error.message);
        }
    }
    fetchHotels()
   
  return (
    <div>
       {
          hotelData.map((hotel)=>{
            return (
                <HotelCard hotel = {hotel}/>
            )
          })
       }
    </div>
  )
}

export default UserBookings
