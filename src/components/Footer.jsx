/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  get_products_card,
  get_products_wishlist,
} from "../store/reducers/cardReducer";
import { useSelector, useDispatch } from "react-redux";
const Footer = () => {
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  const card_page_redirect = () => {
    if (userInfo) {
      navigate("/card");
    } else {
      navigate("/login");
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10">
        <div className="flex flex-col gap-3 justify-center items-center ">
          <Link to="/">
            {/* <h1 className="text-3xl justify-center">
              ROB<span className="text-green-600">O</span>
              <span className="text-red-600">BIT</span>
              <span className="text-teal-600">SY</span>
            </h1> */}
            <img src={logo} alt="" />
          </Link>
          <ul className="flex flex-col text-slate-500 justify-center">
            <li>Address : Chatkhil, Noakhali</li>
            <li>Phone : +8801518-690471</li>
            <li>Email : farhad@gmail.com</li>
          </ul>
        </div>
        <nav className="flex justify-start flex-col	">
          <h6 className="footer-title">All LInks</h6>
          <Link to="/" className="link link-hover">
            About Us
          </Link>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/" className="link link-hover">
            Shopping Info{" "}
          </Link>
          <Link to="/" className="link link-hover">
            Delivery Info
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/" className="link link-hover">
            Contact Us
          </Link>
          <Link to="/" className="link link-hover">
            Payment Getway
          </Link>
          <Link to="/" className="link link-hover">
            Discount Coupon
          </Link>
          <Link to="/" className="link link-hover">
            Products
          </Link>
        </nav>
        <nav>
          <div>
            <h2 className="font-bold text-lg mb-2">
              {" "}
              Join Our Newsletter Now{" "}
            </h2>
            <span>
              Get email Update about our latest shop and special offers
            </span>
            <div className="h-[40px] w-full bg-white relative border mt-2">
              <input
                placeholder="Please Enter Your Email"
                className="w-full h-full bg-transparent px-3 outline-none"
                type="text"
              />
              <button className="absolute right-0 bg-violet-500 text-white px-4 font-bold text-sm h-full uppercase ">
                Subscribe
              </button>
            </div>
          </div>
        </nav>
      </footer>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Farhad
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
