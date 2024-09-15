/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Ratings from "../components/Ratings";
import { AiFillHeart, AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import Reviews from "../components/Reviews";

import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { get_product } from "../store/reducers/homeReducer";
import {
  messageClear,
  add_to_card,
  add_to_wishlist,
} from "../store/reducers/cardReducer";
import { toast } from "react-hot-toast";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const ProductDetails = () => {
  const { product, relatedProduct, moreProducts, totalReview } = useSelector(
    (state) => state.home
  );
  console.log(moreProducts);
  const { userInfo } = useSelector((state) => state.user);
  const { successMessage, errorMessage } = useSelector((state) => state.card);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");

  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    dispatch(get_product(slug));
  }, [slug]);
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
  const [quantity, setQuantity] = useState(1);
  const inc = () => {
    if (quantity >= product.stock) {
      toast.error("Out Of stock");
      dispatch(messageClear());
    } else {
      setQuantity(quantity + 1);
    }
  };
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const add_card = () => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
    } else {
      navigate("/login");
    }
  };
  const buy_product = () => {
    let price = 0;
    if (product.discount !== 0) {
      price =
        product.price - Math.floor((product.price * product.discount) / 100);
    } else {
      price = product.price;
    }
    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        price: quantity * (price - Math.floor((price * 2) / 100)),
        products: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];
    navigate("/shipping", {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 80,
        items: 1,
      },
    });
  };
  const add_wishlist = () => {
    if (userInfo) {
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
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Header />
      <section className="bg-[url('https://res.cloudinary.com/dhf6xs6sv/image/upload/v1726376426/products/k5g9xz38lfp6fd5ztgys.jpg')] h-[250px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute top-0 left-0 w-full h-full bg-[#2422228a] ">
          <div className="md:w-[80%] sm:w-[90%] h-full w-[85%] mx-auto ">
            <div className="flex justify-center items-center flex-col h-full w-full gap-2 text-white">
              <div>
                <h2 className="text-xl font-bold">Shop Now/</h2>

                <div className="flex justify-center items-center">
                  <Link className="text-2xl font-bold underline" to="/">
                    Home
                  </Link>
                  <span className="text-xl font-bold underline">
                    <FiChevronRight />
                  </span>
                  <span className="text-xl font-bold underline">
                    Product Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 mb-5 bg-slate-200">
        <div className="md:w-[80%] sm:w-[90%] h-full w-[85%] mx-auto ">
          <div className="flex justify-start items-center text-md text-slate-600 w-full">
            <Link className="text-lg font-bold " to="/">
              Home
            </Link>
            <span className="text-lg font-bold ">
              <FiChevronRight />
            </span>
            <span className="text-lg font-bold ">{product.category}</span>
            <span className="text-lg font-bold ">
              <FiChevronRight />
            </span>
            <span className="text-  lg font-bold ">
              {product?.name?.slice(0, 20)}
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="md:w-[80%] sm:w-[90%] h-full w-[85%] mx-auto pb-16">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border rounded-md">
                <img
                  className="h-[500px] w-full md:h-[300px] rounded-md"
                  src={image ? image : product.images?.[0]}
                  alt=""
                />
              </div>
              <div className="py-3">
                {product.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    transitionDuration={500}
                    responsive={responsive}
                  >
                    {product.images.map((img, i) => {
                      return (
                        <div key={i} onClick={() => setImage(img)}>
                          <img
                            className="rounded-md cursor-pointer h-[130px] w-[130px] md:h-[100px] md:w-[80px]"
                            src={img}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-700 md:text-xl">
                  {product.name}
                </h2>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Ratings ratings={product.rating} />
                </div>
                <span>{totalReview} Reviews</span>
              </div>
              <div className="text-2xl text-red-500 font-bold flex gap-3">
                {product.discount ? (
                  <>
                    <h2 className="line-through ">
                      <div className="flex justify-center items-center">
                        <FaBangladeshiTakaSign size={20} />
                        {product.price}
                      </div>
                    </h2>
                    <h2 className="text-green-600">
                      <div className="flex justify-center items-center ">
                        <FaBangladeshiTakaSign size={20} />
                        {product.price -
                          Math.floor((product.price * product.discount) / 100)}
                        <span className="text-red-500">
                          (-{product.discount}%)
                        </span>
                      </div>
                    </h2>
                  </>
                ) : (
                  <>
                    <h2>
                      Price :
                      <div className="flex justify-center items-center">
                        <FaBangladeshiTakaSign /> {product.price}
                      </div>
                    </h2>
                  </>
                )}
              </div>
              <div className="text-slate-600">
                <p>{product.description}</p>
              </div>
              <div className="flex gap-3 pb-10 border-b">
                {product.stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[40px] justify-center items-center text-xl">
                      <div onClick={dec} className="px-5 cursor-pointer">
                        -
                      </div>
                      <div className="px-3">{quantity}</div>
                      <div onClick={inc} className="px-5 cursor-pointer">
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={add_card}
                        className=" px-8 h-[40px]  bg-violet-500 hover:shadow-md hover:shadow-violet-500/50 text-white text-lg md:text-sm rounded-md"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div>
                  <div
                    onClick={add_wishlist}
                    className="h-[40px]  w-[40px]  flex justify-center items-center bg-violet-500 hover:shadow-md hover:shadow-violet-500/50 rounded-full cursor-pointer text-white text-xl "
                  >
                    <AiFillHeart />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 py-5">
                <div className="w-[150px] text-black font-bold flex flex-col gap-5 text-xl">
                  <span>Abality</span>
                  <span>Share on</span>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-${
                      product.stock ? "green" : "red"
                    }-500 text-lg font-semibold`}
                  >
                    {product.stock}
                    {product.stock ? " in Stock" : "out of stock"}
                  </span>
                  <ul className="flex justify-start items-center gap-4 mt-5">
                    <li className="w-[40px] h-[40px] bg-slate-400 rounded-full flex justify-center items-center text-xl hover:bg-violet-300">
                      <a href="#">
                        <BsFacebook />
                      </a>
                    </li>
                    <li className="w-[40px] h-[40px] bg-slate-400 rounded-full flex justify-center items-center text-xl hover:bg-violet-300">
                      <a href="#">
                        <AiOutlineGithub />
                      </a>
                    </li>
                    <li className="w-[40px] h-[40px] bg-slate-400 rounded-full flex justify-center items-center text-xl hover:bg-violet-300">
                      <a href="#">
                        <BsLinkedin />
                      </a>
                    </li>
                    <li className="w-[40px] h-[40px] bg-slate-400 rounded-full flex justify-center items-center text-xl hover:bg-violet-300">
                      <a href="#">
                        <AiOutlineTwitter />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                {product.stock ? (
                  <button
                    onClick={buy_product}
                    className="px-8 py-3 h-[50px] bg-violet-500 hover:shadow-md hover:shadow-violet-500/50 text-white text-lg rounded-md"
                  >
                    Shop Now
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to={`/deshboard/chat/${product.sellerId}`}
                  className="px-8 py-3 h-[50px] bg-emerald-500 hover:shadow-md hover:shadow-emerald-500/50 text-white text-lg rounded-md"
                >
                  Chat Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="md:w-[80%] sm:w-[90%] h-full w-[85%] mx-auto py-16">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 px-5 hover:bg-green-400 hover:text-white ${
                      state === "reviews"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } `}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 px-5 hover:bg-green-400 hover:text-white ${
                      state === "description"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } `}
                  >
                    Description
                  </button>
                </div>
                <div>
                  {state === "reviews" ? (
                    <Reviews product={product} />
                  ) : (
                    <p className="py-5 text-slate-700">{product.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28%] md-lg:w-full md-lg:py-3">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-2 text-slate-600 bg-slate-200">
                  <h2>From : {product.shopName}</h2>
                </div>
                <div className="flex flex-col border gap-5 p-3 mt-3">
                  {moreProducts.map((p, i) => {
                    return (
                      <Link
                        key={i}
                        to={`/product/details/${p.slug}`}
                        className="block"
                      >
                        <div className="relative py-2">
                          <img
                            className="w-full h-[270px]"
                            src={p?.images[0]}
                          />
                          {p?.discount > 0 && (
                            <div className="flex justify-center items-center absolute text-white bg-red-500 rounded-full font-semibold top-2 left-2 w-[35px] h-[35px]">
                              {p.discount}%
                            </div>
                          )}
                        </div>
                        <h2 className="py-2 text-slate-600 font-bold text-lg">
                          {p.name.slice(0, 50)}
                        </h2>
                        <div>
                          <div className="flex text-xl items-center gap-2">
                            <Ratings ratings={p.rating} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {relatedProduct ? (
          <div className="md:w-[80%] sm:w-[90%] h-full w-[85%] mx-auto py-10">
            <div className="text-center flex items-center justify-center flex-col text-4xl text-slate-600 font-bold relative pb-[40px]">
              <h2>Related Products</h2>
              <div className="w-[100px] h-[4px] bg-slate-900 mt-2"></div>
            </div>
            <div>
              <Swiper
                slidesPerView="auto"
                breakpoints={{
                  1280: {
                    slidesPerView: 3,
                  },
                  565: {
                    slidesPerView: 2,
                  },
                }}
                spaceBetween={25}
                loop={true}
                pagination={{
                  clickable: true,
                  el: ".custom_bullet",
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {relatedProduct?.map((p, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <Link className="block" to={`/product/details/${p.slug}`}>
                        <div className="relative">
                          <div>
                            <img className="w-full h-full" src={p.images[0]} />
                            <div className="absolute h-full w-full top-0 left-0 hover:bg-[#000] hover:opacity-25 transition-all duration-500"></div>
                          </div>
                          {p?.discount > 0 && (
                            <div className="flex justify-center items-center absolute text-white bg-red-500 rounded-full font-semibold top-2 left-2 w-[35px] h-[35px]">
                              {p?.discount}%
                            </div>
                          )}
                        </div>
                        <div>
                          <h2 className="py-2 text-slate-600 font-bold text-lg">
                            {p.name.slice(0, 50)}
                          </h2>
                          <div className="flex justify-start items-center gap-5">
                            <h2 className="text-slate-600 font-semibold text-lg">
                              <div className="flex justify-center items-center">
                                <FaBangladeshiTakaSign />
                                {p.price}
                              </div>
                            </h2>
                            <div className="flex text-xl">
                              <Ratings ratings={p.rating} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="w-full flex justify-center items-center py-10">
              <div className="custom_bullet justify-center gap-3 !w-auto"></div>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-700">Product Not Found</div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;
