import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-100 via-white to-amber-100 px-6 sm:px-16 pt-20 pb-10 mt-40">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm text-gray-800">

        <div>
          <img src={assets.logo} className="mb-5 w-20" alt="logo" />
          <p className="max-w-md leading-relaxed text-gray-700">
            Discover handcrafted delights with Etz-n-Treatz. Made with love, delivered with care. Every treat tells a story!
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-4 text-amber-700">COMPANY</p>
          <ul className="flex flex-col gap-2 hover:[&>li]:text-yellow-700 transition-all duration-300">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold mb-4 text-amber-700">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-yellow-700 transition cursor-pointer">+91-913-651-8859</li>
            <li className="hover:text-yellow-700 transition cursor-pointer">chinchpure4287@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className="mt-10">
        <hr className="border-yellow-300" />
        <p className="py-5 text-sm text-center text-yellow-800 font-medium">
          © 2025 Etz-n-Treatz — All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
