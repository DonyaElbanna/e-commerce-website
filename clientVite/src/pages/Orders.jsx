import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get(
        `http://localhost:9999/user/orders/${auth.userInfo._id}`
      );
      console.log(data.orders);
      setOrders(data.orders);
    };
    getOrders();
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-2/3 m-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 gap-20 border-separate border-spacing-y-3">
          <thead className="text-l text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Trip Name
              </th>
              <th scope="col" className="px-6 py-3">
                adults
              </th>
              <th scope="col" className="px-6 py-3">
                childern
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-center font-bold">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-32 p-4">
                  <img src={order.attraction.Images[0]} alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {order.attraction.name}
                </td>
                <td className="px-6 py-4">{order.adultCount}</td>
                <td className="px-6 py-4">{order.childCount}</td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {order.totalPrice}$
                </td>
                <td className="px-6 py-4">
                  {new Date(order.travelDate.split("T")[0]).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
