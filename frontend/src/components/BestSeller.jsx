import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} =  useContext(ShopContext);
    const [bestSeller,setBestSeller]  = useState([]);

    useEffect(()=>{
        const bestProduct  =  products.filter((item)=>(item.bestseller))
        setBestSeller(bestProduct.slice(0,5))
    },[products])
  return (
        <div className="my-16 px-4 sm:px-10 lg:px-16 bg-gradient-to-br from-amber-50 via-white to-yellow-100">
          <div className="text-center text-3xl py-10">
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className="w-4/5 sm:w-3/5 m-auto text-sm sm:text-base text-amber-700 mt-2">
              "Sweetest Hits from Our Oven to Your Heart."
            </p>
          </div>
      
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
            {
              bestSeller.map((item, index) => (
                <ProductItem 
                  key={index} 
                  id={item._id} 
                  name={item.name} 
                  image={item.image} 
                  price={item.price} 
                />
              ))
            }
          </div>
        </div>
      )
      
}

export default BestSeller