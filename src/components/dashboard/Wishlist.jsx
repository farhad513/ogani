/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineShoppingCart,
  AiFillDelete,
} from "react-icons/ai";
import Ratings from "../Ratings";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_wishlist_product,
  get_products_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import { toast } from "react-hot-toast";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { wishlist, successMessage } = useSelector((state) => state.card);
  useEffect(() => {
    dispatch(get_products_wishlist(userInfo.id));
  }, []);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);
  return (
    <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-6">
      {wishlist.map((p, i) => (
        <div
          key={i}
          className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"
        >
          <div className="relative overflow-hidden">
            {p.discount !== 0 && (
              <div className="flex justify-center items-center absolute text-white bg-red-500 rounded-full font-semibold top-2 left-2 w-[35px] h-[35px]">
                {p.discount}%
              </div>
            )}
            <img
              className="sm:w-full w-full h-[250px]"
              src={p.image}
              alt={p.name}
            />
            <ul className="flex justify-center items-center gap-2 absolute -bottom-10 transition-all duration-700 w-full group-hover:bottom-8">
              <li
                onClick={() => dispatch(delete_wishlist_product(p._id))}
                className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all"
              >
                <AiFillDelete />
              </li>
              <Link
                to={`/product/details/${p.slug}`}
                className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </Link>
              <li
                // onClick={() => add_card(p._id)}
                className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center bg-white rounded-full hover:bg-slate-500 hover:text-white hover:rotate-[720deg] transition-all"
              >
                <AiOutlineShoppingCart />
              </li>
            </ul>
          </div>
          <div className="py-3 text-slate-500 px-2">
            <h2>{p.name.slice(0, 40)}</h2>
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
  );
};

export default Wishlist;
