import React, { useEffect, useState } from "react";

const Sorting = ({ searchResults, setSortingResult }) => {
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (Array.isArray(searchResults)) {
    
      let tempProducts = [...searchResults];
      if (sortOrder === "ascPrice") {
        tempProducts.sort((a, b) => a.Price - b.Price);
      } else if (sortOrder === "descPrice") {
        tempProducts.sort((a, b) => b.Price - a.Price);
      } else if (sortOrder === "ascRating") {
        tempProducts.sort((a, b) => a.Rating - b.Rating);
      } else if (sortOrder === "descRating") {
        tempProducts.sort((a, b) => b.Rating - a.Rating);
      }
      setSortingResult(tempProducts);
    }
  }, [searchResults, sortOrder]);

  const orderChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="flex items-center justify-center w-[30vw]  ml-64 right-2 ">
      <select
        value={sortOrder}
        onChange={(e) => orderChange(e.target.value)}
        className="px-2 py-1.5 w-full md:w-48 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Sort</option>
        <option value="ascPrice">Price: Low to High</option>
        <option value="descPrice">Price: High to Low</option>
        <option value="ascRating">Rating: Low to High</option>
        <option value="descRating">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;
