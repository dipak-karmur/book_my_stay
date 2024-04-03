// import React from "react";
// import { useState } from "react";
// import { DateRange } from "react-date-range";
// import { format } from "date-fns";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import "../styles/searchBar.css";

// function SearchBar() {
//   const [openDate, setOpenDate] = useState(false);
//   const [openOptions, setOpenOptions] = useState(false);
//   const [options, setOptions] = useState({
//     adult: 1,
//     children: 0,
//     room: 1,
//   });
//   const [date, setDate] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   const handleOption = (name, operation) => {
//     setOptions((prev) => {
//       return {
//         ...prev,
//         [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
//       };
//     });
//   };

//   return (
//     <div>
//       <div className="flex flex-1 items-center justify-center w-full ">
//         <div className="w-full max-w-lg">
//           <form className="mt-5 flex items-center justify-center flex-col md:flex-row gap-4 w-full">
//             <input
//               id="q"
//               name="q"
//               className="h-16 inline w-full rounded-md border border-gray-900 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//               placeholder="Keyword"
//               type="search"
//               autofocus=""
//               value=""
//             />
//             <div
//               className="h-16 inline w-full rounded-md border border-gray-900 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//               onClick={() => setOpenDate(!openDate)}
//             >
//               {format(date[0].startDate, "dd-MM-yyyy")} to{" "}
//               {format(date[0].endDate, "dd-MM-yyyy")}
//             </div>
//             {openDate && (
//               <DateRange
//                 className="absolute top-[300px] md:top-[250px] md:right-[31vw] "
//                 editableDateInputs={true}
//                 onChange={(item) => setDate([item.selection])}
//                 moveRangeOnFirstSelection={false}
//                 ranges={date}
//               />
//             )}
//             <span className="h-16 inline w-full rounded-md border border-gray-900 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" onClick={() => setOpenOptions(!openOptions)}>
//             {options.adult} adult · {options.children} children · {options.room} room
//             </span>
//             {openOptions && (
//                   <div className="options absolute top-[300px] md:top-[250px] md:right-[31vw] ">
//                     <div className="optionItem">
//                       <span className="optionText">Adult</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.adult <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.adult}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Children</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.children <= 0}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.children}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Room</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.room <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.room}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//             <button
//               type="submit"
//               className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;



import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import "../../styles/searchBar.css";
import { FaBed } from "react-icons/fa6";
import { MdFlight } from "react-icons/md";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const SearchBar = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
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
            {/* <FontAwesomeIcon icon={faBed} /> */}
            <span className="flex items-center gap-2"><FaBed size={20}/>Stays</span>
          </div>
          <div className="headerListItem cursor-pointer">
            {/* <FontAwesomeIcon icon={faPlane} /> */}
            <span className="flex items-center gap-2"> <MdFlight size={20} />Flights</span>
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
            <button className="headerBtn m-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md hover:bg-sky-800">Sign in / Register</button>
            <div className="headerSearch  flex flex-1  items-center justify-around flex-col md:flex-row w-1/2 md:w-full h-18 absolute mt-1 md:bottom-[-35px] mx-[25vw] md:mx-0 ">
              <div className="headerSearchItem">
                {/* <FontAwesomeIcon icon={faBed} className="headerIcon" /> */}
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput h-10 inline w-full rounded-md border  bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-900 text-gray-900 md:text-xl focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-base font-normal  mb-2 md:mb-0"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                {/* <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" /> */}
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText h-10 inline w-full rounded-md border border-[#febb02] bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-900 text-gray-900 md:text-lg cursor-pointer focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm mb-2 md:mb-0 place-content-center"
                >{`${format(date[0].startDate, "dd-MM-yyyy")} to ${format(
                  date[0].endDate,
                  "dd-MM-yyyy"
                )}`}</span>
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
                {/* <FontAwesomeIcon icon={faPerson} className="headerIcon" /> */}
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
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
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
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
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
                <button className="headerBtn rounded-md px-2 py-1.5 md:px-3 md:py-2 hover:bg-sky-800" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;