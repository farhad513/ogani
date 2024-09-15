/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  BiSolidDashboard,
  BiChat,
  BiLogoProductHunt,
  BiLogIn,
} from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { user_reset } from "../store/reducers/authReducer";
import { reset_count } from "../store/reducers/cardReducer";
import { base_url } from "../utils/config";
import axios from "axios";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const logout = () => {
    try {
      const { data } = axios.post(`${base_url}/api/user/logout`);
      console.log(data);
      localStorage.removeItem("userToken");
      dispatch(user_reset());
      dispatch(reset_count());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(base_url, "/api/user/logout");
  return (
    <div>
      <Header />
      <section className="bg-slate-200 mt-6">
        <div className="w-[90%] mx-auto pt-5 md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilter(!filter)}
              className="py-3 px-3 bg-indigo-500 text-center text-white"
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="h-full mx-auto">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
            <div
              className={`rouned-md z-50 md-lg:absolute ${
                filter ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white `}
            >
              <ul className="py-2 text-slate-600 px-4">
                <li className="flex justify-start items-center gap-3 py-2">
                  <span className="text-xl">
                    <BiSolidDashboard />
                  </span>
                  <Link to={"/deshboard"} className="block text-xl">
                    Dashboard
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-3 py-2">
                  <span className="text-xl">
                    <BiLogoProductHunt />
                  </span>
                  <Link to={"/deshboard/my-orders"} className="block text-xl">
                    My Orders
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-3 py-2">
                  <span className="text-xl">
                    <MdFavoriteBorder />
                  </span>
                  <Link to={"/deshboard/wishlist"} className="block text-xl">
                    Wishlist
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-3 py-2">
                  <span className="text-xl">
                    <BiChat />
                  </span>
                  <Link to={"/deshboard/chat"} className="block text-xl">
                    Chat
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-3 py-2">
                  <span className="text-xl">
                    <RiLockPasswordLine />
                  </span>
                  <Link
                    to={"/deshboard/change-password"}
                    className="block text-xl"
                  >
                    Change Password
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex justify-start items-center gap-3 py-2 cursor-pointer"
                >
                  <span className="text-xl">
                    <BiLogIn />
                  </span>
                  <div className="block text-xl">Logout</div>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
