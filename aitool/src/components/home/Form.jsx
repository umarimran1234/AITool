import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Swal from "sweetalert2";
import DynamicTable from "./table";
import signupPageImage from "../../assets/loginimage.png";
import { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";

import vector from "../../assets/Frame 1.png";
import unique from "../../assets/uniquefont.png";
import analytics from "../../assets/analytics.png";
import tarmarah from "../../assets/tarmarah.png";
import pahayah from "../../assets/pahaya.png";
import handshake from "../../assets/handshake.png";
import growth from "../../assets/growth.png";
import blueelipsa from "../../assets/blueelipsa.png";
import { Link } from "react-router-dom";
const signupPRodivders = [
  {
    icon: <FaFacebook />,
    text: "continue with Facebook",
  },
  {
    icon: <FaGoogle />,
    text: "continue with Google",
  },
];
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Must include a lowercase")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/[0-9]/, "Must include a number")
    .required("Password is required"),
  consfirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "Password must be match"])
    .required("Confirm Password is required"),

  gender: Yup.string().required("Please select a gender"),
});

const BeautifulForm = () => {
  const [dataForm, seTDataForm] = useState([]);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    seTDataForm((prevData) => [...prevData, data]);
    if (isSubmitSuccessful) {
      Swal.fire({
        icon: "success",
        title: "Form Submit",
        text: "Thank you",
        showConfirmButton: true,
        confirmButtonColor: "black",
      });
    }
    reset();
  };

  return (
    <>
      <div
        style={{ zIndex: 999, width: "100%" }}
        className="mt-4 grid lg:grid-cols-2 grid-cols-1"
      >
        <div>
          <div className="container mx-auto px-10 py-6 flex justify-between items-center">
            <div className="text-2xl flex font-bold">
              <img style={{ height: "auto" }} alt="vector" src={vector} />
              <h2 className="text-white px-4 mt-2 uppercase ">
                cortechsols AI
              </h2>
            </div>
          </div>
          <div className="px-6">
            <img style={{ height: "auto" }} alt="unique" src={unique} />
          </div>
          <div className="container">
            <div className="grid grid-cols-6 space-x-4">
              <div className="col-span-3 flex">
                <img className="" alt="tarmarah" src={tarmarah} />
                <img alt="pahayah" className="" src={pahayah} />
                <img
                  alt="handshake"
                  src={handshake}
                  className="absolute w-100 lg:w-1/2"
                />
              </div>

              <div className="col-span-4 flex">
                <img className="" alt="growth" src={growth} />
                <img alt="analytics" className="" src={analytics} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blur">
          <div className="absolute -z-50 hidden -mt-4 lg:block">
            <img alt="blueelipsa" src={blueelipsa} />
          </div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="glass p-8 rounded shadow-md w-full max-w-sm">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-6">REGISTER</h2>
                <p className=" uppercase ">
                  CODE QUESTION Generator by cortechsols
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-100 mb-2">
                    Enter your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="transparent-input shadow text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="gender" className="block text-gray-100 mb-2">
                    Gender
                  </label>
                  <select
                    id="Gender"
                    {...register("gender")}
                    className="w-full p-2 bg-white border rounded focus:ring focus:ring-blue-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="#email" className="block text-gray-100 mb-2">
                    Enter your Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="transparent-input shadow text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className=" flex justify-center item-center gap-3  ">
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-100 mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      id="password"
                      className="transparent-input text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="#ConfirmPAssword"
                      className="block text-gray-100 text-sm mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("consfirmPassword")}
                      id="ConfirmPAssword"
                      className="transparent-input text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="confirm Password"
                    />
                    {errors.consfirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.consfirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 transparent-input w-full hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <div
                className="text-center text-gray-100 mb-4"
                style={{ fontSize: "small" }}
              >
                <p>or</p>
              </div>

              <div className="flex items-center flex-col space-y-2">
                {signupPRodivders.map((item, index) => {
                  return (
                    // Add return statement to render each button
                    <button
                      key={index}
                      className={`flex gap-3 cursor-pointer transparent-button items-center justify-center ${
                        item?.text === "continue with Facebook"
                          ? "bg-blue-600"
                          : "bg-red-500"
                      }   text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    >
                      {item.icon}
                      {item.text}
                    </button>
                  );
                })}
                {/* <button className="flex cursor-pointer transparent-button items-center justify-center bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  <FaFacebook className="mr-3" />
                  Sign in with Facebook
                </button> */}
                <div className="  text-center text-gray-100 mt-4">
                  already have an account? {""}
                  <Link
                    to={"/login"}
                    className="text-white-500 hover:text-white-300"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="  mx-9 my-9 ">
        <DynamicTable data={dataForm} />
      </div>
    </>
  );
};

export default BeautifulForm;
