import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  localStorage.setItem("orderId", orderId);
  const paymentElementOptions = {
    layout: "tabs",
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3001/order/confirm",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("Unexpected error");
    }
    setIsLoading(false);
  };
  return (
    <form id="payment-form" onSubmit={submit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        // onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/50 hover:shadow-md bg-orange-500 text-white"
      >
        <span id="button-text">
          {isLoading ? <div>Loading...</div> : "Pay Now"}
        </span>
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
