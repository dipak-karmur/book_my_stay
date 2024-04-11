import React, { useEffect, useState } from "react";
import API from "../../../utils/Axios/api";
import UserRegister from "../Register/UserRegister";
import { useParams } from "react-router-dom";
import RegisterProperty from "../Register/RegisterProperty";
import HotelOwnerRegister from "../Register/HotelOwnerRegister";

const UpdateHotelOwner = () => {
  const params = useParams();
  const ownerId = params.ownerId;
  const [hotelOwnerData, setHotelOwnerData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, data, error } = await API.get(
          `/hotelowner/${ownerId}`
        );
        setHotelOwnerData(data);
        console.log("success");
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  console.log(hotelOwnerData);
  return (
    <HotelOwnerRegister isFromAdmin={true} hotelOwnerData={hotelOwnerData} />
  );
};

export default UpdateHotelOwner;
