import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [state, setState] = useState("all");
  const { myOrders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(get_orders({ status: state, userId: userInfo.id }));
  }, [state]);
  const redirectPage = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items = order.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: order?.price,
        items,
        orderId: order?._id,
      },
    });
  };
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          className="outline-none px-3 py-1 rounded-md border text-slate-600"
          id=""
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--all orders--</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="warehouse">Warehouse</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Price{" "}
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i} className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {d._id}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    ${d.price}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {d.payment_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {d.delivery_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Link to={`/deshboard/order/details/${d._id}`}>
                      <span className="bg-green-100 text-green-500 mr-2 px-2.5 py-[1px] rounded">
                        view
                      </span>
                    </Link>
                    {d.payment_status !== "paid" && (
                      <span
                        onClick={() => redirectPage(d)}
                        className="bg-green-100 text-green-500 px-2.5 py-[1px] rounded cursor-pointer"
                      >
                        Pay Now
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
