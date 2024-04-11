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
import SearchBar from "../Common/SearchBar";

const Header = ({ type }) => {
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
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList flex flex-row items-center gap-10 ">
          <div className="headerListItem active my-4 ml-2 cursor-pointer">
           
            <span className="flex items-center gap-2">
              <FaBed size={20} />
              Stays
            </span>
          </div>
          <div className="headerListItem cursor-pointer">
          
            <span className="flex items-center gap-2">
              {" "}
              <MdFlight size={20} />
              Flights
            </span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle p-2 text-4xl font-semibold">
              Travel around the world with FutureVoyage
            </h1>
            <p className="headerDesc p-2">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free account
            </p>
            <button
              className="headerBtn m-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md hover:bg-sky-800"
              onClick={handleClick}
            >
              Sign in / Register
            </button>
          
            <SearchBar />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;




