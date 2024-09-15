/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import ReactRating from "react-rating";
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_product,
  get_reviews,
  messageClear,
  user_review,
} from "../store/reducers/homeReducer";
import { toast } from "react-hot-toast";
const Reviews = ({ product }) => {
  const { successMessage, totalReview, rating_review, reviews } = useSelector(
    (state) => state.home
  );
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [perPage, setPerPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [rat, setRat] = useState("");
  const [rev, setRev] = useState("");
  const submit_review = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: rev,
      rating: rat,
      productId: product._id,
    };
    dispatch(user_review(obj));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
      dispatch(get_product(product.slug));
      setRev("");
      setRat("");
      dispatch(messageClear());
    }
  }, [successMessage]);
  useEffect(() => {
    if (product._id) {
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
    }
  }, [product, pageNumber]);
  return (
    <div className="mt-8">
      <div className="flex md:flex-col gap-10">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-6xl font-semibold">{product.rating}</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex gap-2 text-3xl">
            <Ratings ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-600">{totalReview} Ratings</p>
        </div>
        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[0]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#edbb0e] "
              ></div>
            </div>
            <p className="text-sm text-slate-500 w-[0%]">
              {rating_review[0]?.sum}
            </p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[1]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#edbb0e] "
              ></div>
            </div>
            <p className="text-sm text-slate-500 w-[0%]">
              {rating_review[1]?.sum}
            </p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[2]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#edbb0e] "
              ></div>
            </div>
            <p className="text-sm text-slate-500 w-[0%]">
              {rating_review[2]?.sum}
            </p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[3]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#edbb0e] "
              ></div>
            </div>
            <p className="text-sm text-slate-500 w-[0%]">
              {rating_review[3]?.sum}
            </p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[4]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#edbb0e] "
              ></div>
            </div>
            <p className="text-sm text-slate-500 w-[0%]">
              {rating_review[4]?.sum}
            </p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[5]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#edbb0e] "
              ></div>
            </div>
            <p className="text-sm text-slate-500 w-[0%]">0</p>
          </div>
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Products Reviews {totalReview}
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 text-xl">
                <RatingTemp rating={r.rating} />
              </div>
              <span>{r.date}</span>
            </div>
            <h2 className="text-md text-slate-600">{r.name}</h2>
            <p className="text-sm text-slate-600">{r.review}</p>
          </div>
        ))}
        <div>
          {totalReview > 5 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              perPage={perPage}
              totalItem={totalReview}
              showItem={Math.round(totalReview / 5)}
            />
          )}
        </div>
      </div>
      {userInfo ? (
        <div>
          <div className="flex flex-col gap-1">
            <ReactRating
              onChange={(e) => setRat(e)}
              initialRating={rat}
              fullSymbol={
                <span className="text-[#edbb0e] text-3xl">
                  <AiFillStar />
                </span>
              }
              emptySymbol={
                <span className="text-slate-600 text-3xl">
                  <CiStar />
                </span>
              }
            />
          </div>
          <form onSubmit={submit_review}>
            <textarea
              value={rev}
              required
              onChange={(e) => setRev(e.target.value)}
              className="border outline-none p-3 w-full"
              name=""
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <div className="mt-2">
              <button className="px-5 py-1 text-white bg-indigo-500 rounded-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="px-5 py-1 flex justify-center items-center text-white bg-indigo-500 rounded-sm w-[100px]">
          <Link to={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default Reviews;
