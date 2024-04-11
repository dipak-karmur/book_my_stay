import React, { useEffect, useState } from "react";
import { addCategory, getCategories, updateCategory } from "../../../utils/Axios/RequestBuilder";
import { setLoader } from "../../../Redux/Actions/Actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {useDispatch } from 'react-redux'


const InitialValues = {
  name: "",
  description: "",
  image: "",
};

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "too short for name")
    .required("*name is required"),
  description: Yup.string()
    .min(8, "too short for description")
    .required("*Description is required"),
  image: Yup.string()
    .url("Thumbnail must be a valid URL")
    .required("Thumbnail URL is required"),
});
const RegisterCategories = ({ isFromAdmin = false, CategoryData }) => {
  console.log(CategoryData)
    const [category,setCategory] = useState([]);
    const dispatch = useDispatch();

  const initialValuesAdmin = {
    name: CategoryData?.name || "",

    description: CategoryData?.description || "",

    image: CategoryData?.image || "",
  };

  const {
    values,
    setFieldValue,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: !isFromAdmin ? InitialValues : initialValuesAdmin,
    validationSchema: CategorySchema,
    onSubmit,
  });

  CategoryData?.name !== "" && !values.name
  ? (values.name = CategoryData?.name) && (CategoryData.name = "")
  : null;

CategoryData?.description !== "" && !values.description
  ? (values.description = CategoryData?.description) && (CategoryData.description = "")
  : null;

CategoryData?.image !== "" && !values.image
  ? (values.image = CategoryData?.image) && (CategoryData.image = "")
  : null;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        if (response.success) {
          setCategory(response.data);
        } else {
          console.error("Failed to fetch the Products Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching products", error);
      }
    };

    fetchData();
  }, []);

  async function onSubmit  (values) {
   
  
    //// if update from admin
    if (isFromAdmin && CategoryData) {
      console.log(CategoryData);
      const newcategoryId =
      category.length === 0 ? 1 : parseInt(category[category.length - 1].id) + 1;
      const newCategoryFromAdmin = {
        //id: CategoryData?.id,
        ...values,
        id: newcategoryId.toString(),
      
      };
      try {
        dispatch(setLoader(true));
        const { success, data, error } = await updateCategory(
          CategoryData.id,
          newCategoryFromAdmin
        );
        if (success) {
          toast.success("category updated successfully");
          handleReset();
          navigate("/admincategorysdashboard");
        } else {
          console.log("Failed to update category ", error);
          toast.error(
            "Problem for updating category, Please try after some time!"
          );
        }
      } catch (error) {
        console.log("Failed to update category ", error);
      } finally {
        dispatch(setLoader(false));
      }
      return;
    }

    try {
      const newcategoryId =
        category.length === 0 ? 1 : parseInt(category[category.length - 1].id) + 1;

      const newcategory = {
        ...values,
        id: newcategoryId.toString(),
       
      };
      console.log(newcategory)
      const { success, error } = await addCategory(newcategory);


      if (success) {
      
        toast.success("Category Added successfully!");
        navigate('/admin-update-Category')
        handleReset();
      } else {
        console.error("Error adding category:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
     <div className=" ">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
         
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/1344771294/photo/happy-family-in-masks-enjoying-travel-together.jpg?s=612x612&w=0&k=20&c=JMGLBlMM4TyAQ1CAgDJx9igoSucyehARKkvN2rZpec0=')",
              }}
            ></div>
          
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">{isFromAdmin ? `Update a Category!` : `Create a Category!`} </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="image"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    placeholder="Category Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name ? (
                    <p className="text-[14px] text-red-700">{errors.name}</p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>

                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="description"
                    name="description"
                    type="text"
                    value={values.description}
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.description ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="image"
                  >
                    Image
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="image"
                    name="image"
                    value={values.image}
                    type="text"
                    placeholder=" Place Image URL"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.image && errors.image ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.image}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
      
                <div className="mb-6 mt-4 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {isFromAdmin ? `Update Category!` : `Add Category!`}
                  </button>
                </div>
                <hr className="mb-6 border-t" />

              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterCategories;
