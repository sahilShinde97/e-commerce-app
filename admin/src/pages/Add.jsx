import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('Men')
  const [subCategory,setSubCategory] = useState('Topware')
  const [bestseller,setBestseller] = useState(false)
  const [sizes,setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toString.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-5 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 p-6 rounded-2xl shadow-2xl text-white'>

    <div>
      <p className='mb-3 font-semibold'>Upload Image</p>
      <div className='flex gap-4 flex-wrap'>
        <label htmlFor="image1">
          <img className='w-24 h-24 object-cover rounded-lg border border-dashed border-white/40 backdrop-blur-md shadow-inner cursor-pointer hover:scale-105 transition' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
        </label>
  
        <label htmlFor="image2">
          <img className='w-24 h-24 object-cover rounded-lg border border-dashed border-white/40 backdrop-blur-md shadow-inner cursor-pointer hover:scale-105 transition' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
        </label>
  
        <label htmlFor="image3">
          <img className='w-24 h-24 object-cover rounded-lg border border-dashed border-white/40 backdrop-blur-md shadow-inner cursor-pointer hover:scale-105 transition' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
        </label>
  
        <label htmlFor="image4">
          <img className='w-24 h-24 object-cover rounded-lg border border-dashed border-white/40 backdrop-blur-md shadow-inner cursor-pointer hover:scale-105 transition' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
        </label>
      </div>
    </div>
  
    <div className='w-full'>
      <p className='mb-2 font-medium'>Product Name</p>
      <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-4 py-2 bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none' type="text" placeholder='Type here' required />
    </div>
  
    <div className='w-full'>
      <p className='mb-2 font-medium'>Product description</p>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-4 py-2 bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none' type="text" placeholder='Write content here' required />
    </div>
  
    <div className='flex flex-col sm:flex-row gap-4 w-full sm:gap-8'>
      <div>
        <p className='mb-2 font-medium'>Product Category</p>
        <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/30 focus:ring-2 focus:ring-fuchsia-400 outline-none'>
          <option value="Men">CAKE</option>
          <option value="Women">CHOCOLATES</option>
          <option value="Kids">PASTRY</option>
        </select>
      </div>
  
      <div>
        <p className='mb-2 font-medium'>Sub Category</p>
        <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/30 focus:ring-2 focus:ring-fuchsia-400 outline-none'>
          <option value="Topwear">MILK-CAKE</option>
          <option value="Bottomwear">CUP-CAKE</option>
          <option value="Winterwear">CHOCOLATES</option>
        </select>
      </div>
  
      <div>
        <p className='mb-2 font-medium'>Product Price</p>
        <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/30 sm:w-[120px] focus:ring-2 focus:ring-fuchsia-400 outline-none' type="Number" placeholder='25' />
      </div>
    </div>
  
    <div>
      <p className='mb-2 font-medium'>Product Sizes</p>
      <div className='flex flex-wrap gap-3'>
        {["1KG", "2KG", "3KG", "4KG", "5KG"].map(size => (
          <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
            <p className={`${sizes.includes(size) ? "bg-pink-500 text-white" : "bg-white/20 text-white"} px-4 py-1 rounded-full cursor-pointer transition-all hover:scale-105`}>{size}</p>
          </div>
        ))}
      </div>
    </div>
  
    <div className='flex gap-2 mt-2 items-center'>
      <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='accent-pink-500 w-4 h-4' />
      <label className='cursor-pointer font-medium' htmlFor="bestseller">Add to bestseller</label>
    </div>
  
    <button type="submit" className='w-32 py-3 mt-4 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-full text-white font-semibold shadow-lg transition-all'>ADD</button>
  </form>
  
  )
}

export default Add