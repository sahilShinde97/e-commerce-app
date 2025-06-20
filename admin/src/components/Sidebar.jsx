import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 shadow-2xl'>
        <div className='flex flex-col gap-6 pt-8 pl-[20%] text-[15px] text-white'>

            <NavLink className='flex items-center gap-4 px-4 py-3 rounded-l-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-pink-600 hover:to-yellow-500 transition-all duration-300 shadow-md' to={'/add'}>
            <img className='w-6 h-6' src={assets.add_icon} alt="" />
            <p className='hidden md:block font-semibold tracking-wide'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-4 px-4 py-3 rounded-l-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-green-500 hover:to-teal-400 transition-all duration-300 shadow-md' to={'/list'}>
            <img className='w-6 h-6' src={assets.order_icon} alt="" />
            <p className='hidden md:block font-semibold tracking-wide'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-4 px-4 py-3 rounded-l-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-orange-500 hover:to-pink-500 transition-all duration-300 shadow-md' to={'/orders'}>
            <img className='w-6 h-6' src={assets.order_icon} alt="" />
            <p className='hidden md:block font-semibold tracking-wide'>Orders</p>
            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar
