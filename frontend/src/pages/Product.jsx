// ✅ UPDATED Product.jsx
// Changes made: Replaced all references to product.price with product.priceBySize

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image?.[0] || "");
      setSelectedSize("");
    }
  }, [productId, products]);

  const selectedPrice = useMemo(() => {
    if (!productData) return 0;
    const { priceBySize } = productData; // Changed from "price"
    if (typeof priceBySize === "object") {
      return selectedSize ? priceBySize[selectedSize] || 0 : 0;
    }
    return priceBySize;
  }, [productData, selectedSize]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 bg-gradient-to-br from-yellow-100 via-white to-amber-100 px-6 sm:px-16 py-10 rounded-md shadow-sm">
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col gap-2 sm:w-[18%] overflow-x-auto sm:overflow-y-auto">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImage(img)}
                className="w-20 sm:w-full rounded-md border border-amber-300 cursor-pointer hover:shadow"
                alt={`thumb-${idx}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={selectedImage}
              alt="product"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-amber-700">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img
                src={assets.star_icon}
                key={i}
                alt="star"
                className="w-3.5"
              />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
            <span className="pl-2 text-sm text-gray-700">(122)</span>
          </div>

          <p className="mt-5 text-4xl font-bold text-amber-600">
            {currency} {selectedSize ? selectedPrice : " - Select Size"}
          </p>

          <p className="mt-5 text-sm text-gray-700 leading-relaxed md:w-4/5">
            {productData.description}
          </p>

          <div className="my-8">
            <p className="text-gray-800 font-medium mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    size === selectedSize
                      ? "border-amber-700 bg-amber-100 text-amber-800"
                      : "bg-yellow-50 hover:bg-yellow-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {size}
                  {typeof productData.priceBySize === "object" &&
                  productData.priceBySize[size]
                    ? ` (${currency}${productData.priceBySize[size]})`
                    : ""}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedSize}
            onClick={() => addToCart(productData._id, selectedSize)}
            className={`px-8 py-3 text-sm rounded-full shadow transition-all ${
              selectedSize
                ? "bg-gradient-to-r from-yellow-400 to-amber-300 text-white hover:shadow-lg"
                : "bg-yellow-200 text-white cursor-not-allowed"
            }`}
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

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm bg-yellow-50 text-amber-700">
            Description
          </b>
          <p className="border px-5 py-3 text-sm text-gray-600">
            Reviews (122)
          </p>
        </div>
        <div className="bg-white bg-opacity-60 border px-6 py-6 text-sm text-gray-700 leading-relaxed rounded-md">
          <p>
            Our cakes are crafted with the finest ingredients to ensure
            unmatched freshness, flavor, and texture in every bite. Whether
            you're celebrating a birthday, anniversary, or any special occasion,
            this cake will make it memorable.
          </p>
          <p className="mt-3">
            Prepared daily with love by experienced bakers. You can expect soft
            sponge layers, rich cream fillings, and a delightful aroma that adds
            joy to your celebration.
          </p>
          <p className="mt-3">
            We are committed to hygiene, quality, and timely delivery. Every
            cake is packed to preserve structure and taste.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;

// 🔁 Repeat similar refactor for Cart.jsx and ShopContext.jsx wherever "price" is used, change to "priceBySize".
