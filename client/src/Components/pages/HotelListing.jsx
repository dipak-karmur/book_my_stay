import React, { useEffect, useState } from 'react'
import HotelCard from '../Common/HotelCard'
import { getHotels } from '../../utils/Axios/RequestBuilder';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Searching from '../Common/Searching';

const HotelListing = () => {
  const [hotelData,setHotelData] = useState([]);
  const [searchResult,setSearchResult] = useState([])
  const navigate = useNavigate();
  const {destination} = useSelector((state)=>state.searchData)

  useEffect(()=>{
  async function fetchHotelData (){
      try {
        const {success,data,error} = await getHotels()
        setHotelData(data)
        
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchHotelData()
    
  },[])
  console.log(searchResult)
  // Update search result whenever hotelData changes
  // useEffect(() => {
  //   setSearchResult(hotelData);
  // }, [hotelData]);


  return (
    <>
     <Searching dataToSearch = {hotelData} setSearchResult={setSearchResult}  searchQuery = {destination}/>

    <div className='flex flex-col justify-center gap-3 bg-sky-100 py-8'>
    {
        searchResult.map((hotel)=>{
          return(
            <HotelCard hotel = {hotel}/>
          )
        })
      }
    </div>
    
     
    </>
  )
}

export default HotelListing
