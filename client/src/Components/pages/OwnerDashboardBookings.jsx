import React, { useEffect, useState } from "react";
import {
  DeleteBooking,
  getBookings,
  updateBookingWithStatus,
  updateHotel,
} from "../../utils/Axios/RequestBuilder";
import ButtonComponent from "../Common/ButtonComponent";
import { useSelector } from "react-redux";
import HotelCard from "../Common/HotelCard";
import { toast } from "react-toastify";
import { format } from "date-fns";

const OwnerDashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  //const [bookingsData, setBookingsData] = useState([]);

  const user = useSelector((state) => state.role.hotelowner);
  useEffect(() => {
    async function fetchBooking() {
      try {
        const { success, data, error } = await getBookings();
        setBookings(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchBooking();
  }, []);

  let btnHandler = false;
    useEffect(() => {

    }, [btnHandler]);

  async function rejectBookingHandler(hotel, booking) {
    try {
      console.log(booking);
      const { success, error } = await DeleteBooking(booking.id);
      const hotelAvailableRooms = [
        ...hotel.availableRooms,
        ...booking.allocatedRooms,
      ];
      console.log(hotelAvailableRooms);
      const updatedHotel = { ...hotel, availableRooms: hotelAvailableRooms };
      const { successMsg, errorMsg } = await updateHotel(updatedHotel);
      if (errorMsg) {
        console.log(errorMsg);
      }
      if (success) {
        toast.success("Booking Rejected successfully!");

        // Fetch updated bookings data after successful booking deletion
        const {
          success: fetchSuccess,
          data: updatedBookingsData,
          error: fetchError,
        } = await getBookings();
        console.log(updatedBookingsData);
        if (fetchSuccess) {
          setBookings(updatedBookingsData);
        } else {
          console.error("Error fetching updated bookings data:", fetchError);
          toast.error(
            "Failed to fetch updated bookings data. Please try again later."
          );
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }
  
  async function acceptBookingHandler(hotel, booking) {
    const updatedBooking = { ...booking, status: "accepted" };
    try {
      const { success, data, error } = await updateBookingWithStatus(
        updatedBooking
      );
      if (success) {
        toast.success("Booking Accepted Successfully!");
        btnHandler = true;
      }
    } catch (error) {
      console.log(error.message);
      toast.error("something went wrong from our end!");
    }
  }

  return (
    <div>
      {bookings.map((booking) => {
        return (
          <>
            <HotelCard hotel={booking.hotel}>
              <div></div>
              <div>
              <div className="flex justify-center mt-2">
                <ButtonComponent
                  variant="primary"
                  onClick={() => acceptBookingHandler(booking.hotel, booking)}
                >
                  {btnHandler ? `Accepted` : `Accept`}
                </ButtonComponent>
                {!btnHandler ? (
                  <ButtonComponent
                    variant="danger"
                    onClick={() => rejectBookingHandler(booking.hotel, booking)}
                  >
                    Reject
                  </ButtonComponent>
                ) : null}
              </div>
              </div>
              <div className="">
              <div className="flex flex-col items-center justify-center mt-0 md:mt-[10vw]">
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
             
              </div>
             
            </HotelCard>
          </>
        );
      })}
    </div>
  );
};

export default OwnerDashboardBookings;
