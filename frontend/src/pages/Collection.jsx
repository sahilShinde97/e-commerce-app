import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let sorted = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProducts(sorted);
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-4 sm:px-10">
      {/* Left - Filters */}
      <div className="sm:min-w-[200px]">
        <p onClick={() => setShowFilter(!showFilter)} className="text-xl mb-4 flex items-center justify-between cursor-pointer text-gray-800 font-semibold">
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Category */}
          <div className="border border-gray-200 rounded-lg mb-6 px-5 py-4 bg-white shadow-sm">
            <p className="mb-3 font-semibold text-sm text-gray-800">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <label className="flex gap-2">
                <input type="checkbox" value="Men" onChange={toggleCategory} />
                Cakes
              </label>
              <label className="flex gap-2">
                <input type="checkbox" value="Women" onChange={toggleCategory} />
                Chocolates
              </label>
              <label className="flex gap-2">
                <input type="checkbox" value="Kids" onChange={toggleCategory} />
                Pastry
              </label>
            </div>
          </div>

          {/* Subcategory */}
          <div className="border border-gray-200 rounded-lg px-5 py-4 bg-white shadow-sm">
            <p className="mb-3 font-semibold text-sm text-gray-800">TYPE</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <label className="flex gap-2">
                <input type="checkbox" value="Topwear" onChange={toggleSubCategory} />
                Milk Cake
              </label>
              <label className="flex gap-2">
                <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} />
                Cup Cake
              </label>
              <label className="flex gap-2">
                <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} />
                Chocolates
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Products */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="text-2xl text-gray-800 mb-3 sm:mb-0">
            <Title text1="ALL" text2="CAKE 🎂" />
          </div>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
