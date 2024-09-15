import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_dashboard_data } from "../../store/reducers/dashboardReducer";
const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { recentOrders, cancelledOrder, totalOrder, pendingOrder } =
    useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(get_dashboard_data(userInfo.id));
  }, []);
  const redirectPage = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items = order.products[i].quantity + 1;
    }
    navigate("/payment", {
      state: {
        price: order.price,
        items,
        orderId: order._id,
      },
    });
  };
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div>
          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-green-100 w-[45px] h-[45px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-green-600">
                <AiOutlineShoppingCart />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-3xl font-semibold">{totalOrder}</h2>
              <span className="text-xl font-bold">Orders</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-blue-100 w-[45px] h-[45px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-blue-600">
                <AiOutlineShoppingCart />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-3xl font-semibold">{pendingOrder} </h2>
              <span className="text-xl font-bold">Pending Orders</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-red-100 w-[45px] h-[45px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-red-600">
                <AiOutlineShoppingCart />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-3xl font-semibold">{cancelledOrder} </h2>
              <span className="text-xl font-bold ">Cancel Orders</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 mt-5 rounded-md">
        <h2 className="text-xl font-semibold text-center text-slate-600">
          Recent Order
        </h2>
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
                {recentOrders.map((d, i) => (
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
                      <span
                        onClick={() => redirectPage(d)}
                        className="bg-green-100 text-green-500 px-2.5 py-[1px] rounded cursor-pointer"
                      >
                        Pay Now
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
