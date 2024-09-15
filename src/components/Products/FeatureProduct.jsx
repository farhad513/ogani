/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_card,
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const FeatureProduct = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { successMessage, errorMessage } = useSelector((state) => state.card);
  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          productId: id,
          quantity: 1,
        })
      );
    } else {
      navigate("/login");
    }
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
  }, [successMessage, errorMessage]);
  const add_wishlist = (product) => {
    dispatch(
      add_to_wishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        rating: product.rating,
        image: product.images[0],
        price: product.price,
        discount: product.discount,
        slug: product.slug,
      })
    );
  };
  return (
    <div className="w-[85%] md-lg:w-[90%] mx-auto flex flex-wrap">
      <div className="w-full">
        <div className="text-center flex items-center justify-center flex-col text-4xl text-slate-600 font-bold relative pb-[40px]">
          <h2>Featured Product</h2>
          <div className="w-[100px] h-[4px] bg-slate-900 mt-2"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              {p.discount ? (
                <div className="flex justify-center items-center absolute text-white bg-red-500 rounded-full font-semibold top-2 left-2 w-[35px] h-[35px]">
                  {p.discount}%
                </div>
              ) : (
                ""
              )}
              <img
                className="sm:w-full w-full h-[250px]"
                src={p.images[0]}
                alt={p.name}
              />
              <ul className="flex justify-center items-center gap-2 absolute -bottom-10 transition-all duration-700 w-full group-hover:bottom-8">
                <li
                  onClick={() => add_wishlist(p)}
                  className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiFillHeart />
                </li>
                <Link
                  to={`product/details/${p.slug}`}
                  className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li
                  onClick={() => add_card(p._id)}
                  className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiOutlineShoppingCart />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-500 px-2">
              <h2>{p?.name.slice(0, 50)}</h2>
              <div className="flex justify-start items-center gap-4">
                <span className="font-lg font-bold">
                  <div className="flex justify-center items-center">
                    <FaBangladeshiTakaSign size={16} />
                    {p.price}
                  </div>
                </span>
                <div className="flex">
                  <Ratings ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
