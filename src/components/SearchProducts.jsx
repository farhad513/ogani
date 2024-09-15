/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useSearchParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import Footer from "../components/Footer";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Products from "../components/Products/Products";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProducts from "../components/Products/ShopProducts";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  product_price_range,
  queryProducts,
} from "../store/reducers/homeReducer";
const SearchProducts = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchValue = searchParams.get("value");
  //   console.log(category);
  const { products, totalProduct, latestProduct, priceRange, perPage } =
    useSelector((state) => state.home);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState(true);
  const [styles, setStyles] = useState("grid");
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });
  const [rating, setRatingq] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(product_price_range());
  }, []);
  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);
  useEffect(() => {
    dispatch(
      queryProducts({
        low: state.values[0] || "",
        high: state.values[1] || "",
        category,
        rating,
        sortPrice,
        pageNumber,
        searchValue,
      })
    );
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    sortPrice,
    searchValue,
  ]);
  const resetRating = () => {
    setRatingq("");
    dispatch(
      queryProducts({
        low: state.values[0],
        high: state.values[1],
        category,
        rating: "",
        pageNumber,
        sortPrice,
      })
    );
  };

  return (
    <div>
      <Header />
      <section className="bg-[url('https://res.cloudinary.com/dhf6xs6sv/image/upload/v1726376426/products/k5g9xz38lfp6fd5ztgys.jpg')] h-[250px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute top-0 left-0 w-full h-full bg-[#2422228a] ">
          <div className="md:w-[80%] sm:w-[90%] h-full w-[85%] mx-auto ">
            <div className="flex justify-center items-center flex-col h-full w-full gap-2 text-white">
              <div>
                <h2 className="text-2xl font-bold">Shop Now/</h2>

                <div className="flex justify-center items-center">
                  <Link className="text-2xl font-bold underline" to="/">
                    Home
                  </Link>
                  <Link className="text-2xl font-bold underline" to="/">
                    <FiChevronRight />
                  </Link>
                  <Link className="text-2xl font-bold underline" to="/products">
                    Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="md:w-[80%] sm:w-[90%] w-[85%] h-full mx-auto">
          <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
            >
              Filter Product
            </button>
          </div>
          <div className="w-full flex flex-wrap">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              }`}
            >
              <div className="py-2 flex flex-col gap-3">
                <h2 className="font-bold text-2xl text-slate-600">Price</h2>
                <Range
                  step={5}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] rounded-full bg-slate-200"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      className="w-[15px] h-[15px] rounded-full bg-blue-500"
                    />
                  )}
                />
                <div>
                  <span>
                    ${Math.floor(state.values[0])} - $
                    {Math.floor(state.values[1])}
                  </span>
                </div>
              </div>
              <div className="py-3 flex flex-col gap-3">
                <h2 className="font-bold text-2xl text-slate-600">Ratings</h2>
                <div
                  onClick={() => setRatingq(5)}
                  className="flex justify-start items-center gap-2 text-xl cursor-pointer text-orange-500"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                </div>
                <div
                  onClick={() => setRatingq(4)}
                  className="flex justify-start items-center gap-2 text-xl cursor-pointer text-orange-500"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>
                <div
                  onClick={() => setRatingq(3)}
                  className="flex justify-start items-center gap-2 text-xl cursor-pointer text-orange-500"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>
                <div
                  onClick={() => setRatingq(2)}
                  className="flex justify-start items-center gap-2 text-xl cursor-pointer text-orange-500"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>
                <div
                  onClick={() => setRatingq(1)}
                  className="flex justify-start items-center gap-2 text-xl cursor-pointer text-orange-500"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>
                <div
                  onClick={resetRating}
                  className="flex justify-start items-center gap-2 text-xl cursor-pointer text-orange-500"
                >
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>
              </div>
              <div className="py-3 flex flex-col gap-3 md:hidden">
                <Products title="Latest Product" products={latestProduct} />
              </div>
            </div>
            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 px-3 flex justify-between items-center rounded-md border mb-10">
                  <h2 className="font-semibold text-lg text-slate-600">
                    {totalProduct} Products
                  </h2>
                  <div className="flex justify-center items-center gap-3">
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      className="p-1 font-semibold border outline-0"
                      name=""
                      id=""
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High</option>
                      <option value="high-to-low">High to Low</option>
                    </select>
                    <div className="flex justify-center items-center gap-5 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-8">
                  <ShopProducts products={products} styles={styles} />
                </div>
                {totalProduct > perPage && (
                  <div>
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      perPage={perPage}
                      totalItem={totalProduct}
                      showItem={Math.floor(totalProduct / perPage)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SearchProducts;
