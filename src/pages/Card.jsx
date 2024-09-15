/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Header from "../components/Header";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  get_products_card,
  delete_card_product,
  messageClear,
  quantity_increment,
  quantity_decrement,
} from "../store/reducers/cardReducer";
import { toast } from "react-hot-toast";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const Card = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const {
    card_products,
    outOfStock,
    price,
    buy_product_item,
    shipping_fee,
    successMessage,
  } = useSelector((state) => state.card);
  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: card_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };
  useEffect(() => {
    dispatch(get_products_card(userInfo.id));
  }, []);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_products_card(userInfo.id));
    }
  }, [successMessage]);
  const inc = (quantity, stock, card_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_increment(card_id));
    }
  };
  const dec = (quantity, card_id) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_decrement(card_id));
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
                <h2 className="text-2xl font-bold">Shop Now/</h2>

                <div className="flex justify-center items-center">
                  <Link className="text-2xl font-bold underline" to="/">
                    Home
                  </Link>
                  <Link className="text-2xl font-bold underline mt-2" to="/">
                    <FiChevronRight />
                  </Link>
                  <div className="text-2xl font-bold underline">Card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {card_products.length > 0 || outOfStock.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 text-semibold">
                        Stock Products : {card_products.length}
                      </h2>
                    </div>
                    {card_products.map((p, i) => (
                      <div key={i} className="flex bg-white p-4 flex-col gap-2">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-green-500 text-semibold">
                            {p.shopName}
                          </h2>
                        </div>
                        {p.products.map((pd, c) => (
                          <div key={c} className="w-full flex flex-wrap">
                            <div className=" flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={pd.productInfo.images[0]}
                                  alt={pd.productInfo.name}
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md">
                                    {pd.productInfo.name}
                                  </h2>
                                  <span className="text-sm">
                                    Brand : {pd.productInfo.brand}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-5/12 flex justify-between items-center sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="font-bold text-slate-600">
                                  <div className="flex justify-center items-center">
                                    <FaBangladeshiTakaSign size={16} />
                                    {pd.productInfo.price -
                                      Math.floor(
                                        (pd.productInfo.price *
                                          pd.productInfo.discount) /
                                          100
                                      )}
                                  </div>
                                </h2>
                                <h2 className="line-through text-slate-500 font-semibold">
                                  <div className="flex justify-center items-center">
                                    <FaBangladeshiTakaSign size={16} />
                                    {pd.productInfo.price}
                                  </div>
                                </h2>
                                <h2 className="text-sm font-bold">
                                  -{pd.productInfo.discount}% off
                                </h2>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div
                                    onClick={() => dec(pd.quantity, pd._id)}
                                    className="px-3 cursor-pointer"
                                  >
                                    -
                                  </div>
                                  <div className="px-3">{pd.quantity}</div>
                                  <div
                                    onClick={() =>
                                      inc(
                                        pd.quantity,
                                        pd.productInfo.stock,
                                        pd._id
                                      )
                                    }
                                    className="px-3 cursor-pointer"
                                  >
                                    +
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    dispatch(delete_card_product(pd._id))
                                  }
                                  className="px-5 py-[3px] bg-red-500 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outOfStock.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4">
                          <h2 className="text-md text-green-500 text-semibold">
                            Out of Stock : {outOfStock.length}
                          </h2>
                        </div>
                        <div className="bg-white p-4">
                          {outOfStock.map((p, i) => (
                            <div key={i} className="w-full flex flex-wrap">
                              <div className=" flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={p.products[0].images[0]}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md">
                                      {p.products[0].name}
                                    </h2>
                                    <span className="text-sm">
                                      Brand : {p.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="w-5/12 flex justify-between items-center sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="font-bold text-slate-600">
                                    <div className="flex justify-center items-center">
                                      <FaBangladeshiTakaSign size={16} />
                                      {p.products[0].price -
                                        Math.floor(
                                          (p.products[0].price *
                                            p.products[0].discount) /
                                            100
                                        )}
                                    </div>
                                  </h2>
                                  <h2 className="line-through text-slate-500 font-semibold">
                                    <div className="flex justify-center items-center">
                                      <FaBangladeshiTakaSign size={16} />
                                      {p.products[0].price}
                                    </div>
                                  </h2>
                                  <h2 className="text-sm font-bold">
                                    -{p.products[0].discount}% off
                                  </h2>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div
                                      onClick={() => dec(p.quantity, p._id)}
                                      className="px-3 cursor-pointer"
                                    >
                                      -
                                    </div>
                                    <div className="px-3">{p.quantity}</div>
                                    <div
                                      onClick={() =>
                                        inc(
                                          p.quantity,
                                          p.products[0].stock,
                                          p._id
                                        )
                                      }
                                      className="px-3 cursor-pointer"
                                    >
                                      +
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(delete_card_product(p._id))
                                    }
                                    className="px-5 py-[3px] bg-red-500 text-white"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-white p-4 text-slate-600 flex flex-col gap-3 ">
                      <h2 className="text-lg font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {buy_product_item} Items
                        </span>
                        <span className="font-bold">
                          <div className="flex justify-center items-center">
                            <FaBangladeshiTakaSign size={16} />
                            {price}
                          </div>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Shipping</span>
                        <span className="font-bold">
                          <div className="flex justify-center items-center">
                            <FaBangladeshiTakaSign size={16} />
                            {shipping_fee}
                          </div>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 border border-slate-300 out rounded-smline-none py-2"
                          type="text"
                          placeholder="Cupon Code"
                        />
                        <button className="px-5 py-[1px] rounded-sm bg-violet-500 text-white uppercase">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Amount</span>
                        <span className="font-bold">
                          <div className="flex justify-center items-center">
                            <FaBangladeshiTakaSign size={16} />
                            {price + shipping_fee}
                          </div>
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[5px] rounded-md bg-violet-500 text-white font-semibold"
                      >
                        Procced To Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="text-white bg-indigo-500 px-4 py-1" to="/shop">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Card;
