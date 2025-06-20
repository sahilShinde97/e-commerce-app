import React from "react";
import { assets } from "../assets/assets";

export const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-20 px-6 sm:px-10 bg-gradient-to-br from-yellow-50 via-white to-amber-100 text-xs sm:text-base text-gray-700">
      <div className="hover:scale-105 transition-transform duration-300">
        <img
          src={assets.exchange_icon}
          className="w-14 m-auto mb-4"
          alt="Cancellation"
        />
        <p className="font-semibold text-amber-700">Easy Cancellation</p>
        <p className="text-gray-500 mt-1 max-w-[220px] mx-auto">
          Cancel within 48 hrs for a full refund or reschedule.
        </p>
      </div>
  
      <div className="hover:scale-105 transition-transform duration-300">
        <img
          src={assets.quality_icon}
          className="w-14 m-auto mb-4"
          alt="Fresh Quality"
        />
        <p className="font-semibold text-amber-700">Fresh Quality Guarantee</p>
        <p className="text-gray-500 mt-1 max-w-[220px] mx-auto">
          Every cake is baked fresh with premium ingredients.
        </p>
      </div>
  
      <div className="hover:scale-105 transition-transform duration-300">
        <img
          src={assets.support_img}
          className="w-14 m-auto mb-4"
          alt="Support"
        />
        <p className="font-semibold text-amber-700">24/7 Customer Support</p>
        <p className="text-gray-500 mt-1 max-w-[240px] mx-auto">
          Call or WhatsApp us anytime at
          <span className="text-pink-600 font-semibold"> +91 9136518859</span>.
        </p>
      </div>
    </div>
  );
  
};
