import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, Navigate } from "react-router-dom";
import {
  addUser,
  getUsers,
  updateUserFromAdmin,
} from "../../../utils/Axios/RequestBuilder";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Common/Loader";
import { setLoader } from "../../../Redux/Actions/Actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../../Redux/Actions/roleActions";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

const userSchema = yup.object({
  firstName: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must not contain more than 15 characters")
    .trim(),
  lastName: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must not contain more than 15 characters")
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

const userSchemaAdmin = yup.object({
  firstName: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must not contain more than 15 characters")
    .trim(),
  lastName: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must not contain more than 15 characters")
    .trim(),
  email: yup.string().required("*required").email("*Email is not valid").trim(),
  password: yup
    .string()
    .required("*required")
    .matches(
      passwordRules,
      "*Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number"
    ),
});

function UserRegister({ isFromAdmin = false, userData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { isAuth } = useSelector((state) => state.role);

  const { loader } = useSelector((state) => state.app);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();

      setUsers(usersData);
    })();
  }, []);

  let initialValuesUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    c_password: "",
  };

  // let initialValuesAdmin = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // };
  const initialValuesAdmin = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    password: userData?.password || "",
    c_password: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
  } = useFormik({
    // initialValues: !isFromAdmin ? initialValuesUser : initialValuesAdmin,
    // validationSchema: !isFromAdmin ? userSchema : userSchemaAdmin,
    initialValues: !isFromAdmin ? initialValuesUser : initialValuesAdmin,
    validationSchema: !isFromAdmin ? userSchema : userSchemaAdmin,
    onSubmit,
  });

  userData?.firstName !== "" && !values.firstName
    ? (values.firstName = userData?.firstName) && (userData.firstName = "")
    : null;

  userData?.lastName !== "" && !values.lastName
    ? (values.lastName = userData?.lastName) && (userData.lastName = "")
    : null;

  userData?.email !== "" && !values.email
    ? (values.email = userData?.email) && (userData.email = "")
    : null;

  userData?.password !== "" && !values.password
    ? (values.password = userData?.password) && (userData.password = "")
    : null;

  async function onSubmit(values) {
    console.log(values);
    const { firstName, lastName, email, password } = values;

    const emailExistsInUsers = users.findIndex(
      (user) => user.email === values.email
    );
    // const emailExistsInSellers = sellers.findIndex(
    //   (seller) => seller.email === values.email
    // );
    if (isFromAdmin && userData) {
      console.log(userData)
      const newUserFromAdmin = {
        //id: userData?.id,
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email,
          password: values.password.trim(),
          savedHotels: [],
      }
      try {
        dispatch(setLoader(true));
        const { success, data, error } = await updateUserFromAdmin( userData.id,newUserFromAdmin);
        if (success) {
          toast.success("User updated successfully");
          handleReset();
          navigate("/adminusersdashboard");
        } else {
          console.log("Failed to update user ", error);
          toast.error("Problem for updating user, Please try after some time!");
        }
      } catch (error) {
        console.log("Failed to update user ", error);
      } finally {
        dispatch(setLoader(false));
      }
      return;
    }

    if (emailExistsInUsers === -1) {
      let userObj = {
        // id:
        //   users?.length !== 0
        //     ? (parseInt(users[users?.length - 1]?.id) + 1).toString()
        //     : "1",
        //id: '1',
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password,
        savedHotels: [],
      };

      try {
        dispatch(setLoader(true));
        setTimeout(async () => {
          const { success, data, error } = await addUser(userObj);
          if (success) {
            console.log("success");
            !isFromAdmin && dispatch(setRole("user", userObj));
            handleReset();
            toast.success("User registered successfully");
            !isFromAdmin ? navigate("/") : navigate("/admin-users");
          } else {
            console.log("Failed to register user ", error);
            toast.error(
              "Problem while registering user, Please try after some time!"
            );
          }
        }, 2000);
      } catch (error) {
        console.log("Failed to register user ", error);
      } finally {
        dispatch(setLoader(false));
      }
    } else {
      // user exists already
      toast.error("User already exists!!");
      handleReset();
    }
  }
  if (loader) {
    return <Loader />;
  }

  return (
    <div>
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
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
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
                        value={values.firstName}
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
                        value={values.lastName}
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
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-[#42a4ee]"
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
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
                        value={values.password}
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
                        value={values.c_password}
                        placeholder="******************"
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
    </div>
  );
}
export default UserRegister;
