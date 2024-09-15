import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51JQxiOBeUmTFUfodmRa1vox1Eil0JvWRF4cO1Jd5JTt8Q66SCOayIv5VPmmmpcErtlA05gUj2SMT8Rf9Qvrts1vM00ztA3Q8ud"
);
const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const apperance = {
    theme: "stripe",
  };
  const options = { apperance, clientSecret };
  const create_payment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/order/create/payment",
        { price },
        { withCredentials: true }
      );
      console.log(data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="mt-4">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <button
          onClick={create_payment}
          className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/50 hover:shadow-md bg-orange-500 text-white"
        >
          Start Payment
        </button>
      )}
    </div>
  );
};

export default Stripe;
