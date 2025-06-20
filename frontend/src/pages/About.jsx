import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="px-6 sm:px-10 md:px-20 text-gray-700">

      <div className="text-3xl sm:text-4xl text-center pt-12 border-t border-gray-200">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-16 flex flex-col md:flex-row gap-14 md:gap-20">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-md"
          src={assets.about_img}
          alt="About"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm sm:text-base">
          <p className="leading-relaxed">
            Welcome to <span className="font-semibold text-amber-700">Etz-n-Treatz</span>! We are passionate about baking the most delicious and beautiful cakes for all your special moments. Each cake is a handmade masterpiece, created with love, care, and the finest ingredients.
          </p>

          <p className="leading-relaxed">
            From birthdays and weddings to daily indulgences, our variety suits every occasion. Our team is dedicated to making memories sweeter — one slice at a time.
          </p>

          <p className="font-bold text-gray-900 text-lg">Our Mission</p>
          <p className="leading-relaxed">
            To spread joy through high-quality cakes crafted with creativity and care. We're here to be a part of your most cherished moments.
          </p>
        </div>
      </div>

      <div className="text-2xl py-8 text-center">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-24">
        <div className="border bg-white px-8 py-10 rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-amber-700 mb-3">Quality Assurance</h3>
          <p className="text-gray-600 leading-relaxed">
            We use premium ingredients and bake fresh daily. Every product is crafted with precision and care for a consistently delightful experience.
          </p>
        </div>
        <div className="border bg-white px-8 py-10 rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-amber-700 mb-3">Convenience</h3>
          <p className="text-gray-600 leading-relaxed">
            Order your favorite treats online in minutes. We ensure smooth service and on-time deliveries, always.
          </p>
        </div>
        <div className="border bg-white px-8 py-10 rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-amber-700 mb-3">Exceptional Support</h3>
          <p className="text-gray-600 leading-relaxed">
            Need customizations or help? Our friendly support team is just a message away — because your happiness matters most.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
