import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Bkash from "../components/Bkash";
import { useLocation } from "react-router-dom";
import Stripe from "./Stripe";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [payment, setPayment] = useState("stripe");
  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap gap-3">
                  <div
                    onClick={() => setPayment("stripe")}
                    className={`w-[20%]  border-r cursor-pointer py-8 ${
                      payment === "stripe" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        className="w-[100px] h-full"
                        src="http://localhost:3000/payment/roket.png"
                        alt="Stripe"
                      />
                      <span>Stripe</span>
                    </div>
                  </div>
                  <div
                    className={`w-[20%] border-r cursor-pointer py-8 ${
                      payment === "bkash" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div
                      onClick={() => setPayment("bkash")}
                      className="flex flex-col gap-[3px] justify-center items-center"
                    >
                      <img
                        className="w-[100px] h-full"
                        src="http://localhost:3000/payment/bkash.jpg"
                        alt="Bkash"
                      />
                      <span>Bkash</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setPayment("rocket")}
                    className={`w-[20%]  border-r cursor-pointer py-8 ${
                      payment === "rocket" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        className="w-[100px] h-full"
                        src="http://localhost:3000/payment/roket.png"
                        alt="Rocket"
                      />
                      <span>Rocket</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPayment("nogod")}
                    className={`w-[20%] border-r cursor-pointer py-8 ${
                      payment === "nogod" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        className="w-[100px] h-full"
                        src="http://localhost:3000/payment/nogod.png"
                        alt="nogod"
                      />
                      <span>Nogod</span>
                    </div>
                  </div>
                </div>
                {payment === "stripe" && (
                  <div>
                    <Stripe price={price} orderId={orderId} />
                  </div>
                )}
                {/* {payment === "stripe" && (
                  <div className="w-[41.5%] px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[16px] rounded-md hover:shadow-orange-500/20 hover:shadow-md text-white bg-orange-500">
                      Pay Now
                    </button>
                  </div>
                )} */}
                {payment === "bkash" && (
                  <div className="w-[63.5%] px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[16px] rounded-md hover:shadow-orange-500/20 hover:shadow-md text-white bg-orange-500">
                      Pay Now
                    </button>
                  </div>
                )}
                {payment === "rocket" && (
                  <div className="w-[85.5%] px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[16px] rounded-md hover:shadow-orange-500/20 hover:shadow-md text-white bg-orange-500">
                      Pay Now
                    </button>
                  </div>
                )}
                {payment === "nogod" && (
                  <div className="w-[41.5%] px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[16px] rounded-md hover:shadow-orange-500/20 hover:shadow-md text-white bg-orange-500">
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-500 flex flex-col gap-4">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>
                      {items} items and shipping fee alreay included :{" "}
                    </span>{" "}
                    {""}
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-bold text-slate-600">$ {price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
