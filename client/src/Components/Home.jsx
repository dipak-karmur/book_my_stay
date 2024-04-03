import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import FetchData from "../utils/Axios/FetchData";
import SearchBar from "./layout/SearchBar";
import HotelCard from "./Common/HotelCard";

const Home = () => {
    const products  = useSelector((state) =>state.products )

    console.log(products);

  return (
    <div>
      
      {/* <h1>Products page</h1>
      <FetchData/> */}
      <SearchBar/>
      {/* <HotelCard/> */}
    </div>
  );
};

export default Home;
