import { useState } from "react";

import { NavLink } from "react-router-dom";
import "../../styles/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SavedHotels from "../pages/SavedHotels";
import UserBookings from "../pages/UserBookings";
import { removeRole } from "../../Redux/Actions/roleActions";
import { toast } from "react-toastify";

function Navbar() {
  const [burgerButton, setBurgerButton] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);

  const user =
    role.user?.firstName ||
    role.hotelowner?.firstName ||
    role.admin?.email ||
    null;

  //  const user = useSelector((state) => state.role.user.firstName);

  async function logout() {
    dispatch(removeRole());
    toast.success("Logout Successful !!");
    scrollToTop();
    navigate("/");
  }

  function handleNavigate() {
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-[#092332] border-gray-200 ">
        <div className="max-w-screen-xl flex flex-1 items-center justify-between mx-auto gap-2 sm:gap-8 md:gap-12 lg:gap-32 p-4 ">
          <div>
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/images/FutureVoyage.png"
                className="h-10 md:h-14 md:p-2"
                alt="FutureVoyage Logo"
              />
            </a>
          </div>

          {/* <button
            data-collapse-toggle="navbar-default"
            type="button"
            onClick={() => setBurgerButton((prev) => !prev)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-blue-400 hover:text-white focus:outline-none  "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button> */}
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            onClick={() => setBurgerButton((prev) => !prev)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-blue-400 hover:text-white focus:outline-none mr-4 absolute right-2"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {/* <div
            className={`${
              burgerButton ? `w-full` : `hidden w-full`
            } md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#092332] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  "> */}
          <div
            className={`${burgerButton ? `block absolute z-50 top-16 w-[90vw] mx-auto right-2` : `hidden`} lg:block `}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-[#092332] lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
              <NavLink
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-[#42a4ee] transition md:border-0 md:hover:text-white md:px-2 md:py-0.5 md:justify-center md:items-center mt-1 md:mt-0 "
                activeClassName="active"
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-[#42a4ee] transition md:border-0 md:hover:text-white md:px-2 md:py-0.5 md:justify-center md:items-center mt-1 md:mt-0 "
                activeClassName="active"
              >
                About
              </NavLink>
              <NavLink
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-[#42a4ee] transition md:border-0 md:hover:text-white md:px-2 md:py-0.5 md:justify-center md:items-center mt-1 md:mt-0 "
                activeClassName="active"
              >
                Services
              </NavLink>

              <NavLink 
                to={role.hotelowner !== null ? `/register-property` : `/ownerregister`}
                className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-[#42a4ee] transition md:border-0 md:hover:text-white md:px-2 md:py-0.5 md:justify-center md:items-center mt-1 md:mt-0 "
                activeClassName="active"
              >
                Register Your property
              </NavLink>
            </ul>
            {/* {user && !burgerButton? (
                <button className="flex gap-1 justify-center items-center text-white bg-blue hover:bg-blue-400 rounded-full px-2 py-2 absolute right-2 top-6 ">
                  <CgProfile size={20} />
                  {user}
                </button>
              ) : null} */}
          </div>

          {user !== null ? (
            <ul className="flex flex-col gap-1  mx-auto justify-center items-center text-white bg-blue hover:bg-blue-400 right-2 top-6 p-0 w-fit">
              <li>
                <div className="group">
                  <div
                    className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer rounded-md"
                    onClick={toggleDropdown}
                  >
                    <span className="flex gap-2 w-[20vw]   lg:w-full">
                      <CgProfile size={20} />
                      {
                        role.admin !== null ?  <span>Admin</span> :  <span>{user}</span>
                      }
                      
                    </span>
                    <svg
                      className={`w-5 h-5 text-white transition rounded-md ${
                        dropdownOpen ? "rotate-90" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </div>

                  {dropdownOpen && (
                    <article className="px-4 pb-4 absolute z-50  rounded-md text-white text-semibold mt-2 bg-[#092332] border-2 border-white  ">
                      {/* Dropdown content goes here */}

                      <ul className="flex flex-col gap-4  mt-4 ">
                        <li className="flex gap-2 hover:bg-blue-400 md:hover:bg-[#42a4ee] transition rounded py-1 px-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            ></path>
                          </svg>

                          {role.user !== null ? (
                            <NavLink to="/userbookings"> My Bookings</NavLink>
                          ) : role.hotelowner !== null ? (
                            <NavLink to="/ownerproperties">
                              {" "}
                              My Properties
                            </NavLink>
                          ) : role.admin !== null ? (
                            <NavLink to="/adminusersdashboard">
                              {" "}
                              All users{" "}
                            </NavLink>
                          ) : null}
                        </li>

                        <li className="flex gap-2 hover:bg-blue-400 md:hover:bg-[#42a4ee] transition rounded py-1 px-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                            ></path>
                          </svg>

                          {role.user !== null ? (
                            <NavLink to="/savedhotels"> Saved</NavLink>
                          ) : role.hotelowner !== null ? (
                            <NavLink to="/acceptrejectbookings">
                              {" "}
                              All Bookings
                            </NavLink>
                          ) : role.admin !== null ? (
                            <NavLink to="/adminhotelsdashboard">
                              {" "}
                              Hotels{" "}
                            </NavLink>
                          ) : null}
                        </li>
                       
                        <li className="flex gap-2 hover:bg-blue-400 md:hover:bg-[#42a4ee] transition rounded py-1 px-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            ></path>
                          </svg>

                          { role.hotelowner !== null ? (
                            <NavLink to="/accepted-bookings">
                              {" "}
                              Accepted Bookings
                            </NavLink>
                          ) : role.admin !== null ? (
                            <NavLink to="/adminhotelownersdashboard">
                              {" "}
                              Hotel owners{" "}
                            </NavLink>
                          ) : null}
                        </li>

                        <li className="flex gap-2 hover:bg-blue-400 md:hover:bg-[#42a4ee] transition rounded py-1 px-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                            ></path>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>

                          {role.admin !== null ? (
                            <NavLink to="/admin-update-category">
                              {" "}
                              Categories{" "}
                            </NavLink>
                          ) : null}
                        </li>
                        <button
                          type="submit"
                          className="text-red-500 text-md text-semibold px-2 py-1 hover:bg-red-200 rounded-md"
                          onClick={logout}
                        >
                          Log Out
                        </button>
                      </ul>
                    </article>
                  )}
                </div>
              </li>
            </ul>
          ) : ( <button
            className="mt-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md bg-[#0071c2] text-white  hover:bg-sky-800 flex items-center gap-0.5"
            onClick={handleNavigate}
          >
            Sign in
          </button>)}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

{
  /* {user !== null ? (
            <ul className="flex flex-col gap-1  mx-auto justify-center items-center text-white bg-blue hover:bg-blue-400 right-2 top-6 p-0 w-fit">
              <li>
                <details className="group">
                  <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                    <span className="flex gap-2">
                      <CgProfile size={20} />
                      <span>{user}</span>
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </summary>

                  <article className="px-4 pb-4">
                    <ul className="flex flex-col gap-4 pl-2 mt-4">
                      <li className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                          ></path>
                        </svg>

                        {role.user !== null ? (
                          <NavLink to="/userbookings"> My Bookings</NavLink>
                        ) : role.hotelowner !== null ? (
                          <NavLink to="/ownerproperties">
                            {" "}
                            My Properties
                          </NavLink>
                        ) : role.admin !== null ? (
                          <NavLink to="/adminusersdashboard">
                            {" "}
                            All users{" "}
                          </NavLink>
                        ) : null}
                      </li>

                      <li className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          ></path>
                        </svg>

                        {role.user !== null ? (
                          <NavLink to="/savedhotels"> Saved</NavLink>
                        ) : role.hotelowner !== null ? (
                          <NavLink to="/acceptrejectbookings">
                            {" "}
                            All Bookings
                          </NavLink>
                        ) : role.admin !== null ? (
                          <NavLink to="/adminhotelsdashboard"> Hotels </NavLink>
                        ) : null}
                      </li>

                      <li className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          ></path>
                        </svg>

                        {role.user !== null ? (
                          <NavLink to="/savedhotels"> Saved</NavLink>
                        ) : role.hotelowner !== null ? (
                          <NavLink to="/acceptrejectbookings">
                            {" "}
                            All Bookings
                          </NavLink>
                        ) : role.admin !== null ? (
                          <NavLink to="/adminhotelownersdashboard">
                            {" "}
                            Hotel owners{" "}
                          </NavLink>
                        ) : null}
                      </li>

                      <li className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>

                        <a href="http://127.0.0.1:8000/user/settings">
                          Settings
                        </a>
                      </li>
                      <button
                        type="submit"
                        className="text-red-500 text-sm px-2 py-1 hover:bg-red-200 rounded-md"
                        onClick={logout}
                      >
                        Log Out
                      </button>
                    </ul>
                  </article>
                </details>
              </li>
            </ul>
          ) : (
            <button
              className="mt-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md bg-[#0071c2] text-white  hover:bg-sky-800 flex items-center gap-0.5"
              onClick={handleNavigate}
            >
              sign in
            </button>
          )} */
}
