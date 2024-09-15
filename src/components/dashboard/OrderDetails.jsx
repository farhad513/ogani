import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, parsePath, useParams } from "react-router-dom";
import { get_order_details } from "../../store/reducers/orderReducer";
const OrderDetails = () => {
  const { orderId } = useParams();
  const { myOrder } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_order_details(orderId));
  }, [orderId]);
  return (
    <div className="p-4 bg-white">
      <div className="flex justify-around">
        <h2 className="text-slate-600 font-semibold ">
          Order Id : #{myOrder._id}
        </h2>
        <span className="text-slate-600 font-semibold ">
          Date : {myOrder.date}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-slate-600 font-medium">
            Delivered to : {myOrder.shippingInfo?.name}
          </h2>
          <p>
            <span className="bg-blue-200 text-blue-500 font-medium mr-2 py-0.5 px-2.5 rounded">
              Home
            </span>

            <p className="text-slate-600 font-medium">
              Address: {myOrder.shippingInfo?.address}
            </p>
            <p className="text-slate-600 font-medium">
              Division: {myOrder.shippingInfo?.division}
            </p>
            <p className="text-slate-600 font-medium">
              City: {myOrder.shippingInfo?.city}
            </p>
            <p className="text-slate-600 font-medium">
              Area: {myOrder.shippingInfo?.area}
            </p>
            <p className="text-slate-600 font-medium">
              Phone: {myOrder.shippingInfo?.phone}
            </p>
            <p className="text-slate-600 font-medium">
              Post: {myOrder.shippingInfo?.post}
            </p>
          </p>
          <p className="text-slate-600 font-medium">Email : farhad@gmail.com</p>
        </div>
        <div className="text-slate-600">
          <h2 className="text-slate-600 font-semibold">
            Price : ${myOrder.price}
          </h2>
          <p>
            Payment Status :{" "}
            <span
              className={`py-[1px]  px-2 rounded-md ${
                myOrder.payment_status === "paid"
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {myOrder.payment_status}
            </span>
          </p>
          <p className="mt-1">
            delivery Status :{" "}
            <span
              className={`py-[1px]  px-2 rounded-md ${
                myOrder.delivery_status === "pending"
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {myOrder.delivery_status}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-slate-600 text-lg pb-2">Products</h2>
          <div className="flex gap-5 flex-col">
            {myOrder?.products?.map((p, i) => (
              <div className="">
                <div className="flex gap-5 justify-start items-start text-slate-800">
                  <div className="flex gap-2">
                    <img
                      className="w-[60px] h-[60px]"
                      src={p.images[0]}
                      alt={p.name}
                    />
                    <div className="flex justify-start items-start flex-col">
                      <Link className="text-slate-600 font-semibold">
                        {p.name}
                      </Link>
                      <p>Brand : {p.brand}</p>
                      <p>Quantity : {p.quantity}</p>
                    </div>
                  </div>
                  <div className="pl-2">
                    <h2 className="font-semibold text-slate-700">
                      $ {p.price - Math.floor((p.price * p.discount) / 100)}
                    </h2>
                    <p className="font-medium text-red-600">$ {p.price}</p>
                    <p className="font-medium text-slate-600">
                      - {p.discount} %
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
