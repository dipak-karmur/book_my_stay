import React, { useEffect, useState } from "react";
import { DeleteCategory, DeleteHotel, DeleteUser, getCategories } from "../../../utils/Axios/RequestBuilder";
import TableComponent from "../../Common/TableComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const CategoriesArray = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "descriptionn", label: "Description" },
    { key: "image", label: "Image" },
    
  ];

  const handleUpdate = (categoryId) => {
    navigate(`/admin-update-Category/${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    console.log(categoryId);
    try {
      const response = await DeleteCategory(categoryId);
      if (response.success) {
        const updatedCategories = categories.filter((category) => category.id !== categoryId);
       setCategories(updatedCategories);
        toast.success("Category deleted Successfully!");
      }
    } catch (error) {
      console.error("Error while deleting Categories", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        if (response.success) {
         setCategories(response.data);
        } else {
          console.error("Failed to fetch the Categories Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching Categories", error);
      }
    };

    fetchData();
  }, []);
  console.log(categories);
  return (
    <div>
      {categories.length > 0 && (
        <TableComponent
          data={categories}
          headers={CategoriesArray}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Categories;
