/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const ShopProducts = ({ styles, products }) => {
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3`}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center w-full md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px} overflow-hidden"
                : "md-lg:w-full relative group h-[270px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              className="h-[240px] rounded-md md:h-[270px] xs:h-[240px] w-full object-cover"
              src={p.images[0]}
              alt={p.name}
            />
            <ul className="flex justify-center items-center gap-2 absolute -bottom-10 transition-all duration-700 w-full group-hover:bottom-8">
              <li className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all">
                <AiFillHeart />
              </li>
              <Link
                to="#"
                className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </Link>
              <li className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all">
                <AiOutlineShoppingCart />
              </li>
            </ul>
          </div>
          <div className="flex justify-start items-start gap-2 flex-col">
            <h2 className="text-lg text-slate-700 font-medium">
              {p.name.slice(0, 50)}
            </h2>
            <div className="flex justify-start items-center gap-3">
              <span className="font-md font-bold text-slate-700">
                <div className="flex justify-center items-center">
                  <FaBangladeshiTakaSign size={16} />
                  {p.price}
                </div>
              </span>
              <div className="flex text-lg">
                <Ratings ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
