import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../Redux/Actions/roleActions";
import API from "../../utils/Axios/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ButtonComponent from "./ButtonComponent";

const HotelCard = ({ hotel,children }) => {
  const user = useSelector((state) => state.role.user);
  const searchData = useSelector((state) => state.searchData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function likedHeart() {
    const isLiked = user.savedHotels.some((item) => hotel.id === item.id);
    return isLiked;
  }

  const tripStartDate = searchData.date?.[0]?.startDate
    ? new Date(searchData.date[0].startDate)
    : new Date();
  const tripEndDate = searchData.date?.[0]?.endDate
    ? new Date(searchData.date[0].endDate)
    : new Date();

  const differenceMs = tripEndDate.getTime() - tripStartDate.getTime();
  const differenceDays = differenceMs / (1000 * 60 * 60 * 24);
  const nights = Math.floor(differenceDays);
  const adults = searchData.options?.adult || 1;
  const total = nights * adults * hotel.Price;
  const taxes = (total * 12) / 100;

  // async function addToSavedHotel(hotel) {
  //   const savedHotelsList = user.savedHotels;
  //   if (user) {
  //     const alreadysaved = savedHotelsList.findIndex(
  //       (item) => item.id === hotel.id
  //     );
  //     if (alreadysaved === -1) {
  //       user.savedHotels.push(hotel);
  //       setRole("user", user);
  //       try {
  //         await API.patch(`/users/${user.id}`, user);
  //         dispatch(setRole("user", user));
  //         toast.success("Added to Saved Hotels!");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       const updatedHotels = user.savedHotels.filter(
  //         (item) => item.id != hotel.id
  //       );
  //       const updatedUser = { ...user, savedHotels: updatedHotels };
  //       await API.patch(`/users/${user.id}`, updatedUser);
  //       dispatch(setRole("user", updatedUser));
  //       toast.success("Removed from Saved Hotels!");
  //     }
  //   } else {
  //     toast.warn("Please Login First");
  //     navigate("/login");
  //   }
  // }

  function handleNavigate() {
    navigate(`/hotels/${hotel.id}`);
  }
  return (
    <div>
      <div className="">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-2xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white mb-4">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img
              src={hotel.Thumbnail}
              alt="hotel"
              className="rounded-xl"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-medium hidden md:block">
                {hotel.Location}
              </p>
              <div className="flex items-center">
                <ReactStars
                  count={5}
                  value={hotel.Rating}
                  a11y={false}
                  isHalf={true}
                  edit={false}
                  size={24}
                  color={`rgb(156 163 175)`}
                  activeColor={`#ffd700`}
                />
                <p className="text-gray-600 font-bold text-sm ml-1">
                  {hotel.Rating}
                </p>
              </div>
              {/* <button
                className="cursor-pointer border-[1px] border-slate-300 m-2 bg-slate-100 rounded-full p-2 "
                onClick={() => addToSavedHotel(hotel)}
              >
                <FaHeart
                  size={20}
                  className={`cursor-pointer border-gray-900 ${
                    likedHeart() ? `text-red-600` : `text-neutral-400`
                  }`}
                />
              </button> */}
              {children[0]}
              <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                {hotel.Category}
              </div>
            </div>

            <Link to={`/hotels/${hotel.id}`}>
              <h3 className="font-black text-gray-800 md:text-3xl text-xl hover:text-[#0071c2]">
                {hotel.title}
              </h3>
            </Link>
            <h1 className="font-black text-gray-700 md:text-xl text-md">
              {hotel.City}
            </h1>
            <p className="md:text-lg text-gray-500 text-base  ">
              {hotel.Description}
            </p>
            <div className="flex justify-between">
              <p className="text-xl font-black text-gray-800 mt-4">
                ${hotel.Price}
                <span className="font-normal text-gray-600 text-base">
                  /night
                </span>
              </p>
              <div className="flex flex-col justify-center items-end">
                <p className="text-sm">
                  {" "}
                  {nights} nights, {adults} adults{" "}
                </p>
                <p className="text-xl font-semibold "> ${total} </p>
                <p className="text-sm">+ ${taxes} taxes and charges</p>
                {/* <ButtonComponent
                  //className="mt-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md bg-[#0071c2] text-white  hover:bg-sky-800 flex items-center gap-0.5"
                  
                  onClick={handleNavigate}
                >
                  See avalaibility <IoIosArrowForward size={18} />
                </ButtonComponent> */}
                {children[1]}
              </div>
            </div>
          </div>
          {children[2]}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
