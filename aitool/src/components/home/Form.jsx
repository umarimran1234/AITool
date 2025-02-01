import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Swal from "sweetalert2";
import DynamicTable from "./table";
import { useState } from "react";

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
  const [showPassword, setShowPAssword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitted, isSubmitSuccessful, isSubmitting },
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
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Register Now
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Full Name
              </label>
              <input
                {...register("name")}
                id="name"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="Email" className="block text-gray-700">
                Email
              </label>
              <input
                id="Email"
                {...register("email")}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col  justify-between items-start w-full  ">
              <div className="w-full relative">
                <label htmlFor="Password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  {...register("password")}
                  className="w-full p-2 border rounded  focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPAssword(!showPassword)}
                className=" right-3 top-3 text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {/* {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )} */}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("consfirmPassword")}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                placeholder="Enter your confirm password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.consfirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="Gender" className="block text-gray-700">
                Gender
              </label>
              <select
                id="Gender"
                {...register("gender")}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
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

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-blue-700 transition"
            >
              {(isSubmitSuccessful && "Form Submitted Successfully!") ||
                (isSubmitted && "Submit form")}
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="  mx-9 my-9 ">
        <DynamicTable data={dataForm} />
      </div>
    </>
  );
};

export default BeautifulForm;
