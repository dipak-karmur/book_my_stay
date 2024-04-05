import { useState } from "react";

import { NavLink } from "react-router-dom";
import "../../styles/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

function Navbar() {
  const [burgerButton, setBurgerButton] = useState(false);
  //const user = useSelector((state) => state.role.user.firstName);

  return (
    <>
      <nav className="bg-[#092332] border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
          <button
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
          </button>
          <div
            className={`${
              burgerButton ? `w-full` : `hidden w-full`
            } md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#092332] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
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
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-[#42a4ee] transition md:border-0 md:hover:text-white md:px-2 md:py-0.5 md:justify-center md:items-center mt-1 md:mt-0 "
                activeClassName="active"
              >
                Contact
              </NavLink>
             
            </ul>
            {/* {user && !burgerButton? (
                <button className="flex gap-1 justify-center items-center text-white bg-blue hover:bg-blue-400 rounded-full px-2 py-2 absolute right-2 top-6 ">
                  <CgProfile size={20} />
                  {user}
                </button>
              ) : null} */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
