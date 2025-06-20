import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

  const {products} = useContext(ShopContext)
  const [latestProducts,  setLatestProducts] = useState([]);

  useEffect(()=>{
    setLatestProducts(products.slice(0,10));
  },[products])
  
  return (
    <div className="my-16 px-4 sm:px-10 lg:px-16 bg-gradient-to-br from-yellow-50 via-white to-amber-100">
      <div className="text-center py-10">
        <Title text1={'LATEST'} text2={'CREATIONS'} />
        <p className="w-4/5 sm:w-3/5 m-auto text-sm sm:text-base text-amber-700 mt-2">
          "Unwrap Happiness – Try Our New Creations!" 🎂🍰
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
        {
          latestProducts.map((item, index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              image={item.image}  
              name={item.name} 
              price={item.price} 
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
