import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "./CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              itemInfo.price =
                typeof itemInfo.price === "object"
                  ? itemInfo.price[item]
                  : itemInfo.price;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10 bg-gradient-to-br from-[#fff8e7] via-[#ffecd2] to-[#fbd786]"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
            type="number"
            placeholder="PIN code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
            type="text"
            placeholder="Country Name"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="bg-white bg-opacity-80 border border-yellow-300 rounded-full py-2 px-4 w-full shadow-inner focus:ring-2 focus:ring-yellow-400"
          type="number"
          placeholder="Phone"
        />
      </div>

      <div className="mt-8 flex flex-col w-full sm:w-[480px]">
        <div className="mt-8 min-w-80 bg-white bg-opacity-90 shadow-md rounded-xl p-5">
          <CartTotal />
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg px-6 py-4 mt-6 shadow text-center max-w-3xl mx-auto">
  <div className="flex flex-col gap-2 items-start">
    <div className="text-lg font-medium text-yellow-800 flex items-center gap-2">
      <span className="text-xl">⚠️</span>
      <span>
        Currently only{" "}
        <span className="text-red-600 font-bold">Cash on Delivery</span> is available
      </span>
    </div>
    <div className="text-sm text-yellow-800 pl-7">
      Please pay some advance on mobile number{" "}
      <span className="text-red-600 font-semibold">9172410560</span>
    </div>
  </div>
</div>


        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border border-yellow-300 bg-white bg-opacity-90 rounded-full p-2 px-4 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-yellow-400 rounded-full ${
                  method === "stripe" ? "bg-yellow-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-2" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border border-yellow-300 bg-white bg-opacity-90 rounded-full p-2 px-4 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-yellow-400 rounded-full ${
                  method === "razorpay" ? "bg-yellow-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-2"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-yellow-300 bg-white bg-opacity-90 rounded-full p-2 px-4 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-yellow-400 rounded-full ${
                  method === "cod" ? "bg-yellow-400" : ""
                }`}
              ></p>
              <p className="text-sm font-medium mx-2 text-yellow-900">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-300 hover:to-orange-200 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 rounded-full px-10 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
