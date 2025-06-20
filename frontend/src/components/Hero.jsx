import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-amber-100">
      {/* Hero Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-amber-800">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-yellow-600"></p>
            <p className="font-medium text-sm md:text-base text-yellow-700">OUR BESTSELLER</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-yellow-900">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base text-yellow-700">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-yellow-700"></p>
          </div>
        </div>
      </div>
      {/* Hero Right */}
      <img className="w-full sm:w-1/2 object-cover" src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero
