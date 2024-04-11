import React, { useEffect, useState } from 'react'
import { getHotels } from '../../utils/Axios/RequestBuilder'
import {useSelector} from 'react-redux'
import HotelCard from '../Common/HotelCard'
import ButtonComponent from '../Common/ButtonComponent'
import { FaRegPlusSquare } from "react-icons/fa";
import RegisterProperty from './Register/RegisterProperty'
import {useNavigate} from 'react-router-dom'

const OwnerProperties = () => {
  const [hotels,setHotels] = useState([])
  const hotelOwner = useSelector((state)=> state.role.hotelowner)
  const navigate = useNavigate()

  useEffect(()=>{
    async function fetchHotels(){
      try {
        const {success,data,error} = await getHotels();

        setHotels(data);

      } catch (error) {
        
      }
    }
    fetchHotels()
   
  },[])

  function updateHotel(property){
     console.log('hello');
     navigate(`/admin-update-hotels/${property.id}`);
  }

  const ownersProperties = hotels.filter((hotel)=> hotel.ownedBy == hotelOwner.email);
  console.log(hotelOwner.email)
  
  console.log(ownersProperties)

  return (
    <div>
        {
          ownersProperties.map((property)=>{
            return(
              <HotelCard hotel ={property} >
                <div></div>
                <div>
                  <ButtonComponent onClick={()=>updateHotel(property)} >Update Hotel <FaRegPlusSquare size={20}/> </ButtonComponent>
                </div>
                <div></div>
              </HotelCard>
            )
          })
        }
    </div>
  )
}

export default OwnerProperties
