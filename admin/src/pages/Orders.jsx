import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start bg-white text-gray-800 rounded-xl shadow-md border border-gray-200 p-5 md:p-7"
            key={index}
          >
            <img
              className="w-12 h-12 object-contain"
              src={assets.parcel_icon}
              alt=""
            />

            <div className="space-y-2">
              <div>
                {order.items.map((item, index) => (
                  <p className="text-sm" key={index}>
                    {item.name} x {item.quantity}{" "}
                    <span className="italic text-gray-500">{item.size}</span>
                    {index !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>

              <p className="font-bold text-gray-900">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-sm text-gray-600 leading-tight">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            <div className="text-sm space-y-1">
              <p>
                🛍️ Items:{" "}
                <span className="font-semibold">{order.items.length}</span>
              </p>
              <p>
                💳 Method:{" "}
                <span className="text-gray-700">{order.paymentMethod}</span>
              </p>
              <p>
                💰 Payment:
                <span
                  className={`font-bold ml-1 ${
                    order.payment ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-lg font-bold text-purple-600">
              {currency}
              {order.amount}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="OrderPlaced">OrderPlaced</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
