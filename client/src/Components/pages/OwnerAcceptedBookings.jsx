import React, { useEffect, useState } from "react";
import { getBookings } from "../../utils/Axios/RequestBuilder";
import HotelCard from "../Common/HotelCard";
import { format } from "date-fns";

const OwnerAcceptedBookings = () => {
  const [bookings, setBookings] = useState([]);
  //const hotelOwner = useSelector((state)=> state.role.hotelowner)

 

  useEffect(() => {
    async function fetchBookings() {
      try {
        const { success, data, error } = await getBookings();

        setBookings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookings();
  }, []);

  const AcceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  );

  console.log(AcceptedBookings);

  return (
    <div>
      {AcceptedBookings.map((booking) => {
        return (
          <HotelCard hotel={booking.hotel}>
            <div></div>
            <div></div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-md text-gray-700 flex flex-col flex-wrap">
                  {" "}
                  Check-In:-{" "}
                  <span className="font-semibold  "> {format(booking.checkInDate, "dd-MM-yyyy")} </span>{" "}
                </div>
             
                <div className="text-md text-gray-700 flex flex-col flex-wrap">
                  {" "}
                  Check-Out:-{" "}
                  <span className="font-semibold  ">{format(booking.checkOutDate, "dd-MM-yyyy")} </span>{" "}
                </div>
              </div>
              <div className="text-md text-gray-700 flex-wrap flex-col gap-1">
                           No.of Room booked:<span className="font-semibold"> {booking.noOfRoom} </span>
                            No.of Guests:  <span className="font-semibold  "> {booking.guests} </span>
                
              </div>
             
            </div>
          </HotelCard>
        );
      })}
    </div>
  );
};

export default OwnerAcceptedBookings;
