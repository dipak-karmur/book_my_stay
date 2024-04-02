import React from "react";
import { Link, NavLink } from "react-router-dom";
import HOC from "./HOC";
import { useSelector } from "react-redux";
import FetchData from "../Axios/FetchData";
import SearchBar from "./SearchBar";
import HotelCard from "../Common/HotelCard";

const Home = () => {
    const products  = useSelector((state) =>state.products )

    console.log(products);

  return (
    <div>
      
      {/* <h1>Products page</h1>
      <FetchData/> */}
      <SearchBar/>
      <HotelCard/>
    </div>
  );
};

export default HOC(Home);
