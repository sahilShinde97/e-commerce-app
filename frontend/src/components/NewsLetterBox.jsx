import React from "react";

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-2xl font-semibold text-gray-800">Subscribe now & get 20% off</p>
        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Be the first to know about new arrivals, special deals, and sweet offers! 
          </p>
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row items-center gap-3 mt-6 border border-gray-300 rounded-md p-2">
          <input className="flex-1 px-4 py-2 outline-none text-sm"type="email" placeholder="Enter your email" required/>
          <button type="submit" className="bg-black text-white text-sm px-6 py-2 rounded-md hover:bg-gray-800" >SUBSCRIBE </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;
