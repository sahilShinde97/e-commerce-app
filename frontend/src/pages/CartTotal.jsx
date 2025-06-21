import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Get subtotal using context method
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full bg-white p-6 rounded-lg border border-yellow-300 shadow-sm text-sm text-gray-700">
      {/* Title */}
      <div className="text-xl sm:text-2xl mb-4 text-amber-800 font-semibold">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Subtotal */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />

        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium">
            {currency} {subtotal === 0 ? "0.00" : delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />

        {/* Total */}
        <div className="flex justify-between pt-2">
          <p className="font-semibold text-gray-800">Total</p>
          <p className="font-bold text-lg text-gray-900">
            {currency} {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
