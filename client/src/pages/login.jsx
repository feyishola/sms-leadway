import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import signInImg from "../assets/images/signIn-img.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../features/auth/authslice";
import { toast } from "react-toastify";


const Login = () => {
  const {userData,isVerified,isLoggedIn} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(userData){
      setTimeout(() => {
        navigate("/_");
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      }, 400);
    }else if (!isLoggedIn) {
      toast.error("You no go fit enter here my brother!!!");
    }
  },[isLoggedIn,isVerified,userData])

  // Initial values for form fields
  const initialValues = {
    email: "",
    password: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .min(5, "Email must be at least 5 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Submit handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // alert("Logged In Successfully!");
    // navigate("/home"); // Navigate to the home page after submission
    dispatch(login(values));
    setSubmitting(false);
    resetForm();
    

    
  };

  return (
    <div className="flex h-[100vh] flex-1 w-[100%]">
      {/* LEFT SIDE */}
      <div className="relative hidden w-[50%] lg:block">
        <img
          alt="sign-in-img"
          src={signInImg}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[50%] flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">
            Sign In
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, resetForm }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-1">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Forgot Password Link */}
                <span className="flex justify-end">
                  <Link to="/forgot-password" className="text-[#5243AA]">
                    Forgot password?
                  </Link>
                </span>

                {/* Buttons */}
                <div className="flex justify-end gap-5">
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="btn bg-white p-2 px-5 font-semibold ring-1 ring-[#5243AA] rounded text-[#5243AA]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn bg-[#5243AA] p-2 px-5 rounded text-white font-semibold"
                  >
                    {isSubmitting ? "Submitting..." : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <div className="mt-4 absolute bottom-5 flex gap-1">
            <p>Don't have an account?</p>
            <Link to="/" className="text-[#5243AA] font-semibold">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;