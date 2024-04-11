import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHotelOwners, getUsers } from "../../../utils/Axios/RequestBuilder";
import { toast } from "react-toastify";
import { setRole } from "../../../Redux/Actions/roleActions";

const loginSchema = yup.object({
  role: yup
    .string()
    .required("*required")
    .oneOf(["user", "admin", "hotelowner"], "*Please select a valid role"),
  email: yup.string().required("*required").trim(),
  password: yup.string().required("*required").trim(),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [hotelOwners,setHotelOwners]= useState([]);

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
      role: "user",
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });



  async function onSubmit(values) {
    console.log(values);
    const { role, email, password } = values;
    console.log(users);

    if (role === "user") {
      let user = users.find((user) => user.email === email);
      console.log(user);
      if (user && user.password === password) {
         dispatch(setRole(role, user));
         toast.success(`User: ${user.firstName} logged in successfully`);
        navigate("/");
      } else {
         toast.error("Invalid credential !!");
      }
    }else if(role=== 'hotelowner'){
      let owner = hotelOwners.find((owner) => owner.email === email);
      console.log(owner);
      if (owner && owner.password === password) {
         dispatch(setRole(role, owner));
         toast.success(`User: ${owner.firstName} logged in successfully`);
        navigate("/");
      } else {
         toast.error("Invalid credential !!");
      }
    }else if (role === "admin") {
      const admin = { email, password };
      if (email === "admin@gmail.com" && password === "Admin@123") {
        dispatch(setRole(role, admin));
        toast.success("Admin logged in successfully!");
        navigate("/");
      } else {
        toast.error("Invalid credential !!");
      }
    }


    handleReset();
  }

  useEffect(() => {
    // if logged in then don't give access to this page
    // isAuth ? navigate("/") : null;

    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();

      const {
        success: successMsg,
        data: ownersData,
        error: errorMsg,
      } = await getHotelOwners();

      setUsers(usersData);
      setHotelOwners(ownersData);
    })();
  }, []);

  return (
    <div className="">
      <body className="">
        {/* <!-- Container --> */}
        <div className="container mx-auto ">
          <div className="flex justify-center px-6 my-12">
            {/* <!-- Row --> */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              {/* <!-- Col --> */}
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    " url('https://media.istockphoto.com/id/1344771294/photo/happy-family-in-masks-enjoying-travel-together.jpg?s=612x612&w=0&k=20&c=JMGLBlMM4TyAQ1CAgDJx9igoSucyehARKkvN2rZpec0=')",
                }}
              ></div>
              {/* <!-- Col --> */}
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">Sign in</h3>
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded "
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                >
                  <div className="flex items-center gap-1">
                    {/* <FaUser /> */}
                    <label htmlFor="role" className="font-semibold">
                      Role
                    </label>
                  </div>
                  <select
                    name="role"
                    id="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                    className="border-2 border-gray-400 outline-0 rounded-md mt-1 px-2 py-1 h-11 w-[min(24rem,85vw)] focus:border-[#42a4ee]"
                  >
                    <option value="user">User</option>
                    <option value="hotelowner">Hotel Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                  {touched.role && errors.role ? (
                    <p className="text-[14px] text-red-700">{errors.role}</p>
                  ) : (
                    <p className="text-[14px] opacity-0">null</p>
                  )}
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
                      value={values.email}
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
                        value={values.password}
                      />
                      {touched.password && errors.password ? (
                        <p className="text-[14px] text-red-700">
                          {errors.password}
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
                      Login
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <NavLink
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/register"
                    >
                      Don't have an account? Register!
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Login;
