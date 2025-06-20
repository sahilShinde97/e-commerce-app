import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-xl font-semibold text-gray-800">
        All Products List
      </p>

      <div className="flex flex-col gap-3">
        {/* List table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-sm rounded-md shadow">
          <b className="font-semibold tracking-wide">Image</b>
          <b className="font-semibold tracking-wide">Name</b>
          <b className="font-semibold tracking-wide">Category</b>
          <b className="font-semibold tracking-wide">Price</b>
          <b className="text-center font-semibold tracking-wide">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-3 px-4 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-800 text-sm hover:shadow-md hover:scale-[1.01] transition"
          >
            <img
              className="w-14 h-14 object-cover rounded-md border border-gray-300"
              src={item.image[0]}
              alt=""
            />
            <p className="font-medium truncate">{item.name}</p>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="font-semibold">
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg font-bold text-red-500 hover:text-red-700 transition"
            >
              ✕
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
