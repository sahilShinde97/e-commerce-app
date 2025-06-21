import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import {
  FaBox,
  FaCheckCircle,
  FaShippingFast,
  FaClock
} from 'react-icons/fa';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // 🔄 Load orders for the user
  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrders = [];
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrders.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });
        setOrderData(allOrders.reverse());
      }
    } catch (error) {
      console.error('Failed to load orders', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // 🧾 Helper to get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'shipped':
        return <FaShippingFast className="text-blue-500" />;
      case 'packing':
        return <FaBox className="text-yellow-500" />;
      case 'order placed':
        return <FaClock className="text-orange-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  return (
    <div className="border-t pt-16 max-w-6xl mx-auto px-4 pb-20">
      {/* 🏷️ Title */}
      <div className="text-center text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* 🔄 If no orders */}
      {orderData.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        // 🛒 List of orders
        orderData.map((item, index) => {
          // ✅ FIX: Get the correct price (priceBySize → fallback to price → fallback to 0)
          const displayPrice =
            item?.priceBySize?.[item.size] ??
            (typeof item.price === 'object' ? item.price?.[item.size] : item.price) ??
            0;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 mb-6 border rounded-md shadow-sm hover:shadow-md transition"
            >
              {/* 🖼️ Product Info */}
              <div className="flex gap-4">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex flex-col justify-between text-sm text-gray-700">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p>
                    <span className="font-medium">
                      {currency}
                      {Number(displayPrice).toFixed(2)}
                    </span>{' '}
                    &nbsp; | &nbsp;
                    Qty: {item.quantity} &nbsp; | &nbsp;
                    Size: {item.size}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ordered on: {new Date(item.date).toDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Payment: {item.paymentMethod}
                  </p>
                </div>
              </div>

              {/* 🚚 Order Status */}
              <div className="flex justify-between md:flex-col md:items-end gap-3 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className="capitalize text-gray-600">{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded hover:shadow-md text-xs md:text-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
