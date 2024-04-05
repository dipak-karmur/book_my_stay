import React from 'react'
import { useSelector } from 'react-redux'
import HotelCard from '../Common/HotelCard'
import Searching from '../Common/Searching'

const SavedHotels = () => {
    const user = useSelector((state)=> state.role.user)
    const hotelList = user.savedHotels


  return (
    <div>
       
      {
        hotelList.map((hotel)=>{
            return(
                 <HotelCard hotel={hotel}/>
            )
        })
      }
    </div>
  )
}

export default SavedHotels
