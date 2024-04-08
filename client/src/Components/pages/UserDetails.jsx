import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { addBooking, updateHotel } from "../../utils/Axios/RequestBuilder";
import { toast } from "react-toastify";

const UserDetails = () => {
  const location = useLocation();
  const hotelData = location.state;
  const searchData = useSelector((state) => state.searchData);
  const user = useSelector((state) => state.role.user);
  //const bookings = useSelector((state)=> state.bookings);
  console.log(hotelData);

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
    ? (total = nights * adults * rooms * hotelData.Price)
    : (total = (nights * adults * rooms * hotelData.Price * children) / 2);

  const taxes = (total * 12) / 100;
 

  const beforeDiscount = total + (total * hotelData.discountPercentage) / 100;

  //     const availableRoom = hotelData.availableRooms;
  //    let allocation = [];
  //    let i=0;
  //    let requiredRooms = rooms
  //     if (availableRoom.length > 0 && availableRoom.length >= rooms) {
  //       while(requiredRooms){
  //           allocation.push(availableRoom[i].RoomNumber);
  //           hotelData.availableRooms.shift()
  //           requiredRooms--;
  //           i++;
  //       }

  //     }else{
  //       toast.error('Sufficient Rooms are not available!')
  //     }

  /// booking logic

  async function bookRoom() {
   

    let allocation = [];
    let availableRoomsCopy = [...hotelData.availableRooms]; // Create a copy of available rooms
    console.log(availableRoomsCopy);

    if (availableRoomsCopy.length >= rooms) {
      allocation = availableRoomsCopy
        .slice(0, rooms)
        .map((room) => room.RoomNumber); // Allocate rooms
      availableRoomsCopy.splice(0, rooms); // Remove allocated rooms from copy
    } else {
      toast.error("Sufficient Rooms are not available!");
    }

    console.log(availableRoomsCopy);
    const hotelData2 = { ... hotelData, availableRooms: availableRoomsCopy}
    console.log(hotelData2)
    const newBooking = {
        //   id: Math.random(4),
        hotelId: hotelData.id,
        userId: user.id,
        bookingId: 1,
        checkInDate: tripStartDate,
        checkOutDate: tripEndDate,
        noOfRoom: rooms,
        guests: adults,
        allocatedRooms: allocation
      };
   if( allocation.length > 0) {
    try {
        const { success, data, error } = await addBooking(newBooking);
        const { successMsg, newData, hotelError } = await updateHotel(hotelData2);
        if (hotelError) {
          console.log(hotelError);
        }
  
        if (successMsg) {
          toast.success("Booking Successfull!");
        }
      } catch (error) {
        toast.error("something went wrong!");
      }
   }else{
    toast.error('sorry for inconvenience!')
   }

  }

  return (
    <div>
      <div className="">
        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap mx-auto">
          <a href="#" className="text-gray-600 dark:text-gray-200"></a>

          <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100"></span>

          <a
            href="#"
            className="text-gray-600 dark:text-gray-200 hover:underline"
          >
            Account
          </a>

          <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100"></span>

          <a
            href="#"
            className="text-gray-600 dark:text-gray-200 hover:underline"
          >
            Profile
          </a>

          <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100"></span>

          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Settings
          </a>
        </div>

        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
              <div className="flex flex-col flex-wrap gap-1 justify-start items-start mx-auto">
                <h4>Hotel</h4>
                <h2 className="text-lg font-medium text-gray-600">
                  {hotelData.title}
                </h2>
                <h4>{hotelData.City}</h4>
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
                <h4>one Room Price: ${hotelData.Price}</h4>
                {children ? (
                  <h4>
                    ${hotelData.Price} X {nights} night X {adults} adult X{" "}
                    {rooms} room X {children / 2} children{" "}
                  </h4>
                ) : (
                  <h4>
                    ${hotelData.Price} X {nights} night X {adults} adult X{" "}
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
