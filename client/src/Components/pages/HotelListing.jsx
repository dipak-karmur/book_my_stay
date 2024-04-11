import React, { useEffect, useState } from "react";
import HotelCard from "../Common/HotelCard";
import { getHotels } from "../../utils/Axios/RequestBuilder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Searching from "../Common/Searching";
import ButtonComponent from "../Common/ButtonComponent";
import { IoIosArrowForward } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { setRole } from "../../Redux/Actions/roleActions";
import API from "../../utils/Axios/api";
import SearchBar from "../Common/SearchBar";
import Sorting from "../Common/Sorting";
import PaginationComponent from "../Common/PaginationComponent";

const HotelListing = () => {
  const [hotelData, setHotelData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { destination } = useSelector((state) => state.searchData);
  const user = useSelector((state) => state.role.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);

  const [sortingResult, setSortingResult] = useState([]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    async function fetchHotelData() {
      try {
        const { success, data, error } = await getHotels();
        setHotelData(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchHotelData();
  }, []);
  console.log(searchResult);
  // Update search result whenever hotelData changes
  // useEffect(() => {
  //   setSearchResult(hotelData);
  // }, [hotelData]);
  function handleNavigate(hotel) {
    navigate(`/hotels/${hotel.id}`);
  }

  function likedHeart(hotel) {
    const isLiked = user.savedHotels.some((item) => hotel.id === item.id);
    return isLiked;
  }

  async function addToSavedHotel(hotel) {
    const savedHotelsList = user.savedHotels;
    if (user) {
      const alreadysaved = savedHotelsList.findIndex(
        (item) => item.id === hotel.id
      );
      if (alreadysaved === -1) {
        user.savedHotels.push(hotel);
        setRole("user", user);
        try {
          await API.patch(`/users/${user.id}`, user);
          dispatch(setRole("user", user));
          toast.success("Added to Saved Hotels!");
        } catch (error) {
          console.log(error);
        }
      } else {
        const updatedHotels = user.savedHotels.filter(
          (item) => item.id != hotel.id
        );
        const updatedUser = { ...user, savedHotels: updatedHotels };
        await API.patch(`/users/${user.id}`, updatedUser);
        dispatch(setRole("user", updatedUser));
        toast.success("Removed from Saved Hotels!");
      }
    } else {
      toast.warn("Please Login First");
      navigate("/login");
    }
  }
  const shouldRenderPagination = sortingResult.length > recordsPerPage;

  console.log(sortingResult);
  return (
    <>
      <Searching
        dataToSearch={hotelData}
        setSearchResult={setSearchResult}
        searchQuery={destination}
      />

      <div className="flex flex-col justify-center gap-3 py-8">
        <Sorting
          setSortingResult={setSortingResult}
          searchResults={searchResult}
        />
        {sortingResult
          .slice(indexOfFirstRecord, indexOfLastRecord)
          .map((hotel) => {
            return (
              <>
                {/* <SearchBar className='absolute top-2[!important] z-50 '/> */}
                <HotelCard hotel={hotel}>
                  <button
                    className="cursor-pointer border-[1px] border-slate-300 m-2 bg-slate-100 rounded-full p-2 "
                    onClick={() => addToSavedHotel(hotel)}
                  >
                    <FaHeart
                      size={20}
                      className={`cursor-pointer border-gray-900 ${
                        likedHeart(hotel) ? `text-red-600` : `text-neutral-400`
                      }`}
                    />
                  </button>
                  <ButtonComponent
                    //className="mt-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md bg-[#0071c2] text-white  hover:bg-sky-800 flex items-center gap-0.5"
                    onClick={() => handleNavigate(hotel)}
                  >
                    See avalaibility <IoIosArrowForward size={18} />
                  </ButtonComponent>
                  <div></div>
                </HotelCard>
              </>
            );
          })}
      </div>
      {/* {shouldRenderPagination && ( */}
      <div className="flex justify-center items-center w-auto h-10 my-6">
        <PaginationComponent
          nPages={Math.ceil(sortingResult.length / recordsPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {/* )} */}
    </>
  );
};

export default HotelListing;
