import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center py-4">
      <div className="inline-flex items-center justify-between border border-[#BFA760] bg-white px-4 py-2 rounded-full w-3/4 sm:w-1/2 shadow-sm focus-within:ring-1 focus-within:ring-[#FFD700]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-700 bg-transparent placeholder:text-gray-400"
          type="text"
          placeholder="Search your favorite treat"
        />
        <img className="w-4" src={assets.search_icon} alt="search" />
      </div>
      <div className="mt-2">
        <img
          onClick={() => setShowSearch(false)}
          className="inline w-3 cursor-pointer opacity-70 hover:opacity-100 transition"
          src={assets.cross_icon}
          alt="close"
        />
      </div>
    </div>
  ) : null
}

export default SearchBar
