import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {

    const {currency}  = useContext(ShopContext);

    return (
      <Link className="text-gray-800 cursor-pointer group" to={`/product/${id}`}>
        <div className="overflow-hidden rounded-xl shadow-md border border-amber-100 bg-white transition-transform duration-300 hover:shadow-lg">
          <img
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            src={image[0]}
            alt=""
          />
        </div>
        <p className="pt-3 pb-1 text-sm font-medium group-hover:text-amber-600 transition">{name}</p>
        <p className="text-sm font-semibold text-amber-700">{currency}{price}</p>
      </Link>
    );
}

export default ProductItem