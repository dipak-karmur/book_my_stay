import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { addBooking, getHotels, updateHotel } from "../../utils/Axios/RequestBuilder";
import { toast } from "react-toastify";
import API from "../../utils/Axios/api";

const UserDetails = () => {
  const location = useLocation();
  const hotelData = location.state;
  const [oneHotelData,setOneHotelData] = useState([]);
  const searchData = useSelector((state) => state.searchData);
  const user = useSelector((state) => state.role.user);
  //const bookings = useSelector((state)=> state.bookings);
  console.log(hotelData);

  useEffect(() => {
    async function fetchoneHotelData() {
      const { success, data, error } = await API.get(`/hotels/${hotelData.id}`);
      console.log(data);
      setOneHotelData(data);
    }
    fetchoneHotelData(); 
  }, [hotelData.id]);
  console.log(hotelData.id);
  console.log(oneHotelData)
  const tripStartDate = searchData.date?.[0]?.startDate
    ? new Date(searchData.date[0].startDate)
    : new Date();

  const tripEndDate = searchData.date?.[0]?.endDate
    ? new Date(searchData.date[0].endDate)
    : new Date();

  const date1 = format(tripStartDate, "dd-MM-yyyy");
  const date2 = format(tripEndDate, "dd-MM-yyyy");

  const differenceMs = tripEndDate.getTime() - tripStartDate.getTime();
  const differenceDays = differenceMs / (1000 * 60 * 60 * 24);
  const nights = Math.floor(differenceDays);
  const adults = searchData.options?.adult || 1;
  const rooms = searchData.options?.room || 1;
  const children = searchData.options?.children || 0;
  let total = 0;
  !children
    ? (total = nights * adults * rooms * oneHotelData.Price)
    : (total = (nights * adults * rooms * oneHotelData.Price * children) / 2);

  const taxes = (total * 12) / 100;
 

  const beforeDiscount = total + (total * oneHotelData.discountPercentage) / 100;

  

  async function bookRoom() {
   
    
    let allocation = [];
    
    let availableRoomsCopy = [...oneHotelData.availableRooms]; 
    console.log(availableRoomsCopy);

    if (availableRoomsCopy.length >= rooms) {
      allocation = availableRoomsCopy
        .slice(0, rooms)
        .map((room) => room); 
      availableRoomsCopy.splice(0, rooms); 
    } else {
      toast.error("Sufficient Rooms are not available!");
    }

    console.log(availableRoomsCopy);
    
    const oneHotelData2 = { ... oneHotelData, availableRooms: availableRoomsCopy}
    console.log(oneHotelData2)
    const newBooking = {
        //   id: Math.random(4),
        hotel: oneHotelData2,
        hotelId: oneHotelData.id,
        userId: user.id,
        bookingId: 1,
        checkInDate: tripStartDate,
        checkOutDate: tripEndDate,
        noOfRoom: rooms,
        guests: adults,
        allocatedRooms: allocation,
        status: 'pending'
      };
   if( allocation.length > 0) {
    try {
        const { success, data, error } = await addBooking(newBooking);
        const { successMsg, newData, hotelError } = await updateHotel(oneHotelData2);
        if (hotelError) {
          console.log(hotelError);
        }
  
        if (success) {
          toast.success("Booking Successfull!");
        }
      } catch (error) {
        toast.error("something went wrong!");
      }
   }else{
    toast.error('sorry for inconvenience!')
   }

   const handleRefresh = async () => {
    try {
      const { success, data, error } = await API.get(`/hotels/${hotelData.id}`);
      
        setOneHotelData(data); 
        
      
    } catch (error) {
      
    }
  };
  handleRefresh()
  }

  return (
    <div>
      <div className="">
        

        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto mt-8">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
              <div className="flex flex-col flex-wrap gap-1 justify-start items-start mx-auto">
                <h4>Hotel</h4>
                <h2 className="text-lg font-medium text-gray-600">
                  {oneHotelData.title}
                </h2>
                <h4>{oneHotelData.City}</h4>
              </div>
              <hr className="border-white border-2 my-6" />
              <div className="flex flex-wrap gap-1 justify-center mx-auto flex-col items-start">
                <h2 className="text-lg font-medium text-gray-700">
                  Your booking details
                </h2>
                <div className="flex gap-2">
                  <div className="text-md text-gray-700 flex flex-col flex-wrap">
                    {" "}
                    Check-In Date:-{" "}
                    <span className="font-semibold  "> {date1} </span>{" "}
                  </div>
                  <div className="text-md text-gray-700 flex flex-col flex-wrap">
                    {" "}
                    Check-Out Date:-{" "}
                    <span className="font-semibold  "> {date2} </span>{" "}
                  </div>
                </div>
                <div className="text-md text-gray-700 flex-wrap">
                  Total length of stay:
                  <span className="font-semibold  "> {nights} </span> nights
                </div>
                <div className="text-md text-gray-700 flex-wrap">
                  You selected{" "}
                  <span className="font-semibold  "> {rooms} </span> room for{" "}
                  <span className="font-semibold  "> {adults} </span> adult
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">
                User Detail:
              </h2>
              <div className="flex flex-wrap gap-4 mt-4 flex-col">
                <p className="text-gray-800 text-lg ">
                  You are Signed in as:{" "}
                  <span className="font-semibold">{user.email}</span>
                </p>
                <p className="text-gray-800 text-lg ">Billing details:</p>
                <h4>one Room Price: ${oneHotelData.Price}</h4>
                {children ? (
                  <h4>
                    ${oneHotelData.Price} X {nights} night X {adults} adult X{" "}
                    {rooms} room {" "}
                  </h4>
                ) : (
                  <h4>
                    ${oneHotelData.Price} X {nights} night X {adults} adult X{" "}
                    {rooms} room{" "}
                  </h4>
                )}
                <div>
                  <strike className="text-red-600 text-sm">
                    ${beforeDiscount}
                  </strike>{" "}
                  <p className="font-semibold">${total}</p>
                  <h2 className="text-gray-600 text-md">
                    {" "}
                    +${taxes} taxes and charges
                  </h2>
                </div>
              </div>

              <div className="mt-8 max-w-md">
                <div className="flex items-start mt-8"></div>
                <button
                  className="mt-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md bg-[#0071c2] text-white  hover:bg-sky-800 flex items-center gap-0.5"
                  onClick={() => bookRoom()}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
