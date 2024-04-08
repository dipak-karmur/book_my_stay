import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  getSellers,
  getUsers,ner,
} from "../../../../utils/axios-instance";
import { setRole } from "../../../../redux/actions/roleAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";
import { MdConfirmationNumber, MdEmail } from "react-icons/md";
import { TbBrandAirtable } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import Input from "../../../common/Input";
import ButtonComponent from "../../../common/ButtonComponent";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { setLoader } from "../../../../redux/actions/appActions";
import Loader from "../../../common/Loader";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
const gstinRules = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const sellerSchema = yup.object({
  name: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must not contain more than 15 characters")
    .trim(),
  businessName: yup
    .string()
    .required("*required")
    .min(5, "*Business name must contain atleast 5 characters")
    .trim(),
  gstin: yup
    .string()
    .required("*GSTIN required for selling products on Bac-Mart")
    .matches(gstinRules, "*GSTIN must be in the format of 22AAAAA0000A1Z5"),
  brand: yup
    .string()
    .required("*required")
    .min(2, "*Brand name must contain atleast 2 characters"),
  email: yup.string().required("*required").email("*Email is not valid").trim(),
  password: yup
    .string()
    .required("*required")
    .matches(
      passwordRules,
      "*Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number"
    ),
  cpassword: yup
    .string()
    .required("*required")
    .oneOf([yup.ref("password")], "*Passwords must match"),
});

consner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.role);
  const { loader } = useSelector((state) => state.app);

  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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
      name: "",
      businessName: "",
      gstin: "",
      brand: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: sellerSchema,
    onSubmit,
  });

  async function onSubmit(values) {
    const { name, businessName, gstin, brand, email, password } = values;

    const emailExistsInUsers = users.findIndex(
      (user) => user.email === values.email
    );
    const emailExistsInSellers = sellers.findIndex(
      (seller) => seller.email === values.email
    );

    if (emailExistsInUsers === -1 && emailExistsInSellers === -1) {
      let sellerObj = {
        id:
          sellers.length !== 0
            ? (parseInt(sellers[sellers.length - 1].id) + 1).toString()
            : "1",
        name: name.trim(),
        businessName: businessName.trim(),
        gstin,
        brand: brand.trim(),
        email: email.trim(),
        password,
        productsToSell: [],
      };

      try {
        dispatch(setLoader(true));
        const { success, data, error } = awainer(sellerObj);
        if (success) {
          dispatch(setRole("seller", sellerObj));
          handleReset();
          toast.success("Seller registered successfully");
          navigate("/");
        } else {
          console.log("Failed to register seller ", error);
          toast.error(
            "Problem for registering seller, Please try after some time!"
          );
        }
      } catch (error) {
        console.log("Failed to register seller ", error);
      } finally {
        dispatch(setLoader(false));
      }
    } else {
      // user exists already
      toast.error("User already exists!!");
      handleReset();
    }
  }

  useEffect(() => {
    // if looged in then don't give access to this page
    isAuth ? navigate("/") : null;

    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();
      const {
        success: sellerSuccess,
        data: sellersData,
        error: sellerError,
      } = await getSellers();

      setUsers(usersData);
      setSellers(sellersData);
    })();
  }, []);

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
  );
};

export default HotelOwnerRegister;
