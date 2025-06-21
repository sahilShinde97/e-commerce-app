import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price, // JSON string: {"1KG": 500, "2KG": 900}
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Handle images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((img) => img !== undefined);

    const imageUrls = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const parsedSizes = JSON.parse(sizes); // e.g., ["1KG", "2KG"]
    const parsedPrice = JSON.parse(price); // e.g., {"1KG": 500, "2KG": 900}

    // Validation: Ensure all selected sizes have prices
    for (let size of parsedSizes) {
      if (!parsedPrice[size]) {
        return res.json({
          success: false,
          message: `Price missing for selected size: ${size}`,
        });
      }
    }

    const productData = {
      name,
      description,
      priceBySize: parsedPrice,
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: parsedSizes,
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List Products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Single Product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
