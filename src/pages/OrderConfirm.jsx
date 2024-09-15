import React from "react";
import { Link } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useEffect } from "react";
const load = async () => {
  return await loadStripe(
    "pk_test_51JQxiOBeUmTFUfodmRa1vox1Eil0JvWRF4cO1Jd5JTt8Q66SCOayIv5VPmmmpcErtlA05gUj2SMT8Rf9Qvrts1vM00ztA3Q8ud"
  );
};
const OrderConfirm = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;
        case "processing":
          setMessage("processing");
          break;
        case "require_payment_method":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);
  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };
  useEffect(() => {
    get_load();
  }, []);
  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    console.log(orderId);
    if (orderId) {
      try {
        await axios.get(`http://localhost:8080/api/order/confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };
  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-4 flex-col">
      {message === "failed" || message === "processing" ? (
        <>
          <h1 className="text-red-500 ">Error Message</h1>
          <Link
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
            to={"/deshboard/my-orders"}
          >
            Back to Dashboard
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <h1 className="text-green-500 ">Success Message</h1>
            <Link
              className="px-5 py-2 bg-green-500 rounded-sm text-white"
              to={"/deshboard/my-orders"}
            >
              Back to Dashboard
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default OrderConfirm;
