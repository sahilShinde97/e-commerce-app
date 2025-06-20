import React from "react";

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    return (
      <div className="bg-gradient-to-r from-yellow-50 via-white to-amber-100 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-2xl font-bold text-amber-700">Subscribe now & get 20% off</p>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Be the first to know about new arrivals, special deals, and sweet offers!
          </p>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col sm:flex-row items-center gap-3 mt-6 border border-amber-300 rounded-full p-2 shadow-md bg-white"
          >
            <input
              className="flex-1 px-4 py-2 outline-none text-sm text-gray-700 bg-transparent placeholder:text-gray-400"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm px-6 py-2 rounded-full font-medium shadow hover:brightness-110 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    );
    
};

export default NewsLetterBox;
