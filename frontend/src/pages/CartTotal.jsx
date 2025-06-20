import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full bg-white p-6 rounded-lg border shadow-sm text-sm text-gray-700">
      <div className="text-xl sm:text-2xl mb-4 text-gray-800">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />

        <div className="flex justify-between">
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium">
            {currency} {delivery_fee}.00
          </p>
        </div>
        <hr />

        <div className="flex justify-between pt-2">
          <p className="font-semibold text-gray-800">Total</p>
          <p className="font-bold text-lg text-gray-900">
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
