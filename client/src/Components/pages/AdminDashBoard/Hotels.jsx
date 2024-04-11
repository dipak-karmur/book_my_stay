import React, { useEffect, useState } from "react";
import { DeleteHotel, DeleteUser, getHotels } from "../../../utils/Axios/RequestBuilder";
import TableComponent from "../../Common/TableComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const hotelsArray = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "City", label: "City" },
    { key: "Price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "Rating", label: "Rating" },
  ];

  const handleUpdate = (hotelId) => {
    navigate(`/admin-update-hotels/${hotelId}`);
  };

  const handleDelete = async (hotelId) => {
    console.log(hotelId);
    try {
      const response = await DeleteHotel(hotelId);
      if (response.success) {
        const updatedhotels = hotels.filter((hotel) => hotel.id !== hotelId);
       setHotels(updatedhotels);
        toast.success("Hotel deleted Successfully!");
      }
    } catch (error) {
      console.error("Error while deleting hotels", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHotels();
        if (response.success) {
         setHotels(response.data);
        } else {
          console.error("Failed to fetch the hotels Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching hotels", error);
      }
    };

    fetchData();
  }, []);
  console.log(hotels);
  return (
    <div>
      {hotels.length > 0 && (
        <TableComponent
          data={hotels}
          headers={hotelsArray}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Hotels;
