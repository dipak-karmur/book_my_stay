import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addHotel,
  getHotels,
  updateHotelFromAdmin,
} from "../../../utils/Axios/RequestBuilder";
import { toast } from "react-toastify";
import { setLoader } from "../../../Redux/Actions/Actions";

const InitialValues = {
  title: "",
  Location: "",
  City: "",
  distance: "",
  Description: "",
  Category: "",
  Price: 500,
  discountPercentage: 10,
  Amenities: [],
  availableRooms: [],
  Rating: 4.0,
  Thumbnail: "",
  Images: [],
  reviews: [],
};

const hotelSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "too short for title")
    .required("*Title is required"),
  Description: Yup.string()
    .min(8, "too short for description")
    .required("*Description is required"),
  Location: Yup.string().required("Location of Property is required"),
  Category: Yup.string().required("Category of Property is required"),
  distance: Yup.string().required("Distance is required"),
  City: Yup.string().required("City is required"),
  Price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  Rating: Yup.number()
    .required("Rating is required")
    .positive("Rating must be a positive number"),
  discountPercentage: Yup.number()
    .min(0, "Discount percentage must be 0 or greater")
    .max(100, "Discount percentage cannot be greater than 100"),

  Thumbnail: Yup.string()
    .url("Thumbnail must be a valid URL")
    .required("Thumbnail URL is required"),
  Amenities: Yup.string().required("Provide at least one amenity"),
  availableRooms: Yup.string().required("Give Room Number of your Hotel").min(2, "atleast 2 Rooms required to Register your property")
  

});

