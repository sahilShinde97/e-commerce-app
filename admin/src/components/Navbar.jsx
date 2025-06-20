import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-4 px-[4%] justify-between bg-gradient-to-r from-indigo-900 via-purple-900 to-fuchsia-900 shadow-md'>
        <img className='w-[max(5%,40px)] drop-shadow-lg' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all duration-300'>
          Logout
        </button>
    </div>
  )
}

export default Navbar
