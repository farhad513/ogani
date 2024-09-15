import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const Shipping = () => {
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [res, setRes] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    division: "",
    city: "",
    area: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const saveInfo = (e) => {
    e.preventDefault();
    const { name, address, phone, post, division, city, area } = state;
    if (name && address && phone && post && division && city && area) {
      setRes(true);
    }
  };
  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        shippingInfo: state,
        items,
        userId: userInfo.id,
        navigate,
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
                <h2 className="text-2xl font-bold">Shop Now</h2>

                <div className="flex justify-center items-center">
                  <Link className="text-2xl font-bold underline" to="/">
                    Home
                  </Link>
                  <Link className="text-2xl font-bold underline mt-2" to="/">
                    <FiChevronRight />
                  </Link>
                  <span className="text-2xl font-bold underline">
                    Place Order
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="flex w-full flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  {!res && (
                    <>
                      <h2 className="text-slate-600 text-center font-bold mb-3 text-lg">
                        Shipping Information
                      </h2>
                      <form onSubmit={saveInfo}>
                        <div className="flex md:flex-col md:gap-2 gap-5 w-full text-slate-600">
                          <div className="flex flex-col mb-3 gap-1 w-full">
                            <label className="font-semibold" htmlFor="name">
                              Name :
                            </label>
                            <input
                              value={state.name}
                              onChange={inputHandle}
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Name"
                              className="border border-slate-200 px-3 py-2 w-full outline-none focus:border-indigo-400 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col mb-3 gap-1 w-full">
                            <label className="font-semibold" htmlFor="address">
                              Address :
                            </label>
                            <input
                              value={state.address}
                              onChange={inputHandle}
                              type="text"
                              name="address"
                              placeholder="Address"
                              id="address"
                              className="border border-slate-200 px-3 py-2 w-full outline-none focus:border-indigo-400 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 gap-5 w-full text-slate-600">
                          <div className="flex flex-col mb-3 gap-1 w-full">
                            <label className="font-semibold" htmlFor="phone">
                              Phone :
                            </label>
                            <input
                              value={state.phone}
                              onChange={inputHandle}
                              type="number"
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                              className="border border-slate-200 px-3 py-2 w-full outline-none focus:border-indigo-400 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col mb-3 gap-1 w-full">
                            <label className="font-semibold" htmlFor="post">
                              Post Code :
                            </label>
                            <input
                              value={state.post}
                              onChange={inputHandle}
                              type="number"
                              name="post"
                              placeholder="post"
                              id="Post"
                              className="border border-slate-200 px-3 py-2 w-full outline-none focus:border-indigo-400 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 gap-5 w-full text-slate-600">
                          <div className="flex flex-col mb-3 gap-1 w-full">
                            <label className="font-semibold" htmlFor="division">
                              Division :
                            </label>
                            <input
                              value={state.division}
                              onChange={inputHandle}
                              type="text"
                              name="division"
                              id="division"
                              placeholder="Division"
                              className="border border-slate-200 px-3 py-2 w-full outline-none focus:border-indigo-400 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col mb-3 gap-1 w-full">
                            <label className="font-semibold" htmlFor="city">
                              City :
                            </label>
                            <input
                              value={state.city}
                              onChange={inputHandle}
                              type="text"
                              name="city"
                              placeholder="city"
                              id="city"
                              className="border border-slate-200 px-3 py-2 w-full outline-none focus:border-indigo-400 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 gap-5 w-full text-slate-600">
                          <div className="flex flex-col mb-3 gap-1 w-full">
                            <label className="font-semibold" htmlFor="area">
                              Area :
                            </label>
                            <input
                              value={state.area}
                              onChange={inputHandle}
                              type="text"
                              name="area"
                              id="area"
                              placeholder="Area"
                              className="border border-slate-200 px-3 py-2 w-full outline-none focus:border-indigo-400 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col mt-7 gap-1 w-full">
                            <button className="w-full px-3 py-2 bg-indigo-500 hover:shadow-md hover:shadow-indigo-500/50 text-white font-semibold rounded-md">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <>
                      <div className="flex flex-col gap-2">
                        <h2 className="text-slate-600 font-medium">
                          Delivered to : {state.name}
                        </h2>
                        <p>
                          <span className="bg-blue-200 text-blue-500 font-medium mr-2 py-0.5 px-2.5 rounded">
                            Home
                          </span>

                          <p className="text-slate-600 font-medium">
                            Address: {state.address}
                          </p>
                          <p className="text-slate-600 font-medium">
                            Division: {state.division}
                          </p>
                          <p className="text-slate-600 font-medium">
                            City: {state.city}
                          </p>
                          <p className="text-slate-600 font-medium">
                            Area: {state.area}
                          </p>
                          <p className="text-slate-600 font-medium">
                            Phone: {state.phone}
                          </p>
                          <p className="text-slate-600 font-medium">
                            Post: {state.post}
                          </p>
                        </p>
                        <p className="text-slate-600 font-medium">
                          Email : farhad@gmail.com
                        </p>
                        <span
                          onClick={() => setRes(!res)}
                          className="text-indigo-600 cursor-pointer font-semibold flex justify-end"
                        >
                          Change
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {products.map((p, i) => (
                  <div key={i} className="flex bg-white p-4 flex-col gap-2">
                    <div className="flex justify-start items-center">
                      <h2 className="text-md text-green-500 text-semibold">
                        {p.shopName}
                      </h2>
                    </div>
                    {p.products.map((c, i) => (
                      <div key={i} className="w-full flex flex-wrap">
                        <div className=" flex sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px]"
                              src={c.productInfo.images[0]}
                              alt=""
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md">{c.productInfo.name}</h2>
                              <span className="text-sm">
                                Brand : {c.productInfo.brand}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-5/12 flex justify-end items-center sm:w-full sm:mt-3">
                          <div className="pl-4 sm:pl-0">
                            <h2 className="font-bold text-slate-600">
                              <div className="flex justify-center items-center">
                                <FaBangladeshiTakaSign size={14} />
                                {c.productInfo.price -
                                  Math.floor(
                                    (c.productInfo.price *
                                      c.productInfo.discount) /
                                      100
                                  )}
                              </div>
                            </h2>
                            <h2 className="line-through text-slate-500 font-semibold">
                              <div className="flex justify-center items-center">
                                <FaBangladeshiTakaSign size={14} />
                                {c.productInfo.price}
                              </div>
                            </h2>
                            <h2 className="text-sm font-bold">
                              -{c.productInfo.discount}% off
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0">
                <div className="bg-white font-medium p-5 text-slate-600 flex flex-col gap-3 rounded-md">
                  <h2 className="text-center text-xl font-bold text-slate-600">
                    Order Summary
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="font-medium"> Items Total</span>
                    <span className="font-bold"> {items}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Shipping Fee</span>
                    <span className="font-bold">
                      <div className="flex justify-center items-center">
                        <FaBangladeshiTakaSign size={14} />
                        {shipping_fee}
                      </div>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium"> Total Payment</span>
                    <span className="font-bold">
                      <div className="flex justify-center items-center">
                        <FaBangladeshiTakaSign size={14} />
                        {price}
                      </div>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">
                      <div className="flex justify-center items-center">
                        <FaBangladeshiTakaSign size={14} />
                        {price + shipping_fee}
                      </div>
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[5px] rounded-md ${
                      res ? "bg-violet-500" : "bg-violet-300 cursor-default"
                    } text-white font-semibold`}
                  >
                    Procced To Checkout
                  </button>
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

export default Shipping;
