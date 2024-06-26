import React from "react";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import "../../styles/searchBar.css";
import { FaBed } from "react-icons/fa6";
import { MdFlight } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../Redux/Actions/SearchAction";

const SearchBar = () => {
  const searchData = useSelector((state) => state.searchData);
  const [destination, setDestination] = useState(searchData.destination);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: searchData.date?.[0]?.startDate || new Date(),
      endDate: searchData.date?.[0]?.endDate || new Date(),
      key: searchData.date?.[0]?.key || "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: searchData.options?.adult || 1,
    children: searchData.options?.children || 0,
    room: searchData.options?.room || 1,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch(setSearchData(destination, date, options));
    navigate("/hotels", { state: { destination, date, options } });
  };

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="headerSearch  flex flex-1  items-center justify-around flex-col md:flex-row w-1/2 md:w-full h-18 absolute mt-1 md:bottom-[-35px] mx-[25vw] md:mx-0 ">
        <div className="headerSearchItem">
          <BiBed size={30} className="text-gray-700" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="headerSearchInput h-10 inline w-full rounded-md border  bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-900 text-gray-900 md:text-xl focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-base font-normal  mb-2 md:mb-0"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="headerSearchItem">
          {/* <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" /> */}
          {/* <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText h-10 inline w-full rounded-md border border-[#febb02] bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-900 text-gray-900 md:text-lg cursor-pointer focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm mb-2 md:mb-0 place-content-center"
                >{`${format(date[0]?.startDate, "dd-MM-yyyy")} to ${format(
                  date[0]?.endDate,
                  "dd-MM-yyyy"
                )}`}</span> */}
          <LuCalendarDays size={30} className="text-gray-700" />
          <span
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchText h-10 inline w-full rounded-md border border-[#febb02] bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-900 text-gray-900 md:text-lg cursor-pointer focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm mb-2 md:mb-0 place-content-center"
          >
            {`${
              date[0]?.startDate
                ? format(date[0]?.startDate, "dd-MM-yyyy")
                : "Start Date"
            } to ${
              date[0]?.endDate
                ? format(date[0]?.endDate, "dd-MM-yyyy")
                : "End Date"
            }`}
          </span>

          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date absolute top-[100px] md:top-[60px] shadow-md"
              minDate={new Date()}
            />
          )}
        </div>
        <div className="headerSearchItem">
          <IoPersonOutline size={30} className="text-gray-700" />
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchText h-10 inline w-full rounded-md border border-[#febb02] bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-900 text-gray-900 md:text-lg cursor-pointer focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm mb-2 md:mb-0 place-content-center"
          >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
          {openOptions && (
            <div className="options absolute top-[150px] md:top-[60px] shadow-md">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button
                    disabled={options.room <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="headerSearchItem">
          <button
            className="headerBtn rounded-md px-2 py-1.5 md:px-3 md:py-2 hover:bg-sky-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
