import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-yellow-400 to-amber-600 px-4 md:px-10 lg:px-20 py-4 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/">
          <img src={assets.logo} className="w-16 md:w-20" alt="logo" />
        </Link>

        <ul className="hidden sm:flex gap-6 text-sm font-semibold">
          <NavLink to="/" className="hover:text-black transition">HOME</NavLink>
          <NavLink to="/collection" className="hover:text-black transition">CAKE-COLLECTION</NavLink>
          <NavLink to="/about" className="hover:text-black transition">ABOUT</NavLink>
          <NavLink to="/contact" className="hover:text-black transition">CONTACT</NavLink>
        </ul>

        <div className="flex items-center gap-5">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer filter invert"
            alt="search"
          />

          {/* Profile Icon + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              onClick={() => {
                if (!token) navigate("/login");
                else setDropdownOpen(!dropdownOpen);
              }}
              src={assets.profile_icon}
              className="w-5 cursor-pointer filter invert"
              alt="profile"
            />

            {token && dropdownOpen && (
              <div className="absolute right-0 mt-3 bg-white text-gray-700 rounded shadow-md z-50 w-40">
                <div className="flex flex-col gap-2 py-3 px-5">
                  <p onClick={() => { navigate('/'); setDropdownOpen(false); }} className="cursor-pointer hover:text-black">My Profile</p>
                  <p onClick={() => { navigate('/orders'); setDropdownOpen(false); }} className="cursor-pointer hover:text-black">Orders</p>
                  <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5 filter invert" alt="cart" />
            <p className="absolute -right-2 -bottom-2 w-4 h-4 bg-white text-black rounded-full text-[10px] flex items-center justify-center font-bold">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden filter invert"
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`absolute top-0 right-0 h-full z-40 bg-white text-black transition-all duration-300 ${visible ? "w-64 px-4 py-6 shadow-lg" : "w-0 overflow-hidden"}`}>
        <div className="flex flex-col text-sm font-semibold">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 cursor-pointer mb-6">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/collection">CAKE-COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
