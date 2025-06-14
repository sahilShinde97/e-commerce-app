import React from "react";
import { assets } from "../assets/assets";

export const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 m-auto mb-5"
          alt="Cancellation"
        />
        <p className="font-semibold">Easy Cancellation</p>
        <p className="text-gray-400">
          Cancel within 48 hrs for a full refund or reschedule.
        </p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          className="w-12 m-auto mb-5"
          alt="Fresh Quality"
        />
        <p className="font-semibold">Fresh Quality Guarantee</p>
        <p className="text-gray-400">
          Every cake is baked fresh with premium ingredients.
        </p>
      </div>

      <div>
        <img
          src={assets.support_img}
          className="w-12 m-auto mb-5"
          alt="Support"
        />
        <p className="font-semibold">24/7 Customer Support</p>
        <p className="text-gray-400">
          Call or WhatsApp us anytime at<span className="text-pink-600 font-medium"> +91 9136518859 </span>.
        </p>
      </div>
    </div>
  );
};
