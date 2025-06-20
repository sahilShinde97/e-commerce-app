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
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Just replace the classes inside your return JSX as follows:
  return (
    <div className="border-t pt-14 px-6 sm:px-16 md:px-24 bg-gradient-to-br from-yellow-100 via-white to-amber-100 min-h-screen">
      <div className="text-3xl sm:text-4xl mb-6 text-center text-amber-700 font-semibold">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
  
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          if (!productData) return null; // Prevents error if product not found
  
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm px-6 py-5 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5 sm:flex-1">
                <img
                  className="w-16 sm:w-24 rounded shadow-md border border-amber-200"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-base font-semibold text-amber-800">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-amber-600">
                    <span>
                      {currency}
                      {productData.price}
                    </span>
                    <span className="px-2 py-1 rounded bg-yellow-100 text-xs uppercase text-amber-700 font-semibold">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>
  
              <div className="flex items-center gap-4">
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border border-amber-300 text-center text-sm rounded-md px-3 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            </div>
          );
        })}
      </div>
  
      {/* Cart total & checkout */}
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
