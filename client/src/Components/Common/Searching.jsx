import React, { useEffect } from "react";

const Searching = ({ dataToSearch, setSearchResult, searchQuery }) => {
  //   const searchQuery = useDebounceHook(searchQuery, 300);

  useEffect(() => {
    if (dataToSearch.length > 0) {
      const searchResult = dataToSearch.filter(
        (hotel) =>
          (hotel.title &&
            hotel.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (hotel.Description &&
            hotel.Description.toLowerCase().includes(
              searchQuery.toLowerCase()
            )) ||
          (hotel.City &&
            hotel.City.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (hotel.Category &&
            hotel.Category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResult(searchResult);
    }
  }, [searchQuery, dataToSearch, setSearchResult]);

  //   const handleSearchChange = (e) => {
  //     setSearchQuery(e.target.value);
  //    // setCurrentPage(1);
  //   };
  return <div></div>;
};

export default Searching;
