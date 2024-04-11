import React, { useEffect, useState } from "react";
import {
  DeleteBooking,
  getBookings,
  getHotels,
  updateHotel,
} from "../../utils/Axios/RequestBuilder";
import { useSelector } from "react-redux";
import HotelCard from "../Common/HotelCard";
import ButtonComponent from "../Common/ButtonComponent";
import { toast } from "react-toastify";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);

  const user = useSelector((state) => state.role.user);
  useEffect(() => {
    async function fetchBooking() {
      try {
        const { success, data, error } = await getBookings();
        setBookings(data);
      } catch (error) {
        console.log(error.message);
      }

      try {
        const { success, data, error } = await getHotels();
        setHotelData(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchBooking();
  }, []);

  useEffect(() => {
    const userBooking = bookings.filter(
      (booking) => booking.userId === user.id
    );
    setBookingsData(userBooking);
    // Set filtered user bookings in state
    console.log(bookingsData);
  }, [bookings, user.id]);

  useEffect(() => {
    console.log(bookingsData);
  }, [bookingsData]);

  

  async function deleteBookingHandler(hotel, booking) {
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
        toast.success("Booking deleted successfully!");

        // Fetch updated bookings data after successful booking deletion
        const {
          success: fetchSuccess,
          data: updatedBookingsData,
          error: fetchError,
        } = await getBookings();
        console.log(updatedBookingsData);
        if (fetchSuccess) {
          const a = updatedBookingsData.filter(
            (booking) => booking.userId === user.id
          );
          console.log(a);
          setBookingsData(
            updatedBookingsData.filter((booking) => booking.userId === user.id)
          );
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

  return (
    <div>
      {bookingsData.map((booking) => {
        return (
          <>
            <HotelCard hotel={booking.hotel}>
              <div></div>
              <div className="flex justify-between mt-4 gap-8 items-center ">
                <span>
                  {" "}
                  Allocated Room Numbers Are:
                  <ul className="text-lg text-semibold text-gray-900 flex  items-center justify-center">
                    {booking.allocatedRooms?.map((room) => {
                      return <li>{room.RoomNumber} , </li>;
                    })}
                  </ul>
                </span>
                <ButtonComponent
                  variant="danger"
                  onClick={() => deleteBookingHandler(booking.hotel, booking)}
                  className='mt-2'
                >
                  Cancel
                </ButtonComponent>
              </div>
            </HotelCard>
          </>
        );
      })}
    </div>
  );
};

export default UserBookings;
