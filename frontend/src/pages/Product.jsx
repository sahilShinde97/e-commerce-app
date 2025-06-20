import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency ,addToCart} = useContext(ShopContext); 

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-gradient-to-br from-yellow-100 via-white to-amber-100 px-6 sm:px-16 py-10 rounded-md shadow-sm">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border border-amber-300 hover:shadow-lg"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto rounded-xl shadow-md" src={image} alt="" />
          </div>
        </div>
  
        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl text-amber-700 mt-2 tracking-wide">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-sm text-gray-700">(122)</p>
          </div>
          <p className="mt-5 text-4xl font-bold text-amber-600">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-700 md:w-4/5 text-sm leading-relaxed">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-gray-800 font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    item === size
                      ? "border-amber-700 bg-amber-100 text-amber-800"
                      : "bg-yellow-50 hover:bg-yellow-100 text-gray-700 border-gray-300"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-gradient-to-r from-yellow-400 to-amber-300 text-white px-8 py-3 text-sm rounded-full shadow hover:shadow-lg transition-all"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 border-amber-300" />
          <div className="text-sm text-gray-600 mt-5 flex flex-col gap-1">
            <p>✅ 100% Fresh Cake</p>
            <p>💰 Cash on delivery is available</p>
            <p>🔁 Easy cancellation policy within 24 hrs</p>
          </div>
        </div>
      </div>
  
      {/* Description & review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm bg-yellow-50 text-amber-700">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-600">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700 leading-relaxed bg-white bg-opacity-60 rounded-md">
          <p>
            Our cakes are crafted with the finest ingredients to ensure unmatched freshness, flavor, and texture in every bite. Whether you’re celebrating a birthday, anniversary, or any special occasion, this cake will make it memorable.
          </p>
          <p>
            This product is prepared daily with love by our experienced bakers. You can expect soft sponge layers, rich cream fillings, and a delightful aroma that adds joy to your celebration. Available in multiple sizes and customization options.
          </p>
          <p>
            We are committed to hygiene, quality, and timely delivery. Every cake is carefully packed to preserve its structure and taste during delivery.
          </p>
        </div>
      </div>
  
      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
  
};

export default Product;
