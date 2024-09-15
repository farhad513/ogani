/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  AiOutlineMail,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiFillHeart,
} from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { GrMail } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import { FaLock, FaList } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  get_products_card,
  get_products_wishlist,
} from "../store/reducers/cardReducer";
import { CiMail } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaFacebookMessenger } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";
const Header = () => {
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const { pathname } = useLocation();
  console.log(pathname);
  const search = () => {
    navigate(`/product/search?category=${category}&&value=${searchValue}`);
  };
  const card_page_redirect = () => {
    if (userInfo) {
      navigate("/card");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(get_products_card(userInfo.id));
      dispatch(get_products_wishlist(userInfo.id));
    }
  }, [userInfo]);

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#eeeeee] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full items-center justify-between h-[50px] text-slate-400">
            <ul className="flex justify-center items-center gap-8 relative">
              <li className="flex justify-center items-center gap-2 text-sm ">
                <span>
                  <CiMail color="black" />
                </span>
                <span>farhad@gmail.com</span>
              </li>
            </ul>
            <div>
              <div className="flex items-center justify-center gap-10">
                <div className="flex justify-center items-center gap-4 text-slate-600 ">
                  <Link to="#" className="">
                    <FaFacebookF />
                  </Link>
                  <Link to="#" className="">
                    <FaTwitter />
                  </Link>
                  <Link to="#" className="">
                    <FaLinkedinIn />
                  </Link>
                  <Link to="#" className="">
                    <FaFacebookMessenger />
                  </Link>
                </div>
                <div>
                  <div className="flex cursor-pointer group text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf]  "></div>
                </div>
                {userInfo ? (
                  <Link
                    to="/deshboard"
                    className="flex justify-center items-center gap-2 text-sm "
                  >
                    <span>
                      <FiUser />
                    </span>
                    <span>{userInfo.name} </span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex justify-center items-center gap-2 text-sm "
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] flex justify-between items-center md-lg:h-[100px] flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  
                  <img src={logo} alt="" />
                </Link>
                <div>
                  <span
                    className="cursor-pointer justify-center items-center w-[30px] h-[30px] text-slate-500 border border-slate-500 lg:hidden md-lg:flex xl:hidden hidden"
                    onClick={(e) => setShowSidebar(false)}
                  >
                    <FaList />
                  </span>
                </div>
              </div>
            </div>
            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center pl-8 flex-wrap">
                <ul className="flex justify-start items-center gap-8 md-lg:hidden font-bold uppercase">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === "/" ? "text-green-700" : "text-slate-700"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/shop"}
                      className={`p-2 block ${
                        pathname === "/shop"
                          ? "text-green-700"
                          : "text-slate-700"
                      }`}
                    >
                      Shop
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/about"}
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-green-700"
                          : "text-slate-700"
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/contact"}
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-green-700"
                          : "text-slate-700"
                      }`}
                    >
                      contact
                    </Link>
                  </li>
                </ul>
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center items-center gap-5">
                    <div
                      onClick={() =>
                        navigate(userInfo ? "/deshboard/wishlist" : "/login")
                      }
                      className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-slate-300"
                    >
                      <span className="text-red-600 text-xl">
                        <AiFillHeart />
                      </span>
                      {wishlist_count !== 0 && (
                        <div className="w-[28px] h-[28px] absolute bg-green-500 rounded-full top-[-17px] right-[-10px] text-sm text-white flex justify-center items-center">
                          {wishlist_count}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={card_page_redirect}
                      className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-slate-300"
                    >
                      <span className="text-orange-600 text-xl">
                        <BsFillCartFill />
                      </span>
                      {card_product_count !== 0 && (
                        <div className="w-[28px] h-[28px] absolute bg-green-500 rounded-full top-[-17px] right-[-10px] text-sm text-white flex justify-center items-center text-[12px]">
                          {card_product_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowSidebar(true)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showSidebar ? "-left-[300px]" : "left-0 "
          } top-0 overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className="flex justify-center items-center flex-col gap-6">
            <Link to="/">
              {/* <h1 className="text-3xl">
                ROB<span className="text-green-600">O</span>
                <span className="text-red-600">BIT</span>
                <span className="text-teal-600">SY</span>
              </h1> */}
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="flex justify-start gap-10 items-center mt-6">
            {userInfo ? (
              <Link
                to="/deshboard"
                className="flex justify-center items-center gap-2 text-sm "
              >
                <span>
                  <FiUser />
                </span>
                <span>{userInfo.name} </span>
              </Link>
            ) : (
              <div className="flex justify-center items-center gap-2 text-sm ">
                <span>
                  <FaLock />
                </span>
                <span>Login</span>
              </div>
            )}
          </div>
          <ul className="flex justify-start items-start gap-2 flex-col mt-4 font-bold uppercase">
            <li>
              <Link
                to={"/"}
                className={`py-2 block ${
                  pathname === "/" ? "text-green-700" : "text-slate-700"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/shop"}
                className={`py-2 block ${
                  pathname === "/shop" ? "text-green-700" : "text-slate-700"
                }`}
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                to={"/about"}
                className={`py-2 block ${
                  pathname === "/about" ? "text-green-700" : "text-slate-700"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className={`py-2 block ${
                  pathname === "/contact" ? "text-green-700" : "text-slate-700"
                }`}
              >
                contact
              </Link>
            </li>
          </ul>
          <div className="flex justify-start mt-2 items-center gap-4 text-slate-600 ">
            <a href="#" className="">
              <FaFacebookF />
            </a>
            <a href="#" className="">
              <FaTwitter />
            </a>
            <a href="#" className="">
              <FaLinkedinIn />
            </a>
            <a href="#" className="">
              <FaFacebookMessenger />
            </a>
          </div>
          <div className="w-full py-4 flex justify-end md-lg:justify-start items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#f5f5f5]">
              <span>
                <IoIosCall />
              </span>
            </div>
            <div className="flex justify-end flex-col gap-1">
              <h2 className="text-xm font-medium">+8801518-690471</h2>
              <span className="text-xs">Support 7/24 Hours</span>
            </div>
          </div>
          <ul>
            <li className="flex justify-start items-center gap-2">
              <span>
                <GrMail />
              </span>
              <span>farhad@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[85%] md-lg:w-[90%] mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-8 items-center">
          <div className="w-3/12 md-lg:w-full ">
            <div className="bg-white relative">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-violet-400 text-white flex justify-center items-center font-bold gap-3 cursor-pointer"
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>All Category</span>
                </div>
                <span className="mt-1">
                  <MdOutlineKeyboardArrowDown />
                </span>
              </div>
              <div
                className={`${
                  categoryShow ? "h-0" : "h-[400px]"
                } overflow-hidden transition-all duration-500 bg-white w-full border-x md-lg:relative absolute z-[9999]`}
              >
                <ul className="py-2 text-slate-600 font-medium">
                  {categorys.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center px-[24px] gap-2 py-[6px]"
                      >
                        <img
                          src={c.image}
                          className="w-[30px] h-[30px] rounded-full overflow-hidden"
                          alt={c.name}
                        />
                        <Link
                          to={`/products?category=${c.name}`}
                          className=" block"
                        >
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className=" flex border relative h-[50px] items-center gap-5">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      name=""
                      className="w-[150px] text-slate-500 bg-transparent px-1  outline-0 border-none font-semibold "
                    >
                      <option value="">Select Category</option>
                      {categorys.map((c, i) => {
                        return (
                          <option key={i} value={c.name}>
                            {c.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    className="w-ful relative bg-transparent outline-0 px-3 h-full text-slate-500"
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Search All Products"
                  />
                  <button
                    onClick={search}
                    className="bg-violet-500 right-0 absolute h-full font-semibold px-8 text-white"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
                <div className="w-full py-4 flex justify-end md-lg:justify-start items-center gap-3">
                  <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#f5f5f5]">
                    <span>
                      <IoIosCall />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col gap-1">
                    <h2 className="text-xm font-medium">+8801518-690471</h2>
                    <span className="text-xs ps-2">Support 7/24 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
