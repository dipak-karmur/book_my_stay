import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import HotelCard from '../Common/HotelCard'
import Searching from '../Common/Searching'
import ButtonComponent from '../Common/ButtonComponent'
import API from '../../utils/Axios/api'
import { setRole } from '../../Redux/Actions/roleActions'
import { toast } from "react-toastify";

const SavedHotels = () => {
    const user = useSelector((state)=> state.role.user)
    const dispatch = useDispatch()
    const hotelList = user.savedHotels

    async function handleRemove(hotel){
   
      const updatedHotels = user.savedHotels.filter(
        (item) => item.id != hotel.id
      );
      console.log(updatedHotels)
      const updatedUser = { ...user, savedHotels: updatedHotels };
      await API.patch(`/users/${user.id}`, updatedUser);
      dispatch(setRole("user", updatedUser));
      toast.success("Removed from Saved Hotels!");
    }

  return (
    <div>
       
      {
        hotelList.map((hotel)=>{
            return(
                 <HotelCard hotel={hotel}>
                  <div></div>
                  <div>
                    <ButtonComponent  onClick={() => handleRemove(hotel)} variant='danger'>Remove</ButtonComponent>
                  </div>
                  <div></div>
                 </HotelCard>
            )
        })
      }
    </div>
  )
}

export default SavedHotels
