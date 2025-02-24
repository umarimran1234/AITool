import { FaGoogle, FaFacebook } from "react-icons/fa";

import vector from "../../assets/Frame 1.png";
import unique from "../../assets/uniquefont.png";
import analytics from "../../assets/analytics.png";
import tarmarah from "../../assets/tarmarah.png";
import pahayah from "../../assets/pahaya.png";
import handshake from "../../assets/handshake.png";
import growth from "../../assets/growth.png";
import blueelipsa from "../../assets/blueelipsa.png";
import BeautifulForm from "../home/Form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import DynamicTable from "../home/table";
import Swal from "sweetalert2";
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

export default function Signin() {
  const [dataForm, seTDataForm] = useState([]);
  const schema = yup.object().shape({
    Email: yup.string().required("Email required"),
    Password: yup.string().required("PAssword requered"),
  });

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    seTDataForm((prev) => [...prev, data]);
    if (isSubmitSuccessful) {
      Swal.fire({
        icon: "success",
        title: "Form Submit",
        text: "Thank you",
        showConfirmButton: true,
        confirmButtonColor: "black",
      });
    }
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
                <h2 className="text-4xl font-bold mb-6">Login</h2>
                <p className=" uppercase ">
                  CODE QUESTION Generator by cortechsols
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-100 mb-2">
                    Enter your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("Email")}
                    className="transparent-input shadow text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                  />
                  {errors.Email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Email.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-100 mb-2"
                  >
                    Enter your Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("Password")}
                    className="transparent-input text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                  />
                  {errors.Password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 transparent-input hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign In
                  </button>

                  <a
                    href="#"
                    className="inline-block align-baseline text-sm text-white"
                  >
                    Forgot Password?
                  </a>
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
                <div className="text-center text-gray-100 mt-4">
                  Do not have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="text-white-500 hover:text-white-300"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DynamicTable rol={"login"} data={dataForm} />
    </>
  );
}
