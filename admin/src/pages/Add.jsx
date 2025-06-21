import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceBySize, setPriceBySize] = useState({});
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topware");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const sizeOptions = ["1KG", "2KG", "3KG", "4KG", "5KG"];

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", JSON.stringify(priceBySize));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setPriceBySize({});
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-5 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 p-6 rounded-2xl shadow-2xl text-white"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-3 font-semibold">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {images.map((img, idx) => (
            <label htmlFor={`image${idx}`} key={idx}>
              <img
                className="w-24 h-24 object-cover rounded-lg border border-dashed border-white/40 backdrop-blur-md shadow-inner cursor-pointer hover:scale-105 transition"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt="upload"
              />
              <input
                type="file"
                id={`image${idx}`}
                hidden
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          required
          rows={4}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
        />
      </div>

      {/* Category and Subcategory */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
        <div className="w-full sm:w-1/2">
          <p className="mb-2 font-medium">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white focus:outline-none"
          >
            <option value="Men">CAKE</option>
            <option value="Women">CHOCOLATES</option>
            <option value="Kids">PASTRY</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2">
          <p className="mb-2 font-medium">Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white focus:outline-none"
          >
            <option value="Topwear">MILK-CAKE</option>
            <option value="Bottomwear">CUP-CAKE</option>
            <option value="Winterwear">CHOCOLATES</option>
          </select>
        </div>
      </div>

      {/* Price by Size */}
      <div className="w-full">
        <p className="mb-2 font-medium">Price by Size (₹)</p>
        {sizeOptions.map((size) => (
          <div key={size} className="flex items-center gap-2 mb-2">
            <label className="w-12">{size}</label>
            <input
              type="number"
              placeholder={`₹ for ${size}`}
              value={priceBySize[size] || ""}
              onChange={(e) =>
                setPriceBySize((prev) => ({
                  ...prev,
                  [size]: parseInt(e.target.value) || 0,
                }))
              }
              className="px-3 py-1 rounded bg-white/10 border border-white/30 text-white w-32 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        ))}
      </div>

      {/* Product Sizes */}
      <div>
        <p className="mb-2 font-medium">Product Sizes</p>
        <div className="flex flex-wrap gap-3">
          {sizeOptions.map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-500" : "bg-white/20"
                } px-4 py-1 rounded-full text-white cursor-pointer transition hover:scale-105`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2 items-center">
        <input
          type="checkbox"
          id="bestseller"
          className="accent-pink-500 w-4 h-4"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer font-medium">
          Add to bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-32 py-3 mt-4 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-full text-white font-semibold shadow-lg transition-all"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
