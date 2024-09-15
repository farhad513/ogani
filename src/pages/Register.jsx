/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader, PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { user_register, messageClear } from "../store/reducers/authReducer";
import { overRideCss } from "../utils/utils";
const Register = () => {
  const { loader, userInfo, successMessage, errorMessage } = useSelector(
    (state) => state.user
  );
  console.log(errorMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const register = (e) => {
    e.preventDefault();
    dispatch(user_register(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);
  return (
    <>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-[999] bg-[#30383033]">
          <FadeLoader />
        </div>
      )}
      <div className="bg-slate-200">
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
              Welcome Back!
            </h1>
            <form onSubmit={register}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  value={state.name}
                  onChange={inputHandle}
                  type="text"
                  id="name"
                  name="name"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  value={state.email}
                  onChange={inputHandle}
                  type="text"
                  id="name"
                  name="email"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  value={state.password}
                  onChange={inputHandle}
                  type="password"
                  id="password"
                  name="password"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <a
                  href="#"
                  className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                disabled={loader ? true : false}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loader ? (
                  <PropagateLoader color="white" cssOverride={overRideCss} />
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <div className="text-center text-slate-500 pt-1 font-medium">
              <p>
                <a
                  target="_blank"
                  className="text-blue-500"
                  href={"https://robobitst-dashboard.vercel.app/register"}
                >
                  register
                </a>{" "}
                seller Account
              </p>
            </div>
            <div className="text-center text-slate-500 pt-1 font-medium">
              <p>
                You have already Account ?{" "}
                <Link className="text-blue-500" to={"/login"}>
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