const RegisterProperty = ({ isFromAdmin = false, hotelData }) => {
  const owner = useSelector((state) => state.role.hotelowner);
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const { hotelowner } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  //   const inputStyle =
  //     "block uppercase tracking-wide text-gray-700 text-xs font-bold";

  const initialValuesAdmin = {
    title: hotelData?.title || "",
    Location: hotelData?.Location || "",
    City: hotelData?.City || "",
    distance: hotelData?.distance || "",
    Description: hotelData?.Description || "",
    Category: hotelData?.Category || "",
    Price: hotelData?.Price || 100,
    discountPercentage: hotelData?.discountPercentagei || 10,
    Amenities: hotelData?.Amenities || [],
    availableRooms: hotelData?.availableRooms || [],
    Rating: hotelData?.Rating || 4.0,
    Thumbnail: hotelData?.Thumbnail || "",
    Images: hotelData?.Images || [],
    reviews: hotelData?.reviews || [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHotels();
        if (response.success) {
          setHotels(response.data);
        } else {
          console.error("Failed to fetch the Products Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching products", error);
      }
    };

    fetchData();
  }, []);
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
    validationSchema: hotelSchema,
    onSubmit,
  });

  hotelData?.title !== "" && !values.title
    ? (values.title = hotelData?.title) && (hotelData.title = "")
    : null;

  hotelData?.Location !== "" && !values.Location
    ? (values.Location = hotelData?.Location) && (hotelData.Location = "")
    : null;

  hotelData?.City !== "" && !values.City
    ? (values.City = hotelData?.City) && (hotelData.City = "")
    : null;

  hotelData?.distance !== "" && !values.distance
    ? (values.distance = hotelData?.distance) && (hotelData.distance = "")
    : null;

  hotelData?.Category !== "" && !values.Category
    ? (values.Category = hotelData?.Category) && (hotelData.Category = "")
    : null;

    

  async function onSubmit  (values) {
    const { Amenities,availableRooms } = values;
    const listOfAmenities = Amenities.split(",");
    const AvailableRooms = availableRooms.split(",");
    const listOfRooms = availableRooms.split(",").map(room => ({ RoomNumber: room }));
    console.log(listOfRooms);

    //// if update from admin
    if (isFromAdmin && hotelData) {
      console.log(hotelData);
      const newHotelFromAdmin = {
        //id: hotelData?.id,
        ...values,
        Amenities: listOfAmenities,
        availableRooms:listOfRooms,
        ownedBy: "admin",
      };
      try {
        dispatch(setLoader(true));
        const { success, data, error } = await updateHotelFromAdmin(
          hotelData.id,
          newHotelFromAdmin
        );
        if (success) {
          toast.success("Hotel updated successfully");
          handleReset();
          navigate("/adminhotelsdashboard");
        } else {
          console.log("Failed to update Hotel ", error);
          toast.error(
            "Problem for updating Hotel, Please try after some time!"
          );
        }
      } catch (error) {
        console.log("Failed to update hotel ", error);
      } finally {
        dispatch(setLoader(false));
      }
      return;
    }

    try {
      const newHotelId =
        hotels.length === 0 ? 1 : parseInt(hotels[hotels.length - 1].id) + 1;

      const newHotel = {
        ...values,
        id: newHotelId.toString(),
        Amenities: listOfAmenities,
        availableRooms:listOfRooms,
        ownedBy: owner.email,
      };
      console.log(newHotel)
      const { success, error } = await addHotel(newHotel);

      if (success) {
        // if (seller) {
        //   const { success, error, data } = await updateSellerProducts(
        //     seller,
        //     newProduct.id.toString()
        //   );
        //   dispatch(setRole("seller", data));
        //   if (success) {
        //     navigate("/seller-products");
        //   }
        // } else {
        //   navigate("/admin");
        // }
        toast.success("Property Added successfully!");
      } else {
        console.error("Error adding hotel:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

 

  return (
    <div className=" ">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* <!-- Row --> */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* <!-- Col --> */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/1344771294/photo/happy-family-in-masks-enjoying-travel-together.jpg?s=612x612&w=0&k=20&c=JMGLBlMM4TyAQ1CAgDJx9igoSucyehARKkvN2rZpec0=')",
              }}
            ></div>
            {/* <!-- Col --> */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="City"
                  >
                    Title
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="title"
                    name="title"
                    type="text"
                    value={values.title}
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.title && errors.title ? (
                    <p className="text-[14px] text-red-700">{errors.title}</p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>

                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Location"
                  >
                    Location
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="Location"
                    name="Location"
                    type="text"
                    value={values.Location}
                    placeholder="Location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Location && errors.Location ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.Location}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="City"
                  >
                    City
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="City"
                    name="City"
                    value={values.City}
                    type="text"
                    placeholder="City"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.City && errors.City ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.City}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="distance"
                  >
                    Distance
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="distance"
                    name="distance"
                    value={values.distance}
                    type="text"
                    placeholder="Distance"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.distance && errors.distance ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.distance}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Description"
                  >
                    Description
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="Description"
                    name="Description"
                    type="text"
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Description && errors.Description ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.Description}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Category"
                  >
                    Category
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="Category"
                    name="Category"
                    type="text"
                    value={values.Category}
                    placeholder="Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Category && errors.Category ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.Category}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Price"
                  >
                    Price
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="Price"
                    name="Price"
                    type="text"
                    placeholder="Price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Price && errors.Price ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.Price}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="discountPercentage"
                  >
                    discountPercentage
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="discountPercentage"
                    name="discountPercentage"
                    type="text"
                    placeholder="discountPercentage"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.discountPercentage && errors.discountPercentage ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.discountPercentage}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Rating"
                  >
                    Rating
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="Rating"
                    name="Rating"
                    type="text"
                    placeholder="Rating"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Rating && errors.Rating ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.Rating}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Thumbnail"
                  >
                    Image
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="Thumbnail"
                    name="Thumbnail"
                    type="text"
                    placeholder="Thumbnail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Thumbnail && errors.Thumbnail ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.Thumbnail}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Amenities"
                  >
                    Amenities
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="Amenities"
                    name="Amenities"
                    type="text"
                    placeholder="Add your properties Amenities"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Amenities && errors.Amenities ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.Amenities}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="availableRooms"
                  >
                    Available Rooms
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="availableRooms"
                    name="availableRooms"
                    type="text"
                    placeholder="Add your Hotel Room Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.availableRooms && errors.availableRooms ? (
                    <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                      {errors.availableRooms}
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
                    Add Property
                  </button>
                </div>
                <hr className="mb-6 border-t" />

                {/* <div className="text-center">
                  <NavLink
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/login"
                  >
                    Already have an account? Login!
                  </NavLink>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProperty;
