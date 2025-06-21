import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-6 sm:px-16 md:px-24 bg-gradient-to-br from-yellow-100 via-white to-amber-100 min-h-screen">
      <div className="text-3xl sm:text-4xl mb-6 text-center text-amber-700 font-semibold">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const product = products.find((p) => p._id === item._id);
          if (!product) return null;

          // ✅ FIXED: Use priceBySize instead of price
          const price =
            typeof product.priceBySize === "object"
              ? product.priceBySize[item.size] || 0
              : product.priceBySize || 0;

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm px-6 py-5 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              {/* Product Info */}
              <div className="flex items-start gap-5 sm:flex-1">
                <img
                  src={product.image[0]}
                  alt=""
                  className="w-16 sm:w-24 rounded shadow-md border border-amber-200"
                />
                <div>
                  <p className="text-base font-semibold text-amber-800">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-amber-600">
                    <span>
                      {currency}
                      {price}
                    </span>
                    <span className="px-2 py-1 rounded bg-yellow-100 text-xs uppercase text-amber-700 font-semibold">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="border border-amber-300 text-center text-sm rounded-md px-3 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                />
                <img
                  src={assets.bin_icon}
                  alt="Remove"
                  className="w-5 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[450px] bg-white rounded-lg p-6 shadow-md border border-amber-300">
          <CartTotal />
          <div className="text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="mt-6 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white text-sm tracking-wide px-6 py-3 rounded-md shadow-md transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
