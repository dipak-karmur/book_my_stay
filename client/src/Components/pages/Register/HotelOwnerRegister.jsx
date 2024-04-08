import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { setRole } from "../../../Redux/Actions/roleActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { setLoader } from "../../../Redux/Actions/Actions";
import Loader from "../../Common/Loader";
import {
  addHotelOwner,
  getUsers,
  getHotelOwners,
} from "../../../utils/Axios/RequestBuilder";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

const hotelOwnerSchema = yup.object({
  firstName: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must contain less than 15 characters")
    .trim(),
  lastName: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must contain less than 15 characters")
    .trim(),
  hotelName: yup
    .string()
    .required("*required")
    .min(5, "*Hotel name must contain atleast 5 characters")
    .trim(),

  email: yup.string().required("*required").email("*Email is not valid").trim(),
  password: yup
    .string()
    .required("*required")
    .matches(
      passwordRules,
      "*Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number"
    ),
  c_password: yup
    .string()
    .required("*required")
    .oneOf([yup.ref("password")], "*Passwords must match"),
});

const HotelOwnerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.role);
  const { loader } = useSelector((state) => state.app);

  const [users, setUsers] = useState([]);
  const [hotelOwners, setHotelOwners] = useState([]);
  //   const [showPass, setShowPass] = useState(false);
  //   const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      hotelName: "",
      email: "",
      password: "",
      c_password: "",
    },
    validationSchema: hotelOwnerSchema,
    onSubmit,
  });

  async function onSubmit(values) {
    const { firstName, lastName, hotelName, email, password } = values;
    console.log(values);

    const emailExistsInUsers = users.findIndex(
      (user) => user.email === values.email
    );
    const emailExistsInHotelOwners = hotelOwners.findIndex(
      (owner) => owner.email === values.email
    );

    console.log(emailExistsInHotelOwners);
    console.log(emailExistsInUsers);
    if (emailExistsInUsers === -1 && emailExistsInHotelOwners === -1) {
      let newHotelOwner = {
        // id:
        //   sellers.length !== 0
        //     ? (parseInt(sellers[sellers.length - 1].id) + 1).toString()
        //     : "1",
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        hotelName: hotelName.trim(),
        email: email.trim(),
        password,
        categoriesToOffer: [],
      };

      try {
        dispatch(setLoader(true));
        const { success, data, error } = await addHotelOwner(newHotelOwner);
        if (success) {
          dispatch(setRole("hotelowner", newHotelOwner));
          handleReset();
          toast.success("Hotel owner registered successfully");
          navigate("/");
        } else {
          console.log("Failed to register hotel owner ", error);
          toast.error(
            "Problem while registering hotel owner , Please try again!"
          );
        }
      } catch (error) {
        console.log("Failed to register hotel owner ", error);
      } finally {
        dispatch(setLoader(false));
      }
    } else {
      // user exists already
      toast.error("User already exists!!");
      handleReset();
    }
  }

  //   useEffect(() => {
  //     // if looged in then don't give access to this page
  //     isAuth ? navigate("/") : null;

  //     (async () => {
  //       const {
  //         success: usersSuccess,
  //         data: usersData,
  //         error: userError,
  //       } = await getUsers();
  //       const {
  //         success: Success,
  //         data: ownerData,
  //         error: Error,
  //       } = await getHotelOwners();

  //       setUsers(usersData);
  //       setHotelOwners(ownerData);
  //     })();
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      // if logged in, then don't give access to this page
      if (isAuth) {
        navigate("/");
        return;
      }

      try {
        dispatch(setLoader(true));

        // Fetch users and hotel owners data
        const {
          success: usersSuccess,
          data: usersData,
          error: userError,
        } = await getUsers();
        const {
          success: ownersSuccess,
          data: ownersData,
          error: ownerError,
        } = await getHotelOwners();

        // Check if data fetching was successful
        if (usersSuccess && ownersSuccess) {
          setUsers(usersData);
          setHotelOwners(ownersData);
        } else {
          throw new Error(userError || ownerError || "Failed to fetch data");
        }
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      } finally {
        dispatch(setLoader(false));
      }
    };

    fetchData();
  }, [dispatch, isAuth, navigate]);

  if (loader) {
    return <Loader />;
  }

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
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.firstName && errors.firstName ? (
                      <p className="text-[14px] text-red-700">
                        {errors.firstName}
                      </p>
                    ) : (
                      <p className="text-[14px] opacity-0">null</p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.lastName && errors.lastName ? (
                      <p className="text-[14px] text-red-700">
                        {errors.lastName}
                      </p>
                    ) : (
                      <p className="text-[14px] opacity-0">null</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="hotelName"
                  >
                    Hotel Name
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="hotelName"
                    name="hotelName"
                    type="text"
                    placeholder="Hotel Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.hotelName && errors.hotelName ? (
                    <p className="text-[14px] text-red-700">
                      {errors.hotelName}
                    </p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email ? (
                    <p className="text-[14px] text-red-700">{errors.email}</p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Random@719"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? (
                      <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                        {errors.password}
                      </p>
                    ) : (
                      <p className="text-[14px] opacity-0">null</p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                      id="c_password"
                      name="c_password"
                      type="password"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.c_password && errors.c_password ? (
                      <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                        {errors.c_password}
                      </p>
                    ) : (
                      <p className="text-[14px] opacity-0">null</p>
                    )}
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />

                <div className="text-center">
                  <NavLink
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/login"
                  >
                    Already have an account? Login!
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOwnerRegister;
